import { PrismaClient } from '@prisma/client';

export type userScoreTypes = {
    questionId : number,
    email: string,
    timeTaken: string[]
}

const prisma = new PrismaClient();

const scoreUser = async ({questionId, email, timeTaken }: userScoreTypes) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        
        if (!user) {
            return {
                message: "User Does Not Exist!"
            };
        }

        const numericTimes = timeTaken.map((val: string) => {
            const parsedTime = parseFloat(val);
            if (isNaN(parsedTime)) {
                throw new Error(`Invalid time value: "${val}"`);
            }
            return parsedTime;
        });

        const total_new_time = numericTimes.reduce((sum, val) => sum + val, 0);
        
        const minExecutionTime = Math.min(...numericTimes);
        
        const baseScore = 9 * Math.exp(-5 * minExecutionTime) + 1;
        
        const finalScore = Math.min(Math.max(baseScore, 1), 10);

        const userPrevScore = await prisma.solvedProblem.findFirst({
            where: {
                userId: user.id, 
                frontend_id: questionId
            }
        })

        if(!userPrevScore){
            await prisma.solvedProblem.create({
                data: {
                    frontend_id: questionId,
                    total_time_taken: total_new_time,
                    point: finalScore,
                    user: {
                        connect: { id: user.id }
                    }
                }
            });
        
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    points: user.points + finalScore
                }
            });
            return;
        }
        
        if(userPrevScore.total_time_taken > total_new_time){
            await prisma.solvedProblem.update({
                where : {
                    id : userPrevScore.id
                },
                data : {
                    total_time_taken : total_new_time
                }
            })
        }

        let userTotalScore = user.points - (userPrevScore.point || 0);
        userTotalScore += finalScore;
        await prisma.solvedProblem.update({
            where : {
                id : userPrevScore.id
            },
            data : {
                point : finalScore
            }
        });

        await prisma.user.update({
            where : {
                id : user.id
            },
            data : {
                points : userTotalScore
            }
        })
        
        console.log(`User minimum execution time: ${minExecutionTime}`);
        console.log(`Final User Score: ${finalScore.toFixed(2)}` + "For User" + user.email);
        
        return { 
            score: parseFloat(finalScore.toFixed(2)),
            minExecutionTime 
        };
    } catch (error) {
        console.error("Error in scoreUser:", error);
        return { message: "An error occurred while calculating the score." };
    }
};

export default scoreUser;