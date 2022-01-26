//https://silinde87.github.io/top-etch-a-sketch/

const objConfiguration = { witheBoardSideZise: 550, pixelsPerSide: 51, color: "black", currentCellX: 25, currentCellY: 25 };

function paintCell(e) {
    e.target.style.backgroundColor = objConfiguration.color;
}

function defineCenterCurrentCell(sideSize) {

    if (sideSize % 2 === 0) {
        objConfiguration.currentCellX = (sideSize / 2) - 1;
    } else {
        objConfiguration.currentCellX = Math.floor(sideSize / 2);
    }

    objConfiguration.currentCellY = objConfiguration.currentCellX;
}

function drawGrid() {

    let nRows = objConfiguration.pixelsPerSide;
    let nColumns = objConfiguration.pixelsPerSide;

    defineCenterCurrentCell(objConfiguration.pixelsPerSide);

    let cellArea = (objConfiguration.witheBoardSideZise ** 2) / (objConfiguration.pixelsPerSide ** 2);

    let sideSize = Math.sqrt(cellArea);

    let divWhiteBoard = document.querySelector(".play-area .whiteboard");
    divWhiteBoard.setAttribute("style", "height: " + objConfiguration.witheBoardSideZise + "px; width: " + objConfiguration.witheBoardSideZise + "px;");

    for (let i = 0; i < nRows; i++) {

        const divNewRow = document.createElement("div");
        divNewRow.classList.add("row");
        divNewRow.classList.add("r" + i.toString());

        for (let j = 0; j < nColumns; j++) {

            const divNewColumn = document.createElement("div");
            divNewColumn.classList.add("column");
            divNewColumn.classList.add("c" + j.toString());

            divNewColumn.setAttribute("style", "height: " + sideSize + "px; width: " + sideSize + "px;");

            divNewColumn.addEventListener("mouseover", paintCell);

            if (i === 0) {
                if (j === 0) {
                    divNewColumn.classList.add("corner-ul");
                } else if (j === (nColumns - 1)) {
                    divNewColumn.classList.add("corner-ur");
                }
            } else if (i === (nRows - 1)) {
                if (j === 0) {
                    divNewColumn.classList.add("corner-bl");
                } else if (j === (nColumns - 1)) {
                    divNewColumn.classList.add("corner-br");
                }
            }

            divNewRow.appendChild(divNewColumn);
        }

        divWhiteBoard.appendChild(divNewRow);
    }

}

function removeGrid() {

    let divWhiteBoard = document.querySelector(".play-area .whiteboard");
    let divPlayArea = document.querySelector(".play-area");

    divPlayArea.removeChild(divWhiteBoard);

    let divWhiteBoardNew = document.createElement("div");
    divWhiteBoardNew.classList.add("whiteboard");
    divWhiteBoardNew.classList.add("shadow");
    //divPlayArea.appendChild(divWhiteBoardNew);

    divPlayArea.insertBefore(divWhiteBoardNew, divPlayArea.children[1]);

    divWhiteBoardNew.focus();
}

function prepareControls() {

    const slider = document.querySelector(".slider");

    slider.addEventListener("change", () => {
        removeGrid();

        objConfiguration.pixelsPerSide = Number(slider.value);
        drawGrid();

        let divWhiteBoard = document.querySelector(".play-area .whiteboard");
        divWhiteBoard.focus();

    });

    slider.addEventListener("input", () => {
        let pSliderText = document.querySelector(".pixels");
        pSliderText.textContent = slider.value.toString() + "x" + slider.value.toString();
    });

    const btnClear = document.querySelector(".button-clear");
    btnClear.addEventListener("click", clearGrid);

}

function clearGrid() {
    const whiteBoardColumns = document.querySelectorAll(".column");
    whiteBoardColumns.forEach(col => col.style.backgroundColor = "#cacaca");
}

function paintNewCell(x, y) {

    //vericamos que esten dentro de los limites

    let newCellToPaint = document.querySelector(".r" + y.toString() + " .c" + x.toString());
    newCellToPaint.style.backgroundColor = objConfiguration.color;



}

function setKeyControls() {
    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;

        let x, y;

        switch (code) {
            case "ArrowRight":

                x = objConfiguration.currentCellX + 1;
                if (x >= 0 && x < objConfiguration.pixelsPerSide) {
                    objConfiguration.currentCellX = x;
                    paintNewCell(objConfiguration.currentCellX, objConfiguration.currentCellY);
                }

                break;
            case "ArrowLeft":

                x = objConfiguration.currentCellX - 1;
                if (x >= 0 && x < objConfiguration.pixelsPerSide) {
                    objConfiguration.currentCellX = x;
                    paintNewCell(objConfiguration.currentCellX, objConfiguration.currentCellY);
                }

                break;
            case "ArrowDown":

                y = objConfiguration.currentCellY + 1;
                if (y >= 0 && y < objConfiguration.pixelsPerSide) {
                    objConfiguration.currentCellY = y;
                    paintNewCell(objConfiguration.currentCellX, objConfiguration.currentCellY);
                }

                break;
            case "ArrowUp":

                y = objConfiguration.currentCellY - 1;
                if (y >= 0 && y < objConfiguration.pixelsPerSide) {
                    objConfiguration.currentCellY = y;
                    paintNewCell(objConfiguration.currentCellX, objConfiguration.currentCellY);
                }


                break;
            default:
                break;
        }

    }, false);
}

function start() {

    prepareControls();
    drawGrid();
    setKeyControls();

}



start();