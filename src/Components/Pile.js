import React, { useEffect, useState } from 'react';
import shortid from 'shortid';

import { doMagic } from '../Cards/cards-ui'

const Pile = (props) => {
    const {
        className,
        cards,
        isFlipped,
        fanDirection = "N",
        width,
    } = props;

    const [id] = useState(shortid.generate());

    const displayedCards = isFlipped ? cards.map(() => 'RED_BACK') : cards;

    useEffect(() => {
        doMagic(id, { fanDirection, spacing: 0, width });
    }, [cards]);

    return (
        <div className={className} id={id}>
            <div className="hand fan">
                {displayedCards.map(({suit, rank}) => (
                    <img className='card' src={`cards/${rank}${suit}.svg`} />
                ))}
            </div>
        </div>
    )

}

export default Pile;