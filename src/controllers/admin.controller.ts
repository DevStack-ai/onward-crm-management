import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import e, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Logger from "../middleware/logger";
import xlsx from "xlsx";
import moment from "moment";
import md5 from "md5";

//momento local hEST (hora de panama)
moment.locale("es");
export class AuthController {




}