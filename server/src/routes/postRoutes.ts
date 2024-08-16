import { Router } from 'express';
import { PostService } from '../services/postService';
import { PostController } from '../controllers/postController';


const router = Router();

const service = new PostService();
const controller = new PostController(service);

router.get('/', controller.getPosts);
router.post('/', controller.createPost);
router.get('/:postId/comments', controller.getComments);

export default router;
