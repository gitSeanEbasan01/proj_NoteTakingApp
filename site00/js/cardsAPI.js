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
            [] When you add a card in a canvas, make a way to assign that created card to the current active canvas and save it. Which includes all the properties of the cards.
            [] Make it so that when you switch to a different canvas, the saved cards inside that canvas will appear. And then disappear when you switch to another.
        [] Editing the cards
            [] ...
        
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
}