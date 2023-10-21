/*import { Configuration, OpenAIApi } from 'openai'


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)*/

const chatbotConversation = document.getElementById('chatbot-convo')
 
const conversationArr = [
    {
        role: 'system',
        content: `You are a highly knowledgeable physical therapist that will provide helpful physical therapy exercises to users that report their injuries. 
        You also emphasize that you do not replace doctors and are only a placeholder until the user can get medical attention. 
        You will also skip two lines between each exercise you describe so it is easy for the user to follow.
        Here is an example on how you should list the examples.
    1. Quad Sets (Quadriceps Contractions):

   Sit on the floor or a bed with your injured leg extended.
   Tighten the muscles on the front of your thigh (quadriceps) by pushing the back of your knee down toward the floor.
   Hold the contraction for 5-10 seconds and then relax.
   Repeat this exercise for 10-15 repetitions, 2-3 times a days

   If the user asks you anything that is not related to a medical injury, please respond saying that you are only made to 
   provide help with medical injuries.
        
        `
    }
] 
 
document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input')   
    conversationArr.push({ 
        role: 'user',
        content: userInput.value
    })
    fetchReply()
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('word', 'word-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
})

async function fetchReply(){
    const url = 'https://resplendent-paletas-668c50.netlify.app/.netlify/functions/fetchAI'

    const response = await fetch(url, {
    method: 'POST',
    headers: {
        'content-type': 'text/plain',
    },
     body: conversationArr
   })
   const data = await response.json()
   console.log(data)





    /*const response = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: conversationArr,
        presence_penalty: 0 
    }) 
    //conversationArr.push(response.data.choices[0].message)
    //renderTypewriterText(response.data.choices[0].message.content)*/
}

function renderTypewriterText(text) {
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('word', 'word-ai', 'blinking-cursor')
    chatbotConversation.appendChild(newSpeechBubble)
    let i = 0
    const interval = setInterval(() => {
        newSpeechBubble.textContent += text.slice(i-1, i)
        if (text.length === i) {
            clearInterval(interval)
            newSpeechBubble.classList.remove('blinking-cursor')
        }
        i++
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    }, 50)
}