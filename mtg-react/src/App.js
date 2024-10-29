import { createContext, useContext, useState } from 'react';
import './App.css';
import Content from './deck/Content';
import Search from './search/Search';
import Widget from './widget/Widget';

const CardsContext = createContext();

export default function App() {
    const [currentCard, setCurrentCard] = useState(null)
    const [deck, setDeck] = useState([])
    const [cardsVault, setCardsVault] = useState({})
    const [deckChanged, setDeckChanged] = useState(false)
    const [rerender, forceRender] = useState(0);

    return (
        <CardsContext.Provider value={{ cardsVault, currentCard, deck, setCurrentCard, forceRender, rerender }}>
            <div className='Main'>
                <Search />
                <Content />
                <Widget />
            </div>
        </CardsContext.Provider>
    );
}

export const useCards = () => useContext(CardsContext);