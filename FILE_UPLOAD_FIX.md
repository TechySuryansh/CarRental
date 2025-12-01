# File Upload Fix

## Issue
When trying to add a car with an image, the server returned a 500 error:
```
Error: ENOENT: no such file or directory, open '/Users/suryansh/Desktop/CarRental/server/uploads/...'
```

## Root Cause
The `uploads` directory didn't exist, and multer was trying to save files to a non-existent directory.

## Solution Applied

### 1. Created uploads directory
```bash
mkdir -p server/uploads
```

### 2. Added .gitkeep file
To ensure the directory is tracked by git:
```bash
touch server/uploads/.gitkeep
```

### 3. Updated .gitignore
Added rules to ignore uploaded files but keep the directory:
```
# uploads (keep directory but ignore files)
uploads/*
!uploads/.gitkeep
```

### 4. Enhanced multer middleware
Updated `server/middleware/multer.js` to automatically create the uploads directory if it doesn't exist:

```javascript
import fs from "fs";

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
```

## Testing
Now you can:
1. Navigate to `/owner/add-car`
2. Fill in car details
3. Upload an image
4. Submit the form
5. Car should be created successfully with the image uploaded to ImageKit

## How It Works

1. **User uploads image** → Multer saves to `server/uploads/` temporarily
2. **Controller reads file** → From the temporary location
3. **ImageKit upload** → File is uploaded to ImageKit CDN
4. **Optimized URL** → Generated and saved to database
5. **Temporary file** → Can be deleted (ImageKit has the permanent copy)

## Future Improvement
Consider adding automatic cleanup of temporary files in the uploads directory after they're uploaded to ImageKit:

```javascript
// After successful ImageKit upload
fs.unlinkSync(imageFile.path); // Delete temporary file
```

This would prevent the uploads directory from filling up with temporary files.

## Directory Structure
```
server/
├── uploads/              # Temporary file storage
│   ├── .gitkeep         # Keeps directory in git
│   └── [temp files]     # Temporary uploads (gitignored)
├── middleware/
│   └── multer.js        # File upload configuration
└── controllers/
    └── ownerController.js # Handles file processing
```

## Notes
- The uploads directory is now created automatically on server start
- Temporary files are stored locally before being uploaded to ImageKit
- ImageKit stores the permanent, optimized versions
- The database stores only the ImageKit URL, not the file itself
