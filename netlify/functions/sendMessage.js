import { Twilio } from "twilio";

const accountSid =process.env.TWILIO_ACCOUNT_SID;
const authToken =process.env.TWILIO_AUTH_TOKEN;
const twilioNumber =process.env.TWILIO_NUMBER;

const twilioClient = new Twilio(accountSid, authToken);

export async function handler(event, context) {
    try {
        const { userName, phoneNumber, newPosition } = JSON.parse(event.body);
        if(!newPosition){
            const message = await twilioClient.messages.create({
                body: `Hello ${userName},\nYour table is ready, please come to the front desk.`,
                from: twilioNumber,
                to: phoneNumber,
            })
        } else{
            const message = await twilioClient.messages.create({
                body: `Hello ${userName},\nYour position in the waitlist has been updated to ${newPosition}.`,
                from: twilioNumber,
                to: phoneNumber,
            })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
