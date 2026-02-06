import { register, login } from "../Controllers/users.controller.js";

export function monthlyERoutes(monthlyServer) {
    monthlyServer.post("/api/register", register);
    monthlyServer.post("/api/login", login);
}