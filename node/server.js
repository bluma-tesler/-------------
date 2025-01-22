
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipes.js';

const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())

// מסלולים (Routes)
app.use('/api/user', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.listen(3000,()=>{
        console.log('server is runing on port 3000');
    })