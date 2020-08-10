/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const suits = ['S', 'C', 'H', 'D']

const getDeck = () => {
    const deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank });
        })
    });

    return deck;
}

export const getShuffledDeck = () => {
    return shuffle(getDeck());
}
const rankSort = {
    'A': '13',
    'K': '12',
    'Q': '11',
    'J': '10',
    '10': '09',
    '9': '08',
    '8': '07',
    '7': '06',
    '6': '05',
    '5': '04',
    '4': '03',
    '3': '02',
    '2': '01'
};

const suitSort = {
    'S': '1',
    'H': '2',
    'C': '3',
    'D': '4'
};

export const compareCards = (cardA, cardB) => {
    const cardAVal = `${suitSort[cardA.suit]}${rankSort[cardA.rank]}`;
    const cardBVal = `${suitSort[cardB.suit]}${rankSort[cardB.rank]}`;

    return cardAVal < cardBVal ? 1 : -1;
}

const suitToDisplay = {
    'H': '♥',
    'D': '♦',
    'C': '♣',
    'S': '♠',
}

export const getDisplaySuit = (suit) => suitToDisplay[suit];
