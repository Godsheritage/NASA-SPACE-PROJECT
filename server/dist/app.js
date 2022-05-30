"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const planets_routers_1 = __importDefault(require("./routes/planets/planets.routers"));
const launches_routers_1 = __importDefault(require("./routes/launches/launches.routers"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use("/planets", planets_routers_1.default);
app.use("/launches", launches_routers_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "..", "dists")));
    app.get("/*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "..", "dists", "index.html"));
    });
}
exports.default = app;
