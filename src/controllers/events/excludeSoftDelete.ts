import { Prisma } from "@prisma/client"


type paramsMiddleware = Prisma.MiddlewareParams
type nextMiddleware = (params: Prisma.MiddlewareParams) => Promise<any>



async function excludeSoftDelete(params: paramsMiddleware, next: nextMiddleware) {
  // if (params.model === "auth_user") {
  //   if (params.action === 'findUnique' || params.action === 'findFirst') {
  //     // Change to findFirst - you cannot filter
  //     // by anything except ID / unique with findUnique()
  //     params.action = 'findFirst'
  //     // Add 'is_deleted' filter
  //     // ID filter maintained
  //     params.args.where['is_deleted'] = false
  //   }
  // }
  // if (
  //   params.action === 'findFirstOrThrow' ||
  //   params.action === 'findUniqueOrThrow'
  // ) {
  //   if (params.args.where) {
  //     if (params.args.where.is_deleted == undefined) {
  //       // Exclude is_deleted records if they have not been explicitly requested
  //       params.args.where['is_deleted'] = false
  //     }
  //   } else {
  //     params.args['where'] = { is_deleted: false }
  //   }
  // }
  // if (params.action === 'findMany') {
  //   // Find many queries
  //   if (params.args?.where) {
  //     if (params.args.where.is_deleted == undefined) {
  //       params.args.where['is_deleted'] = false
  //     }
  //   } else {
  //     params.args['where'] = { is_deleted: false }
  //   }
  // }

  return next(params)
}

export default excludeSoftDelete