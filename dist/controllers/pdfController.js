"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const handlebars_1 = __importDefault(require("handlebars"));
const baseController_1 = __importDefault(require("./baseController"));
const validator = __importStar(require("../validation/validators/pdfValidator"));
class PdfController extends baseController_1.default {
    constructor() {
        super(...arguments);
        this.getTemplateHtml = () => __awaiter(this, void 0, void 0, function* () {
            const readFile = util_1.default.promisify(fs_1.default.readFile);
            try {
                const invoicePath = path_1.default.resolve("./src/templates/rateagreementesig.html");
                return yield readFile(invoicePath, 'utf8');
            }
            catch (err) {
                console.log(err);
                return Promise.reject("Could not load html template");
            }
        });
        this.generatePdf = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const request = validator.validateGetByIdRequest(ctx);
            console.log('hello world');
            // return this.createValidResponse(ctx, [])
            let data = {
                carrier_name: "test carrier",
                carrier_address_1: '123 fake st',
                carrier_address_2: 'Suite 1',
                carrier_city: 'St. Louis',
                carrier_state: 'MO',
                carrier_zip: '63123',
                carrier_phone: '(618) 977-0958',
                origin: 'AJ Test Dealership',
                destination: 'AJ other dealership',
                load: 123456,
                net_amount: 900.00,
                fee_amount: 50.00,
                units: 2,
                target_pickup: '2020-01-01',
                payment_type_terms: 'ACH'
            };
            this.getTemplateHtml().then((res) => __awaiter(this, void 0, void 0, function* () {
                // Now we have the html code of our template in res object
                // you can check by logging it on console
                console.log(data);
                console.log("Compiling the template with handlebars");
                const template = handlebars_1.default.compile(res, { strict: true });
                // we have compile our code with handlebars
                const result = template(data);
                console.log('2');
                // We can use this to add dyamic data to the handlebars template at run time from database or API as per need.
                const html = result;
                // we are using headless mode
                console.log('3');
                const browser = yield puppeteer_1.default.launch();
                console.log('4');
                const page = yield browser.newPage();
                // We set the page content as the generated html by handlebars
                yield page.setContent(html);
                console.log('6');
                // We use pdf function to generate the pdf in the same folder as this file.
                yield page.pdf({ path: 'invoice.pdf', format: 'a4' });
                yield browser.close();
                console.log("PDF Generated");
                return this.createValidResponse(ctx, data);
            })).catch(err => {
                return this.createErrorResponse(ctx, request.errorMessage || 'Unknown error reason', 400);
            });
        });
    }
}
exports.default = PdfController;
//# sourceMappingURL=pdfController.js.map