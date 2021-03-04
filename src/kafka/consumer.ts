import kafka from '../kafka/kafka'
import {isNil} from 'lodash'
import PdfController from '../controllers/pdfController'


const consumer = kafka.consumer({ 
    groupId: process.env.KAFKA_GROUP_ID! 
})

const pdf = new PdfController

const consume = async () => {

    try{
        await consumer.connect()

        await consumer.subscribe({
            topic: 'carhaul.rate-agreements.json.create-pdf', 
            fromBeginning: true 
        })
    
        await consumer.run({
            eachMessage: async ({ topic, partition, message } : any) => {

                if(!isNil(topic)){
                    switch (topic) {
                        case 'carhaul.rate-agreements.json.create-pdf':
                            pdf.generatePdf(message.value)
                            break;

                        default:
                            break;
                    }
                }
    
            },
        })
    }catch(error){
        console.log(error)
        try {
            await consumer.disconnect()
        } catch (e) {
            console.error('Failed to gracefully disconnect consumer', e)
        }
        process.exit(1)
    }


}

export default consume