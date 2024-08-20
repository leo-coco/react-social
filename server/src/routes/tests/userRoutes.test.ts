import request from 'supertest';
import express from 'express';

import router from '../userRoutes';
import { vi } from 'vitest';
import { mockUsers } from '../../mocks/mockUser';
import { UserService } from '../../services/userService';

vi.mock('../services/userService');

const app = express();
app.use(express.json());
app.use('/users', router);

describe('GET /users', () => {
  it('should return a list of users', async () => {
    const mock = mockUsers();
    vi.spyOn(UserService.prototype, 'getAll').mockResolvedValue(mock);

    const res = await request(app).get('/users');

    const expectedBody = mock.map(user => ({
      ...user,
      updatedAt: user.updatedAt.toISOString(),
      createdAt: user.createdAt.toISOString(),
    }));

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedBody);
  });
});
