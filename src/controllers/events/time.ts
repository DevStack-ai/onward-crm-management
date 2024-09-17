import { Prisma } from "@prisma/client"


type paramsMiddleware = Prisma.MiddlewareParams
type nextMiddleware = (params: Prisma.MiddlewareParams) => Promise<any>



async function time(params: paramsMiddleware, next: nextMiddleware) {
  const before = Date.now()

  const result = await next(params)

  const after = Date.now()

  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)

  return result
}

export default time
