import express from 'express';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';
import dotenv  from "dotenv"
import cors from 'cors';

dotenv.config()

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // The front end URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const PORT = process.env['EXPRESS_PORT'] || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});