"use strict";
// import axios from "axios";
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
// const JUDGE0_URL = "https://ce.judge0.com/submissions";
// interface TestCase {
//     input: string;
//     output: string;
// }
// interface JudgeProps {
//     source_code: string;
//     test_cases: TestCase[];
//     user_id: string;
//     challenge_id: string;
// }
// interface TestResult {
//     test_case: TestCase;
//     status: string;
//     output: string | null;
//     correct: boolean;
//     time_taken: string | null;
// }
// async function judgeRequest({
//     source_code,
//     test_cases,
//     user_id,
//     challenge_id,
// }: JudgeProps) {
//     try {
//         if (!source_code || !test_cases.length) {
//             return { error: "Source code and test cases are required" };
//         }
//         const submissions = test_cases.map((test) => ({
//             source_code,
//             language_id: 91, 
//             stdin: test.input,
//             expected_output: test.output,
//         }));
//         const responses = await Promise.all(
//             submissions.map((submission) =>
//                 axios.post(`${JUDGE0_URL}?base64_encoded=false&wait=false`, submission, {
//                     headers: { "Content-Type": "application/json" },
//                 })
//             )
//         );
//         const tokens = responses.map((response) => response.data.token);
//         const results = await Promise.all(
//             tokens.map((token) =>
//                 axios.get(`${JUDGE0_URL}/${token}?base64_encoded=false`, {
//                     headers: { "Content-Type": "application/json" },
//                 })
//             )
//         );
//         // Step 4: Process results
//         let allPassed = true;
//         const testResults: TestResult[] = results.map((response, index) => {
//             const receivedOutput = response.data.stdout ? response.data.stdout.trim() : null;
//             const passed = receivedOutput === test_cases[index].output;
//             if (!passed) allPassed = false;
//             return {
//                 test_case: test_cases[index],
//                 status: response.data.status.description,
//                 output: receivedOutput,
//                 correct: passed,
//                 time_taken: response.data.time || null, 
//             };
//         });
//         if (allPassed) {
//             return { message: "All test cases passed!", time_taken: testResults.map((t) => t.time_taken) };
//         } else {
//             return { message: "Some test cases failed", test_results: testResults };
//         }
//     } catch (error: any) {
//         console.error("Error:", error.message);
//         return { error: "Internal Server Error" };
//     }
// }
// export default judgeRequest;
// {
//     "source_code": "public class Main { public static void main(String[] args) { System.out.println(5+3); } }",
//     "test_cases": [
//       { "input": "", "output": "8" },
//       { "input": "", "output": "10" }
//     ],
//     "user_id": "123",
//     "challenge_id": "456"
//   }
// {
//     "source_code": "import java.util.Scanner; public class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String s = sc.nextLine(); System.out.println(new StringBuilder(s).reverse().toString()); } }",
//     "test_cases": [
//       { "input": "hello", "output": "olleh" },
//       { "input": "judge0", "output": "0egduj" }
//     ],
//     "user_id": "789",
//     "challenge_id": "101"
//   }
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
function runCode(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { source_code, languageId, test_cases, user_id, challenge_id } = payload;
            // const languageId = 62;
            const submissions = yield Promise.all(test_cases.map((_a) => __awaiter(this, [_a], void 0, function* ({ input }) {
                const response = yield axios_1.default.post(`${JUDGE0_API_URL}?base64_encoded=false&wait=true`, {
                    source_code,
                    language_id: languageId,
                    stdin: input
                }, {
                    headers: {
                        'x-rapidapi-key': process.env.API_KEY,
                        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    }
                });
                return response.data;
            })));
            const results = submissions.map(({ stdout, time }, index) => {
                const expectedOutput = test_cases[index].output.trim();
                const actualOutput = stdout ? stdout.trim() : '';
                const status = actualOutput === expectedOutput ? 'Passed' : 'Failed';
                return {
                    testCase: index + 1,
                    timeTaken: time,
                    status
                };
            });
            return {
                user_id,
                challenge_id,
                results
            };
        }
        catch (error) {
            console.error('Error executing code:', error);
            return { error: 'Failed to execute code' };
        }
    });
}
exports.default = runCode;
