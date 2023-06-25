import CanvasAPI from "./canvasAPI.js";
import CanvasListView from "./canvasListView.js";
import CardsAPI from "./cardsAPI.js";


const main = document.getElementById("app");
const { getAllCanvas, saveCanvas, deleteCanvas, createCanvasData } = CanvasAPI;
const { getAllCards, getActiveCanvasData, saveCardToCanvas, saveChildCardToCanvas, deleteCardInCanvas, saveActiveCard, saveInactiveCard } = CardsAPI;

const canvas = getAllCanvas();

let currentActiveCanvas;
let currentActiveCard;










const view = new CanvasListView(main, {

    onActiveCanvas(canvas) {

        currentActiveCanvas = canvas;

    },
    onCanvasSelect(canvasId) {
        
        const updatedCanvas = getAllCanvas();
        const selectedCanvas = updatedCanvas.find(canva => canva.id == canvasId);

        view.activeCanvas(selectedCanvas);






        view.updateCardsList(getActiveCanvasData(currentActiveCanvas));
        view.canvasPreviewEventListeners();


        // - For updating if a card preview should appear. -----------------
        const getCards = getActiveCanvasData(currentActiveCanvas)
        const findActiveCard = getCards.find(card => card.selected == true)
        if (findActiveCard) {
            view.updateCardPreview(findActiveCard);
            view.cardPreviewEventListeners();
        } else {
            view.updateCardPreview(undefined);
        }

        // currentActiveCard = undefined;
        view.backgroundDrawing();

    },
    onCanvasAdd() {

        const currentCanvasLength = getAllCanvas().length;
        
        // - Adding new canvas on the canvasList
        const newCanvas = {
            title: `New Canvas ${currentCanvasLength}`
        };
        saveCanvas(newCanvas);





        // - Retrieving the data before updating the canvasList
        const updatedCanvas = getAllCanvas();

        view.updateCanvasList(updatedCanvas);
        view.canvasEventListeners();
        view.updateCanvasHeigth(updatedCanvas);
        // - For activating the canvas that you added
        view.activeCanvas(updatedCanvas[0]);
        // - Creating a canvas data based on the created canvas
        createCanvasData(currentActiveCanvas);






        view.updateCardsList(getActiveCanvasData(currentActiveCanvas));
        view.canvasPreviewEventListeners();


        // - For updating if a card preview should appear. -----------------
        const getCards = getActiveCanvasData(currentActiveCanvas)
        const findActiveCard = getCards.find(card => card.selected == true)
        if (findActiveCard) {
            view.updateCardPreview(findActiveCard);
            view.cardPreviewEventListeners();
        } else {
            view.updateCardPreview(undefined);
        }

        view.backgroundDrawing();

    },
    onCanvasDelete(id) {

        // - Deleting 
        deleteCanvas(id);





        // - Retrieving the data before updating the canvasList
        const updatedCanvas = getAllCanvas();
        
        view.updateCanvasList(updatedCanvas);
        view.canvasEventListeners();
        view.updateCanvasHeigth(updatedCanvas);
        // - For activating a canvas when you delete something
        // - Note that length has already been decreased since at the top already deleted something
        if (currentActiveCanvas.id != id) {
            view.activeCanvas(currentActiveCanvas);
        } else if (updatedCanvas.length > 0) {

            view.activeCanvas(updatedCanvas[0]);



            view.updateCardsList(getActiveCanvasData(currentActiveCanvas));
            view.canvasPreviewEventListeners();


            // - For updating if a card preview should appear. -----------------
            const getCards = getActiveCanvasData(currentActiveCanvas)
            const findActiveCard = getCards.find(card => card.selected == true)
            if (findActiveCard) {
                view.updateCardPreview(findActiveCard);
                view.cardPreviewEventListeners();
            } else {
                view.updateCardPreview(undefined);
            }

            view.backgroundDrawing();
            
        } else if (updatedCanvas.length == 0) {
            view.updateCardsList(CardsAPI.getAllCards());
        }

    },





    // ---------------------------------- CANVAS PREVIEW ----------------------------------



    onActiveCard(card) {

        currentActiveCard = card;
        
    },
    onCardSelect(cardId, dragged) {
        
        const updatedCards = getActiveCanvasData(currentActiveCanvas);
        const selectedCard = updatedCards.find(card => card.id == cardId);



        // - Save Active Card to localStorage ---------------------

        const activateCard = {
            id: selectedCard.id,
            selected: true
        };
        saveActiveCard(activateCard, currentActiveCanvas, dragged);


        const newUpdatedCards = getActiveCanvasData(currentActiveCanvas);

        view.updateCardsList(newUpdatedCards);
        view.canvasPreviewEventListeners();
        
        
    },
    onCardDeselect() {

        if (currentActiveCanvas != undefined) {

            const deactivateCard = {
                selected: false
            };
            saveInactiveCard(deactivateCard, currentActiveCanvas);
    
            const newUpdatedCards = getActiveCanvasData(currentActiveCanvas);
    
            view.updateCardsList(newUpdatedCards);
            view.canvasPreviewEventListeners();

        }
        
    },
    onCardAdd() {

        const getCanvas = getAllCanvas();

        if (getCanvas.length > 0 && currentActiveCanvas != undefined) {
            const canvasPreview = view.root.querySelector(".canvas__preview");
            const getCanvasStyle = window.getComputedStyle(canvasPreview);
    
            const newCard = {
                id: undefined,
                selected: false,
                title: "Title of Card",
                body: "Body of Card",
                updated: "",
                positionX: `${Math.floor(Math.random() * parseInt(getCanvasStyle.width))}px`,
                positionY: `${Math.floor(Math.random() * parseInt(getCanvasStyle.height))}px`,
                child: false
            };
            saveCardToCanvas(newCard, currentActiveCanvas);
            
    
    
    
    
            const updatedCards = getActiveCanvasData(currentActiveCanvas);
    
            view.updateCardsList(updatedCards);
            view.canvasPreviewEventListeners();

            view.backgroundDrawing();
        }

        
    },
    onChildCardAdd(button, parentCardId) {

        const canvasPreview = view.root.querySelector(".canvas__preview");
        const getCanvasStyle = window.getComputedStyle(canvasPreview);

        const newCard = {
            parentId: parentCardId,
            id: parseInt(button.dataset.buttonId),
            selected: false,
            title: `${button.innerText}`,
            body: "Body of a Card",
            updated: "",
            positionX: `${Math.floor(Math.random() * parseInt(getCanvasStyle.width))}px`,
            positionY: `${Math.floor(Math.random() * parseInt(getCanvasStyle.height))}px`,
            child: true
        };
        saveChildCardToCanvas(newCard, currentActiveCanvas);



        
        const updatedCards = getActiveCanvasData(currentActiveCanvas);
        
        view.updateCardsList(updatedCards);
        view.canvasPreviewEventListeners();

        view.backgroundDrawing();
        
    },
    onCardDelete(id) {
        
        // deleteCards(id);
        deleteCardInCanvas(id, currentActiveCanvas);
        
        
        // const updatedCards = getAllCards();
        const updatedCards = getActiveCanvasData(currentActiveCanvas);
        
        view.updateCardsList(updatedCards);
        view.canvasPreviewEventListeners();

        view.backgroundDrawing();

    },
    onCardView(id) {

        const getCardInCanvas = getActiveCanvasData(currentActiveCanvas);
        const findCard = getCardInCanvas.find(card => card.id == id);
        
        view.updateCardPreview(findCard);
        view.canvasPreviewEventListeners();
        view.cardPreviewEventListeners();
        
    },
    onCardEdit(id, title, body) {

        const editedCard = {
            id: id,
            title: title,
            body: body
        };
        saveCardToCanvas(editedCard, currentActiveCanvas);



        const updatedCards = getActiveCanvasData(currentActiveCanvas);

        view.updateCardsList(updatedCards);
        view.canvasPreviewEventListeners();
        
    },

});









// - Adding a new canvas and cards inside the the lists -------------
// - This acts as a refreshener 
view.updateCanvasList(canvas);
// - Current/temporary active canvas -------------
if (canvas.length > 0 && currentActiveCanvas != undefined) {
    // view.activeCanvas(canvas[0]);
    view.activeCanvas(currentActiveCanvas);
    view.updateCardsList(getActiveCanvasData(currentActiveCanvas));

    // - Adding event listeners at the start -------------
    view.canvasPreviewEventListeners();
}

// - Adding event listeners at the start -------------
view.canvasEventListeners();








// view.backgroundDrawing();

// ----------------------------------- DELETE CANVAS DATA WHEN YOU EXIT THE BROWSER (TEMPORARY) -----------------------------------

// window.onbeforeunload = function() {

//     localStorage.clear();
    
// }
// window.onload = function() {

//     localStorage.clear();
    
// }





// const canvasDraw = view.root.querySelector(".canvas__draw");
// console.log(canvasDraw);

// function canvasDrawing() {
//     // console.log("This worked");
//     canvasDraw.addEventListener('click', () => {
//         console.log("This worked");
//     });
// }
// canvasDrawing();
