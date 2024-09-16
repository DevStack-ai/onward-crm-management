import { Router, Response, Request } from 'express'

const router = Router()

router.all('/health', (_req: Request, res: Response) => {
    res.status(200).send("live")

})



export default router