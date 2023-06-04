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
        [] Make an Add Card functionality (Add and Delete) and make it so that it's saved in the localStorage.
        [] Create five cards ans two canvases, and assign two cards on one of the canvas and three on the other canvas.
        
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


    static deleteCards() {
        // - This is temporary..

        const cards = CardsAPI.getAllCards();

        const emptyCards = cards.filter(cards.id);

        localStorage.setItem("notesapp-canvas-cards", JSON.stringify(emptyCards));


    }
}