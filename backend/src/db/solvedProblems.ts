import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findSolvedQuestions = async (email : string) =>{
    const user = await prisma.user.findUnique({
        where : {
            email
        }
    })
    const solved = await prisma.solvedProblem.findMany({
        where : {
            userId : user?.id
        },
        select : {
            frontend_id : true
        }
    })
    
    return solved;
}

export default findSolvedQuestions;