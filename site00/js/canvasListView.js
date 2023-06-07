import CanvasAPI from "./canvasAPI.js";

export default class CanvasListView {

    constructor(root, { onActiveCanvas, onCanvasSelect, onCanvasAdd, onCanvasDelete, onActiveCard, onCardSelect, onCardAdd, onCardDelete } = {}) {
        this.root = root;
        this.onActiveCanvas = onActiveCanvas;
        this.onCanvasSelect = onCanvasSelect;
        this.onCanvasAdd = onCanvasAdd;
        this.onCanvasDelete = onCanvasDelete;

        this.onActiveCard = onActiveCard;
        this.onCardSelect = onCardSelect;
        this.onCardAdd = onCardAdd;
        this.onCardDelete = onCardDelete;

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


                </div>

                <div class="canvas__card-preview">
                    <div class="card__border-highlight"></div>
                    
                    <input class="card__title" type="text" placeholder="Premade Title Will Be Here">
                    <textarea class="card__body">Type here or something.</textarea>
                </div>
                
            </div>
        `


        // - Button to add a new note ------------------------
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





        

        const btnAddCard = this.root.querySelector(".card__add");


        btnAddCard.addEventListener('click', () => {
            this.onCardAdd();
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

        // - Adding a canvas button inside the canvas-list ------

        const canvasListContainer = this.root.querySelector(".side__canvas-list");

        // - Empty List
        canvasListContainer.innerHTML = "";

        // - Adding a canvas inside the canvas-list ------
        for (const canva of canvas) {
            const html = this._createListItemHTML(canva.id, canva.title);

            canvasListContainer.insertAdjacentHTML("beforeend", html);
        }
        
    }


















    // - SELECT/DELETE/DRAGGING events for Items or Cards -------------

    canvasEventListeners() {

        const canvasListContainer = this.root.querySelector(".side__canvas-list");
        
        const canvasPreview = this.root.querySelector(".canvas__preview");
        // const canvasCardItem = this.root.querySelector(".canvas__card-item");
        


        // - For Deleting Cards with right mouse button -----
        let clickCount = 0;
        let timer;
        

        canvasListContainer.querySelectorAll(".side__canvas-item").forEach((canvasItem => {

            canvasItem.addEventListener("click", () => {
                this.onCanvasSelect(canvasItem.dataset.canvasId);
            });






            canvasItem.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                if (event.button === 2) {
                    clickCount++;

                    if (clickCount === 1) {
                        timer = setTimeout(function() {
                            clickCount = 0;
                        }, 300);
                    } else if (clickCount === 2) {
                        clearTimeout(timer);
                        clickCount = 0;
                        this.onCanvasDelete(canvasItem.dataset.canvasId);
                    }
                }
            });
            
        }));



        

        // - For draggable cards --------------------------------

        // const _onDrag = (e) => {

        //     let getCardStyle = window.getComputedStyle(canvasCardItem);
        //     let cardLeft = parseInt(getCardStyle.left);
        //     let cardTop = parseInt(getCardStyle.top);

        //     canvasCardItem.style.left = `${cardLeft + e.movementX}px`;
        //     canvasCardItem.style.top = `${cardTop + e.movementY}px`;
            
        // }
        
        // canvasCardItem.addEventListener("mousedown", () => {
        //     canvasCardItem.addEventListener("mousemove", _onDrag);
        // });
        // canvasPreview.addEventListener("mouseup", () => {
        //     canvasCardItem.removeEventListener("mousemove", _onDrag);
        // });
        
    }














    

    // - Make the currently selected or added canvas active ------------------------
    
    activeCanvas(canvas) {

        const canvasItems = this.root.querySelectorAll(".side__canvas-item");

        canvasItems.forEach((eachItems => {
            eachItems.classList.remove("side__canvas-item--selected");
        }));

        this.root.querySelector(`.side__canvas-item[data-canvas-id="${canvas.id}"]`).classList.add("side__canvas-item--selected");



        // For saving the id of a canvas -------------------
        const savingActiveCanvas = this.onActiveCanvas(canvas);

        
    }
    















































    // - For Adding Cards ------------------------


    _createCardItemHTML(id, title, body, xPosition, yPosition) {

        // - Use later... 'canvas__card-item--selected'

        return`
            <div 
                class="canvas__card-item" 
                data-card-id="${id}"
                style="
                    top: ${yPosition};
                    left: ${xPosition};
                "
            >
                <div class="card__border-highlight"></div>
                
                <div class="card__small-title">${title}</div>
                <div class="card__small-body">${body}</div>
                <div class="card__small-updated">Thursday 8:45pm</div>
            </div>
        `
        
    }

    updateCardsList(cards) {

        const cardHolder = this.root.querySelector(".canvas__card-holder");

        // - Clearing all the cards in the list.
        cardHolder.innerHTML = "";

        for (const card of cards) {
            const html = this._createCardItemHTML(card.id, card.title, card.body, card.positionX, card.positionY);

            cardHolder.insertAdjacentHTML("beforeend", html);
        };
        
    }













    // - For Selecting/Deleting Cards ------------------------


    canvasPreviewEventListeners() {

        let rightClickCount = 0;
        let rightClickTimer;
        
        const cardItem = this.root.querySelectorAll(".canvas__card-item");

        cardItem.forEach((canvasCardItem => {

            // - For Selecting Card and making it active -------
            
            canvasCardItem.addEventListener('click', () => {
                this.onCardSelect(canvasCardItem.dataset.cardId);
            });


            // - For Deleting a Card -------
            canvasCardItem.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                rightClickCount++;
                if (rightClickCount === 1) {
                    rightClickTimer = setTimeout(function() {
                        rightClickCount = 0;
                    }, 300);
                } else if (rightClickCount === 2) {
                    rightClickCount = 0;
                    clearTimeout(rightClickTimer);
                    this.onCardDelete(canvasCardItem.dataset.cardId);
                }
            });
        }));

        
        
    }


    






    // - Make the currently selected or added card active ------------------------
    
    activeCard(card) {

        const cardItems = this.root.querySelectorAll(".canvas__card-item");

        cardItems.forEach((eachItems => {
            eachItems.classList.remove("canvas__card-item--selected");
        }));

        this.root.querySelector(`.canvas__card-item[data-card-id="${card.id}"]`).classList.add("canvas__card-item--selected");


        
        // For saving the id of a canvas -------------------
        const savingActiveCard = this.onActiveCard(card);

        
    }
    
    
}