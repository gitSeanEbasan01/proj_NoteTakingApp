import CanvasAPI from "./canvasAPI.js";
import CanvasView from "./canvasView.js";
import CardsAPI from "./cardsAPI.js";


const main = document.getElementById("app");
const { getAllCanvas, saveCanvas, deleteCanvas } = CanvasAPI;
const { getAllCards } = CardsAPI;
const canvas = getAllCanvas();
const cards = getAllCards();





const view = new CanvasView(main, {

    onCanvasAdd() {

        const currentCanvasLength = getAllCanvas().length;
        
        // - Adding new canvas on the canvasList
        const newCanvas = {
            title: `New Canvas ${currentCanvasLength}`
        };
        saveCanvas(newCanvas);



        // - Retrieving the data before updating the cavnasList and the top canvas marging thing
        const updatedCanvas = getAllCanvas();

        view.updateCanvasList(updatedCanvas);
        view.canvasEventListeners();
        view.updateCanvasHeigth(updatedCanvas);
    },
    onCanvasDelete(id) {

        // - Deleting 
        deleteCanvas(id);


        // - Retrieving the data before updating the cavnasList and the top canvas marging thing
        const updatedCanvas = getAllCanvas();
        
        view.updateCanvasList(updatedCanvas);
        view.canvasEventListeners();
        view.updateCanvasHeigth(updatedCanvas);
    },

});





// - Adding a new canvas inside the canvas-list -------------
// - This acts as a refreshener 
view.updateCanvasList(canvas);

view.canvasEventListeners();