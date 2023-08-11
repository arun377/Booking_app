const express=require("express");
const cors=require("cors");
const  mongoose  = require("mongoose");
const User = require("./models/user");
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
require("dotenv").config();
const app=express();
const imagedownloader=require('image-downloader');
const multer=require('multer');
const fs=require('fs');
const Place=require('./models/place');
const Booking=require('./models/booking');


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}));


mongoose.connect("mongodb+srv://arunkarthicp:Arun123@cluster0.jl1rrrf.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("database connected"))
.catch((err)=>console.log('not connected',err));


const bcryptSalt= bcrypt.genSaltSync(10);

function getUserDataFromToken(req){
  return new Promise((resolve, reject)=>{
    jwt.verify(req.cookies.token,process.env.jwtSecret,{},async (error,user)=>{
      if(error)throw error;
     resolve(user);
    });
  });
}

app.get('/test',async (req,res)=>{
  res.json("hello");
});

app.post('/register', async (req,res) => {
    try {
      const {name,email,password} = req.body;
      const exist=await User.findOne({email});
      if(!name){
        return res.json({
          error:'name should not be null'
        })
      }
      if(!password||password.length<6){
        return res.json({
          error:'password must be greater than 6 character'
        })
      }
      if(exist){
        return res.json({
          error:"email is already taken"
        })
      }
      const user = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt),
      })
      return res.json(user);
    } catch (e) {
     console.log(e)
    }
  });

app.post('/login', async (req,res) => {
  
  try {
    const {email,password} = req.body;
    const exist=await User.findOne({email});
   
    if(!email){
      return res.json({
        error:'email should not be null'
      })
    }
    if(!password){
      return res.json({
        error:'password should not be null'
      })
    }
    if(!exist){
      return res.json({
        error:"no user found.make sure you already registered"
      })
    }

    const match =await bcrypt.compare(password,exist.password);

    if(!match){
      return res.json({
        error:'password is not correct'
      })
    }
    if(match){
      jwt.sign({email:exist.email,id:exist._id,name:exist.name},process.env.jwtSecret,{},(error,token)=>{
        if(error) throw error;
        res.cookie('token',token).json(exist)
      })
      
    }
 
  } catch (e) {
   console.log(e)
  }
    
 
    // const {email,password} = req.body;
    // const userDoc = await User.findOne({email});
    // if (userDoc) {
    //   const passOk = bcrypt.compareSync(password, userDoc.password);
    //   if (passOk) {
    //     jwt.sign({
    //       email:userDoc.email,
    //       id:userDoc._id
    //     }, jwtSecret, {}, (err,token) => {
    //       if (err) throw err;
    //       res.cookie('token', token).json(userDoc);
    //     });
    //   } else {
    //     res.status(422).json('pass not ok');
    //   }
    // } else {
    //   res.json('not found');
    // }
  });
  
  app.post('/upload-link',async (req,res)=>{
   
    const {link}=req.body;
    const newName='photo'+Date.now()+'.jpg';
    await imagedownloader.image({
      url:link,
      dest:__dirname + '/uploads/'+newName,
    });
    res.json(newName);
  
    
  })


const photosMiddleware=multer({dest:'uploads/'});
  app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    let uploadedFiles=[];
    for(let i=0;i<req.files.length;i++){
      const {path,originalname}=req.files[i];
      const parts=originalname.split('.');
      const ext=parts[parts.length-1];
      let newPath= path +'.'+ ext;
      fs.renameSync(path,newPath);
      newPath=newPath.replace('uploads\\','');
      uploadedFiles.push(newPath);
      console.log(uploadedFiles);
    }
    res.json(uploadedFiles);
  });

  app.post('/places',(req,res)=>{
    const {token}=req.cookies;
    const {title,address,addedPhotos,
      description,perks, extraInfo,checkIn,
      checkOut,maxguest,price}=req.body;
      
    jwt.verify(token,process.env.jwtSecret,{},async (error,user)=>{
      if(error) throw error;
      const placeDoc =await Place.create({
        owner:user.id,
        title,
        address,
        photos:addedPhotos,
      description,
      perks,
       extraInfo,
       checkIn,
      checkOut,
      maxguest,
      price
    
       });
 res.json(placeDoc);
      })
  });

  app.get('/user-places',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,process.env.jwtSecret,{},async (error,user)=>{
      const {id}=user;
      res.json(await Place.find({owner:id}));
    });
   
  });

  app.get('/places/:id',async (req,res)=>{
   const {id}=req.params;
   res.json(await Place.findById(id));
  });

  app.put('/places',async(req,res)=>{
    const {token}=req.cookies;
    const {id,title,address,addedPhotos,
      description,perks, extraInfo,checkIn,
      checkOut,maxguest,price}=req.body;
      jwt.verify(token,process.env.jwtSecret,{},async (error,user)=>{
        if(error) throw err;
        const placeDoc=await Place.findById(id);
        if(user.id===placeDoc.owner.toString()){
          placeDoc.set({
            title,
            address,
            photos:addedPhotos,
          description,
          perks,
           extraInfo,
           checkIn,
          checkOut,
          maxguest,
          price
          });
        await placeDoc.save();
        res.json('ok');
      }
      });
    })

    app.post('/booking',async (req,res)=>{
      const userData=await getUserDataFromToken(req);
      const {place,checkIn,checkOut,numberofGuest,name,mobile,price}=req.body;
        Booking.create({
          place,checkIn,checkOut,numberofGuest,name,mobile,price,
          user:userData.id
        }).then((doc)=>{
          res.json(doc);
        }).catch((err)=>{
          throw err;
        }); 
    });

    app.get('/places', async(req,res)=>{
      res.json(await Place.find())
    })

   

    app.get('/booking', async (req,res)=>{
      const userData=await getUserDataFromToken(req);
      res.json(await Booking.find({user:userData.id}).populate('place'));
    });

  app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
      jwt.verify(token,process.env.jwtSecret,{},async (error,user)=>{
        if(error) throw error;
        res.json(user);
      });
    }
    else{
      res.json(null)
    }
  });

  app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);

  });

app.listen(3000,()=>{
    console.log("port connected");
});