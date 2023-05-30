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
            existing.updated = new Date().toISOString();
        } else {
            // - Creating new id

            // - Create an id using a floor() function.
            canvasToSave.id = Math.floor(Math.random() * 1000000);
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
    

    // - Deleting a canvas -------------
    static deleteCanvas(id) {
        const canvas = CanvasAPI.getAllCanvas();
        // Filter or show each canvas on the list that is not (!=) in the passed id
        const newCanvas = canvas.filter(canva => canva.id != id);

        localStorage.setItem("notesapp-canvas", JSON.stringify(newCanvas));
    }

    
}