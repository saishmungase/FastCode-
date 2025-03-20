import { PrismaClient } from '@prisma/client';
import checkUser from './userExist';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

type CreateProps = {
    name: string;
    email: string;
    password: string;
};

async function create({ name, email, password }: CreateProps): Promise<boolean> {
    try {
        const existingUser = checkUser(email);

        if (!existingUser) {
            return false; 
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: { name, email, password : hashedPassword },
        });

        return true;
    } catch (error: any) {

        if (error.code === "P2002") {
            console.log("User already exists (unique constraint).");
            return false;
        }

        return false; 
    }
}

export default create;
