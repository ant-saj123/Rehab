import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (event) => {
    try {
        const requestData = JSON.parse(event.body); // Parse the JSON data from the request body
        const conversationArr = requestData.messages;

        // Call the OpenAI API with the parsed conversationArr
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: conversationArr,
            presence_penalty: 0,
        });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://rehabeviv.netlify.app',
                'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
            },
            body: JSON.stringify({
                reply: response.data.choices[0].message.content, // Extract content from the API response
            }),
        };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: error.toString() };
    }
};

module.exports = { handler };