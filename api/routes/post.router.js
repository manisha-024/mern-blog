import express from 'express';
import { errorHandler } from '../utils/error.js';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getPosts);
export default router;