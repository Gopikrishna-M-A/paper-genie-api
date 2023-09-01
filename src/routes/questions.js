import express from 'express';
import multer from 'multer'
import { isLoggedIn } from '../authMiddleware.js';
const router = express.Router();
import { getQuestion, getAllQuestions, getQuestionsBySubject, addQuestion, getImage, filterQuestion, deleteQuestion, updateQuestion }  from '../controllers/questions.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const uploadPath = path.resolve(__dirname, '..', '..', 'uploads');
      cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.get("/:id", getQuestion)
router.get("/", isLoggedIn, getAllQuestions)
router.get("/subject/:subject", isLoggedIn, getQuestionsBySubject)
router.post("/", isLoggedIn, upload.single('image'), addQuestion)
router.post("/filter", isLoggedIn,filterQuestion)
router.delete("/:id", deleteQuestion)
router.patch("/:id", updateQuestion)
router.get("/getImage/:path", getImage)



export default router;
