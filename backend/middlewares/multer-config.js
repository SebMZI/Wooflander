const multer = require("multer");

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    const filename = file.originalname.split(" ").join("_");
    const filenameArray = filename.split(".");
    filenameArray.pop();
    const filenameWithoutExtention = filenameArray.join(".");
    const extension = MIME_TYPE[file.mimetype];

    if (extension) {
      // If the extension is valid (image or PDF), create the filename accordingly
      callback(null, filenameWithoutExtention + Date.now() + "." + extension);
    } else {
      // Handle invalid file types here (e.g., reject or handle as needed)
      callback(new Error("Invalid file type"));
    }
  },
});

module.exports = multer({ storage }).single("image");
