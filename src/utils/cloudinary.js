import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
  api_key:process.env.CLOUDINARY_API_KEY , 
  api_secret:process.env.CLOUDINARY_SECRET
  
});

const uploadOnCloudinary = async(localFilePath)=> {
    try {
        if (!localFilePath) {
            console.log("No file is there");
            return null;
        }
        const response = await cloudinary.uploader.upload( localFilePath, {resource_type:'auto'} )
        console.log("File uploaded successfull",response);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
}
export { uploadOnCloudinary }
