import { getShuffledDeck, compareCards } from "./Cards/cards";

export const initialState = {
    deck: [],
    trumpSuit: '',
    phase: 'CHOOSE_TRUMP_SUIT',
    turn: 'player1',
    hands: {
        player1: [],
        player2: [],
        player3: [],
        player4: []
    },
    piles: {
        player1: [],
        player2: [],
        player3: [],
        player4: [],
    },
    points: {
        unclaimed: 0,
        team1: 0,
        team2: 0
    }
};

const resetGame = () => {
    const deck = getShuffledDeck();

    const hands = {
        player1: deck.slice(0, 5).sort(compareCards),
        player2: deck.slice(5, 10).sort(compareCards),
        player3: deck.slice(10, 15).sort(compareCards),
        player4: deck.slice(15, 20).sort(compareCards),
    }

    return {
        ...initialState,
        deck: deck.splice(20, deck.length),
        hands,
    }
}

const chooseTrumpSuit = ({ suit }, state) => {
    const { deck, hands } = state;

    const updatedHands = {
        player1: [...hands.player1, ...deck.slice(0, 8)].sort(compareCards),
        player2: [...hands.player2, ...deck.slice(8, 16)].sort(compareCards),
        player3: [...hands.player3, ...deck.slice(16, 24)].sort(compareCards),
        player4: [...hands.player4, ...deck.slice(24, 32)].sort(compareCards),
    }

    return {
        ...state,
        phase: 'MAKE_MOVE',
        trumpSuit: suit,
        deck: [],
        hands: updatedHands
    }
}

const nextPlayerMapping = {
    player1: 'player2',
    player2: 'player3',
    player3: 'player4',
    player4: 'player1',
};

const makeMove = (card, state) => {
    const { turn, hands, piles, phase } = state;

    const updatedHand = hands[turn].filter(({ suit, rank }) => !(suit === card.suit && rank === card.rank))
    const updatedHands = {
        ...hands,
        [turn]: updatedHand
    };

    const updatedPiles = {
        ...piles,
        [turn]: [...piles[turn], card],
    }

    const isRoundOver = Object.values(updatedPiles).filter(([item]) => item).length === 4;

    const newTurn = nextPlayerMapping[turn];

    return {
        ...state,
        phase: isRoundOver ? 'NEXT_ROUND' : phase,
        hands: updatedHands,
        turn: newTurn,
        piles: updatedPiles
    }
}

const nextRound = (state) => ({
    ...state,
    phase: 'MAKE_MOVE',
    piles: {
        player1: [],
        player2: [],
        player3: [],
        player4: [],
    },
    points: {
        ...state.points,
        unclaimed: state.points.unclaimed + 1
    }
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET':
            return resetGame();
        case 'CHOOSE_TRUMP_SUIT':
            return chooseTrumpSuit(action.data, state);
        case 'MAKE_MOVE':
            return makeMove(action.data, state);
        case 'NEXT_ROUND':
            return nextRound(state);
        default:
            return state;
    }
}

export default reducer;