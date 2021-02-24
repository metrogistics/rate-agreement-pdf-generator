"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfController = exports.firstController = void 0;
const exampleController_1 = __importDefault(require("./exampleController"));
const pdfController_1 = __importDefault(require("./pdfController"));
const firstController = new exampleController_1.default();
exports.firstController = firstController;
const pdfController = new pdfController_1.default();
exports.pdfController = pdfController;
//# sourceMappingURL=index.js.map