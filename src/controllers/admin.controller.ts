import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import e, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Logger from "../middleware/logger";
import xlsx from "xlsx";
import moment from "moment";
import md5 from "md5";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("America/Panama");

//momento local hEST (hora de panama)
moment.locale("es");
export class AuthController {




}