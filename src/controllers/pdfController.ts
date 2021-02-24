import fs from 'fs'
import path from 'path'
import utils from 'util'
import puppeteer from 'puppeteer'
import hb from 'handlebars'
import BaseController from "./baseController";
import Koa from "koa";
import * as validator from '../validation/validators/pdfValidator'


export default class PdfController extends BaseController {

	getTemplateHtml = async ()  => {
		const readFile = utils.promisify(fs.readFile)

		try {
			const invoicePath = path.resolve("./src/templates/rateagreementesig.html");
			return await readFile(invoicePath, 'utf8');
		} catch (err) {
            console.log(err);
			return Promise.reject("Could not load html template");
		}
	}
	generatePdf = async (ctx: Koa.Context): Promise<void> => {
        const request = validator.validateGetByIdRequest(ctx)
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
		this.getTemplateHtml().then(async (res) => {
			// Now we have the html code of our template in res object
			// you can check by logging it on console
			console.log(data)
			console.log("Compiling the template with handlebars")
			const template = hb.compile(res, { strict: true });
			// we have compile our code with handlebars
			const result = template(data);
            console.log('2');
			// We can use this to add dyamic data to the handlebars template at run time from database or API as per need.
			const html = result;
			// we are using headless mode
            console.log('3');
			const browser = await puppeteer.launch();
            console.log('4');
			const page = await browser.newPage()
			// We set the page content as the generated html by handlebars
			await page.setContent(html)
            console.log('6');
			// We use pdf function to generate the pdf in the same folder as this file.
			await page.pdf({ path: 'invoice.pdf', format: 'a4' })
			await browser.close();
			console.log("PDF Generated")
            return this.createValidResponse(ctx, data)
		}).catch(err => {
            return this.createErrorResponse(ctx, request.errorMessage || 'Unknown error reason', 400)
		});
	}
}

