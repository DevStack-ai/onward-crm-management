import { Router, Request, Response, NextFunction } from "express"

const router = Router();

router.use((request: Request, response: Response, next: NextFunction) => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV != 'development' && !request.secure) {
        return response.redirect("https://" + request.headers.host + request.url);
     }
 
     next();
});

export default router;