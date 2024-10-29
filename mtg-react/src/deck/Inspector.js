import React, { useState, useEffect, useReducer } from 'react';
import './Content.css';
import Card from './Card';
import { useCards } from '../App';

export default function Inspector() {
    const { cardsVault, currentCard, deck, forceRender } = useCards();
    const [card, setCard] = useState(null)

    useEffect(() => {
        setCard(cardsVault[currentCard]);
    }, [currentCard])

    const handleAddButton = () => {
        if (!deck[card.id]) {
            deck[card.id] = { "count": 1 }
        }
        else if (cardsVault[card.id].type.includes('Land') || parseInt(deck[card.id].count) < 4) {
            deck[card.id] = { "count": deck[card.id].count + 1 }
        }
        forceRender((count) => count + 1);
    }

    return (
        <div className='Inspector'>
            {card &&
                <div>
                    <Card
                        card={card}
                    />
                    <button onClick={handleAddButton}>Add</button>
                </div>
            }
        </div>
    );
}