import CanvasAPI from "./canvasAPI.js";
import CanvasView from "./canvasView.js";


const main = document.getElementById("app");
const {getAllCanvas, saveCanvas, deleteCanvas } = CanvasAPI;
const canvas = getAllCanvas();


// CanvasAPI.saveCanvas({
//     id: 796277,
//     title: "Something Else I Mean!"
// })




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
        view.updateCanvasHeigth(updatedCanvas);
    },
    onCanvasDelete(id) {

        // - Deleting 
        deleteCanvas(id);


        // - Retrieving the data before updating the cavnasList and the top canvas marging thing
        const updatedCanvas = getAllCanvas();
        
        view.updateCanvasList(updatedCanvas);
        view.updateCanvasHeigth(updatedCanvas);
    },
});



// - Adding a new canvas inside the canvas-list -------------
// - This acts as a refreshener 
view.updateCanvasList(canvas);