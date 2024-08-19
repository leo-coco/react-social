import { Router } from 'express';
import { PostService } from '../services/postService';
import { PostController } from '../controllers/postController';


const router = Router();

const service = new PostService();
const controller = new PostController(service);

router.get('/', controller.getCursorBasedPosts);
router.post('/', controller.createPost);
router.get('/:postId/comments', controller.getComments);
router.post('/:postId/comments', controller.addComment);
router.post('/:postId/like', controller.like);
router.delete('/:postId/like', controller.dislike);

export default router;
