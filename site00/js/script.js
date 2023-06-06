import CanvasAPI from "./canvasAPI.js";
import CanvasListView from "./canvasListView.js";
import CardsAPI from "./cardsAPI.js";


const main = document.getElementById("app");
const { getAllCanvas, saveCanvas, deleteCanvas, createCanvasData } = CanvasAPI;
const { getAllCards, saveCards, deleteCards } = CardsAPI;

const canvas = getAllCanvas();
const cards = getAllCards();

let currentActiveCanvas;







const view = new CanvasListView(main, {

    onActiveCanvas(canvas) {

        currentActiveCanvas = canvas;

    },
    onCanvasSelect(canvasId) {
        
        const updatedCanvas = getAllCanvas();
        const selectedCanvas = updatedCanvas.find(canva => canva.id == canvasId);

        view.activeCanvas(selectedCanvas);

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

    },
    onCanvasDelete(id) {

        // - Deleting 
        deleteCanvas(id);





        // - Retrieving the data before updating the canvasList
        const updatedCanvas = getAllCanvas();
        
        view.updateCanvasList(updatedCanvas);
        view.canvasEventListeners();
        view.updateCanvasHeigth(updatedCanvas);
        // For activating a canvas when you delete something
        if (currentActiveCanvas.id != id) {
            view.activeCanvas(currentActiveCanvas);
        } else {
            if (updatedCanvas.length > 0) {
                view.activeCanvas(updatedCanvas[0]);
            }
        }

    },





    // ---------------------------------- CANVAS PREVIEW ----------------------------------



    onCardAdd() {

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
        saveCards(newCard);




        const updatedCards = getAllCards();

        view.updateCardsList(updatedCards);
        view.canvasPreviewEventListeners();
        
    },
    onCardDelete(id) {

        deleteCards(id);


        const updatedCards = getAllCards();

        view.updateCardsList(updatedCards);
        view.canvasPreviewEventListeners();
    },

});





// - Adding a new canvas and cards inside the the lists -------------
// - This acts as a refreshener 
view.updateCanvasList(canvas);
view.updateCardsList(cards);
// - Adding event listeners at the start -------------
view.canvasEventListeners();
view.canvasPreviewEventListeners();
// - Current/temporary active canvas -------------
if (canvas.length > 0) {
    view.activeCanvas(canvas[0]);
}

