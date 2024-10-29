import './Content.css';
import Deck from './Deck';
import Inspector from './Inspector';

export default function Content({ currentCard, deck, cards }) {

    return (
        <div className="Content">
            <Deck
                deck={deck}
                cards={cards}
            />
            <Inspector
                currentCard={currentCard}
                deck={deck}
                cards={cards}
            />
        </div>
    );
}