import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUser(email : string){
    const value =  await prisma.user.findUnique({
        where: { email },
    });

    if(!value){
        return false;
    }
    return true;
}

export default checkUser