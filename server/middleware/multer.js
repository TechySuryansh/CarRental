// import multer from "multer";

// const upload = multer({storage: multer.diskStorage()});

// export default upload;


import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ Define proper storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file to avoid collisions
  },
});

// ✅ Create upload middleware
const upload = multer({ storage });

export default upload;
