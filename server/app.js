const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User, Todo } = require('./db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "qwerty"
const bcrypt=require("bcrypt")
const {z}=require("zod")
const cors =require("cors")
const path=require("path")
mongoose.connect('mongodb+srv://lpsgaurangi4558:7W0ucOPXEPHkVD5w@cluster0.1y9dv.mongodb.net/TaskManager');
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend running on this port
    methods: ['GET', 'POST','PUT', 'DELETE'],
    credentials: true,
  }));

  const _dirname=path.resolve();

  app.use(express.json()); 

function auth(req,res,next){
    const token=req.headers.token;
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        if(decoded){
            req.userId=decoded.id;
            next();
    }else{
        res.status(401).json('Unauthorized');
    }
}
catch(error){
    res.status(401).json(error);
}
}

app.post('/signup', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    
    
    const hashedPass=await bcrypt.hash(password,5);

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).send('User already exists');
        }
        else {
            await User.create({
                name: name,
                email: email,
                password:hashedPass,
            })
            return res.send('User Created');
        }
    } catch (error) {
        res.json(error);
    }

});

app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const passMatch=await bcrypt.compare(password,user.password);
            if(passMatch){
                const token = jwt.sign({
                    id: user._id.toString(),
                }, JWT_SECRET);
                res.json(token);
            }
           else{
            res.json("invalid pass");
           }
          
        }

        else {
            return res.status(400).send('User does not exist');
        }
    } catch (error) {
        res.json(error);
    }
});

app.post('/todo',auth, async(req, res) => {
  const title = req.body.title;
    const done = req.body.done;
    const userId = req.userId;
    const date = req.body.date;
    const description = req.body.description;
    const priority = req.body.priority;
  try {
    const todo = await Todo.create({
      title: title,
      userId: userId,
      description: description,
      priority: priority,
      done: done,
      date: date
    });

    res.json("new todo made");


  } catch (error) {
    res.json(error);
  }
});

app.get('/todos', auth,async(req, res) => {
   const userId = req.userId;
const userTodos  =await Todo.find({userId:userId})
res.json(userTodos);
})

app.get('/todos/notCompleted', auth,async(req, res) => {
    const userId = req.userId;
 const userTodos  =await Todo.find({userId:userId,done:"Not Completed"})
 res.json(userTodos);
 })

 app.get('/todos/Completed', auth,async(req, res) => {
    const userId = req.userId;
 const userTodos  =await Todo.find({userId:userId,done:"Completed"})
 res.json(userTodos);
 })

app.delete('/todo/:id',auth,async(req,res)=>{
    const todoId=req.params.id;

    try{
        const todo=await Todo.findOneAndDelete({
            _id:todoId,
            userId:req.userId
        })

        if(todo){
            res.json('Todo deleted');
        }
        else{
            res.json('Todo not found');
        }
    }
    catch(error){
        res.json(error);
    }
})

app.put('/todo/:id',auth,async(req,res)=>{
    const todoId=req.params.id;
    const title=req.body.title;
    const done=req.body.done;
    const priority=req.body.priority;
    const description=req.body.description;
    const date=req.body.date;

    try{
        const todo=await Todo.findOneAndUpdate({
            _id:todoId,
            userId:req.userId

        },{
            title:title,
            done:done,
            priority:priority,
            description:description,
            date:date

        },{new:true})

        if(todo){
            res.json(todo);
        }
        else{
            res.json('Todo not found');
        }
    }
    catch(error){
        res.json(error);
    }
})


app.get('/todo/:id',auth,async(req,res)=>{
    const todoId=req.params.id;
    const title=req.body.title;
    const done=req.body.done;

    try{
        const todo=await Todo.find({
            _id:todoId,
            userId:req.userId
        })

        if(todo){
            res.json(todo);
        }
        else{
            res.json('Todo not found');
        }
    }
    catch(error){
        res.json(error);
    }
})

app.use(express.static(path.join(_dirname,"/client/dist"))),
app.get("*",(req,res)=>{
res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});