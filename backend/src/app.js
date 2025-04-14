//External Modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

//Connect to MongoDB
import { connectDB } from './lib/db.js';

//Route Imports
import authRoutes from './routes/auth.route.js';
import executeRoutes from './routes/execute.route.js';

dotenv.config();
const app = express();


//data-parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(cors(
  {
    origin: 'https://codex-krish.vercel.app',
    credentials: true, // Allow credentials (cookies) to be sent
  }
))

app.get('/', (req, res) => {
  res.send('API is running...')
}
)

app.use('/api/auth', authRoutes)
app.use('/api/execute', executeRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}`);
  connectDB();
});