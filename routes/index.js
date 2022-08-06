var express = require('express');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Math.random() + file.originalname);
  },fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

const upload = multer({ storage: storage , limits: { fileSize: 1* 1024 * 1024 }}).single('file');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post('/dangky', upload, function(req, res, next) {

  upload(req, res, function (err) {
    if (err !== null) {
      res.send(err);
    } else {
      var email = req.body.email;
      var password = req.body.password;
      var fileName = req.files.length;
      console.log(password);
      console.log(fileName);
      res.send('Upload complete ' + email);
    }
  });
});

module.exports = router;
