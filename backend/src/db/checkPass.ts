import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function isPasswordCorrect(email: string, password: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) return false;

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch;
    } catch (error) {
        console.error("Error checking password:", error);
        return false;
    }
}

export default isPasswordCorrect;
