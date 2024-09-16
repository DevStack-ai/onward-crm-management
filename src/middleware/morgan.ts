import { Request, Response } from "express";
import  { StreamLikeType } from "morgan-body"
import Logger from "./logger";
const stream: StreamLikeType = {
    write: (message) => { Logger.info(message); return true; }
}

const skip = (req:Request, _res: Response) => {
    return !!req.body?.api_token
}
export default {stream, skip};
