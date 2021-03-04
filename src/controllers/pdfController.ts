import fs from 'fs'
import path from 'path'
import utils from 'util'
import puppeteer from 'puppeteer'
import hb from 'handlebars'
import BaseController from "./baseController"
import Koa from 'koa';
import AWS from 'aws-sdk'
import * as validator from '../validation/validators/pdfValidator'
import { v4 as uuidv4 } from 'uuid';
import kafka from '../kafka/kafka'




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
	generatePdf = async (record: Record<string, unknown>) => {

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
        let data = JSON.parse(record.toString())
    
		this.getTemplateHtml().then(async (res) => {
			// Now we have the html code of our template in res object
			// you can check by logging it on console
			console.log("Compiling the template with handlebars")
			const template = hb.compile(res, { strict: true })
			// we have compile our code with handlebars
			const result = template(data)
			// We can use this to add dyamic data to the handlebars template at run time from database or API as per need.
			const html = result;
			// we are using headless mode
			const browser = await puppeteer.launch()
			const page = await browser.newPage()
			// We set the page content as the generated html by handlebars
			await page.setContent(html)
			// We use pdf function to generate the pdf in the same folder as this file.
			await page.pdf({ path: 'invoice.pdf', format: 'a4' })
            //generating a filename
            const fileName = this.generateFileName()
            //uploading the file to s3
            this.uploadFile(fileName, 'invoice.pdf')
            //deleting the temp file 
            console.log(2)
            fs.unlinkSync('invoice.pdf')
			await browser.close();
            //producing a kafka topic that the pdf has been generated
            this.pdfReady(fileName, data.load)

		}).catch(err => {
            console.log(err)
		});
	}

    pdfReady = async(fileName: string, loadId: number) => {
        let producer = kafka.producer()

        try{
            let newData = {
                load_id: loadId,
                pdf_file_path: fileName,
            }
            await producer.connect()
            await producer.send({
                topic: 'carhaul.rate-agreements.json.pdf-ready',
                messages: [
                    { 
                      key: 'key1', 
                      value: JSON.stringify(newData).toString(),
                      partition: 0 
                    }
                ],
            })

            } catch (error) {
                console.error('Producer Error: ', error)
            }    
        }

    uploadFile = async (fileName: string, filePath: string) => {
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_KEY,
            secretAccessKey: process.env.AWS_S3_SECRET,
        });

        //reading the file
        const fileContent = fs.readFileSync(filePath)
        // Setting up S3 upload parameters
        const params = {
            Bucket: 'rate-agreement-pdf',
            Key: fileName, // File name you want to save as in S3
            Body: fileContent,
            ACL:'public-read'
        };
        //uploading the file to S3
        s3.upload(params, {}, function(err, data) {
            if (err) {
                console.log(err)
            }
            console.log('File uploaded successfully')

        });
    } 

    generateFileName = () => {
        return uuidv4() + '.pdf'
    }

}

