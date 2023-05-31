import CanvasAPI from "./canvasAPI.js";

export default class CanvasView {

    constructor(root, { onCanvasAdd, onCanvasDelete } = {}) {
        this.root = root;
        this.onCanvasAdd = onCanvasAdd;
        this.onCanvasDelete = onCanvasDelete;

        this.root.innerHTML = `
            <div class="top-bar">
                <button class="top__toggle-side" type="button"></button>
                <div class="top__current-canvas">Main Canvas</div>
            </div>



            <div class="side-panel">

                <div class="side__profile">
                    <img src="" alt="Profile Picture">
                    <div class="side__profile-name">Sean Ebasan</div>
                    <div class="side__profile-status">Online</div>
                </div>


                <input class="side__search" type="text" placeholder="Search Canvas or Cards">
                

                <div class="side__main-canvas"></div>

                <div class="side__canvas">
                    <button class="canvas__add" type="button">Add Canvas</button>
                    
                    <div class="side__canvas-list">
                    </div>
                </div>



                <div class="side__favourites">
                    <div class="side__favourite-canvas"></div>
                    <div class="side__favourite-cards"></div>
                </div>


                <div class="side__recents"></div>



                <div class="side__line-break"></div>

                <footer class="side__footer">
                    <div class="side__footer-updates"></div>
                    <div class="side__footer-settings"></div>
                    <div class="side__footer-faqs"></div>
                </footer>
                
            </div>





            <button class="card__add" type="button"></button>





            <div class="canvas__preview">

                
                <div class="canvas__card-holder">
                    
                    <div class="canvas__card-item canvas__card-item--selected">
                        <div class="card__border-highlight"></div>
                        
                        <div class="card__small-title">Lecture Notes</div>
                        <div class="card__small-body">Trying to learn something.</div>
                        <div class="card__small-updated">Thursday 8:45pm</div>
                    </div>

                </div>

                <div class="canvas__card-preview">
                    <div class="card__border-highlight"></div>
                    
                    <input class="card__title" type="text" placeholder="Premade Title Will Be Here">
                    <textarea class="card__body">Type here or something.</textarea>
                </div>
                
            </div>
        `


        // - Button to add a new note ---
        const btnAddCavnas = this.root.querySelector(".canvas__add");
        // - Adjusting the side__canvas based on its scrollHeight.
        const sideCanvas = this.root.querySelector(".side__canvas");
        const sideCanvasList = this.root.querySelector(".side__canvas-list");

        btnAddCavnas.addEventListener('click', () => {
            this.onCanvasAdd();
        });


        // - Adjusting the side__canvas based on its scrollHeight.  ----------
        window.addEventListener('DOMContentLoaded', () => {

            const canvas = CanvasAPI.getAllCanvas();

            if (canvas.length < 7) {

                sideCanvasList.style.height = "100px";
                sideCanvasList.style.height = `${sideCanvasList.scrollHeight + 8}px`;
                
                sideCanvas.style.height = `${sideCanvas.scrollHeight + 15}px`;
            } else {
                
                sideCanvasList.style.height = "163px";
                sideCanvas.style.height = `${sideCanvas.scrollHeight + 15}px`;

                if (canvas.length > 7) {
                    sideCanvasList.style.overflowY = "scroll";
                    sideCanvasList.style.paddingBottom = "8px";
                } else {
                    sideCanvasList.style.overflowY = "hidden";
                    sideCanvasList.style.paddingBottom = "0";
                }
            }
            
        });
        
        
    }


    // Update Canvas containers height adjustments ------

    updateCanvasHeigth(canvas) {

        const sideCanvas = this.root.querySelector(".side__canvas");
        const sideCanvasList = this.root.querySelector(".side__canvas-list");
        

        if (sideCanvasList.style.height < "163px") {
            sideCanvasList.style.height = "100px";
            sideCanvasList.style.height = `${sideCanvasList.scrollHeight + 8}px`;
            
            sideCanvas.style.height = "150px";
            sideCanvas.style.height = `${sideCanvas.scrollHeight + 15}px`;
        } else {

            if (canvas.length < 7) {

                sideCanvasList.style.height = "100px";
                sideCanvasList.style.height = `${sideCanvasList.scrollHeight + 8}px`;
                
                sideCanvas.style.height = "150px";
                sideCanvas.style.height = `${sideCanvas.scrollHeight + 15}px`;

            } if (canvas.length >= 7) {

                if (canvas.length > 7) {
                    sideCanvasList.style.overflowY = "scroll";
                    sideCanvasList.style.paddingBottom = "8px";
                } else {
                    sideCanvasList.style.overflowY = "hidden";
                    sideCanvasList.style.paddingBottom = "0";
                }

                sideCanvasList.style.height = "163px";

                sideCanvas.style.height = `${sideCanvas.scrollHeight}px`;

            }

        }
        
    }
    
    
    
    
    
    
    


    // - Adding a canvas inside the canvas-list -------------

    _createListItemHTML(id, title) {

        return`
            <button class="side__canvas-item" data-canvas-id="${id}">${title}</button>
        `;
        
    }

    updateCanvasList(canvas) {

        // - Adding a canvas button inside the canvas-list -------------

        const canvasListContainer = this.root.querySelector(".side__canvas-list");

        // - Empty List
        canvasListContainer.innerHTML = "";

        // - Adding a canvas button inside the canvas-list -------------
        for (const canva of canvas) {
            const html = this._createListItemHTML(canva.id, canva.title);

            canvasListContainer.insertAdjacentHTML("beforeend", html);
        }






        // - SELECT/DELETE events for each item in the list -------------

        canvasListContainer.querySelectorAll(".side__canvas-item").forEach((canvasItem => {


            // For deleting
            canvasItem.addEventListener("dblclick", () => {

                // const doDelete = confirm("Are you sure you want to delete this note?")

                // if (doDelete) {
                //     this.onCanvasDelete(canvasItem.dataset.canvasId);
                // }

                this.onCanvasDelete(canvasItem.dataset.canvasId);
            });
        }));
        
    }
    
    
}