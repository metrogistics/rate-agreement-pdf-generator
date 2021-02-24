"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const examplePostRequest_json_1 = __importDefault(require("./examplePostRequest.json"));
exports.schemas = {
    examplePostSchema: examplePostRequest_json_1.default,
};
var Schemas;
(function (Schemas) {
    let Example;
    (function (Example) {
        Example["EXAMPLE_POST"] = "examplePostSchema";
    })(Example = Schemas.Example || (Schemas.Example = {}));
})(Schemas || (Schemas = {}));
exports.default = Schemas;
//# sourceMappingURL=index.js.map