import {Mtg} from "./api/mtg";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";
import './helpers/helper'

document.addEventListener("DOMContentLoaded", setup)

function setup() {
    const mtg = new Mtg();
    page = 1
    pageSzie = 100
    end = false
    cardss = {}

    document.getElementById('searchField').value = ""
    const menu = document.getElementById('listContainer');
    let list = document.createElement('ul');
    const deck = document.getElementById('deckCards');
    const cardInspector = document.getElementById('cardInspector');

    deckMap = {}

    const colorStats = new ColorStats()
    const manaCostStats = new ManaCostStats()

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

        card = buildCard(cardss[currentValue.innerText])
        const button = document.createElement('button');
        button.innerHTML = 'Добавить в колоду';
        button.onclick = addToDeck

        const cardContainer = document.createElement('div')
        cardContainer.appendChild(card)
        cardContainer.appendChild(button);

        cardInspector.innerHTML = ''
        cardInspector.appendChild(cardContainer)
    }

    function buildCard(card){
        const cardElement = document.createElement('div');
        cardElement.setAttribute("id", "card")
        cardElement.className = "card"

        const id = document.createElement('div')
        id.hidden = true
        id.innerText = card.id
        cardElement.appendChild(id)
            
        const img = document.createElement('img');
        img.src = card.imageUrl;
        img.alt = card.name;
        cardElement.appendChild(img);

        const title = document.createElement('h1');
        title.textContent = card.name;
        cardElement.appendChild(title);

        if (card.manaCost){
            const manaCost = document.createElement('p');
            manaCost.innerHTML = `<strong>Mana Cost:</strong> <span class="mana-cost">${card.manaCost}</span>`;
            cardElement.appendChild(manaCost);
        }

        if (card.cmc){
            const cmc = document.createElement('p');
            cmc.innerHTML = `<strong>Converted Mana Cost:</strong> ${card.cmc}`;
            cardElement.appendChild(cmc);
        }

        if (card.colorIdentity){
            const colors = document.createElement('p');
            colors.innerHTML = `<strong>Colors:</strong> ${card.colorIdentity.join(', ')}`;
            cardElement.appendChild(colors);
        }
        
        const type = document.createElement('p');
        type.innerHTML = `<strong>Type:</strong> ${card.type}`;
        cardElement.appendChild(type);

        if (card.text){
            const text = document.createElement('p');
            text.innerHTML = `<strong>Card Text:</strong> ${card.text.replace(/\n/g, '<br>')}`;
            cardElement.appendChild(text);
        }else if (card.originalText){
            const text = document.createElement('p');
            text.innerHTML = `<strong>Card Orinal Text:</strong> ${card.originalText.replace(/\n/g, '<br>')}`;
            cardElement.appendChild(text);
        }

        const rarity = document.createElement('p');
        rarity.innerHTML = `<strong>Rarity:</strong> <span class="rarity">${card.rarity}</span>`;
        cardElement.appendChild(rarity);

        return cardElement
    }

    function addToDeck(){
        const card = document.getElementById('card');
        const id = card.getElementsByTagName('div')[0].innerText;
        const cardd = document.getElementById(id)
        if (cardd == null){
            deckMap[id] = {"count" : 1}
            const t = buildCard(cardss[id])
            t.setAttribute('id', id)
            const count = document.createElement('div');
            count.className = 'count'
            count.innerText = 1
            t.appendChild(count)
            const button = document.createElement('button')
            button.innerText = 'Удалить'
            button.onclick = deleteCardFromDeck
            t.appendChild(button)
            deck.appendChild(t)
            colorStats.buildStats(document.getElementById("colorStats"), deckMap, cardss);
            manaCostStats.buildStats(document.getElementById("manaStats"), deckMap, cardss);
        }
        else {
            const c = cardd.getElementsByClassName('count')[0];
            if (cardss[id].type.includes('Land') || parseInt(c.innerText) < 4) {
                c.innerText = parseInt(c.innerText) + 1;
                deckMap[id] = {"count" : deckMap[id].count + 1}
                colorStats.buildStats(document.getElementById("colorStats"), deckMap, cardss);
                manaCostStats.buildStats(document.getElementById("manaStats"), deckMap, cardss);
            }
        }
    }

    function deleteCardFromDeck(event){
        const parent = event.target.parentElement;
        const id = parent.getElementsByTagName('div')[0].innerText;
        const c = parent.getElementsByClassName('count')[0];
        if (parseInt(c.innerText) == 1) {
            parent.remove();
            deckMap[id] = {"count" : 0}
        }
        else{
            c.innerText = parseInt(c.innerText) - 1;
            deckMap[id] = {"count" : deckMap[id].count - 1}
        }
        colorStats.buildStats(document.getElementById("colorStats"), deckMap, cardss);
        manaCostStats.buildStats(document.getElementById("manaStats"), deckMap, cardss);
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
        })
}
