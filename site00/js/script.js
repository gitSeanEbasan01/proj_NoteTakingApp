import CanvasAPI from "./canvasAPI.js";


let sideCanvas = document.querySelector('.side__canvas');


window.addEventListener('DOMContentLoaded', () => {
    sideCanvas.style.height = `${sideCanvas.scrollHeight + 15}px`;
});


const canvas = CanvasAPI.getAllCanvas();

console.log(canvas);