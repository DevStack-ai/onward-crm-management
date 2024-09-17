import { Prisma } from "@prisma/client"
// import prisma from "../db"

type paramsMiddleware = Prisma.MiddlewareParams
type nextMiddleware = (params: Prisma.MiddlewareParams) => Promise<any>



async function sendEmail(params: paramsMiddleware, next: nextMiddleware) {


    // if (params.model === "auth_user" && params.action === "create") {
    //     //create email
    //     console.log("Email sent to: ", params.args.data.email)
    //     await prisma.email_queue.create({
    //         data: {
    //             to: params.args.data.email,
    //             reference_id: params.args.data.id,
    //             reference: "auth_user",
    //             type: "one_time",
    //             subject: "Bienvenido a la plataforma",
    //             body: JSON.stringify(params.args.data),
    //             template: "user_create",
    //             status: "pending"
    //         }
    //     })
    // }
    return next(params)

}

export default sendEmail
