import {v2 as cloudinary} from 'cloudinary'

// SETTING CLOUDINARY 

   let n=  cloudinary.config({ 
        cloud_name: 'weeklyisrael', 
        api_key: '177196127645927', 
        api_secret: 's1OG-IBtOKLlLFmofRdyvO8pnLA',
        secure: true //  to ensure that your transformation URLs are always generated as HTTPS.
    });
    
export default n

