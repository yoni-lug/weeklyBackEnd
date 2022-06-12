import {v2 as cloudinary} from 'cloudinary'
import keys from '../config/keys.js';


// SETTING CLOUDINARY 

   let n=  cloudinary.config({ 
        cloud_name: keys.cloudinaryConfig.cloud_name, 
        api_key: keys.cloudinaryConfig.api_key, 
        api_secret: keys.cloudinaryConfig.api_secret,
        secure: true //  to ensure that your transformation URLs are always generated as HTTPS.
    });
    


export default n


