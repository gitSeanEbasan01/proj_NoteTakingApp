import CanvasAPI from "./canvasAPI.js";
import CardsAPI from "./cardsAPI.js";

export default class CanvasListView {

    constructor(root, { onActiveCanvas, onCanvasSelect, onCanvasAdd, onCanvasDelete, onCanvasEdit, onActiveCard, onCardSelect, onCardDeselect, onCardAdd, onChildCardAdd, onCardDelete, onCardView, onCardEdit, onAddCardPreview, onDeleteCardPreview } = {}) {
        this.root = root;
        this.onActiveCanvas = onActiveCanvas;
        this.onCanvasSelect = onCanvasSelect;
        this.onCanvasAdd = onCanvasAdd;
        this.onCanvasDelete = onCanvasDelete;
        this.onCanvasEdit = onCanvasEdit;

        this.onActiveCard = onActiveCard;
        this.onCardSelect = onCardSelect;
        this.onCardDeselect = onCardDeselect;
        this.onCardAdd = onCardAdd;
        this.onChildCardAdd = onChildCardAdd;
        this.onCardDelete = onCardDelete;
        this.onCardView = onCardView;
        this.onCardEdit = onCardEdit;

        this.onAddCardPreview = onAddCardPreview;
        this.onDeleteCardPreview = onDeleteCardPreview;

        this.cardDragged = false;
        this.inputFocused = false;
        this.savedActiveCanvas;
        this.savedOpenCardPreview;

        this.root.innerHTML = `
            <div class="top-bar">
                <button class="top__toggle-side" type="button"></button>
                <input class="top__current-canvas" type="text" placeholder="Name of Canvas">
            </div>



            <div class="side-panel">

                <div class="side__profile">
                    <div class="side__profile-picture">
                        <img class="profile-image" src="./img/personIcon.png" alt="Profile Image">
                    </div>
                    <div class="side__profile-name">Sean Quirben S. Ebasan</div>
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





















        // - Opening and Closing the Side Panel ---------------------------------------------------


        const canvasPreview = this.root.querySelector(".canvas__preview");
        const topToggleSide = this.root.querySelector(".top__toggle-side");
        const topCurrentCanvas = this.root.querySelector(".top__current-canvas");
        const sidePanel = this.root.querySelector(".side-panel");
        const btnAddCard = this.root.querySelector(".card__add");

        
        function updateCanvasSize(newNumber) {
            const getInnerWidth = window.innerWidth;
            const getInnerHeight = window.innerHeight;
            let leftWidth = newNumber;
            let calculatedLeft = leftWidth + 15;
            canvasPreview.style.width = `${getInnerWidth.toString() - calculatedLeft}px`;
            canvasPreview.style.height = `${getInnerHeight.toString() - 55}px`;
            canvasPreview.style.left = leftWidth + "px";
            canvasPreview.style.transition = ".3s left ease-in-out, .3s width ease-in-out"
        };
        function updateSidePanel(ifOpacity, buttonLeft, toggleLeft, currentLeft) {
            topToggleSide.style.left = `${toggleLeft + 15}px`;
            topToggleSide.style.transition = ".3s left ease-in-out"

            topCurrentCanvas.style.left = `${currentLeft + 60}px`;
            topCurrentCanvas.style.transition = ".3s left ease-in-out"
            
            sidePanel.style.opacity = ifOpacity;
            sidePanel.style.transition = ".3s opacity ease-in-out"
            
            btnAddCard.style.left = buttonLeft + "px";
            btnAddCard.style.transition = ".3s left ease-in-out"
        };

        let openSidePanel = true;
        let toggleLeft = 200;
        let currentLeft = 200;
        let editLeft = 200;
        let buttonLeft = 250;

        const toggleSide = this.root.querySelector(".top__toggle-side");
        toggleSide.addEventListener("click", () => {
            if (openSidePanel == true) {
                openSidePanel = false;
                toggleLeft = 15;
                currentLeft = 15;
                editLeft = 15;
                buttonLeft = 65
                updateCanvasSize(editLeft);
                updateSidePanel(0, buttonLeft, toggleLeft, currentLeft);
            } else {
                openSidePanel = true;
                toggleLeft = 200;
                currentLeft = 200;
                editLeft = 200;
                buttonLeft = 250;
                updateCanvasSize(editLeft);
                updateSidePanel(1, buttonLeft, toggleLeft, currentLeft);
            }
        });
        
        updateCanvasSize(200);
        updateSidePanel(1, buttonLeft, toggleLeft, currentLeft);
        window.addEventListener('resize', () => updateCanvasSize(editLeft));










        // - Changing the Title of the canvas -----------------------------------------------------
        const topTitleCanvas = this.root.querySelector(".top__current-canvas");

        topTitleCanvas.addEventListener("blur", () => {
            this.onCanvasEdit(this.savedActiveCanvas.id, topTitleCanvas.value);
        });







        // - Button to add a new note -------------------------------------------------------------
        const btnAddCavnas = this.root.querySelector(".canvas__add");

        btnAddCavnas.addEventListener('click', () => {
            this.onCanvasAdd();
        });




        // - Adjusting the side__canvas based on its scrollHeight.  -------------------------------
        const sideCanvas = this.root.querySelector(".side__canvas");
        const sideCanvasList = this.root.querySelector(".side__canvas-list");

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













        


        
        
        
        // - For Adding a Card --------------------------------------------------------------------
        // const btnAddCard = this.root.querySelector(".card__add"); - Positioned on Top
        
        btnAddCard.addEventListener('click', () => {
            this.onCardAdd();
        });
        
        
        // - For Deselecting a card ---------------------------------------------------------------
        const cardHolder = this.root.querySelector(".canvas__card-holder");

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











        // - For Canvas Background Drawing --------------------------------------------------------
        
        

        /* 
            - CLUE ... lines.forEach(line => drawLine(line.pointA, line.pointB));
            childCard.forEach(card => drawLine(parentCardPos, childCardPos))

            - Use the commented code for reference later...
        */
        

        // const canvasDraw = this.root.querySelector(".canvas__draw");
        // const ctx = canvasDraw.getContext('2d');
        // let getCanvasPreviewStyle = window.getComputedStyle(canvasPreview);

        // canvasDraw.style.left = "0";
        // canvasDraw.style.transform = "translate(0, 0)";
        // canvasDraw.width = parseInt(getCanvasPreviewStyle.width);
        // canvasDraw.height = parseInt(getCanvasPreviewStyle.height);
        


        // function updateCanvasSize() {
        //     canvasDraw.width = parseInt(getCanvasPreviewStyle.width);
        //     canvasDraw.height = parseInt(getCanvasPreviewStyle.height);
        //     _drawArrow();
        // }
        
        // const _drawArrow = (endX, endY) => {

        //     ctx.clearRect(0, 0, canvasDraw.width, canvasDraw.height);

        //     ctx.beginPath();
        //     ctx.moveTo(0, 0);
        //     ctx.lineTo(endX, endY);
        //     ctx.stroke();
            
        // };
        // window.addEventListener('resize', updateCanvasSize);
        // _drawArrow();



        







        // - For Dragging a Card ------------------------------------------------------------------
        
        const cardPreview = this.root.querySelector(".canvas__card-preview");
        const previewHolder = this.root.querySelector(".card__preview-holder");
        let clickedCard;
        let clickedPreview;


        const _onDrag = (e) => {
            let getCardStyle = window.getComputedStyle(clickedCard);
            let cardLeft = parseInt(getCardStyle.left);
            let cardTop = parseInt(getCardStyle.top);
            let cardCursor = getCardStyle.cursor;
            cardCursor = "pointer";
            
            clickedCard.style.left = `${cardLeft + e.movementX}px`;
            clickedCard.style.top = `${cardTop + e.movementY}px`;
            
            if (clickedCard.classList.value === "canvas__card-item" || clickedCard.classList.value === "canvas__card-item canvas__card-item--selected") {
                if (e.movementX > 0 || e.movementY > 0 || e.movementX < 0 || e.movementY < 0){
                    this.cardDragged = true;
                    cardCursor = "grab";
                    clickedCard.style.cursor = cardCursor;
                    this.backgroundDrawing();
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
            }

            return clickedCard;
            
        }

        const _onDragPreview = (e) => {
            let getPreviewStyle = window.getComputedStyle(clickedPreview);
            let previewLeft = parseInt(getPreviewStyle.left);
            let previewTop = parseInt(getPreviewStyle.top);
            
            if (this.inputFocused == false) {
                clickedPreview.style.left = `${previewLeft + e.movementX}px`;
                clickedPreview.style.top = `${previewTop + e.movementY}px`;
            }

            return clickedPreview;
        };
        
        
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

                cardHolder.addEventListener("mousemove", _onDrag);
                clickedCard = clickedElement;
                btnAddCard.style.pointerEvents = "none";
            } 
        });
        previewHolder.addEventListener("mousedown", (event) => {

            const clickedElement = event.target.parentElement;

            if (clickedElement.classList.value === "canvas__card-preview") {
                const getRestOfPreviews = this.root.querySelectorAll(".canvas__card-preview");
                getRestOfPreviews.forEach((preview => {
                    if (preview.dataset.cardpreviewId != clickedElement.dataset.cardpreviewId) {
                        preview.style.zIndex = 0;
                    } else {
                        preview.style.zIndex = 1;
                    }
                }));
                
                previewHolder.addEventListener("mousemove", _onDragPreview);
                clickedPreview = clickedElement;
                btnAddCard.style.pointerEvents = "none";
            }
            
        });
        
        canvasPreview.addEventListener("mouseup", (event) => {


            const clickedElement = event.target.parentElement;
            let savedCardLeft;
            let savedCardTop;
            let savedPreviewLeft;
            let savedPreviewTop;

            
            if (this.cardDragged && clickedElement.classList[0] == "canvas__card-item") {
                
                const dragged = true;
                savedCardLeft = _onDrag(event).style.left;
                savedCardTop = _onDrag(event).style.top;
                
                
                // - Saving card's latest position ----------------------
                
                const activeCanvas = CardsAPI.getActiveCanvasData(this.savedActiveCanvas);
                const findCard = activeCanvas.find(card => card.id == clickedElement.dataset.cardId);
                const findActiveCard = activeCanvas.find(card => card.selected == true);
                
                CardsAPI.saveCardPosition(findCard, savedCardLeft, savedCardTop, this.savedActiveCanvas);
                const updatedCards = CardsAPI.getActiveCanvasData(this.savedActiveCanvas);
                this.updateCardsList(updatedCards);


                if (findCard.selected == true) {
                    // - If the card you're dragging is active, keep it active.
                    // - The dragged parameter is for z-index.
                    this.onCardSelect(findCard.id, dragged);
                }else {
                    // - If the card you're dragging is not active, either there is no active card or active card is different, keep it that way.
                    if (findActiveCard) {
                        this.onCardSelect(findActiveCard.id, dragged);
                    }else {
                        this.onCardDeselect();
                    }
                }
                
                this.cardDragged = false;

                // - For disabling the pointer events of the card preview when hovering a card.
                if (this.savedOpenCardPreview) {
                    const getCardPreview = this.root.querySelectorAll(".canvas__card-preview");
                    getCardPreview.forEach((cardPreview) => {
                        let getPreviewStyle = window.getComputedStyle(cardPreview);
                        let previewPointerEvents = getPreviewStyle.pointerEvents;
                        previewPointerEvents = "All";
                        cardPreview.style.pointerEvents = previewPointerEvents;
                    })
                };
                
            }
            
            if (clickedElement.classList.value === "canvas__card-preview" && this.inputFocused == false) {

                savedPreviewLeft = _onDragPreview(event).style.left;
                savedPreviewTop = _onDragPreview(event).style.top;



                const activePreviewCanvas = CardsAPI.getPreviewActiveCanvasData(this.savedActiveCanvas);
                const findPreview = activePreviewCanvas.find(preview => preview.id == clickedElement.dataset.cardpreviewId);
                
                CardsAPI.savePreviewPosition(findPreview, savedPreviewLeft, savedPreviewTop, this.savedActiveCanvas);
                const updatedPreviews = CardsAPI.getPreviewActiveCanvasData(this.savedActiveCanvas);
                this.updateCardPreview(updatedPreviews);
                this.cardPreviewEventListeners();

            }
            
            
            cardHolder.removeEventListener("mousemove", _onDrag)
            previewHolder.removeEventListener("mousemove", _onDragPreview);
            btnAddCard.style.pointerEvents = "all";
            

        });
        
        




        



        // // - For Canvas Background Drawing -----------------------------------------------------
        // - Use the commented code for reference later...

        // const canvasDraw = this.root.querySelector(".canvas__draw");
        // const ctx = canvasDraw.getContext('2d');
        // let getCanvasPreviewStyle = window.getComputedStyle(canvasPreview);
        // canvasDraw.style.left = "0";
        // canvasDraw.style.transform = "translate(0, 0)";
        // canvasDraw.width = parseInt(getCanvasPreviewStyle.width);
        // canvasDraw.height = parseInt(getCanvasPreviewStyle.height);
        
        // function updateCanvasSize() {
        //     canvasDraw.width = parseInt(getCanvasPreviewStyle.width);
        //     canvasDraw.height = parseInt(getCanvasPreviewStyle.height);
        //     _drawArrow();
        // }
        
        // // Initialize the arrow points
        // let pointA = { x: 100, y: 200 };
        // let pointB = { x: 300, y: 200 };
        
        // // Track the currently dragged point
        // let activePoint = null;
        
        // const _drawArrow = () => {

        //     ctx.moveTo(0, 0);
        //     ctx.lineTo(190, 200);
        //     ctx.stroke();
            
        // };
        // window.addEventListener('resize', updateCanvasSize);
        // _drawArrow();
        
    }


































    
    
    
    














    // - For drawing lines in the background for the cards. ---------------------------------------

    backgroundDrawing() {

        const getCardsInRoot = this.root.querySelectorAll(".canvas__card-item");
        const getCardsInCanvas = CardsAPI.getActiveCanvasData(this.savedActiveCanvas);
        const findChildCards = getCardsInCanvas.filter(card => card.child == true)

        const canvasPreview = this.root.querySelector(".canvas__preview");
        const canvasDraw = this.root.querySelector(".canvas__draw");
        const ctx = canvasDraw.getContext('2d');
        let getCanvasPreviewStyle = window.getComputedStyle(canvasPreview);
        canvasDraw.width = parseInt(getCanvasPreviewStyle.width);
        canvasDraw.height = parseInt(getCanvasPreviewStyle.height);

        function drawLine(pointA, pointB) {
            // ctx.clearRect(0, 0, canvasDraw.width, canvasDraw.height);
            ctx.beginPath();
            ctx.moveTo(parseInt(pointA.style.left), parseInt(pointA.style.top));
            ctx.lineTo(parseInt(pointB.style.left), parseInt(pointB.style.top));
            ctx.strokeStyle = "#594B38";
            ctx.lineWidth = 3;
            ctx.stroke();
        };


        findChildCards.forEach(childCard => {
            let rootParentCard;
            let rootChildCard;

            for (let i = 0; i < getCardsInRoot.length; i++) {
                let cardInRoot = getCardsInRoot[i];
                if (childCard.id == cardInRoot.dataset.cardId) {
                    // console.log(childCard.id);
                    rootChildCard = cardInRoot;
                }
                if (childCard.parentId == cardInRoot.dataset.cardId) {
                    // console.log(cardInRoot);
                    rootParentCard = cardInRoot;
                }
            }
            
            if (rootParentCard && rootChildCard) {
                drawLine(rootParentCard, rootChildCard);
            }
            
        });

        
        
    }


    
    
    
    

    




















    





















    // Update Canvas containers height adjustments ------------------------------------------------

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
    
    
    
    






    
    
    
    


    // - Adding a canvas inside the canvas-list ---------------------------------------------------

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
        const topCanvasTitle = this.root.querySelector(".top__current-canvas");

        canvasItems.forEach((eachItems => {
            eachItems.classList.remove("side__canvas-item--selected");
        }));

        this.root.querySelector(`.side__canvas-item[data-canvas-id="${canvas.id}"]`).classList.add("side__canvas-item--selected");
        topCanvasTitle.value = canvas.title;



        // For saving the id of a canvas -------------------
        const savingActiveCanvas = this.onActiveCanvas(canvas);
        this.savedActiveCanvas = canvas;

        
    }
    















































    // - For Adding Cards ----------------------------------------------------------------------


    _createCardItemHTML(id, selected, title, body, xPosition, yPosition, updated) {

        const MAX_TITLE_LENGTH = 30;
        const MAX_BODY_LENGTH = 40;
        // ${title.substring(0, MAX_TITLE_LENGTH)}${title.length > MAX_TITLE_LENGTH ? "..." : ""}

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
                    
                    <div class="card__small-title">${title}</div>
                    <div class="card__small-body">${body}</div>
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
                    
                    <div class="card__small-title">${title}</div>
                    <div class="card__small-body">${body}</div>
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

    _createCardPreview(cardId, title, body, xPosition, yPosition) {

        const html = `
            <div 
                class="canvas__card-preview" 
                data-cardpreview-id="${cardId}"
                style="
                    left: ${xPosition};
                    top: ${yPosition};
                "
            >
                <div class="card__border-highlight"></div>
                <input class="card__title" type="text" placeholder="Title of Card" value="${title}">
                <div class="card__body" contenteditable="true">${body}</div>
            </div>
        `;

        return html;
        
    }


    updateCardPreview(cards) {
        
        const canvasCardPreviewHolder = this.root.querySelector(".card__preview-holder");
        

        canvasCardPreviewHolder.innerHTML = "";

        for (const card of cards) {
            const html = this._createCardPreview(card.id, card.title, card.body, card.positionX, card.positionY);
            canvasCardPreviewHolder.insertAdjacentHTML("afterbegin", html);
        }
        this.savedOpenCardPreview = cards;
        
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
                // this.onCardView(canvasCardItem.dataset.cardId);
                const getCards = CardsAPI.getActiveCanvasData(this.savedActiveCanvas);
                const findCard = getCards.find(card => card.id == canvasCardItem.dataset.cardId)

                this.onAddCardPreview(findCard.id, findCard.title, findCard.body);
                // console.log(findCard);
            });


            // - For Deleting a Card ------------------------------
            canvasCardItem.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                rightClickCount++;
                console.log(rightClickCount);
                if (rightClickCount === 1) {
                    rightClickTimer = setTimeout(function() {
                        rightClickCount = 0;
                    }, 300);
                } else if (rightClickCount === 2) {
                    rightClickCount = 0;
                    clearTimeout(rightClickTimer);
                    
                    const getCardInCanvas = CardsAPI.getActiveCanvasData(this.savedActiveCanvas);
                    const findCard = getCardInCanvas.find(card => card.id == Number(canvasCardItem.dataset.cardId));

                    this.onCardDelete(canvasCardItem.dataset.cardId);
                    this.onDeleteCardPreview(canvasCardItem.dataset.cardId);
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
            const wordButton = cardPreview.querySelectorAll(".cardBody-button");

            // - For clicking a word button -----------
            if (wordButton.length != 0) {
                wordButton.forEach(button => {
                    button.addEventListener('click', () => {

                        const getCardsInCanvas = CardsAPI.getActiveCanvasData(this.savedActiveCanvas);
                        const existing = getCardsInCanvas.find(card => card.id == Number(button.dataset.buttonId));

                        if (existing != undefined) {
                            console.log("there is existing card");
                            this.onCardView(button.dataset.buttonId);
                            this.onCardSelect(button.dataset.buttonId, false)
                        } else {
                            this.onChildCardAdd(button, cardPreview.dataset.cardpreviewId);
                        }

                        
                    });
                });
            }

            [cardTitleInput, cardBodyInput].forEach(inputField => {
                
                let buttonWordConvert = () => {
                        
                    const regex = /(_[^\s]+)\s*/g;
                    const replacedBody = cardBodyInput.innerHTML.replace(regex, `<button class="cardBody-button" data-button-id="undefined" contenteditable="false">$1</button>&nbsp;`);
                    cardBodyInput.innerHTML = replacedBody;
                    
                    let replaceDiv = cardBodyInput.innerHTML.replace(/<div>/g, '').replace(/<\/div>/g, '')
                    cardBodyInput.innerHTML = replaceDiv;
                    const cardBodyChildren = cardBodyInput.children;
                    for (let i = 0; i < cardBodyChildren.length; i++) {
                        let child = cardBodyChildren[i];
                        
                        if (child.dataset.buttonId === "undefined" || child.dataset.buttonId == undefined) {
                            // && child.className === "cardBody-button"
                            let randomizeId = Math.floor(Math.random() * 1000000);
                            let name = child.innerHTML.replace('_', '');
                            child.dataset.buttonId = randomizeId;
                            child.innerHTML = name;
                        }
                    }


                    const updatedCardTitle = cardTitleInput.value.trim();

                    let convertedStr = cardBodyInput.innerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    cardBodyInput.innerHTML = convertedStr;

                    this.onCardEdit(cardPreview.dataset.cardpreviewId, updatedCardTitle, cardBodyInput.innerText);
                    this.onAddCardPreview(cardPreview.dataset.cardpreviewId, updatedCardTitle, cardBodyInput.innerText)

                };
                
                inputField.addEventListener("focus", () => {
                    this.inputFocused = true;
                });
                inputField.addEventListener("blur", () => {
                    buttonWordConvert();
                    this.inputFocused = false;
                });
                inputField.addEventListener("keydown", (event) => {
                    
                    if (event.ctrlKey || event.metaKey){
                        if (event.ctrlKey && event.key === "Enter") {
                            buttonWordConvert();
                        } else if (event.metaKey && event.key === "Enter"){
                            buttonWordConvert();
                        }
                    } else if (event.key === "Enter") {

                        const selection = window.getSelection();
                        const range = selection.getRangeAt(0);
                        const space = document.createTextNode(" ");
                        range.insertNode(space);
                        range.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(range);

                    }

                });
            });
            // - For deleting a card preview -------------------------
            cardPreview.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                rightClickCount++;
                this.inputFocused = true;
                // console.log(rightClickCount);
                if (rightClickCount === 1) {
                    rightClickTimer = setTimeout(function() {
                        rightClickCount = 0;
                        this.inputFocused = false;
                    }, 300);
                } else if (rightClickCount === 2) {
                    rightClickCount = 0;
                    clearTimeout(rightClickTimer);
                    this.onCardDeselect();
                    this.onDeleteCardPreview(cardPreview.dataset.cardpreviewId);

                    this.inputFocused = false;
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