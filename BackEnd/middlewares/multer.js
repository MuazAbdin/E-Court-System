import multer from "multer";
import path from "path";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("file");

// // Check file Type
function checkFileType(file, cb) {

  const fileTypes = /pdf/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: PDFs Only !!!");
  }
}
