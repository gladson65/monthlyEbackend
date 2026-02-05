import { register } from "../Controllers/users.controller.js";

export function monthlyERoutes(monthlyServer) {
    monthlyServer.post("/api/register", register);
}