import Card from "./Card";
import { useCards } from '../App';

export default function DeckCard({ cardId }) {
    const { cardsVault, deck, forceRender } = useCards();

    const handleCardDelete = () => {
        if (parseInt(deck[cardId].count) == 1) {
            deck[cardId] = {"count" : 0}
        }
        else{
            deck[cardId] = {"count" : deck[cardId].count - 1}
        }
        forceRender((count) => count + 1);
    }

    return (
        <div>
            <Card
                card={cardsVault[cardId]}
            />
            <p>Count: {deck[cardId].count}</p>
            <button onClick={handleCardDelete}>Delete</button>
        </div>
    );
}