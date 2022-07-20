import  express , { Request ,Response } from 'express';
import path from 'path';
import  multer from 'multer';
import { SendMailFunc }  from  "./nodemailer/nodemailer";
import { uploadFun }  from  "./attachment/attach";
import fs  from 'fs';
import axios from 'axios';
import FormData from 'form-data';
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'public')))
import { body, validationResult } from 'express-validator';

// app.post(
//   '/register',
//   body('email').isEmail(),
//   body('password').isLength({ min: 5 }),
//   (req: Request, res: Response) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     res.sendStatus(201);
   
//   },
// ); 

app.get('/form',(req,res)=>
{
  res.sendFile(__dirname+'/public/index.html');
})
app.post('/formPost',body('email').isEmail(),body('emailcc').isEmail(),body('subject').isString().isLength({ min: 3 }),body('message').isString().isLength({ min: 20 }),
 (req: Request, res: Response) => {

  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // upload(req,res,function(err:any) {

  //   if(err) {          
  //       res.send(err)
  //   }
  //   else {
  //     console.log("succcccccccccccccc");
  //    // errors=err;
  //      // res.send("Success, Image uploaded!")
  //   }
  //   })

  
  var message = {
    from: "ritikb13kt@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
    //html: "<p>HTML version of the message</p>",
    // attachments : [
    //     {   // file on disk as an attachment
    //         filename: 'text3.txt',
    //         path: 'index.js' // stream this file
    //     }
    // ]
  }; 
  SendMailFunc(message,function(error:any,info:any)
  {
      if(error) throw Error(error);
      console.log('email sentttt sucessfullyyyyy');
      console.log(info);
  });

  res.sendStatus(201);
  console.log(req.body.subject);
})
//AttachFun();

// var storage =multer.diskStorage({
//   destination: function (req, file, cb) {
       
//       cb(null, "uploads")
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now()+".jpg")
//   }
// })
// const maxSize = 1 * 1000 * 1000;   
// var upload=multer({ 
//   storage: storage,
//   limits: { fileSize: maxSize },
//   fileFilter: function (req, file, cb){
  
//       var filetypes = /jpeg|jpg|pdf|png/;
//       var mimetype = filetypes.test(file.mimetype);

//       var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//       console.log(file.originalname);
//       if (mimetype && extname) {
//           return cb(null, true);
//       }
      
//       // cb("Error: File upload only supports the following filetypes - " + filetypes);
//     } 

// }).single("file"); 
// app.get('/attach',(req,res)=>
// {
//   res.render('attach');
// })

// app.post("/uploadProfilePicture",function (req, res, next) {
        
//   upload(req,res,function(err:any) {

//       if(err) {          
//           res.send(err)
//       }
//       else {
//           res.send("Success, Image uploaded!")
//       }
//   })
//})




///

// const upload = async () => {
//   try {
//     const file = fs.createReadStream('./myfile.txt');
//     const title = 'My file';
  
//     const form = new FormData();
//     form.append('title', title);
//     form.append('file', file);
  
//     const resp = await axios.post('http://localhost:3000/upload', form, {
//       headers: {
//         ...form.getHeaders(),
//       }
//     });
  
//     if (resp.status === 200) {
//       return 'Upload complete';
//     } 
//   } catch(err) {
//     return new Error(err.message);
//   }
// }

// upload().then(resp => console.log(resp));
// var router = express.Router();

// const u = multer({ dest: os.tmpdir() });

// router.post('/upload', u.single('file'), function(req, res) {
//   const title = req.body.title;
//   const file = req.file;

//   console.log(title);
//   console.log(file);

//   res.sendStatus(200);
// });

//module.exports = router;


app.listen(8080);
