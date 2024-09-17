import { Prisma } from "@prisma/client"


type paramsMiddleware = Prisma.MiddlewareParams
type nextMiddleware = (params: Prisma.MiddlewareParams) => Promise<any>



async function softDelete(params: paramsMiddleware, next: nextMiddleware) {
    // Check incoming query type
    // if (params.model === "auth_permission" && params.action === "delete") {
    //     return next(params)
    // }

    // if (params.action == 'delete') {
    //     // Delete queries
    //     // Change action to an update
    //     params.action = 'update'
    //     params.args['data'] = {
    //         is_deleted: true,
    //         deleted_at: new Date()
    //     }
    // }
    // if (params.action == 'deleteMany') {
    //     // Delete many queries
    //     params.action = 'updateMany'
    //     if (params.args.data != undefined) {
    //         params.args.data['is_deleted'] = true
    //         params.args.data['deleted_at'] = new Date()
    //     } else {
    //         params.args['data'] = {
    //             is_deleted: true,
    //             deleted_at: new Date()

    //         }
    //     }
    // }
    return next(params)
}

export default softDelete
