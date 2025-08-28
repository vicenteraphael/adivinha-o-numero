//Raphael e Lucas Novais
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form')
    const output = document.getElementById('output')
    const counter = document.getElementById('counter')
    const attempted = document.getElementById('attempted')
    const limit = 100
    let number, history, mark, lastingAttempts

    const updateScreen = () => {
        counter.textContent = "Número de tentativas: " + lastingAttempts
        attempted.textContent = "Palpites anteriores: " + history.join(', ')
    }

    const start = () => {
        document.getElementById("start-game").innerHTML = `
            <h1>Adivinhe o número</h1>
            <button id="start">Começar</button>
        `
        document.getElementById("start").addEventListener('click', () => {
            document.getElementById("start-game").innerHTML = ``
            initialize()
        })
    }

    const restart = () => {
        form.innerHTML = ``
        document.getElementById("restart-game").innerHTML = `
            <button id="restart">Recomeçar</button>
        `
        document.getElementById("restart").addEventListener('click', () => {
            document.getElementById("restart-game").innerHTML = ``
            initialize()
        })
    }

    const initialize = () => {
        number = parseInt(Math.random() * limit)
        history = []
        mark = new Array(101).fill(false)
        lastingAttempts = 10
        form.innerHTML = `
            <label for="number">Digite um número entre 1 e 100 (incluso)</label><br><br>
            <input type="number" id="number">
            <button id="button" type="submit">Enviar</button>
        `
        updateScreen()
    }

    const isValid = (number) => 1 <= number && number <= limit

    const isMarked = (number) => mark[number]

    form.addEventListener('submit', function(event) {
        event.preventDefault() 

        let win = false, lose = false
        let input = Number(document.getElementById("number").value)

        if (isMarked(input)) {
            output.textContent = "Você já escolheu esse número!"
            return
        } 
    
        if (!isValid(input)) {
            output.textContent = "Número inválido!"
            return
        } 

        --lastingAttempts
        mark[input] = true

        if (input === number) {
            output.textContent = "Acertou, o número era: " + number
            win = true
        }
        else if (input < number) output.textContent = "Muito baixo"
        else output.textContent = "Muito Alto"
        if (lastingAttempts === 0) {
            output.textContent = "Você perdeu! O número era: " + number
            lose = true
        }

        history.push(input)
        updateScreen()

        if (win || lose) restart()

        form.reset()
    })

    start()
})