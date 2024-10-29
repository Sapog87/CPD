import ColorStats from "./ColorStats";
import ManaConstStats from "./ManaCostStat";
import "./Widget.css"

export default function Widget({ deck, cards }) {
    return (
        <div className="Stats">
            <ManaConstStats
                deck={deck}
                cards={cards}
            />
            <ColorStats
                deck={deck}
                cards={cards}
            />
        </div>
    );
}