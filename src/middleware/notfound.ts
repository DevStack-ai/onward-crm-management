import { Router, Response, Request } from 'express'

const router = Router()

router.all('/health', (_req: Request, res: Response) => {
    res.status(404).json({ error: `Not found ${_req.url}` })
    res.end()
    return
})



export default router