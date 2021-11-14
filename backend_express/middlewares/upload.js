const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/')
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
}
