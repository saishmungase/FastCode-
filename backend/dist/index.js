"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const createUser_1 = __importDefault(require("./db/createUser"));
const userExist_1 = __importDefault(require("./db/userExist"));
const checkPass_1 = __importDefault(require("./db/checkPass"));
const getLeaderBoard_1 = __importDefault(require("./db/getLeaderBoard"));
const judge_1 = __importDefault(require("./request/judge"));
const app = (0, express_1.default)();
const signUpSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string(),
    password: zod_1.default.string()
});
const signInSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string()
});
// Cache Stuff
let leaderboardCache = {
    setTime: 0,
    data: [{
            id: '1',
            name: "Saish",
            points: 999
        }]
};
const CACHE_LIMIT = 30 * 1000;
// End Of Cache Stuff
app.use(express_1.default.json());
/*
- To Fetch The Leader Board
- Submitting User Code & Test Cases -> If all pass Give User Point on Time Taken -> Create Funtion For Points
*/
const secret = "Saish992005";
app.post('/api/user/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = signUpSchema.safeParse(body);
    if (!data.success) {
        res.status(400).send({ message: "Failed" });
        return;
    }
    const dbResponse = yield (0, createUser_1.default)(data.data);
    if (!dbResponse) {
        res.status(400).send({
            message: "User Already Exist !!!",
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ email: data.data.email }, secret);
    res.status(200).send({
        message: "Success",
        token: token
    });
}));
app.post('/api/user/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = signInSchema.safeParse(body);
        if (!data.success) {
            res.status(400).send({ message: "Invalid Credentials !" });
            return;
        }
        const { email, password } = data.data;
        const isUserExist = yield (0, userExist_1.default)(email);
        if (!isUserExist) {
            res.status(404).send({ message: "User Not Found !" });
            return;
        }
        const isCorrectPassword = yield (0, checkPass_1.default)(email, password);
        if (!isCorrectPassword) {
            res.status(401).send({ message: "Invalid Password !" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email }, secret);
        res.status(200).send({
            message: "Login Successful",
            token: token
        });
    }
    catch (error) {
        console.error("Error in sign-in route:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}));
app.use(userCheck);
app.post("/api/user/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, judge_1.default)(req.body.data);
        res.status(200).json({ response });
        return;
    }
    catch (error) {
        console.error("Error in /api/user/submit:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}));
app.get('/api/leaderboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = Date.now();
    if (leaderboardCache.setTime && (currentTime - leaderboardCache.setTime) < CACHE_LIMIT) {
        res.status(200).send({
            leaderboard: leaderboardCache.data
        });
        return;
    }
    const fetchLeaderboard = yield (0, getLeaderBoard_1.default)();
    leaderboardCache = {
        setTime: currentTime,
        data: fetchLeaderboard
    };
    res.status(200).send({
        leaderboard: fetchLeaderboard
    });
    return;
}));
app.listen(3000, () => {
    console.log("listenning at port 3000 !");
});
function userCheck(req, res, next) {
    const token = req.body.token;
    try {
        const parsedValue = jsonwebtoken_1.default.verify(token, secret);
        const isUserExist = (0, userExist_1.default)(parsedValue.email);
        if (!isUserExist) {
            res.status(401).send({
                message: "User Does Not Exist !"
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401).send({
            message: "User Does Not Exist !"
        });
        return;
    }
}
