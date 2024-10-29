import React, { useState, useEffect } from 'react';
import './Content.css';
import { useCards } from '../App';
import Card from './Card';
import DeckCard from './DeckCard';

export default function Deck() {

    const { cardsVault, deck } = useCards();

    return (
        <div className='Deck'>
            <div className='DeckCards'>
                {Object.keys(deck).filter((id) => deck[id].count > 0).map((key) => (
                    <DeckCard
                        cardId={cardsVault[key].id}
                    />
                ))}
            </div>
        </div>
    );
}