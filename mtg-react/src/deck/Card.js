import React, { useState, useEffect } from 'react';
import './Content.css';

export default function Card({ card }) {


    return (
        <div className="Card">
            <div hidden>{card.id}</div>
            <img src={card.imageUrl}/>
            <h1>{card.name}</h1>

            {card.manaCost && (
                <p>
                    <strong>Mana Cost:</strong> <span className="Mana-cost">{card.manaCost}</span>
                </p>
            )}

            {card.cmc && (
                <p>
                    <strong>Converted Mana Cost: </strong> {card.cmc}
                </p>
            )}

            {card.colorIdentity && (
                <p>
                    <strong>Colors:</strong> {card.colorIdentity.join(', ')}
                </p>
            )}

            <p>
                <strong>Type:</strong> {card.type}
            </p>

            {card.text && (
                <p>
                    <strong>Card Text:</strong> {card.text.split('\n').map((line, index) => (
                        <span key={index}>{line}<br /></span>
                    ))}
                </p>
            )}
            {!card.text && card.originalText && (
                <p>
                    <strong>Card Original Text:</strong> {card.originalText.split('\n').map((line, index) => (
                        <span key={index}>{line}<br /></span>
                    ))}
                </p>
            )}

            <p>
                <strong>Rarity:</strong> <span className="Rarity">{card.rarity}</span>
            </p>
        </div>
    );
}