import CanvasAPI from "./canvasAPI.js";

export default class DrawAPI{


    static createDrawData(activeCanvas, selectedCard, childCard) {

        // console.log(activeCanvas);
        // console.log(selectedCard);
        // console.log(childCard);
        
        const generateDrawKey = function() {
            return 'notesapp-draw-' + activeCanvas.id + '_' + Math.random().toString(36).substring(2, 9);
        };


        const newData = [{
            canvasId: "",
            parentId: "",
            childId: ""
        }];

        localStorage.setItem(generateDrawKey(), JSON.stringify(newData))
        
    }
    
    
}