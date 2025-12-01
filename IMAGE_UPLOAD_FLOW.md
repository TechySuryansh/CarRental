# Image Upload Flow Diagram

## Complete Upload Process

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
└─────────────────────────────────────────────────────────────────┘

User selects image in AddCar form
         │
         ▼
FormData created:
  - image: File object
  - carData: JSON string
         │
         ▼
API call: ownerAPI.addCar(formData)
         │
         ▼
Axios POST with multipart/form-data
         │
         │ HTTP Request
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
└─────────────────────────────────────────────────────────────────┘

Express receives request
         │
         ▼
Multer middleware intercepts
         │
         ▼
Check if uploads/ directory exists
         │
    ┌────┴────┐
    │ Exists? │
    └────┬────┘
         │ No
         ▼
    Create directory
    fs.mkdirSync(uploadsDir)
         │
         ▼
Save file temporarily:
  Location: server/uploads/
  Filename: [timestamp]-[originalname]
  Example: 1764609129298-car.png
         │
         ▼
Attach to req.file:
  {
    path: 'uploads/1764609129298-car.png',
    originalname: 'car.png',
    mimetype: 'image/png',
    size: 123456
  }
         │
         ▼
Controller: addCar()
         │
         ▼
Parse carData from req.body
         │
         ▼
Read temporary file:
  fs.readFileSync(req.file.path)
         │
         ▼
Create buffer from file
         │
         │ Upload to ImageKit
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                         IMAGEKIT CDN                             │
└─────────────────────────────────────────────────────────────────┘

Receive file buffer
         │
         ▼
Store in /cars folder
         │
         ▼
Generate file URL:
  https://ik.imagekit.io/xxx/cars/car.png
         │
         ▼
Return response:
  {
    filePath: '/cars/car.png',
    url: 'https://...',
    fileId: 'xxx'
  }
         │
         │ Response
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
└─────────────────────────────────────────────────────────────────┘

Generate optimized URL:
  imageKit.url({
    path: response.filePath,
    transformation: [
      { width: "1280" },
      { quality: "auto" },
      { format: "web" }
    ]
  })
         │
         ▼
Optimized URL:
  https://ik.imagekit.io/xxx/tr:w-1280,q-auto,f-web/cars/car.png
         │
         ▼
🗑️ DELETE TEMPORARY FILE
  fs.unlinkSync(req.file.path)
  ✅ uploads/1764609129298-car.png deleted
         │
         ▼
Save to MongoDB:
  Car.create({
    brand: 'Toyota',
    model: 'Camry',
    image: 'https://ik.imagekit.io/...',
    owner: userId,
    ...otherData
  })
         │
         ▼
Send response:
  {
    success: true,
    message: "Car Listed Successfully"
  }
         │
         │ HTTP Response
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
└─────────────────────────────────────────────────────────────────┘

Receive success response
         │
         ▼
Show success message
         │
         ▼
Navigate to /owner/manage-cars
         │
         ▼
Fetch cars from API
         │
         ▼
Display car with image from ImageKit URL
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ERROR SCENARIOS                               │
└─────────────────────────────────────────────────────────────────┘

Scenario 1: ImageKit Upload Fails
─────────────────────────────────
Controller: addCar()
    │
    ▼
Try to upload to ImageKit
    │
    ▼
❌ Error thrown
    │
    ▼
Catch block executes
    │
    ▼
Check if temp file exists:
  if (req.file && fs.existsSync(req.file.path))
    │
    ▼
🗑️ Delete temp file:
  fs.unlinkSync(req.file.path)
    │
    ▼
Return error response:
  { success: false, message: error.message }


Scenario 2: Database Save Fails
────────────────────────────────
Controller: addCar()
    │
    ▼
ImageKit upload succeeds
    │
    ▼
🗑️ Delete temp file (already done)
    │
    ▼
Try to save to MongoDB
    │
    ▼
❌ Error thrown
    │
    ▼
Catch block executes
    │
    ▼
Temp file already deleted ✅
    │
    ▼
Return error response


Scenario 3: No File Selected
─────────────────────────────
Frontend validation
    │
    ▼
if (!image) {
  alert('Please select an image')
  return
}
    │
    ▼
❌ Prevents API call
```

## File Lifecycle

```
┌──────────────────────────────────────────────────────────────┐
│                    FILE LIFECYCLE                             │
└──────────────────────────────────────────────────────────────┘

1. CREATION
   ├─ User selects file in browser
   └─ File object created in memory

2. UPLOAD TO SERVER
   ├─ Sent via FormData in HTTP request
   └─ Received by Express/Multer

3. TEMPORARY STORAGE
   ├─ Saved to: server/uploads/[timestamp]-[filename]
   ├─ Duration: Milliseconds to seconds
   └─ Purpose: Buffer for ImageKit upload

4. IMAGEKIT UPLOAD
   ├─ File read into buffer
   ├─ Buffer sent to ImageKit API
   └─ Permanent storage on CDN

5. CLEANUP
   ├─ Temporary file deleted
   └─ uploads/ directory remains empty

6. DATABASE REFERENCE
   ├─ Only URL stored in MongoDB
   ├─ No file data in database
   └─ Images served from ImageKit CDN

7. DISPLAY
   ├─ Frontend fetches car data
   ├─ Image URL from database
   └─ Browser loads from ImageKit CDN
```

## Directory States

```
┌──────────────────────────────────────────────────────────────┐
│              UPLOADS DIRECTORY STATES                         │
└──────────────────────────────────────────────────────────────┘

INITIAL STATE (After setup)
───────────────────────────
server/uploads/
└── .gitkeep                    # Empty marker file


DURING UPLOAD (Temporary)
──────────────────────────
server/uploads/
├── .gitkeep
└── 1764609129298-car.png      # Temporary file (seconds)


AFTER UPLOAD (Clean)
────────────────────
server/uploads/
└── .gitkeep                    # Back to empty


MULTIPLE UPLOADS (Concurrent)
──────────────────────────────
server/uploads/
├── .gitkeep
├── 1764609129298-car1.png     # Upload 1 in progress
└── 1764609129456-car2.png     # Upload 2 in progress

↓ After completion ↓

server/uploads/
└── .gitkeep                    # All cleaned up
```

## Storage Comparison

```
┌──────────────────────────────────────────────────────────────┐
│              WHERE FILES ARE STORED                           │
└──────────────────────────────────────────────────────────────┘

LOCAL SERVER (server/uploads/)
├─ Purpose: Temporary buffer
├─ Duration: Seconds
├─ Size: Original file size
├─ Cleanup: Automatic deletion
└─ Backup: None (temporary)

IMAGEKIT CDN
├─ Purpose: Permanent storage
├─ Duration: Forever (until deleted)
├─ Size: Optimized (compressed)
├─ Cleanup: Manual via ImageKit dashboard
├─ Backup: ImageKit handles
├─ CDN: Global distribution
└─ Transformations: On-the-fly resizing

MONGODB DATABASE
├─ Purpose: Store metadata
├─ Data: URL string only
├─ Size: ~100 bytes per URL
├─ Example: "https://ik.imagekit.io/..."
└─ No actual image data stored
```

## Benefits of This Architecture

✅ **Scalable**: Images on CDN, not server
✅ **Fast**: CDN delivers images globally
✅ **Efficient**: No disk space wasted
✅ **Optimized**: Automatic image optimization
✅ **Flexible**: On-the-fly transformations
✅ **Reliable**: ImageKit handles backups
✅ **Clean**: Automatic temp file cleanup

## Monitoring

### Check uploads directory:
```bash
ls -la server/uploads/
# Should only show .gitkeep
```

### Check ImageKit:
- Login to ImageKit dashboard
- Navigate to Media Library
- Check /cars folder for uploaded images

### Check database:
```javascript
// MongoDB query
db.cars.find({}, { image: 1, brand: 1, model: 1 })
// Should show ImageKit URLs
```

## Troubleshooting

### Temp files not being deleted?
- Check fs.unlinkSync() is called
- Verify file path is correct
- Check file permissions

### Uploads directory filling up?
- Check error handling
- Verify cleanup in catch blocks
- Restart server to trigger cleanup

### Images not displaying?
- Check ImageKit URL in database
- Verify ImageKit credentials
- Test URL directly in browser
