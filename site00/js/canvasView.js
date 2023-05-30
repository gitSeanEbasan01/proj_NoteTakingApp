export default class CanvasView {

    constructor(root, { onCanvasAdd } = {}) {
        this.root = root;
        this.onCanvasAdd = onCanvasAdd;

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
                        <button class="side__canvas-item first-item">Click Here</button>
                        <button class="side__canvas-item">Click Here</button>
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

        btnAddCavnas.addEventListener('click', () => {
            this.onCanvasAdd();
        });

        window.addEventListener('DOMContentLoaded', () => {
            sideCanvas.style.height = `${sideCanvas.scrollHeight + 15}px`;
        });
        
        
    }


    _createListItemHTML(id, title) {

        return`
            <button class="side__canvas-item" data-canvas-id="${id}">${title}</button>
        `;
        
    }

    updateCanvasList(canvas) {

        const canvasListContainer = this.root.querySelector(".side__canvas-list");

        // - Empty List
        canvasListContainer.innerHTML = "";

        for (const canva of canvas) {
            const html = this._createListItemHTML(canva.id, canva.title);

            canvasListContainer.insertAdjacentHTML("beforeend", html);
        }
        
    }
    
}