import CanvasAPI from "./canvasAPI.js";
import CardsAPI from "./cardsAPI.js";

export default class CanvasListView {

    constructor(root, { onActiveCanvas, onCanvasSelect, onCanvasAdd, onCanvasDelete, onActiveCard, onCardSelect, onCardDeselect, onCardAdd, onCardDelete, onCardView, onCardEdit } = {}) {
        this.root = root;
        this.onActiveCanvas = onActiveCanvas;
        this.onCanvasSelect = onCanvasSelect;
        this.onCanvasAdd = onCanvasAdd;
        this.onCanvasDelete = onCanvasDelete;

        this.onActiveCard = onActiveCard;
        this.onCardSelect = onCardSelect;
        this.onCardDeselect = onCardDeselect;
        this.onCardAdd = onCardAdd;
        this.onCardDelete = onCardDelete;
        this.onCardView = onCardView;
        this.onCardEdit = onCardEdit;

        this.cardDragged = false;
        this.savedActiveCanvas;
        this.savedOpenCardPreview;

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


                <canvas class="canvas__draw"></canvas>
                
                <div class="canvas__card-holder">

                </div>

                <div class="card__preview-holder">
                
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



        // - Adjusting the side__canvas based on its scrollHeight.  ---------------------------------
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
        const cardHolder = this.root.querySelector(".canvas__card-holder");
        const canvasPreview = this.root.querySelector(".canvas__preview");
        
        


        // - For Adding a Card -----------------------------------------------
        btnAddCard.addEventListener('click', () => {
            this.onCardAdd();
        });
        

        // - For Deselecting a card ----------------------------------------------
        cardHolder.addEventListener('click', (event) => {

            const clickedElement = event.target;
            const isCardItem = clickedElement.closest('.canvas__card-item');
            const getCanvas = CanvasAPI.getAllCanvas();

            if (getCanvas.length != 0) {
                if (!isCardItem) {
                    this.onCardDeselect();
                } 
            }

        });








        







        // - For Dragging a Card -------------------------------------------------------------
        
        const cardPreview = this.root.querySelector(".canvas__card-preview");
        let clickedCard;


        const _onDrag = (e) => {
            let getCardStyle = window.getComputedStyle(clickedCard);
            let cardLeft = parseInt(getCardStyle.left);
            let cardTop = parseInt(getCardStyle.top);
            let cardCursor = getCardStyle.cursor;
            cardCursor = "pointer";
            
            clickedCard.style.left = `${cardLeft + e.movementX}px`;
            clickedCard.style.top = `${cardTop + e.movementY}px`;
            
            
            if (e.movementX > 0 || e.movementY > 0 || e.movementX < 0 || e.movementY < 0){
                this.cardDragged = true;
                cardCursor = "grab";
                clickedCard.style.cursor = cardCursor;
            }
            // - For disabling the pointer events of the card preview when hovering a card.
            if (this.savedOpenCardPreview){
                const getCardPreview = this.root.querySelectorAll(".canvas__card-preview");
                getCardPreview.forEach((cardPreview) => {
                    let getPreviewStyle = window.getComputedStyle(cardPreview);
                    let previewPointerEvents = getPreviewStyle.pointerEvents;
                    previewPointerEvents = "none";
                    cardPreview.style.pointerEvents = previewPointerEvents;
                })
            }

            return clickedCard;
            
        }
        
        
        cardHolder.addEventListener("mousedown", (event) => {
            
            const clickedElement = event.target.parentElement;
            
            if (clickedElement.classList.value === "canvas__card-item" || clickedElement.classList.value === "canvas__card-item canvas__card-item--selected") {
                // - For changing z-index ---------
                const getRestOfCards = this.root.querySelectorAll(".canvas__card-item");
                getRestOfCards.forEach((card => {
                    if (card.dataset.cardId != clickedElement.dataset.cardId){
                        card.style.zIndex = 0;
                    } else {
                        card.style.zIndex = 1;
                    }
                }));

                cardHolder.addEventListener("mousemove", _onDrag)
                clickedCard = clickedElement;
                btnAddCard.style.pointerEvents = "none";
            }

        });
        canvasPreview.addEventListener("mouseup", (event) => {

            const clickedElement = event.target.parentElement;
            let savedCardLeft;
            let savedCardTop;

            
            if (this.cardDragged) {
                
                const dragged = true;
                savedCardLeft = _onDrag(event).style.left;
                savedCardTop = _onDrag(event).style.top;
                
                
                // - Saving card's latest position ----------------------
                
                const activeCanvas = CardsAPI.getActiveCanvasData(this.savedActiveCanvas)
                const findCard = activeCanvas.find(card => card.id == clickedElement.dataset.cardId)
                const findActiveCard = activeCanvas.find(card => card.selected == true);
                
                CardsAPI.saveCardPosition(findCard, savedCardLeft, savedCardTop, this.savedActiveCanvas)
                const updatedCards = CardsAPI.getActiveCanvasData(this.savedActiveCanvas)
                this.updateCardsList(updatedCards);


                if (findCard.selected == true) {
                    // - If the card you're dragging is active, keep it active.
                    // - The dragged parameter is for z-index.
                    this.onCardSelect(findCard.id, dragged)
                }else {
                    // - If the card you're dragging is not active, either there is no active card or active card is different, keep it that way.
                    if (findActiveCard) {
                        this.onCardSelect(findActiveCard.id, dragged);
                    }else {
                        this.onCardDeselect();
                    }
                }
                
                this.cardDragged = false;
                
            }
            
            
            cardHolder.removeEventListener("mousemove", _onDrag)
            btnAddCard.style.pointerEvents = "all";
            // - For disabling the pointer events of the card preview when hovering a card.
            if (this.savedOpenCardPreview){
                const getCardPreview = this.root.querySelectorAll(".canvas__card-preview");
                getCardPreview.forEach((cardPreview) => {
                    let getPreviewStyle = window.getComputedStyle(cardPreview);
                    let previewPointerEvents = getPreviewStyle.pointerEvents;
                    previewPointerEvents = "All";
                    cardPreview.style.pointerEvents = previewPointerEvents;
                })
            }

        });
        
        




        



        // - For Canvas Background Drawing ----------------------------------------------------------------------

        const canvasDraw = this.root.querySelector(".canvas__draw");
        const ctx = canvasDraw.getContext('2d');
        let getCanvasPreviewStyle = window.getComputedStyle(canvasPreview);
        canvasDraw.style.left = "-200px";
        canvasDraw.style.transform = "translate(200px, 0)";
        canvasDraw.width = parseInt(getCanvasPreviewStyle.width);
        canvasDraw.height = parseInt(getCanvasPreviewStyle.height);
        
        function updateCanvasSize() {
            canvasDraw.width = parseInt(getCanvasPreviewStyle.width);
            canvasDraw.height = parseInt(getCanvasPreviewStyle.height);
            _drawArrow();
        }
        
        // Initialize the arrow points
        let pointA = { x: 100, y: 200 };
        let pointB = { x: 300, y: 200 };
        
        // Track the currently dragged point
        let activePoint = null;
        
        const _drawArrow = () => {

            // ctx.clearRect(0, 0, canvasDraw.width, canvasDraw.height);

            // // Set the translation offset
            // ctx.translate(20, 0); // Adjust the value as needed
            
            // // Draw the line
            // ctx.beginPath();
            // ctx.moveTo(pointA.x, pointA.y);
            // ctx.lineTo(pointB.x, pointB.y);
            // ctx.stroke();
            ctx.moveTo(0 + 200, 0);
            ctx.lineTo(190 + 200, 200);
            ctx.stroke();

            // // Reset the translation offset
            // ctx.translate(-20, 0); // Reset the value to the original offset
            
        };
        window.addEventListener('resize', updateCanvasSize);
        _drawArrow();
        
    }









































    // Update Canvas containers height adjustments -----------------------------------------------

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
    
    
    
    






    
    
    
    


    // - Adding a canvas inside the canvas-list ----------------------------------------------

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


















    // - SELECT/DELETEevents for Items or Cards --------------------------------------------------

    canvasEventListeners() {

        const canvasListContainer = this.root.querySelector(".side__canvas-list");
        


        // - For Deleting Canvases with right mouse button ----------------------------
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
        
    }














    

    // - Make the currently selected or added canvas active --------------------------------------
    
    activeCanvas(canvas) {

        const canvasItems = this.root.querySelectorAll(".side__canvas-item");

        canvasItems.forEach((eachItems => {
            eachItems.classList.remove("side__canvas-item--selected");
        }));

        this.root.querySelector(`.side__canvas-item[data-canvas-id="${canvas.id}"]`).classList.add("side__canvas-item--selected");



        // For saving the id of a canvas -------------------
        const savingActiveCanvas = this.onActiveCanvas(canvas);
        this.savedActiveCanvas = canvas;

        
    }
    















































    // - For Adding Cards ----------------------------------------------------------------------


    _createCardItemHTML(id, selected, title, body, xPosition, yPosition, updated) {

        const MAX_TITLE_LENGTH = 30;
        const MAX_BODY_LENGTH = 40;
        // const regex = /(\+[^\s]+)\s*/g;
        // const regex = /(?<!<button[^>]*>)(\+[^\s]+)\s*/g;
        // const replacedBody = body.replace(regex, '<button class="card__body-button" contenteditable="false">+</button> ');

        if (selected === true) {
            return`
                <div 
                    class="canvas__card-item canvas__card-item--selected" 
                    data-card-id="${id}"
                    style="
                        top: ${yPosition};
                        left: ${xPosition};
                    "
                >
                    <div class="card__border-highlight"></div>
                    
                    <div class="card__small-title">${title.substring(0, MAX_TITLE_LENGTH)}${title.length > MAX_TITLE_LENGTH ? "..." : ""}</div>
                    <div class="card__small-body">${body.substring(0, MAX_BODY_LENGTH)}${body.length > MAX_BODY_LENGTH ? "..." : ""}</div>
                    <div class="card__small-updated">${updated.toLocaleString(undefined, { 
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    })}</div>
                </div>
            `
        } else {
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
                    
                    <div class="card__small-title">${title.substring(0, MAX_TITLE_LENGTH)}${title.length > MAX_TITLE_LENGTH ? "..." : ""}</div>
                    <div class="card__small-body">${body.substring(0, MAX_BODY_LENGTH)}${body.length > MAX_BODY_LENGTH ? "..." : ""}</div>
                    <div class="card__small-updated">${updated.toLocaleString(undefined, { 
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    })}</div>
                </div>
            `
        }
        
        
    }

    updateCardsList(cards) {

        const cardHolder = this.root.querySelector(".canvas__card-holder");

        // - Clearing all the cards in the list.
        cardHolder.innerHTML = "";

        for (const card of cards) {
            const html = this._createCardItemHTML(card.id, card.selected, card.title, card.body, card.positionX, card.positionY, new Date(card.updated));

            cardHolder.insertAdjacentHTML("afterbegin", html);
        };
        
    }




    // - For opening a card. ---------------------------------------------------------

    _createCardPreview(cardId, title, body) {

        // const regex = /(\+[^\s]+)\s*/g;
        const regex = /(_[^\s]+)\s*/g;
        const replacedBody = body.replace(regex, '<button class="card__body-button" contenteditable="false">$1</button> ');

        const html = `
            <div class="canvas__card-preview" data-cardpreview-id="${cardId}">
                <div class="card__border-highlight"></div>
                <input class="card__title" type="text" placeholder="Title of Card" value="${title}">
                <div class="card__body" contenteditable="true">${replacedBody}</div>
            </div>`;

        return html;
        
    }


    updateCardPreview(card) {
        
        const canvasCardPreviewHolder = this.root.querySelector(".card__preview-holder");

        if (card == undefined) {
            canvasCardPreviewHolder.innerHTML = "";
            this.savedOpenCardPreview = undefined;
        } else {
            canvasCardPreviewHolder.innerHTML = "";
            const html = this._createCardPreview(card.id, card.title, card.body);
            canvasCardPreviewHolder.insertAdjacentHTML("afterbegin", html);
            this.savedOpenCardPreview = card;
        }
        
    }




















    // - For Selecting/Deleting Cards -----------------------------------------------


    canvasPreviewEventListeners() {

        let rightClickCount = 0;
        let rightClickTimer;
        
        const cardItem = this.root.querySelectorAll(".canvas__card-item");

        cardItem.forEach((canvasCardItem => {

            // - For Selecting Card and making it active ------------
            // - Opening card ------------
            canvasCardItem.addEventListener('click', () => {
                const dragged = false;
                this.onCardSelect(canvasCardItem.dataset.cardId, dragged);
            });
            canvasCardItem.addEventListener('dblclick', () => {
                this.onCardView(canvasCardItem.dataset.cardId);
            });


            // - For Deleting a Card ------------------------------
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
                    
                    const getCardInCanvas = CardsAPI.getActiveCanvasData(this.savedActiveCanvas);
                    const findCard = getCardInCanvas.find(card => card.id == Number(canvasCardItem.dataset.cardId));
                    
                    if (this.savedOpenCardPreview != undefined) {
                        if (this.savedOpenCardPreview.id == Number(canvasCardItem.dataset.cardId)) {
                            this.updateCardPreview(undefined);
                        }
                    }

                    this.onCardDelete(canvasCardItem.dataset.cardId);
                }
            });
            
            
        }));
        
        
    }


    // - For Editing/Deleting Card Previews -----------------------------------------------

    cardPreviewEventListeners() {

        const canvasCardPreview = this.root.querySelectorAll(".canvas__card-preview");
        let rightClickCount = 0;
        let rightClickTimer;

        canvasCardPreview.forEach(cardPreview => {
            const cardTitleInput = cardPreview.querySelector(".card__title");
            const cardBodyInput = cardPreview.querySelector(".card__body");

            [cardTitleInput, cardBodyInput].forEach(inputField => {
                // cardBodyInput.focus();
                // let range = document.createRange();
                // let selection = window.getSelection();
                // range.selectNodeContents(cardBodyInput);
                // range.collapse(false);
                // selection.removeAllRanges();
                // selection.addRange(range);
                
                inputField.addEventListener("blur", () => {
                    const updatedCardTitle = cardTitleInput.value.trim();
                    const updatedCardBody = cardBodyInput.innerText;
    
                    this.onCardEdit(cardPreview.dataset.cardpreviewId, updatedCardTitle, updatedCardBody);
                    this.onCardView(cardPreview.dataset.cardpreviewId)
                });
                inputField.addEventListener("keydown", (event) => {
                    // const updatedCardTitle = cardTitleInput.value.trim();
                    // const updatedCardBody = cardBodyInput.innerText;
                    // this.onCardEdit(cardPreview.dataset.cardpreviewId, updatedCardTitle, updatedCardBody);
                    
                    if (event.ctrlKey || event.metaKey){
                        if (event.ctrlKey && event.key === "Enter") {
                            const updatedCardTitle = cardTitleInput.value.trim();
                            const updatedCardBody = cardBodyInput.innerText;
                            this.onCardEdit(cardPreview.dataset.cardpreviewId, updatedCardTitle, updatedCardBody);
                            this.onCardView(cardPreview.dataset.cardpreviewId)
                        } else if (event.metaKey && event.key === "Enter"){
                            const updatedCardTitle = cardTitleInput.value.trim();
                            const updatedCardBody = cardBodyInput.innerText;
                            this.onCardEdit(cardPreview.dataset.cardpreviewId, updatedCardTitle, updatedCardBody);
                            this.onCardView(cardPreview.dataset.cardpreviewId)
                        }
                    } else if (event.key === "Enter") {

                        // let paragraph = inputField;
                        // let words = paragraph.textContent.split(' ');
                        
                        // - Adding space when you enter to the next line.
                        const selection = window.getSelection();
                        const range = selection.getRangeAt(0);
                        const space = document.createTextNode(" ");
                        range.insertNode(space);
                        range.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        
                        const updatedCardTitle = cardTitleInput.value.trim();
                        const updatedCardBody = cardBodyInput.innerText;
                        this.onCardEdit(cardPreview.dataset.cardpreviewId, updatedCardTitle, updatedCardBody);
                    }

                });
            });
            // - For deleting a card preview -------------------------
            cardPreview.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                rightClickCount++;
                if (rightClickCount === 1) {
                    rightClickTimer = setTimeout(function() {
                        rightClickCount = 0;
                    }, 300);
                } else if (rightClickCount === 2) {
                    rightClickCount = 0;
                    clearTimeout(rightClickTimer);
                    this.onCardDeselect();
                    this.updateCardPreview(undefined);
                }
            });

        });

        
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