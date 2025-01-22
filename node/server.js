// import  express  from "express";

// import cors from "cors"
// const app=express()
// app.use(cors())
// 


// app.get('/user/:email',(req,res)=>{
//     const user=users.find(u=>u.email===req.params.email)
// if(user){
//     res.send(user)
// }
// else{
//     res.status(404).send('user not found')
// }
// })

// app.get('/user',(req,res)=>{
//     res.send(users)
// })

// app.post('/user',(req,res)=>{
//     users.push(req.body)
//     res.send(users)
// })

// app.listen(3000,()=>{
//     console.log('server is runing on port 3000');
// })
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipes.js';

const app = express();
app.use(bodyParser.json());
app.use(express.json())
//add cors
// const cors = require('cors')
app.use(cors())

// מסלולים (Routes)
app.use('/api/user', authRoutes);
app.use('/api/recipes', recipeRoutes);
// app.get('/',(req,res)=>{
//     res.send('hello world')
// })
// app.get('/user/:email',(req,res)=>{
//     const user=users.find(u=>u.email===req.params.email)
// if(user){
//     res.send(user)
// }
// else{
//     res.status(404).send('user not found')
// }
// })

// app.get('/user',(req,res)=>{
//     res.send(users)
// })

// app.post('/user',(req,res)=>{
//     users.push(req.body)
//     res.send(users)
// })
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
app.listen(3000,()=>{
        console.log('server is runing on port 3000');
    })