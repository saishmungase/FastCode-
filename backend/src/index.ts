import express, { NextFunction, Request, Response } from "express";
import z from 'zod'
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config';
import create from "./db/createUser";
import checkUser from "./db/userExist";
import isPasswordCorrect from "./db/checkPass";
import fetchLeaderBoard from "./db/getLeaderBoard";
import runCode from "./request/judge";
import cors from 'cors'
import scoreUser from "./db/scoreUser";
import { error } from "console";
import findSolvedQuestions from "./db/solvedProblems";

const app = express();


const signUpSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});

const signInSchema = z.object({
    email: z.string(),
    password: z.string()
});

// Adding Cache (Jarurat nhi hai vese but bas server ka load kam karne ke liye)
let leaderboardCache = {
    setTime: 0,
    data: [{
        id: '1',
        name: "Saish",
        points: 999
    }]
};

const CACHE_LIMIT = 10 * 1000; 

app.use(cors());
app.use(express.json());

const secret: string = "Saish992005";

function userCheck(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] || req.body.token;
    if (!token) {
        res.status(401).send({
            message: "Authentication required!"
        });
        return; 
    }
    
    try {
        const parsedValue = jwt.verify(token, secret) as JwtPayload;
        
        checkUser(parsedValue.email)
            .then(isUserExist => {
                if (!isUserExist) {
                    res.status(401).send({
                        message: "User does not exist!"
                    });
                    return; 
                }
                req.body.userEmail = parsedValue.email;
                next();
            })
            .catch(err => {
                res.status(500).send({
                    message: "Server error during authentication"
                });
            });
    } catch (error) {
        res.status(401).send({
            message: "Invalid authentication token!"
        });
        return; 
    }
}

app.post('/api/user/signup', async(req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const data = signUpSchema.safeParse(body);
    
    if (!data.success) {
        res.status(400).send({ message: "Failed to Create User" });
        return; 
    }

    const dbResponse = await create(data.data);

    if(!dbResponse){
        res.status(400).send({
            message: "User Already Exist !!!",
        });
        return;
    }

    const token = jwt.sign(
        { email: data.data.email }, 
        secret   
    );

    res.status(200).send({
        message: "Success",
        token: token
    });
});


app.post('/api/user/signin', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const data = signInSchema.safeParse(body);

        if (!data.success) {
            res.status(400).send({ message: "Invalid Credentials !" });
            return;
        }

        const { email, password } = data.data;

        const isUserExist = await checkUser(email);
        if (!isUserExist) {
            res.status(404).send({ message: "User Not Found !" });
            return;
        }

        const isCorrectPassword = await isPasswordCorrect(email, password);
        if (!isCorrectPassword) {
            res.status(401).send({ message: "Invalid Password !" });
            return;
        }

        const token = jwt.sign({ email }, secret);

        res.status(200).send({
            message: "Login Successful",
            token: token
        });

    } catch (error) {
        console.error("Error in sign-in route:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get("/api/user/solvedProblems", userCheck, async (req, res) =>{
    const mail = req.body.userEmail;
    try {
        const solvedQuestions = await findSolvedQuestions(mail);
        res.status(200).json({
            list : solvedQuestions
        })
        return
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error !"
        })
        return;
    }

})

app.post("/api/user/submit", userCheck, async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await runCode(req.body.code);
        type timeArr = string[]
        if(response.error){
            res.status(500).json({error : "Internal Server Error"});
            return 
        }
        const timeTakenArr : timeArr= [];
        const failedCase = response.results?.find((val) => val.status !== "Passed");
        if (failedCase) {
            res.status(200).json({ data: response.results });
            return 
        }

        response.results?.map((val) => {
            timeTakenArr.push(val.timeTaken);
        })
        const email = req.body.userEmail;
        const questionId = req.body.questionId;
        await scoreUser({questionId, email, timeTaken : timeTakenArr});
        res.status(200).json({ response });
        return;
    } catch (error: any) {
        console.error("Error in /api/user/submit:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});

app.get('/api/leaderboard', userCheck, async (req: Request, res: Response) => {
    const currentTime = Date.now();
    if (leaderboardCache.setTime && (currentTime - leaderboardCache.setTime) < CACHE_LIMIT) {
        res.status(200).send({
            leaderboard: leaderboardCache.data
        });
        return;
    }
    
    const leaderboardData = await fetchLeaderBoard();
    leaderboardCache = {
        setTime: currentTime,
        data: leaderboardData
    };
    
    res.status(200).send({
        leaderboard: leaderboardData
    });
});

app.listen(3000, () => {
    console.log("Listening at port 3000!");
});