import { Twilio } from "twilio";

const accountSid =process.env.TWILIO_ACCOUNT_SID;
const authToken =process.env.TWILIO_AUTH_TOKEN;
const twilioNumber =process.env.TWILIO_NUMBER;

const twilioClient = new Twilio(accountSid, authToken);

export async function handler(event, context) {
    try {
        const { userName, phoneNumber } = JSON.parse(event.body);

        const message = await twilioClient.messages.create({
            body: `Hello ${userName},\nYour table is ready, please come to the front desk.`,
            from: twilioNumber,
            to: phoneNumber,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ messageSid: message.sid }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
