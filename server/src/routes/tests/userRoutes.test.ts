import { describe, it, expect, vi } from 'vitest';
import express from 'express';

import { UserController } from '../../controllers/userController';


const mockUserService = {
  getAll: vi.fn(),
};

const mockUserController = new UserController(mockUserService);

const app = express();
app.use(express.json());
app.use('/users', userRouter);

describe('User Router', () => {
  it('should link GET /users to UserController.getUsers', async () => {
    await request(app).get('/users');
    expect(mockUserController.getUsers).toHaveBeenCalled();
  });
});
