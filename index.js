const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

// The verifyKeyMiddleware is a middleware function that can be used to validate keys in Discord messages.
// InteractionResponseType is an enumeration in the discord-interactions npm package that defines 
// the types of responses that can be returned when interacting with a Discord user.
const { verifyKeyMiddleware, InteractionResponseType } = require('discord-interactions')

const ops = {
    mail: async function(){
        console.log(`sending alert mail...`)
        return 
    }
}

// VerifyKeyMiddleware is handling the POST request to the root route ('/')
// Middleware is being passed the PUBLIC_KEY env variable to validate the key,
// Will return false if key is incorrect 
app.post('/', verifyKeyMiddleware(process.env.PUBLIC_KEY), async (req, res) => {
    // The message variable is being set to the request body
    const message = req.body;
    console.log(message)
    // The name property  of the data object is used to determine the command to be executed
    let command = message.data.name
    // the code here calls the ops object passing the command variable as the key
    await ops[command]()

// This will send a response to the client
    return res.send({
        // An enumeration value indicating that the response should be a channel message with source.
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        // The data being sent is the contents string
        data: {
            content: 'Hello there',
        },
    });
});
app.listen(process.env.PORT || 3000)

