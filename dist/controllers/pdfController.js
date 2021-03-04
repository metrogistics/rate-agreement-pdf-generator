"use strict";
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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const kafka_1 = __importDefault(require("../kafka/kafka"));
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
        this.generatePdf = (record) => __awaiter(this, void 0, void 0, function* () {
            // confluent data format
            // {
            //   "carrier_name": "test carrier",
            //   "carrier_address_1": "123 fake st",
            //   "carrier_address_2": "Suite 1",
            //   "carrier_city": "St. Louis",
            //   "carrier_state": "MO",
            //   "carrier_zip": "63123",
            //   "carrier_phone": "(618) 977-0958",
            //   "origin": "AJ Test Dealership",
            //   "destination": "AJ Other Dealership",
            //   "load": 123456,
            //   "net_amount": 900.00,
            //   "fee_amount": 50.00,
            //   "units": 2,
            //   "target_pickup": "2021-01-01",
            //   "payment_type_terms": "ACH"
            // }
            let data = JSON.parse(record.toString());
            this.getTemplateHtml().then((res) => __awaiter(this, void 0, void 0, function* () {
                // Now we have the html code of our template in res object
                // you can check by logging it on console
                console.log("Compiling the template with handlebars");
                const template = handlebars_1.default.compile(res, { strict: true });
                // we have compile our code with handlebars
                const result = template(data);
                // We can use this to add dyamic data to the handlebars template at run time from database or API as per need.
                const html = result;
                // we are using headless mode
                const browser = yield puppeteer_1.default.launch();
                const page = yield browser.newPage();
                // We set the page content as the generated html by handlebars
                yield page.setContent(html);
                //generating a filename
                const fileName = this.generateFileName();
                // We use pdf function to generate the pdf in the same folder as this file.
                yield page.pdf({ path: fileName, format: 'a4' });
                //uploading the file to s3
                this.uploadFile(fileName, fileName);
                //deleting the temp file 
                console.log(2);
                fs_1.default.unlinkSync(fileName);
                yield browser.close();
                //producing a kafka topic that the pdf has been generated
                this.pdfReady(fileName, data.load);
            })).catch(err => {
                console.log(err);
            });
        });
        this.pdfReady = (fileName, loadId) => __awaiter(this, void 0, void 0, function* () {
            let producer = kafka_1.default.producer();
            try {
                let newData = {
                    load_id: loadId,
                    pdf_file_path: fileName,
                };
                yield producer.connect();
                yield producer.send({
                    topic: 'carhaul.rate-agreements.json.pdf-ready',
                    messages: [
                        {
                            key: 'key1',
                            value: JSON.stringify(newData).toString(),
                            partition: 0
                        }
                    ],
                });
            }
            catch (error) {
                console.error('Producer Error: ', error);
            }
        });
        this.uploadFile = (fileName, filePath) => __awaiter(this, void 0, void 0, function* () {
            const s3 = new aws_sdk_1.default.S3({
                accessKeyId: process.env.AWS_S3_KEY,
                secretAccessKey: process.env.AWS_S3_SECRET,
            });
            //reading the file
            const fileContent = fs_1.default.readFileSync(filePath);
            // Setting up S3 upload parameters
            const params = {
                Bucket: 'rate-agreement-pdf',
                Key: fileName,
                Body: fileContent,
                ACL: 'public-read'
            };
            //uploading the file to S3
            s3.upload(params, {}, function (err, data) {
                if (err) {
                    console.log(err);
                }
                console.log('File uploaded successfully');
            });
        });
        this.generateFileName = () => {
            return uuid_1.v4() + '.pdf';
        };
    }
}
exports.default = PdfController;
//# sourceMappingURL=pdfController.js.map