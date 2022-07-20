import  multer from 'multer';
import path  from 'path';
import  express , { Request ,Response } from 'express';
const app = express();
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
var storage =multer.diskStorage({
    destination: function (req, file, cb) {
         
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
})
const maxSize = 1 * 1000 * 1000;   

export function uploadFun(req:any,res:any,fun:any){
    var upload=multer({ 
        storage: storage,
        limits: { fileSize: maxSize },
        fileFilter: function (req, file, cb){
        
            var filetypes = /jpeg|jpg|png/;
            var mimetype = filetypes.test(file.mimetype);
      
            var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            
            if (mimetype && extname) {
                return cb(null, true);
            }
          
           // cb("Error: File upload only supports the following filetypes - " + filetypes);
          } 
    
    }).single("mypic"); 
    upload(req,res,fun);
}