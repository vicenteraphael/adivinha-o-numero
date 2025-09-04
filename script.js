//Raphael e Lucas Novais
document.addEventListener('DOMContentLoaded', () => {

    const gameArea = document.getElementById('gameArea')
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
        gameArea.style.display = "flex"
        form.style.display = "block"
        output.textContent = "", attempted.textContent = ""
        number = parseInt(Math.random() * maxLimit)
        history = []
        mark = new Array(100).fill(false)
        lastingAttempts = 10
        updateScreen()
    }

    const start = () => {
        gameArea.style.display = "none"
        document.getElementById("start-game").style.display = "block"
        document.getElementById("start").addEventListener('click', () => {
            document.getElementById("start-game").style.display = "none"
            initialize()
        })
    }

    document.getElementById("restart").addEventListener('click', () => {
        initialize()
    })

    const restart = () => {
        form.style.display = "none"
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