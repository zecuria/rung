import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';

import { doMagic } from '../Cards/cards-ui'

const Hand = (props) => {
    const {
        className,
        cards,
        isActive,
        fanDirection = "N",
        width,
        onSelect,
    } = props;

    const [id] = useState(shortid.generate());

    const displayedCards = isActive
        ? cards.map((card) => ({ ...card, display: `${card.rank}${card.suit}` }))
        : cards.map((card) => ({ ...card, display: 'RED_BACK' }));

    useEffect(() => {
        doMagic(id, { fanDirection, isActive, width });
    }, [cards]);

    const handClassNames = classNames(['hand fan ', isActive && 'active-hand']);

    return (
        <div className={className} id={id}>
            <div className={handClassNames}>
                {displayedCards.map(({ display, rank, suit }) => (
                    <img
                        onClick={() => { if (isActive) { onSelect({ rank, suit }) } }}
                        className='card'
                        src={`cards/${display}.svg`}
                    />
                ))}
            </div>
        </div>
    )

}

export default Hand;
