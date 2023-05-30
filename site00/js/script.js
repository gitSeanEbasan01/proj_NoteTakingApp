import CanvasAPI from "./canvasAPI.js";
import CanvasView from "./canvasView.js";

const main = document.getElementById("app");
const getCanvas = CanvasAPI.getAllCanvas();

CanvasAPI.saveCanvas({
    id: 796277,
    title: "Something Else I Mean!"
})

console.log(getCanvas);


const view = new CanvasView(main, {
    onCanvasAdd() {
        const newCanvas = {
            title: "New CanvasAPI"
        };

        CanvasAPI.saveCanvas(newCanvas);
        view.updateCanvasList(CanvasAPI.getAllCanvas());
    },
});



