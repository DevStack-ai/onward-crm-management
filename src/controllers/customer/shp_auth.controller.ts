import { PrismaClient, shp_admin, shp_customer } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../db"


export class AuthController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = prisma;
    }

    login = async (req: Request, res: Response) => {
        const payload = req.body;

        const username = payload.email;
        const password = payload.password;


        if (!username || !password) {
            res.status(400).send({ message: "Usuario y contraseña son requeridos" });
            res.end()
            return;
        }
        const user = await this.prisma.shp_customer.findFirst({
            where: {
                cli_usuario: username,
                cli_password: password
            },
            select: {
                cli_nombre: true,
                cli_codigo: true,
                cli_usuario: true
            }
        })

        const admin = await this.prisma.shp_admin.findFirst({
            where: {
                adm_usuario: username,
                adm_password: password
            },
        })

        if (user) {
            const token = jwt.sign({ ...user, role: "customer" }, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });

            res.status(200).json({ token });
            res.end()
            return
        }

        if (admin) {
            const token = jwt.sign({ ...admin, role: "admin" }, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });

            res.status(200).json({ token });
            res.end()
            return
        }

        res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        res.end()
        return
    }

    verify = async (req: Request, res: Response) => {

        try {
            const auth = req.headers.authorization

            if (!auth) {
                res.status(401).json({ message: "auth no provisto" });
                res.end()
                return;
            }

            const decoded: any = jwt.verify(auth, process.env.SECRET_KEY) as shp_admin | shp_customer;
            console.log(decoded)
            if (!decoded.cli_codigo && !decoded.adm_codigo) {
                res.status(401).json({ message: "Token inválido" });
                res.end()
                return;
            }

            const convertedId = Number(decoded.cli_codigo || decoded.adm_codigo);

            const user = await this.prisma.shp_customer.findUnique({
                where: {
                    cli_codigo: convertedId
                },
                select: {
                    cli_nombre: true,
                    cli_codigo: true,
                    cli_usuario: true
                }
            })

            const admin = await this.prisma.shp_admin.findUnique({
                where: {
                    adm_codigo: convertedId
                }
            })

            if (admin) {
                res.status(200).json({ ...admin, role: "admin" });
                res.end()
                return;
            }

            if(user){
                res.status(200).json({ ...user, role: "customer" });
                res.end()
                return;
            }

            res.status(401).json({ message: "Token inválido" });
            res.end()
            return;
      
         
        } catch (error) {
            res.status(401).json({ message: "Token inválido" });
            res.end()
        }
    }

}