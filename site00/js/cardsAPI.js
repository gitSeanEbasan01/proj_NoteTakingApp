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

        [] Deal with making an active canvas.
        [] Make an Add Card functionality and make it so that it's saved in the localStorage.
        [] Create five cards ans two canvases, and assign two cards on one of the canvas and three on the other canvas.
        
    */


    

    static getAllCards() {

        const cards = JSON.parse(localStorage.getItem("notesapp-canvas-cards") || "[]");

        return cards;
        
    }
    
}