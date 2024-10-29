import React, { useState, useEffect } from 'react';
import "./Search.css"
import { useCards } from '../App';

export default function Search() {
    const baseUrl = "https://api.magicthegathering.io/v1/"

    const { cardsVault, setCurrentCard } = useCards();

    const [inputValue, setInputValue] = useState('');
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [end, setEnd] = useState(false)
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(inputValue);
            setPage(1);
            setEnd(false);
        }, 500);

        return () => clearTimeout(timerId);
    }, [inputValue]);

    useEffect(() => {
        if (!end) {
            fetch(`${baseUrl}cards?${new URLSearchParams({ page: page, name: debouncedValue, pageSize: 100 }).toString()}`)
                .then((response) => response.json())
                .then((json) => {
                    if (page === 1)
                        setCards(json.cards)
                    else
                        setCards(cards.concat(json.cards))
                    if (json.cards.length < 100)
                        setEnd(true)
                    json.cards.forEach(card => {
                        cardsVault[card.id] = card;
                    })
                })
                .catch((error) => console.error('There was a problem with the fetch operation:', error));
        }
    }, [debouncedValue, page]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleNextButton = () => {
        setPage(page + 1);
    }

    const handleItemClick = (event) => {
        const id = event.target.getElementsByTagName('div')[0].innerText;
        setCurrentCard(id);
    }

    return (
        <div className='Menu'>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search"
            />

            {cards &&
                <ul>
                    {cards.map((card) => (
                        <li key={card.id} onClick={handleItemClick}>
                            <div hidden>{card.id}</div>
                            {card.name}
                        </li>
                    ))}
                </ul>
            }

            <p><button
                onClick={handleNextButton}
            >Next</button></p>
        </div>
    );
}