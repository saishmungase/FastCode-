import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchLeaderBoard() {
    const leaderboard = await prisma.user.findMany({
        orderBy: {
          points: 'desc' 
        },
        take: 10, 
        select: {
          id: true,
          name: true,
          points: true
        }
    })

    return leaderboard;
}


export default fetchLeaderBoard