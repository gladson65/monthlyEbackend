import { register, login } from "../Controllers/users.controller.js";
import { storeExpense } from "../Controllers/expense.controller.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

export function monthlyERoutes(monthlyServer) {
    monthlyServer.post("/api/register", register);
    monthlyServer.post("/api/login", login);
    monthlyServer.post("/api/storeExpense", verifyToken , storeExpense)
}