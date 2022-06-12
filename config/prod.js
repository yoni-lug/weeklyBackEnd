var keys ={ 
    mongoDB:{
        userName:process.env.MONGODB_USER_NAME,
        passWord:process.env.MONGODB_PASSWORD
    },
    cloudinaryConfig:{
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
}

export default keys