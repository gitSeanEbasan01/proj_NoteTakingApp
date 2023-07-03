export default class CardsAPI{


    /* 

        Plans:

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
        [X] Saving Active card so that when you change canvas and go back, the last active card is still active.
        [X] Editing the cards
            [X] Select card
            [X] Change position and save it
            [X] When card is moving, change the cursor to drag.
            [X] When you drag or select a card, it will be placed on top of other cards to know which is the focus.
        [] Card Preview Edit
            [X] Open preview.
            [X] Fix the text format of the card (CSS)
            [X] Disable pointer events of card preview when hovering a card
            [X] Change text, save, and display on card
            [] Make it draggable
            [] Make it resizable
            [] when you double click on the edge, it increases size and can be dragged but cannot be resized.
            [] ...Plan on what to make for the card preview.
            [X] ...Look up how text linking works.
        [] Change Adding card
            [] When double clicking on canvas preview, add a card with the mouse position as the position of the added card.
            [] When clicking on the add card button, instead of creating a card in a random position, make an indicator follow the mouse pointer and when clicked again, it creates a card in mouse position.
        [] Adding Main Canvas Feature for default or go to view.
        [] Canvas list animation.
        [] Options for canvas and cards (renaming, deleting, etc.)
        {} Problem
            [X] When the canvas is empty from deleting all of the cards, you're not able to click on the addCard button. Fix this.
            [] When you delete a canvas that has no any other selected canvas, it gives an error. Fix this.
        {} IMPORTANT: Finish in the Week
            [X] Review Code.. Add Notes
            [X] Card Preview Edit
                [X] Make it draggable.
                [] Fix some bugs.
            [] Movement of card holder
                [] Panning
                [] Zooming
            [X] Renaming of Canvas
                [X] Changing Canvas title
            [X] Profile Picture
                [X] Change Photo
                [X] Change Name
            [] Short Tutorial
            [X] Toggle Side panel button
            [] Media Query
                [] For mobile users.
        
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

            if (!key.includes('prev') && key.includes(activeCanvas.id)) {
                const canvasData = JSON.parse(localStorage.getItem(key) || "[]");
                return canvasData.sort((a, b) => {
                    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
                });
                break;
            }
        }
        
    }
    static saveCardToCanvas(cardsToSave, activeCanvas) {
        
        const cardInCanvas = CardsAPI.getActiveCanvasData(activeCanvas);
        const existing = cardInCanvas.find(card => card.id == cardsToSave.id);
        
        if (existing) {
            existing.title = cardsToSave.title;
            existing.body = cardsToSave.body;
            existing.updated = new Date().toISOString();
        }else {
            cardsToSave.id = Math.floor(Math.random() * 1000000);
            cardsToSave.updated = new Date().toISOString();
            cardInCanvas.push(cardsToSave);
        }

        
        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (!key.includes('prev') && key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(cardInCanvas));
        
    }

    static saveChildCardToCanvas(cardsToSave, activeCanvas) {

        const cardInCanvas = CardsAPI.getActiveCanvasData(activeCanvas);


        cardsToSave.updated = new Date().toISOString();
        cardInCanvas.push(cardsToSave);
        

        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (!key.includes('prev') && key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(cardInCanvas));
        
    }









    static saveActiveCard(cardsToSave, activeCanvas, dragged) {

        const cardInCanvas = CardsAPI.getActiveCanvasData(activeCanvas);
        const selectedCardInCanvas = cardInCanvas.find(card => card.id == cardsToSave.id)
        const existingCardInCanvas = cardInCanvas.filter(card => card.id != cardsToSave.id)


        if (selectedCardInCanvas && dragged == false) {
            selectedCardInCanvas.selected = cardsToSave.selected;
            selectedCardInCanvas.updated = new Date().toISOString();
        } else if (selectedCardInCanvas && dragged == true) {
            selectedCardInCanvas.selected = cardsToSave.selected;
        }

        existingCardInCanvas.forEach((existing => {
            existing.selected = false;
        }));





        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (!key.includes('prev') && key.includes(activeCanvas.id)) {
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

            if (!key.includes('prev') && key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(cardsInCanvas));
        
    }












    static saveCardPosition(cardToChangePosition, xPosition, yPosition, activeCanvas) {

        const cardsInCanvas = CardsAPI.getActiveCanvasData(activeCanvas);
        const findCard = cardsInCanvas.find(card => card.id == cardToChangePosition.id)

        if (findCard) {
            findCard.positionX = xPosition;
            findCard.positionY = yPosition;
            findCard.updated = new Date().toISOString();
        }
        
        
        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (!key.includes('prev') && key.includes(activeCanvas.id)) {
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

            if (!key.includes('prev') && key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(removeCard));

    }




























    static getPreviewActiveCanvasData(activeCanvas) {

        const keys = Object.keys(localStorage);

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (key.includes('prev') && key.includes(activeCanvas.id)) {
                const canvasData = JSON.parse(localStorage.getItem(key) || "[]");
                return canvasData.sort((a, b) => {
                    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
                });
                break;
            }
        }
        
    }

    static saveCardPreview(previewToSave, activeCanvas) {

        const previewsInCanvas = CardsAPI.getPreviewActiveCanvasData(activeCanvas);
        const existing = previewsInCanvas.find(preview => preview.id == previewToSave.id);

        if (existing) {
            existing.title = previewToSave.title;
            existing.body = previewToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            previewToSave.updated = new Date().toISOString();
            previewsInCanvas.push(previewToSave);
        }





        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (key.includes('prev') && key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(previewsInCanvas));
        
    }





    static savePreviewPosition(previewToChangePosition, xPosition, yPosition, activeCanvas) {

        const previewsInCanvas = CardsAPI.getPreviewActiveCanvasData(activeCanvas);
        const findPreview = previewsInCanvas.find(card => card.id == previewToChangePosition.id)

        if (findPreview) {
            findPreview.positionX = xPosition;
            findPreview.positionY = yPosition;
            findPreview.updated = new Date().toISOString();
        }
        
        
        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (key.includes('prev') && key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(previewsInCanvas));

    }





    static deleteCardPreviewInCanvas(id, activeCanvas) {

        const previewsInCanvas = CardsAPI.getPreviewActiveCanvasData(activeCanvas);
        const removePreview = previewsInCanvas.filter(preview => preview.id != id);

        const keys = Object.keys(localStorage);
        let keyName;

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (key.includes('prev') && key.includes(activeCanvas.id)) {
                keyName = key
                break;
            }
        }

        localStorage.setItem(keyName, JSON.stringify(removePreview));
        
    }
    
    
    
}