import { PrismaClient } from '@prisma/client'
// import softDelete from '../events/softDelete'
// import excludeSoftDelete from '../events/excludeSoftDelete'
// import time from '../events/time'
// import userCreateEmail from "../events/userCreateEmail"


const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// prisma.$use(softDelete)
// prisma.$use(excludeSoftDelete)
// prisma.$use(time)
// prisma.$use(userCreateEmail)

export default prisma

globalThis.prismaGlobal = prisma