export default class CanvasAPI{

    static getAllCanvas() {

        const canvas = JSON.parse(localStorage.getItem("notesapp-canvas") || "[]");

        return canvas;
        
    }
    
}