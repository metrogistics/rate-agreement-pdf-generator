"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_json_1 = __importDefault(require("koa-json"));
const cors_1 = __importDefault(require("@koa/cors"));
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
const app = new koa_1.default();
exports.app = app;
app.use(koa_bodyparser_1.default());
app.use(cors_1.default());
app.use(koa_json_1.default());
const router = new koa_router_1.default();
router.use(routes_1.v1.routes());
router.get('/', ctx => {
    ctx.body = { message: "Success" };
});
router.get('/routes', ctx => {
    ctx.body = router.stack.map(i => i.path);
});
app.use(router.routes());
const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
    middleware_1.logger.info(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map