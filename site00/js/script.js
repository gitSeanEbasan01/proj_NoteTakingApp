import CanvasAPI from "./canvasAPI.js";
import CanvasView from "./canvasView.js";

const main = document.getElementById("app");
// const getCanvas = CanvasAPI.getAllCanvas();
const { getAllCanvas, saveCanvas, deleteCanvas } = CanvasAPI;

// CanvasAPI.saveCanvas({
//     id: 796277,
//     title: "Something Else I Mean!"
// })

// console.log(getCanvas);


const view = new CanvasView(main, {
    onCanvasAdd() {
        const newCanvas = {
            title: "New Canvas"
        };

        // CanvasAPI.saveCanvas(newCanvas);
        saveCanvas(newCanvas);
        view.updateCanvasList(CanvasAPI.getAllCanvas());
    },
    onCanvasDelete(id) {
        deleteCanvas(id);
        view.updateCanvasList(CanvasAPI.getAllCanvas());
    },
});


// - Adding a canvas button inside the canvas-list -------------
// - This acts as a refreshener 
view.updateCanvasList(CanvasAPI.getAllCanvas());