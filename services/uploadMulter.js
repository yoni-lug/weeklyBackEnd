import multer from "multer";

const storage = multer.diskStorage ({
    destination : function (req,file,cb){
        cb(null,'uploads/')
    },
    filename: function (req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
//optional fileFilter
// const fileFilter = function (req,file,cb) {
//     if (
//         file.mimetype === "image/jpeg" || file.mimetype === "image/PNG" 
//         ){
//         cb(null,true)
//     }
//     cb(null,false)
// }
const upload = multer ({
    storage:storage,
   // limits: { fileSize:1024*1024*200} // to limit to 200MB,
   //fileFilter 
})
export default upload