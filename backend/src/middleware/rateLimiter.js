import ratelimit from "../../config/upstash.js";

const rateLimiter = async function ratelimiter(req,res,next){
    try {
        const {success} = await ratelimit.limit(req.ip)
        if(!success){
            return res.status(429).json({
                message:"too many request,please try again later"
            })
        }
        next()
    } catch (error) {
        console.log("rate limit error",error)
        next();
    }
}

export default rateLimiter; 