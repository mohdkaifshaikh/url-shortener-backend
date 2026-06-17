import { validateCreateShortUrl } from "../modules/url/url.validator.js"

export const validateShortUrl=(req,res,next)=>{
    try{
        req.body=validateCreateShortUrl(req.body);
        next();
    }catch(err){
        next(err);
    }
}