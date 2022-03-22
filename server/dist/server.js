"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = __importDefault(require("./app"));
const server = http.createServer(app_1.default);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server is listenening on port ${PORT}...`);
});
