import CanvasAPI from "./canvasAPI.js";
import CanvasListView from "./canvasListView.js";
import CardsAPI from "./cardsAPI.js";
import ProfileAPI from "./profileAPI.js";


const main = document.getElementById("app");
const { getAllCanvas, saveCanvas, deleteCanvas, createCanvasData } = CanvasAPI;
const { getAllCards, getActiveCanvasData, saveCardToCanvas, saveChildCardToCanvas, deleteCardInCanvas, saveActiveCard, saveInactiveCard, getPreviewActiveCanvasData, saveCardPreview, savePreviewPosition, deleteCardPreviewInCanvas } = CardsAPI;
const { getProfilePic, getProfileName, saveProfilePic, saveProfileName } = ProfileAPI;

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
        view.updateCardPreview(getPreviewActiveCanvasData(currentActiveCanvas));
        view.canvasPreviewEventListeners();
        view.cardPreviewEventListeners();


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
            view.updateCardPreview(getPreviewActiveCanvasData(currentActiveCanvas));
            view.canvasPreviewEventListeners();
            view.cardPreviewEventListeners();

            view.backgroundDrawing();
            
        } else if (updatedCanvas.length == 0) {
            view.updateCardsList(CardsAPI.getAllCards());
        }

    },
    onCanvasEdit(id, title) {

        const editCanvas = {
            id: id,
            title: title
        };
        saveCanvas(editCanvas);


        
        const updatedCanvas = getAllCanvas();

        view.updateCanvasList(updatedCanvas);
        view.canvasEventListeners();
        view.updateCanvasHeigth(updatedCanvas);
        
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
        deleteCardPreviewInCanvas(id, currentActiveCanvas);
        
        

        const updatedCards = getActiveCanvasData(currentActiveCanvas);
        
        view.updateCardsList(updatedCards);
        view.updateCardPreview(getPreviewActiveCanvasData(currentActiveCanvas));
        view.canvasPreviewEventListeners();
        view.cardPreviewEventListeners();

        view.backgroundDrawing();

    },
    onCardView(id) {

        // const getCardInCanvas = getActiveCanvasData(currentActiveCanvas);
        const getPreviewsInCanvas = getPreviewActiveCanvasData(currentActiveCanvas);
        // const findCard = getCardInCanvas.filter(card => card.id == id);

        // const newPreview = {

        // };

        view.updateCardPreview(getPreviewsInCanvas);
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











    // ---------------------------------- CARD PREVIEW ----------------------------------


    onAddCardPreview(id, title, body) {

        const canvasPreview = view.root.querySelector(".canvas__preview");
        const getCanvasStyle = window.getComputedStyle(canvasPreview);

        const previewsInCanvas = CardsAPI.getPreviewActiveCanvasData(currentActiveCanvas);
        const existing = previewsInCanvas.find(preview => preview.id == id);
        let posX;
        let posY;
        if (existing) {
            const generatedPosX = existing.positionX;
            const generatedPosY = existing.positionY;
            posX = generatedPosX;
            posY = generatedPosY;
        } else {
            const generatedPosX = `${Math.floor(Math.random() * parseInt(getCanvasStyle.width))}px`;
            const generatedPosY = `${Math.floor(Math.random() * parseInt(getCanvasStyle.height))}px`;
            posX = generatedPosX;
            posY = generatedPosY;
        }

        const newPreview = {
            id: id,
            selected: true,
            title: title,
            body: body,
            updated: "",
            positionX: posX,
            positionY: posY,
        };
        saveCardPreview(newPreview, currentActiveCanvas);
        
        const updatedPreviews = getPreviewActiveCanvasData(currentActiveCanvas);

        view.updateCardPreview(updatedPreviews);
        view.canvasEventListeners();
        view.cardPreviewEventListeners();
        
    },
    onDeleteCardPreview(id) {

        deleteCardPreviewInCanvas(id, currentActiveCanvas);

        const updatedPreviews = getPreviewActiveCanvasData(currentActiveCanvas);

        view.updateCardPreview(updatedPreviews);
        view.canvasEventListeners();
        view.cardPreviewEventListeners();
        
    }, 



















    onSaveName(name) {

        saveProfileName(name);

        view.updateName(name);
        
    },
    onSaveProfPic(imageData) {

        saveProfilePic(imageData);

        view.updatePicture(imageData);
        
    }

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


view.updatePicture(getProfilePic());
view.updateName(getProfileName());





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
