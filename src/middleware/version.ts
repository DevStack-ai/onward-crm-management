import { Router, Response, Request } from 'express'
import pjson from '../../package.json'
const router = Router()

router.all('/version', (_req: Request, res: Response) => {
    res.status(200).send(pjson.version)

})



export default router