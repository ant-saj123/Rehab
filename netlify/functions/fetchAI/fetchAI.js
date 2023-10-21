import { Configuration, OpenAIApi } from 'openai'


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)
const handler = async (event) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: event.body,
      presence_penalty: 0 
  }) 
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({

        reply: response.data 
      }),
     
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }