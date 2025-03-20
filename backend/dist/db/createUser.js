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
const client_1 = require("@prisma/client");
const userExist_1 = __importDefault(require("./userExist"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function create(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
        try {
            const existingUser = (0, userExist_1.default)(email);
            if (!existingUser) {
                return false;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield prisma.user.create({
                data: { name, email, password: hashedPassword },
            });
            return true;
        }
        catch (error) {
            if (error.code === "P2002") {
                console.log("User already exists (unique constraint).");
                return false;
            }
            return false;
        }
    });
}
exports.default = create;
