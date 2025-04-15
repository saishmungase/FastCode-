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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
function runCode(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (!process.env.API_KEY) {
                console.error("API_KEY is missing in environment variables");
                return { error: 'API configuration error' };
            }
            if (!Array.isArray(payload)) {
                console.error("Expected array payload, received:", typeof payload);
                return { error: 'Invalid payload format' };
            }
            const languageId = 62;
            console.log(payload);
            const submissions = yield Promise.all(payload.map((testCase) => __awaiter(this, void 0, void 0, function* () {
                console.log(testCase);
                if (!testCase.code) {
                    console.error("Missing code in test case");
                    throw new Error("Invalid test case format - missing code");
                }
                const response = yield axios_1.default.post(`${JUDGE0_API_URL}?base64_encoded=false&wait=true`, {
                    source_code: testCase.code,
                    language_id: languageId
                }, {
                    headers: {
                        'x-rapidapi-key': process.env.API_KEY,
                        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    }
                });
                return response.data;
            })));
            console.log(submissions);
            const results = submissions.map((submission, index) => {
                const expectedOutput = String(payload[index].output).trim();
                let actualOutput = submission.stdout ? submission.stdout.trim() : '';
                if (expectedOutput.toLowerCase() === 'true' || expectedOutput.toLowerCase() === 'false') {
                    if (actualOutput.toLowerCase() === expectedOutput.toLowerCase()) {
                        actualOutput = expectedOutput;
                    }
                }
                if (expectedOutput.startsWith('[') && expectedOutput.endsWith(']')) {
                    try {
                        const expectedArray = JSON.parse(expectedOutput.replace(/'/g, '"'));
                        const actualArray = JSON.parse(actualOutput.replace(/'/g, '"'));
                        if (JSON.stringify(expectedArray) === JSON.stringify(actualArray)) {
                            actualOutput = expectedOutput;
                        }
                    }
                    catch (e) {
                        console.log("Error In Backend");
                    }
                }
                console.log("Actual Output => " + actualOutput);
                console.log("Expected Output => " + expectedOutput);
                const status = actualOutput === expectedOutput ? 'Passed' : 'Failed';
                return {
                    testCase: index + 1,
                    timeTaken: submission.time,
                    status,
                    actualOutput,
                    expectedOutput
                };
            });
            return {
                results
            };
        }
        catch (error) {
            console.error('Error executing code:', error);
            if (axios_1.default.isAxiosError(error)) {
                return {
                    error: 'Failed to execute code',
                    details: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message
                };
            }
            return { error: 'Failed to execute code' };
        }
    });
}
exports.default = runCode;
