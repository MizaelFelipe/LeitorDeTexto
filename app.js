const main = document.querySelector('main')
const bottonInsertText = document.querySelector('.btn-toggle')
const bottonReadText = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const textArea = document.querySelector('textarea')



const humanExpressions = [
    {img: './img/drink.jpg', Text: 'estou com sede buceta' },
    {img: './img/food.jpg', Text: 'me da comida caralho' },
    {img: './img/tired.jpg', Text: 'estou cansado porra' },
    {img: './img/hurt.jpg', Text: 'me derrubaram aqui o' },
    {img: './img/happy.jpg', Text: 'ae porra passei ' },
    {img: './img/angry.jpg', Text: 'tu me deixo puto' },
    {img: './img/sad.jpg', Text: 'agora sou sad boy' },
    {img: './img/scared.jpg', Text: 'que susto porra' },
    {img: './img/outside.jpg', Text: 'me tira daqui' },
    {img: './img/home.jpg', Text: 'quero ir pra casa dormir porra ' },
    {img: './img/school.jpg', Text: 'Me leva para o inferno da escola' },
    {img: './img/grandma.jpg', Text: 'quero ver a velha' },
]

const utterence =new SpeechSynthesisUtterance ()

const setTextMenssage = text => {
    utterence.text = text
}

const speakText = () => {
    speechSynthesis.speak(utterence)
}

const setVoice = event => {
    const selectedvoice = voices.find(voice => voice.name === event.target.value)
    utterence.voice = selectedvoice

}


const createExpressionBox = ({ img, Text }) => {
    const div = document.createElement('div')
    
    div.classList.add('expression-box')
    div.innerHTML = `
    <img src = "${img}" alt="${Text}">
    <p class='info'> ${Text}</p>
    `

    div.addEventListener('click', () => {
        setTextMenssage(Text)
        speakText()

        div.classList.add('active')
        setTimeout(() => {
            div.classList.remove('active')
        }, 1000)
    })

    main.appendChild(div)
}

humanExpressions.forEach(createExpressionBox)

let voices =[]

speechSynthesis.addEventListener('voiceschanged',() => {
    voices = speechSynthesis.getVoices()
    const googleVoice = voices.find(voice =>
         voice.name === 'Google português do Brasil')
    const italianVoice = voices.find(voice =>
         voice.name === 'Google italiano')
  
    
    voices.forEach(({ name , lang }) => {
        const option = document.createElement('option')

        option.value = name 

        if (googleVoice && option.value === googleVoice.name) {
            utterence.voice = googleVoice
            option.selected = true
        } else if (italianVoice && option.value === italianVoice.name) {
            utterence.voice = italianVoice
            option.selected = true
        }

        option.textContent = `${lang} | ${name}`
        
        selectElement.appendChild(option)
    })

    
    
})


bottonInsertText.addEventListener('click',() => {
    divTextBox.classList.add('show')
})

closeDivTextBox.addEventListener('click',() => {
    divTextBox.classList.remove('show')
})

selectElement.addEventListener('change', setVoice)

bottonReadText.addEventListener ('click', () => {
    setTextMenssage(textArea.value)
    speakText()
})