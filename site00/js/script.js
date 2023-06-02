import CanvasAPI from "./canvasAPI.js";
import CanvasView from "./canvasView.js";
import CardsAPI from "./cardsAPI.js";


const main = document.getElementById("app");
const { getAllCanvas, saveCanvas, deleteCanvas } = CanvasAPI;
const { getAllCards } = CardsAPI;
const canvas = getAllCanvas();
const cards = getAllCards();

let currentActiveCanvas;





const view = new CanvasView(main, {

    onActiveCanvas(canvasId) {

        currentActiveCanvas = canvasId;

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
        view.activeCanvas(updatedCanvas[0]);

    },
    onCanvasDelete(id) {

        // - Deleting 
        deleteCanvas(id);


        // - Retrieving the data before updating the canvasList
        const updatedCanvas = getAllCanvas();
        
        view.updateCanvasList(updatedCanvas);
        view.canvasEventListeners();
        view.updateCanvasHeigth(updatedCanvas);
        // view.activeCanvas(view.onActiveCanvas);
        console.log(currentActiveCanvas);

    },

});





// - Adding a new canvas inside the canvas-list -------------
// - This acts as a refreshener 
view.updateCanvasList(canvas);
// - Adding event listeners at the start -------------
view.canvasEventListeners();
// - Current/temporary active canvas -------------
view.activeCanvas(canvas[0]);