import React, { useEffect } from 'react';
import './App.css';
import Hand from './Components/Hand';
import Pile from './Components/Pile';
import { useReducerAsync } from 'use-reducer-async';
import reducer, { initialState } from './reducer';
import { getDisplaySuit } from './Cards/cards';

function App() {
  const [state, dispatch] = useReducerAsync(reducer, initialState, {})
  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const { turn, phase, trumpSuit } = state;

  const isRoundOver = phase === 'NEXT_ROUND';
  const activePlayer = !isRoundOver && turn;
  const displayTrumpSuit = getDisplaySuit(trumpSuit);

  return (
    <>
      <h1>Rung</h1>
      <div className="board">
        <div className="nextRound">
          <div>trump suit: {displayTrumpSuit}</div>
          <div>turn: {turn}</div>
          {isRoundOver && <button onClick={() =>dispatch({ type: phase })}>Next round</button>}
        </div>
        <Hand className="player1" onSelect={(card) => dispatch({ type: phase, data: card }) } isActive={activePlayer === 'player1'} cards={state.hands.player1} fanDirection="S" />
        <Hand className="player2" onSelect={(card) => dispatch({ type: phase, data: card }) } isActive={activePlayer === 'player2'} cards={state.hands.player2} fanDirection="W" />
        <div className="pile">
          <Pile className="player1" cards={state.piles.player1} />
          <Pile className="player2" cards={state.piles.player2} />
          <Pile className="player3" cards={state.piles.player3} />
          <Pile className="player4" cards={state.piles.player4} />
        </div>
        <Hand className="player3" onSelect={(card) => dispatch({ type: phase, data: card }) } isActive={activePlayer === 'player3'} cards={state.hands.player3} fanDirection="N" />
        <Hand className="player4" onSelect={(card) => dispatch({ type: phase, data: card }) } isActive={activePlayer === 'player4'} cards={state.hands.player4} fanDirection="E" />
      </div>
    </>
  );
}

export default App;
