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
const kafka_1 = __importDefault(require("../kafka/kafka"));
const lodash_1 = require("lodash");
const pdfController_1 = __importDefault(require("../controllers/pdfController"));
const consumer = kafka_1.default.consumer({
    groupId: process.env.KAFKA_GROUP_ID
});
const pdf = new pdfController_1.default;
const consume = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield consumer.connect();
        yield consumer.subscribe({
            topic: 'carhaul.rate-agreements.json.create-pdf',
            fromBeginning: true
        });
        yield consumer.run({
            eachMessage: ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
                if (!lodash_1.isNil(topic)) {
                    switch (topic) {
                        case 'carhaul.rate-agreements.json.create-pdf':
                            pdf.generatePdf(message.value);
                            break;
                        default:
                            break;
                    }
                }
            }),
        });
    }
    catch (error) {
        console.log(error);
        try {
            yield consumer.disconnect();
        }
        catch (e) {
            console.error('Failed to gracefully disconnect consumer', e);
        }
        process.exit(1);
    }
});
exports.default = consume;
//# sourceMappingURL=consumer.js.map