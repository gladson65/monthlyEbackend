import { register, login } from "../Controllers/users.controller.js";
import { storeExpense } from "../Controllers/expense.controller.js";

export function monthlyERoutes(monthlyServer) {
    monthlyServer.post("/api/register", register);
    monthlyServer.post("/api/login", login);
    monthlyServer.post("/api/storeExpense", storeExpense);
}