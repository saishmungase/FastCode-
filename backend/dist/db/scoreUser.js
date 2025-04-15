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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const scoreUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ questionId, email, timeTaken }) {
    try {
        const user = yield prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return {
                message: "User Does Not Exist!"
            };
        }
        const numericTimes = timeTaken.map((val) => {
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
        const userPrevScore = yield prisma.solvedProblem.findFirst({
            where: {
                userId: user.id,
                frontend_id: questionId
            }
        });
        if (!userPrevScore) {
            yield prisma.solvedProblem.create({
                data: {
                    frontend_id: questionId,
                    total_time_taken: total_new_time,
                    point: finalScore,
                    user: {
                        connect: { id: user.id }
                    }
                }
            });
            yield prisma.user.update({
                where: { id: user.id },
                data: {
                    points: user.points + finalScore
                }
            });
            return;
        }
        if (userPrevScore.total_time_taken > total_new_time) {
            yield prisma.solvedProblem.update({
                where: {
                    id: userPrevScore.id
                },
                data: {
                    total_time_taken: total_new_time
                }
            });
        }
        let userTotalScore = user.points - (userPrevScore.point || 0);
        userTotalScore += finalScore;
        yield prisma.solvedProblem.update({
            where: {
                id: userPrevScore.id
            },
            data: {
                point: finalScore
            }
        });
        yield prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                points: userTotalScore
            }
        });
        console.log(`User minimum execution time: ${minExecutionTime}`);
        console.log(`Final User Score: ${finalScore.toFixed(2)}` + "For User" + user.email);
        return {
            score: parseFloat(finalScore.toFixed(2)),
            minExecutionTime
        };
    }
    catch (error) {
        console.error("Error in scoreUser:", error);
        return { message: "An error occurred while calculating the score." };
    }
});
exports.default = scoreUser;
