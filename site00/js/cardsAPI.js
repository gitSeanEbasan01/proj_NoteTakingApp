export default class CardsAPI{


    /* 

        Properties for Card

        canvasId: (Id of certain canvas),
        id: (its own id - make a function that scans other ids so that you don't make a duplicate)
        positionX: ""
        positionY: ""
        title: ""
        body: ""
        updated: 


        Steps:

        [X] Deal with making an active canvas.
        [X] Make an Add Card functionality (Add and Delete) and make it so that it's saved in the localStorage.
        [] Assign cards to different canvases.
            [X] When you add a canvas, create another data in the localStorage named "notesapp-canvas-`canvasId`". Deleting the canvas will remove that data as well.
            [X] When you add a card in a canvas, make a way to assign that created card to the current active canvas and save it. Which includes all the properties of the cards.
            [X] Make it so that when you switch to a different canvas, the saved cards inside that canvas will appear. And then disappear when you switch to another.
            [X] Problem: When there's only one canvas left with cards inside and you delete the canvas, the leftover cards will stay and will not disappear. The only way for
                them to disappear is to either delete the cards by double clicking on them or to restart the site.
                [X] With only one canvas left, make it so that when the canvas is finally empty, the rest of the cards will disappear.
            [X] Problem: When there is no canvas and you click the add card button, it will give you an error.
                [X] Make it so that when you have no canvas, you're not able to click to the add card button.
            [X] Temporary thing: when you exit the website, delete some datas in the localStorage.
        [] Saving Active card so that when you change canvas and go back, the last active card is still active.
        [] Adding Main Canvas Feature for default or go to view.
        [] Editing the cards
            [] Select card
            [] Change text and save it
            [] Change position and save it

        ...
        [] Movement of card holder
            [] Panning
            [] Zooming
        [] Options for canvas and cards (renaming, deleting, etc.)
        
    */


    

    static getAllCards() {

        const cards = JSON.parse(localStorage.getItem("notesapp-canvas-cards") || "[]");
        

        return cards;
        
    }


    static saveCards(cardsToSave) {

        const cards = CardsAPI.getAllCards();


        cardsToSave.id = Math.floor(Math.random() * 1000000);
        cardsToSave.updated = new Date().toISOString();
        cards.push(cardsToSave);





        localStorage.setItem("notesapp-canvas-cards", JSON.stringify(cards));
        
    }


    static deleteCards(id) {

        const cards = CardsAPI.getAllCards();

        const emptyCards = cards.filter(card => card.id != id);

        localStorage.setItem("notesapp-canvas-cards", JSON.stringify(emptyCards));


    }


















    static getActiveCanvasData(activeCanvas) {

        const keys = Object.keys(localStorage);

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (key.includes(activeCanvas.id)) {
                const canvasData = JSON.parse(localStorage.getItem(key) || "[]");
                return canvasData;
                break;
            }
        }
        
    }

    static saveCardToCanvas(cardsToSave, activeCanvas) {

        const cardInCanvas = CardsAPI.getActiveCanvasData(activeCanvas);

        cardsToSave.id = Math.floor(Math.random() * 1000000);
        cardsToSave.updated = new Date().toISOString();
        cardInCanvas.push(cardsToSave);



        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(cardInCanvas));
        
    }

    static saveActiveCard(cardsToSave, activeCanvas) {

        const cardInCanvas = CardsAPI.getActiveCanvasData(activeCanvas);
        const selectedCardInCanvas = cardInCanvas.find(card => card.id == cardsToSave.id)
        const existingCardInCanvas = cardInCanvas.filter(card => card.id != cardsToSave.id)


        if (selectedCardInCanvas) {
            selectedCardInCanvas.selected = cardsToSave.selected;
        }

        existingCardInCanvas.forEach((existing => {
            existing.selected = false;
        }));



        

        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(cardInCanvas));
        
    }

    static saveInactiveCard(cardsToDeactivate, activeCanvas) {

        const cardsInCanvas = CardsAPI.getActiveCanvasData(activeCanvas);

        cardsInCanvas.forEach((cards => {
            cards.selected = cardsToDeactivate.selected;
        }));



        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(cardsInCanvas));
        
    }
    


    static deleteCardInCanvas(id, activeCanvas) {

        const cardInCanvas = CardsAPI.getActiveCanvasData(activeCanvas);

        const removeCard = cardInCanvas.filter(card => card.id != id);


        const keys = Object.keys(localStorage);
        let keyName;
        
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(removeCard));


    }
    
    
    
}