(() => {
    'use strict'

let deck =  []
const types = ['C', 'D', 'H', 'S'],
      especials = ['A', 'J', 'Q', 'K']

// Referencias HTML
const get = document.querySelector('#get'), // boton de pedir carta

      stop = document.querySelector('#stop'),
      newGame = document.querySelector('#newGame')

/* acumulador de puntos */
let pointsPlayers = []




/* Referencia al HTML para mostrar las cartas */

const  showCardsPlayers = document.querySelectorAll('.divCards'),
/* Referencia del puntaje en los small del HTML */
       pointsHTML = document.querySelectorAll('small')

// Función para iniciar el juego

const initializeGame = (numPlayers = 2) => {
    deck = createDeck()
    for(let i = 0; i < numPlayers;i++) { // se crea el arreglo que define el número de jugadores
        pointsPlayers.push(0)
    }
    
    pointsHTML.forEach(elem => elem.innerText = 0) // devuelve a 0 el valor 
    showCardsPlayers.forEach(elem => elem.innerHTML = '') // borra las cartas previas
    get.disabled = false
    stop.disabled = false
}

const createDeck = () => {
    deck = []
    pointsPlayers = []
    for(let i=2; i<=10; i++) {
        for(let type of types) {
            deck.push(`${i}${type}`)
        }
    }

    for(let type of types) {
        for(let esp of especials) {
            deck.push(`${esp}${type}`)
        }
    }
    return _.shuffle(deck)
}

/* Esta función permite pedir una carta */
const getCard = () => deck.length === 0 ? console.warn('No hay cartas en el Deck') : deck.shift()

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1)
    // let points = 0
    return isNaN(value) ? (value === 'A' ? 11 : 10) : value*1/* Number(value) */
    
}

// turn: 0 será el primer jugador y la computadora siempre será el último. 
const pointsAccumulator = (card, turn) => {
    pointsPlayers[turn] += cardValue(card)
    pointsHTML[turn].innerText = pointsPlayers[turn]
    return pointsPlayers[turn]
}

const createCard = (card, turn) => {
    const imgCard = document.createElement('img')
        imgCard.src = `assets/cartas/${card}.png`
        imgCard.classList.add('carta')
        showCardsPlayers[turn].append(imgCard) // buscara dentro del array la posición para colocar la carta
}

// Función para determinar el ganador del juego
const determineWinner = () => {
    const [minimunPoints, pointsComputer] = pointsPlayers // desestructuracion de objetos
    setTimeout(() => {
        if(pointsComputer === minimunPoints) {
            alert('Nadie gana')
        } else if (minimunPoints > 21 || ((pointsComputer <= 21) && (pointsComputer > minimunPoints))) {
            alert('La computadora gana')
        } else if(pointsComputer > 21) {
            alert('Genial, has ganado')
        }
    }, 100);
}

/* turno de la computadora */
const turnComputer = (minimunPoints) => {
    let pointsComputer = 0
    do {
        const card = getCard()
        pointsComputer = pointsAccumulator(card, pointsPlayers.length - 1) // puesto que es el turno de la computadora, su posición en el array es el último
        createCard(card, pointsPlayers.length - 1)
        
        if(minimunPoints > 21) {
            stop.disabled = true
            break
        }
    }while((pointsComputer < minimunPoints) && (minimunPoints  <= 21))
    determineWinner()
}

get.addEventListener('click', () => {
    const card = getCard() // pido carta invocando la funcion de pedir carta
    const pointsPlayer = pointsAccumulator(card, 0) // los puntos del jugador serán igual a lo que devuelva la funcion pointsAccumulator()

    /* Insertar imagen de carta en el HTML */
    createCard(card, 0)
    
    if(pointsPlayer > 21) {
        get.disabled = true
        stop.disabled = true
        turnComputer(pointsPlayer)
    } else if(pointsPlayer === 21) {
        get.disabled = true
        stop.disabled = true
        turnComputer(pointsPlayer)
    }
})

stop.addEventListener('click', () => {
    get.disabled = true
    stop.disabled = true
    turnComputer(pointsPlayers[0])
})

newGame.addEventListener('click', () => {
    initializeGame()
})

    /* return {
        
    }
    lo que yo coloque aquí será publico y se podrá ver desde afuera del módulo */

})()







