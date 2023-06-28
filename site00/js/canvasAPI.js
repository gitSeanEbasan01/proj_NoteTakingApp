export default class CanvasAPI{

    // - static function defined within the class. It can be called directly without requiring an instance.
    // - This is for just getting all the elements inside the local storage and that's it -------------
    static getAllCanvas() {

        // - Collects all the canvas item in the local storage using the JSON.parse() function || but if there's nothing, create an empty array []
        const canvas = JSON.parse(localStorage.getItem("notesapp-canvas") || "[]");

        // - Put the canvas variable in the getAllCanvas() to be accessed later.
        // - Since the canvas var is a list of array, we can arrange the list by its latest updated canvas using a 'sort()' method.
        // - In '(a, b) => {...}', (a, b) is a comparison function that uses an arrow function syntax '=> {...}'.
        return canvas.sort((a, b) => {
            // - The -1 or 1, doesn't really subtract or add the elements by -1 or 1, it simply just determines whether 'a' should come before or after 'b'.
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
        
    }

    // - For saving canvases to be added inside the local storage -------------
    static saveCanvas(canvasToSave) {

        // - canvas, this is an array/data structure that stores and holds multiple items or elements. 
        const canvas = CanvasAPI.getAllCanvas();
        // - Compare the id inside canvasToSave with the id inside canva (canva => canva.id)
        const existing = canvas.find(canva => canva.id == canvasToSave.id);



        // ------------ ADDING/UPDATING CANVAS ------------

        if (existing) {
            // - Updating existing id
            existing.title = canvasToSave.title;
            // existing.body = canvasToSave.body;
            // existing.updated = new Date().toISOString();
        } else {
            // - Creating new id

            // - Create an id using a floor() function.
            canvasToSave.id = Math.floor(Math.random() * 1000000);
            // - Checking if there's another id with the same number. If there is, then loop and generate another number.
            const findCanvasId = canvas.find(canva => canva.id == canvasToSave.id);
            let canvasIdExist = null;
            if (findCanvasId) {
                canvasIdExist = true;
            } else {
                canvasIdExist = false;
            }
            while (canvasIdExist) {
                canvasToSave.id = Math.floor(Math.random() * 1000000);

                const scanCanvasId = canvas.find(canva => canva.id == canvasToSave.id);
                if (scanCanvasId) {
                    canvasIdExist = true;
                } else {
                    canvasIdExist = false;
                }
            }
            // - Instance a Date() object and convert it to a readable string using the toISOString() method;
            canvasToSave.updated = new Date().toISOString();


            // - Add the new canvasToSave element to the end of the canvas array using the push() method.
            canvas.push(canvasToSave);
        }
        
        
        // - localStorage.setItem() is a method that allows us to store data.
        // - JSON.stringify() is a function that converts an object into a JSON string.
        // - JSON - JavaScript Object Notation - is a format that represents a data structure.
        localStorage.setItem("notesapp-canvas", JSON.stringify(canvas));
    }
    

    // - Deleting a canvas --------------------------
    static deleteCanvas(id) {

        const canvas = CanvasAPI.getAllCanvas();
        // Filter or show each canvas on the list that is not (!=) in the passed id
        const newCanvas = canvas.filter(canva => canva.id != id);

        localStorage.setItem("notesapp-canvas", JSON.stringify(newCanvas));



        
        // - Deleting the Canvas Data with the canvas Id ----------
        const keys = Object.keys(localStorage);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            while (key.includes(`${id}`)) {
                localStorage.removeItem(key);
                break;
            }
        }

        
    }

    
    



    // - Creating a Data for the canvas that is created -------------------------

    static createCanvasData(addedCanvas) {

        const canvas = CanvasAPI.getAllCanvas();
        const findCanvas = canvas.find(canva => canva.id == addedCanvas.id);
        
        const randomKey = Math.random().toString(36).substring(2, 9);

        const generateCanvasKey = function() {
            return 'notesapp-canvas-' + findCanvas.id + '_' + randomKey;
        };
        const generateCanvasKey00 = function() {
            return 'notesapp-canvas-' + 'prev-' + findCanvas.id + '_' + randomKey;
        };



        const newData = [];
        const newData00 = [];
        localStorage.setItem(generateCanvasKey(), JSON.stringify(newData))
        localStorage.setItem(generateCanvasKey00(), JSON.stringify(newData00));

    }
    
}