import CanvasAPI from "./canvasAPI.js";
import CanvasListView from "./canvasListView.js";
import CardsAPI from "./cardsAPI.js";


const main = document.getElementById("app");
const { getAllCanvas, saveCanvas, deleteCanvas, createCanvasData } = CanvasAPI;
const { getAllCards, saveCards, deleteCards, getActiveCanvasData, saveCardToCanvas, deleteCardInCanvas } = CardsAPI;

const canvas = getAllCanvas();

let currentActiveCanvas;










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
            console.log("canvas more than 0")
            
        } else if (updatedCanvas.length == 0) {
            view.updateCardsList(CardsAPI.getAllCards());
        }

    },





    // ---------------------------------- CANVAS PREVIEW ----------------------------------



    onCardAdd() {

        const getCanvas = getAllCanvas();

        if (getCanvas.length > 0) {
            const canvasPreview = view.root.querySelector(".canvas__preview");
            const getCanvasStyle = window.getComputedStyle(canvasPreview);
    
            const newCard = {
                canvasId: "",
                id: "",
                title: "Title of Card",
                body: "Body of Card",
                updated: "",
                positionX: `${Math.floor(Math.random() * parseInt(getCanvasStyle.width))}px`,
                positionY: `${Math.floor(Math.random() * parseInt(getCanvasStyle.height))}px`
            };
            saveCardToCanvas(newCard, currentActiveCanvas);
            
    
    
    
    
            const updatedCards = getActiveCanvasData(currentActiveCanvas);
    
            view.updateCardsList(updatedCards);
            view.canvasPreviewEventListeners();
        }

        
    },
    onCardDelete(id) {

        // deleteCards(id);
        deleteCardInCanvas(id, currentActiveCanvas);


        // const updatedCards = getAllCards();
        const updatedCards = getActiveCanvasData(currentActiveCanvas);

        view.updateCardsList(updatedCards);
        view.canvasPreviewEventListeners();
    },

});









// - Adding a new canvas and cards inside the the lists -------------
// - This acts as a refreshener 
view.updateCanvasList(canvas);
// - Current/temporary active canvas -------------
if (canvas.length > 0) {
    view.activeCanvas(canvas[0]);
    view.updateCardsList(getActiveCanvasData(currentActiveCanvas));

    // - Adding event listeners at the start -------------
    view.canvasPreviewEventListeners();
}

// - Adding event listeners at the start -------------
view.canvasEventListeners();










// ----------------------------------- DELETE CANVAS DATA WHEN YOU EXIT THE BROWSER (TEMPORARY) -----------------------------------

window.onbeforeunload = function() {

    localStorage.clear();
    
}