"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const controllers_1 = require("../controllers");
const router = new koa_router_1.default({
    prefix: '/v1',
    sensitive: false,
});
router.get('/example/:id', controllers_1.firstController.getOne);
router.get('/example', controllers_1.firstController.getMany);
router.get('/pdf-example', controllers_1.pdfController.generatePdf);
exports.default = router;
//# sourceMappingURL=v1.js.map