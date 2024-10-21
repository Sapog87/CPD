import {Mtg} from "./api/mtg";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";

document.addEventListener("DOMContentLoaded", setup)

function setup() {
    const mtg = new Mtg();
    page = 1
    pageSzie = 100
    end = false
    cardss = new Map();

    document.getElementById('searchField').value = ""
    const menu = document.getElementById('listContainer');
    let list = document.createElement('ul');
    const deck = document.getElementById('deck');
    const cardInspector = document.getElementById('cardInspector');

    document.getElementById("searchButton").onclick = onSearchButtonClick
    document.getElementById("listButton").onclick = onNextButtonClick

    function onSearchButtonClick(){
        page = 1;
        end = false;
        mtg.loadCards(page, pageSzie, document.getElementById('searchField').value)
            .then((cards) => {
                if (cards.length < pageSzie)
                    end = true;
                list = document.createElement('ul');
                cards.forEach(card => {
                    cardss[card.id] = card
                    const listItem = document.createElement('li');
                    const id = document.createElement('div')
                    id.hidden = true
                    id.innerText = card.id
                    listItem.onclick = onCardClick
                    listItem.innerHTML = card.name;
                    listItem.appendChild(id)
                    list.appendChild(listItem)
                })
                menu.innerHTML = ''
                menu.appendChild(list);
            })
    }

    function onNextButtonClick(){
        page += 1;
        if (end)
            return;
        mtg.loadCards(page, pageSzie, document.getElementById('searchField').value)
            .then((cards) => {
                if (cards.length < pageSzie)
                    end = true;
                fragment = document.createDocumentFragment();
                cards.forEach(card => {
                    cardss[card.id] = card
                    const listItem = document.createElement('li');
                    const id = document.createElement('div')
                    id.hidden = true
                    id.innerText = card.id
                    listItem.onclick = onCardClick
                    listItem.innerHTML = card.name;
                    listItem.appendChild(id)
                    fragment.appendChild(listItem)
                })
                list.appendChild(fragment);
            })
    }

    function onCardClick(event){
        const currentValue = event.target.getElementsByTagName('div')[0];
        alert(cardss[currentValue.innerText].id)
        cardInspector.innerHTML = ''
        cardInspector.appendChild()
    }
    
    mtg.loadCards()
        .then((cards) => {
            cards.forEach(card => {
                cardss[card.id] = card
                const listItem = document.createElement('li');
                const id = document.createElement('div')
                id.hidden = true
                id.innerText = card.id
                listItem.onclick = onCardClick
                listItem.innerHTML = card.name;
                listItem.appendChild(id)
                list.appendChild(listItem)
            })
            menu.innerHTML = ''
            menu.appendChild(list);

            new ColorStats().buildStats(document.getElementById("colorStats"));
            new ManaCostStats().buildStats(document.getElementById("manaStats"));

        })
}
