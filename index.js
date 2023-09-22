//declare variables
let deck = []
let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

//get html elements into javascript
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let cardsEl = document.getElementById("cards-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let playerEl = document.getElementById("player-el")
let titleEl = document.getElementById("title-el")

function getRandomCard() {
    let cardIndex = Math.floor( Math.random() * deck.length )
    let randomCard = deck[cardIndex]
    deck.splice(cardIndex, 1)
    if (randomCard > 10) {
        return 10
    } else if (randomCard === 1) {
        return 11
    } else {
        return randomCard
    }
}

function startGame() {
    sum = 0
    dealerSum = 0
    //create deck of cards
    createDeck()
    
    //reset stats
    isAlive = true
    hasBlackJack = false
    
    //assign player cards
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    updateSum()
    
    //assign dealer card
    let firstDealerCard = getRandomCard()
    dealerCards = [firstDealerCard]
    updateDealerSum()
    
    renderGame()
}

function createDeck() {
    deck = []
    for (var i =1; i < 14; i++) {
        for (var j = 0; j < 4; j++) {
            deck.push(i)
        }
    }
}

function renderGame() {
    //update player card display
    //update() cards
    
    //update dealer card display
    updateDealerCards()
    
    //check sum
    //updateSum()
    dealerSumEl.textContent = "Sum: " + dealerSum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        hasBlackJack = true
        dealerTurn()
    } else if (cards.findIndex(findAce) == -1) {    
        message = "You're out of the game!"
        isAlive = false
    } else {  
        cards.splice(cards.findIndex(findAce), 1, 1)
    }
    
    //update cards element
    updateCards()
    //update sum and sum element
    updateSum()
    updateDealerSum()
    
    //update message
    messageEl.textContent = message
}

function findAce(cardNumber) {
    return cardNumber == 11
}

function updateCards() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
}

function updateDealerCards() {
    dealerCardsEl.textContent = "Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
}

function updateSum() {
    sum = 0
    for (let i = 0; i < cards.length; i++) {
        sum += cards[i]
    }
    sumEl.textContent ="Sum: " + sum
}

function updateDealerSum() {
    dealerSum = 0
    for (let i = 0; i < dealerCards.length; i++) {
        dealerSum += dealerCards[i]
    }
    dealerSumEl.textContent = "Sum: " + dealerSum
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        cards.push(card)
        updateSum()
        renderGame()        
    }
}

function dealerTurn() {
    isAlive = false
    
    //dealer AI
    while (dealerSum <= 16) {
        let card = getRandomCard()
        dealerCards.push(card)
        updateDealerSum()
        //check for aces
        if (dealerSum > 21 && dealerCards.findIndex(findAce) != -1) {
            dealerCards.splice(cards.findIndex(findAce), 1, 1)
            updateDealerSum()
        }
        renderGame()
    }
    
    //check result
    if (dealerSum > 21) {
        message = "Dealer busts, Player wins!"
    } else if (sum > dealerSum) {
        message = "Player wins!"
    } else if (sum == dealerSum) {
        message = "Push."
    } else if (sum < dealerSum) {
        message = "Dealer wins!"
    }
    messageEl.textContent = message
}