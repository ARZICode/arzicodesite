const multer = require('multer');

// Store file in memory buffer so it can be converted to Base64
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;