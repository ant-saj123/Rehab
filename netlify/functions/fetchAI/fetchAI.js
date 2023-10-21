import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (event) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: event.body,
            presence_penalty: 0 
        });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://rehabeviv.netlify.app',
                'Access-Control-Allow-Headers': 'text/plain',
            },
            body: JSON.stringify({
                reply: response.data,
            }),
        };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: error.toString() };
    }
};

module.exports = { handler };