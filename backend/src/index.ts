import  express, { NextFunction, Request, Response } from "express";
import z from 'zod'
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config';
import create from "./db/createUser";
import checkUser from "./db/userExist";
import isPasswordCorrect from "./db/checkPass";
import fetchLeaderBoard from "./db/getLeaderBoard";
import runCode from "./request/judge";

const app = express();

const signUpSchema = z.object({
    name : z.string(),
    email : z.string(),
    password : z.string()
});

const signInSchema = z.object({
    email : z.string(),
    password : z.string()
});


// Cache Stuff

let leaderboardCache = {
    setTime : 0,
    data : [{
        id : '1',
        name : "Saish",
        points : 999
    }]
};

const CACHE_LIMIT = 30 * 1000; 

// End Of Cache Stuff

app.use(express.json());


/* 
- To Fetch The Leader Board
- Submitting User Code & Test Cases -> If all pass Give User Point on Time Taken -> Create Funtion For Points
*/


const secret : string = "Saish992005";

app.post('/api/user/signup', async(req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const data = signUpSchema.safeParse(body);
    
    if (!data.success) {
        res.status(400).send({ message: "Failed" });
        return; 
    }

    const dbResponse = await create(data.data);

    if(!dbResponse){
        res.status(400).send({
            message : "User Already Exist !!!",
        })
        return;
    }

    const token = jwt.sign(
        { email: data.data.email }, 
        secret   
    );

    res.status(200).send({
        message : "Success",
        token : token
    });
});


app.post('/api/user/signin', async (req, res) => {
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

app.use(userCheck)

app.post("/api/user/submit", async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await runCode(req.body.data)
        res.status(200).json({ response});
        return
    } catch (error: any) {
        console.error("Error in /api/user/submit:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});

app.get('/api/leaderboard', async (req, res) => {
    const currentTime = Date.now();
    if (leaderboardCache.setTime && (currentTime - leaderboardCache.setTime) < CACHE_LIMIT)
    {
        res.status(200).send({
            leaderboard : leaderboardCache.data
        })
        return;
    }
    const fetchLeaderboard = await fetchLeaderBoard();
    leaderboardCache = {
        setTime : currentTime,
        data : fetchLeaderboard
    }
    res.status(200).send({
        leaderboard : fetchLeaderboard
    })
    return;
})

app.listen(3000, () =>{
    console.log("listenning at port 3000 !");
})



function userCheck(req : Request, res : Response, next : NextFunction){
    const token = req.body.token;
    try {
        const parsedValue = jwt.verify(token, secret) as JwtPayload;
        const isUserExist = checkUser(parsedValue.email);
        if(!isUserExist){
            res.status(401).send({
                message : "User Does Not Exist !"
            })
            return;
        }
        next();
    } catch (error) {
        res.status(401).send({
            message : "User Does Not Exist !"
        })
        return;
    }
}