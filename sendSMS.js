require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_TOKEN;

const client = require('./backend/node_modules/twilio')(accountSid, authToken);
const sendSMS = async (body) => {
   let msgOptions = {
     from: process.env.TWILIO_FROM_NUMBER,
     to: process.env.TO_NUMBER,
     body
    }
    try{
      const message = await client.messages.create(msgOptions);
      console.log(message);
    
    }catch (error){
        console.error(error);
    }
}
sendSMS('your delivery will come on 15 min ')