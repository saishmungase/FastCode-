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
const cors_1 = __importDefault(require("cors"));
const scoreUser_1 = __importDefault(require("./db/scoreUser"));
const solvedProblems_1 = __importDefault(require("./db/solvedProblems"));
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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const secret = "Saish992005";
function userCheck(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]) || req.body.token;
    if (!token) {
        res.status(401).send({
            message: "Authentication required!"
        });
        return;
    }
    try {
        const parsedValue = jsonwebtoken_1.default.verify(token, secret);
        (0, userExist_1.default)(parsedValue.email)
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
    }
    catch (error) {
        res.status(401).send({
            message: "Invalid authentication token!"
        });
        return;
    }
}
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
app.get("/api/user/solvedProblems", userCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mail = req.body.userEmail;
    try {
        const solvedQuestions = yield (0, solvedProblems_1.default)(mail);
        res.status(200).json({
            list: solvedQuestions
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error !"
        });
        return;
    }
}));
app.post("/api/user/submit", userCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield (0, judge_1.default)(req.body.code);
        if (response.error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const timeTakenArr = [];
        const failedCase = (_a = response.results) === null || _a === void 0 ? void 0 : _a.find((val) => val.status !== "Passed");
        if (failedCase) {
            res.status(200).json({ data: response.results });
            return;
        }
        (_b = response.results) === null || _b === void 0 ? void 0 : _b.map((val) => {
            timeTakenArr.push(val.timeTaken);
        });
        const email = req.body.userEmail;
        const questionId = req.body.questionId;
        yield (0, scoreUser_1.default)({ questionId, email, timeTaken: timeTakenArr });
        res.status(200).json({ response });
        return;
    }
    catch (error) {
        console.error("Error in /api/user/submit:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}));
app.get('/api/leaderboard', userCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = Date.now();
    if (leaderboardCache.setTime && (currentTime - leaderboardCache.setTime) < CACHE_LIMIT) {
        res.status(200).send({
            leaderboard: leaderboardCache.data
        });
        return;
    }
    const leaderboardData = yield (0, getLeaderBoard_1.default)();
    leaderboardCache = {
        setTime: currentTime,
        data: leaderboardData
    };
    res.status(200).send({
        leaderboard: leaderboardData
    });
}));
app.listen(3000, () => {
    console.log("Listening at port 3000!");
});
