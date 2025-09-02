//Raphael e Lucas Novais
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form')
    const output = document.getElementById('output')
    const counter = document.getElementById('counter')
    const attempted = document.getElementById('attempted')
    const minLimit = 1, maxLimit = 20
    let number, lastingAttempts, history, mark

    const createConfetti = () => {
        const colors = ['#FF0', '#F00', '#00F', '#0F0', '#F0F', '#0FF'];
        const totalConfetti = 100;
        
        for (let i = 0; i < totalConfetti; i++) {
            const confetto = document.createElement('div');
            confetto.style.position = 'absolute';
            confetto.style.width = '10px';
            confetto.style.height = '10px';
            confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetto.style.borderRadius = '50%';
            confetto.style.top = `${Math.random() * window.innerHeight}px`;
            confetto.style.left = `${Math.random() * window.innerWidth}px`;
            confetto.style.animation = `fall ${Math.random() * 3 + 3}s linear infinite`;
            document.body.appendChild(confetto);
            
            setTimeout(() => {
                confetto.remove();
            }, 3000);
        }
    };

    const updateScreen = () => {
        counter.textContent = "Tentativas: " + lastingAttempts + "/10"
        if (history.length > 0) attempted.textContent = "Palpites anteriores: " + history.join(', ')
    }

    const initialize = () => {
        output.textContent = "", attempted.textContent = ""
        number = parseInt(Math.random() * maxLimit)
        history = []
        mark = new Array(100).fill(false)
        lastingAttempts = 10
        form.innerHTML = `
            <label for="number">Digite um número entre 1 e 20 (incluso)</label><br><br>
            <input type="number" id="number">
            <button id="button" type="submit">Enviar</button>
        `
        updateScreen()
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

    const isValid = (input) => minLimit <= input && input <= maxLimit

    const isMarked = (input) => mark[input]

    const checkAttempt = (input) => {
        if (input === number) {
            output.textContent = "Acertou! o número era: " + number
            createConfetti();
            return true
        }
        else if (input < number) output.textContent = "Muito baixo"
        else output.textContent = "Muito Alto"
        if (lastingAttempts === 0) {
            output.textContent = "Você perdeu! O número era: " + number
            return true
        }
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault() 
        
        let input, winOrLose

        input = Number(document.getElementById("number").value)

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

        winOrLose = checkAttempt(input)

        history.push(input)

        updateScreen()

        if (winOrLose) restart()

        form.reset()
    })
    start()
})