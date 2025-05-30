import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import cors from 'cors';
import fs from 'fs';
const dataFilePath = './user.json'; // or absolute path


const app = express();
const PORT = 8000;


app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRoutes);

app.get('/',(req, res)=>{
    console.log('[TEST]!');
    res.send("Hello Welcome!!!");
});

app.post('/', (req, res) => {
  res.json({ message: 'Data received' });
});

app.listen(PORT, ()=> console.log(`Server Running on port: http://localhost:${PORT}`));
