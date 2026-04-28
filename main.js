const SIZE = 25;
const SECRET_TEXT = "我是菜狗";
let zoomScale = 1.0;
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.1;
let dragButton = null; // "left" | "right" | null
let localDragButton = null;
let timerSeconds = 0;
let timerInterval = null;
let gameFinished = false;
let achievementShown = false;


//createDemoAnswer()
let answerGrid = [[1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0], [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1], [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
[1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
[1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
[1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1],
[1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
[1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
[1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
[1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
[1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
[1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
[1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
[1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

/* =========================
   2. 固定可选局部区域
   ========================= */
const REGION_CONFIGS = [
    {
        id: "A",
        name: "左上 10×10",
        rowStart: 0,
        rowEnd: 9,
        colStart: 0,
        colEnd: 9,
    },
    {
        id: "B",
        name: "上中 10×10",
        rowStart: 0,
        rowEnd: 9,
        colStart: 10,
        colEnd: 19,
    },
    {
        id: "C",
        name: "右上 5×5",
        rowStart: 0,
        rowEnd: 4,
        colStart: 20,
        colEnd: 24,
    },
    {
        id: "D",
        name: "中下 15×15",
        rowStart: 10,
        rowEnd: 24,
        colStart: 5,
        colEnd: 19,
    },
];

/* =========================
   3. 主盘状态
   ========================= */
let playerGrid = [];
let isMouseDown = false;
let drawMode = null; // "fill" | "erase"

let hintMode = false;
let secretVerified = false;

/* 中键选择局部 */
let isMiddleSelecting = false;
let currentHoverRegionId = null;

/* 已完成局部 */
let solvedRegions = new Set();

/* 当前打开的局部题 */
let activeRegion = null;
let localPlayerGrid = [];
let localAnswerGrid = [];
let localIsMouseDown = false;
let localDrawMode = null;


/* =========================
   4. 初始化
   ========================= */
//工具菜狗
function showHintImage() {
    const hintImage = document.getElementById("hint-image");
    if (hintImage) {
        hintImage.classList.remove("hidden");
    }
}

function hideHintImage() {
    const hintImage = document.getElementById("hint-image");
    if (hintImage) {
        hintImage.classList.add("hidden");
    }
}
//。。。。
function createEmptyGrid(size) {
    return Array.from({ length: size }, () => Array(size).fill(0));
}

function initPlayerGrid() {
    playerGrid = createEmptyGrid(SIZE);
}

function initGame() {
    initPlayerGrid();
    bindUIEvents();
    renderMainClues();
    renderSideLabels();
    renderBoard();
    updateHintUI();
    updateTimerUI();
    updateZoomLabel();
    applyBoardZoom();
    startTimer();
    hideHintImage();
}
//缩放
function updateZoomLabel() {
    const zoomLabel = document.getElementById("zoom-label");
    if (zoomLabel) {
        zoomLabel.textContent = `${Math.round(zoomScale * 100)}%`;
    }
}

function applyBoardZoom() {
    const gameWrapper = document.getElementById("game-wrapper");
    if (!gameWrapper) return;

    gameWrapper.style.transform = `scale(${zoomScale})`;
    gameWrapper.style.transformOrigin = "top center";
}

/* =========================
   5. 示例答案（仅占位）
   你之后用自己的 answerGrid 替换
   ========================= */
function createDemoAnswer() {
    const grid = createEmptyGrid(SIZE);

    for (let r = 2; r < 23; r++) {
        for (let c = 2; c < 23; c++) {
            if (
                r === 2 || r === 22 ||
                c === 2 || c === 22 ||
                (r >= 6 && r <= 9 && c >= 6 && c <= 9) ||
                (r >= 6 && r <= 9 && c >= 15 && c <= 18) ||
                (r >= 14 && r <= 17 && c >= 7 && c <= 17)
            ) {
                grid[r][c] = 1;
            }
        }
    }

    return grid;
}


/* =========================
   6. 提示数字计算
   ========================= */
function getLineClue(line) {
    const result = [];
    let count = 0;

    for (let i = 0; i < line.length; i++) {
        if (line[i] === 1) {
            count++;
        } else {
            if (count > 0) {
                result.push(count);
                count = 0;
            }
        }
    }

    if (count > 0) {
        result.push(count);
    }

    return result;
}

function getRowClues(grid) {
    return grid.map((row) => getLineClue(row));
}

function getColClues(grid) {
    const clues = [];

    for (let c = 0; c < grid[0].length; c++) {
        const col = [];
        for (let r = 0; r < grid.length; r++) {
            col.push(grid[r][c]);
        }
        clues.push(getLineClue(col));
    }

    return clues;
}


/* =========================
   7. 主盘提示渲染
   ========================= */
function renderMainClues() {
    renderRowClues("row-clues", answerGrid, false);
    renderColClues("col-clues", answerGrid, false);
}

function renderRowClues(containerId, grid, isLocal, cellSize = 28, clueWidth = 120) {
    const rowCluesEl = document.getElementById(containerId);
    rowCluesEl.innerHTML = "";

    const rowClues = getRowClues(grid);
    const size = grid.length;

    for (let r = 0; r < size; r++) {
        const clueEl = document.createElement("div");
        clueEl.dataset.row = r;
        clueEl.className = isLocal ? "local-row-clue" : "row-clue";
        clueEl.style.height = `${cellSize}px`;
        clueEl.style.width = `${clueWidth}px`;

        if (r % 5 === 0) {
            clueEl.classList.add(isLocal ? "local-thick-top" : "thick-top");
        }

        clueEl.textContent = rowClues[r].length ? rowClues[r].join(" ") : "";
        rowCluesEl.appendChild(clueEl);
    }
}

function renderColClues(containerId, grid, isLocal, cellSize = 28, clueHeight = 120) {
    const colCluesEl = document.getElementById(containerId);
    colCluesEl.innerHTML = "";

    const colClues = getColClues(grid);
    const size = grid[0].length;

    for (let c = 0; c < size; c++) {
        const clueEl = document.createElement("div");
        clueEl.dataset.col = c;
        clueEl.className = isLocal ? "local-col-clue" : "col-clue";
        clueEl.style.width = `${cellSize}px`;
        clueEl.style.height = `${clueHeight}px`;

        if (c % 5 === 0) {
            clueEl.classList.add(isLocal ? "local-thick-left" : "thick-left");
        }

        if (colClues[c].length) {
            for (const num of colClues[c]) {
                const numEl = document.createElement("div");
                numEl.textContent = num;
                clueEl.appendChild(numEl);
            }
        }

        colCluesEl.appendChild(clueEl);
    }
}


/* =========================
   8. 区域工具函数
   ========================= */
function getRegionById(regionId) {
    return REGION_CONFIGS.find((region) => region.id === regionId) || null;
}

function getRegionByCell(row, col) {
    for (const region of REGION_CONFIGS) {
        if (
            row >= region.rowStart &&
            row <= region.rowEnd &&
            col >= region.colStart &&
            col <= region.colEnd
        ) {
            return region;
        }
    }
    return null;
}

function isCellInRegion(row, col, region) {
    return (
        row >= region.rowStart &&
        row <= region.rowEnd &&
        col >= region.colStart &&
        col <= region.colEnd
    );
}

function extractSubgrid(grid, region) {
    const subgrid = [];

    for (let r = region.rowStart; r <= region.rowEnd; r++) {
        const row = [];
        for (let c = region.colStart; c <= region.colEnd; c++) {
            row.push(grid[r][c]);
        }
        subgrid.push(row);
    }

    return subgrid;
}

function applySubgridToMain(region, subgrid) {
    for (let r = 0; r < subgrid.length; r++) {
        for (let c = 0; c < subgrid[0].length; c++) {
            playerGrid[region.rowStart + r][region.colStart + c] = subgrid[r][c];
        }
    }
}


/* =========================
   9. 主盘格子操作
   ========================= */
/*function setMainCell(row, col, value, cellEl) {
    if (playerGrid[row][col] === value) return;

    playerGrid[row][col] = value;

    if (value === 1) {
        cellEl.classList.add("filled");
    } else {
        cellEl.classList.remove("filled");
    }
}*/
function applyMainCellClass(cellEl, value) {
    cellEl.classList.remove("filled", "marked-empty");
    cellEl.textContent = "";

    if (value === 1) {
        cellEl.classList.add("filled");
        cellEl.textContent = "⬛";
    }

    if (value === 2) {
        cellEl.classList.add("marked-empty");
        cellEl.textContent = "✗";
    }
}

function setMainCell(row, col, value, cellEl) {
    if (playerGrid[row][col] === value) return;
    playerGrid[row][col] = value;
    applyMainCellClass(cellEl, value);
}
/*加高亮函数*/
function clearHoverLine() {
    document.querySelectorAll(".hover-line").forEach((el) => {
        el.classList.remove("hover-line");
    });
}

function highlightLine(row, col) {
    clearHoverLine();

    document.querySelectorAll(`.cell[data-row="${row}"]`).forEach((el) => {
        el.classList.add("hover-line");
    });

    document.querySelectorAll(`.cell[data-col="${col}"]`).forEach((el) => {
        el.classList.add("hover-line");
    });

    const rowClue = document.querySelector(`.row-clue[data-row="${row}"]`);
    const colClue = document.querySelector(`.col-clue[data-col="${col}"]`);
    const rightLabel = document.querySelector(`.right-row-label[data-row="${row}"]`);
    const bottomLabel = document.querySelector(`.bottom-col-label[data-col="${col}"]`);

    if (rowClue) rowClue.classList.add("hover-line");
    if (colClue) colClue.classList.add("hover-line");
    if (rightLabel) rightLabel.classList.add("hover-line");
    if (bottomLabel) bottomLabel.classList.add("hover-line");
}
function handleMainCellAction(row, col, cellEl) {
    // 左键单击/拖动：逻辑由 drawMode 决定
    if (drawMode === "fill") {
        setMainCell(row, col, 1, cellEl); // 变黑
    } else if (drawMode === "clear") {
        setMainCell(row, col, 0, cellEl); // 恢复蓝色
    } else if (drawMode === "mark-empty") {
        setMainCell(row, col, 2, cellEl); // 变白
    }
}

/* =========================
   10. 主盘渲染
   ========================= */
//之前的renderboard
/*function renderBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;

            if (playerGrid[r][c] === 1) {
                cell.classList.add("filled");
            }

            if (c % 5 === 0) {
                cell.classList.add("thick-left");
            }

            if (r % 5 === 0) {
                cell.classList.add("thick-top");
            }

            const region = getRegionByCell(r, c);
            if (region && solvedRegions.has(region.id)) {
                cell.classList.add("region-solved");
            }

            cell.addEventListener("mousedown", (e) => {
                e.preventDefault();

                // 提示模式 + 中键：选择局部
                if (hintMode && secretVerified && e.button === 1) {
                    const regionUnderCell = getRegionByCell(r, c);

                    if (!regionUnderCell) return;
                    if (solvedRegions.has(regionUnderCell.id)) return;
                    if (activeRegion) return;

                    isMiddleSelecting = true;
                    currentHoverRegionId = regionUnderCell.id;
                    refreshRegionHighlight();
                    return;
                }

                // 左键：填涂
                if (e.button === 0) {
                    isMouseDown = true;
                    drawMode = "fill";
                    handleMainCellAction(r, c, cell);
                }

                // 右键：擦除
                if (e.button === 2) {
                    isMouseDown = true;
                    drawMode = "erase";
                    handleMainCellAction(r, c, cell);
                }
            });

            cell.addEventListener("mouseenter", () => {
                if (isMouseDown && drawMode) {
                    handleMainCellAction(r, c, cell);
                }

                if (hintMode && secretVerified && isMiddleSelecting) {
                    const regionUnderCell = getRegionByCell(r, c);

                    if (regionUnderCell && !solvedRegions.has(regionUnderCell.id)) {
                        currentHoverRegionId = regionUnderCell.id;
                    } else {
                        currentHoverRegionId = null;
                    }

                    refreshRegionHighlight();
                }
            });

            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
            });

            fragment.appendChild(cell);
        }
    }

    board.appendChild(fragment);
    refreshRegionHighlight();
}*/
function renderBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;

            if (c % 5 === 0) {
                cell.classList.add("thick-left");
            }

            if (r % 5 === 0) {
                cell.classList.add("thick-top");
            }

            const region = getRegionByCell(r, c);
            if (region && solvedRegions.has(region.id)) {
                cell.classList.add("region-solved");
            }

            applyMainCellClass(cell, playerGrid[r][c]);

            cell.addEventListener("mouseenter", () => {
                highlightLine(r, c);

                if (!isMouseDown || !dragButton) return;

                const current = playerGrid[r][c];

                // 左键长按
                if (dragButton === "left") {
                    if (current === 1) {
                        setMainCell(r, c, 0, cell);
                    } else if (current === 0) {
                        setMainCell(r, c, 1, cell);
                    }
                    // current === 2 时保持不变
                }

                // 右键长按
                if (dragButton === "right") {
                    if (current === 0) {
                        setMainCell(r, c, 2, cell);
                    } else if (current === 2) {
                        setMainCell(r, c, 0, cell);
                    }
                    // current === 1 时保持不变
                }

                if (hintMode && secretVerified && isMiddleSelecting) {
                    const regionUnderCell = getRegionByCell(r, c);

                    if (regionUnderCell && !solvedRegions.has(regionUnderCell.id)) {
                        currentHoverRegionId = regionUnderCell.id;
                    } else {
                        currentHoverRegionId = null;
                    }

                    refreshRegionHighlight();
                }
            });

            cell.addEventListener("mouseleave", () => {
                // 不在这里 clear，避免跨格移动时闪烁
            });

            cell.addEventListener("mousedown", (e) => {
                if (gameFinished) return;
                e.preventDefault();

                // 提示模式 + 中键
                if (hintMode && secretVerified && e.button === 1) {
                    const regionUnderCell = getRegionByCell(r, c);

                    if (!regionUnderCell) return;
                    if (solvedRegions.has(regionUnderCell.id)) return;
                    if (activeRegion) return;

                    isMiddleSelecting = true;
                    currentHoverRegionId = regionUnderCell.id;
                    refreshRegionHighlight();
                    return;
                }

                const current = playerGrid[r][c];

                // 左键单击
                if (e.button === 0) {
                    isMouseDown = true;
                    dragButton = "left";

                    if (current === 1) {
                        setMainCell(r, c, 0, cell);
                    } else {
                        setMainCell(r, c, 1, cell);
                    }
                }

                // 右键单击
                if (e.button === 2) {
                    isMouseDown = true;
                    dragButton = "right";

                    if (current === 2) {
                        setMainCell(r, c, 0, cell);
                    } else {
                        setMainCell(r, c, 2, cell);
                    }
                }
            });

            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
            });

            fragment.appendChild(cell);
        }
    }

    board.appendChild(fragment);

    board.addEventListener("mouseleave", () => {
        clearHoverLine();
    });

    refreshRegionHighlight();
}


function refreshRegionHighlight() {
    const board = document.getElementById("board");
    const cells = board.querySelectorAll(".cell");

    cells.forEach((cell) => {
        cell.classList.remove("region-hover");

        if (!currentHoverRegionId) return;

        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);
        const region = getRegionById(currentHoverRegionId);

        if (region && isCellInRegion(row, col, region)) {
            cell.classList.add("region-hover");
        }
    });
}


/* =========================
   11. UI 事件
   ========================= */
function bindUIEvents() {
    const hintBtn = document.getElementById("hint-btn");
    const exitHintBtn = document.getElementById("exit-hint-btn");
    const secretInput = document.getElementById("secret-input");
    const closeLocalBtn = document.getElementById("close-local-btn");
    const checkLocalBtn = document.getElementById("check-local-btn");
    const backdrop = document.getElementById("local-modal-backdrop");
    const checkMainBtn = document.getElementById("check-main-btn");
    const finishCloseBtn = document.getElementById("finish-close-btn");
    const zoomInBtn = document.getElementById("zoom-in-btn");
    const zoomOutBtn = document.getElementById("zoom-out-btn");

    if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => {
            zoomScale = Math.min(MAX_ZOOM, +(zoomScale + ZOOM_STEP).toFixed(2));
            applyBoardZoom();
            updateZoomLabel();
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => {
            zoomScale = Math.max(MIN_ZOOM, +(zoomScale - ZOOM_STEP).toFixed(2));
            applyBoardZoom();
            updateZoomLabel();
        });
    }
    if (finishCloseBtn) {
        finishCloseBtn.addEventListener("click", hideFinishModal);
    }

    checkMainBtn.addEventListener("click", checkMainPuzzle);
    finishCloseBtn.addEventListener("click", hideFinishModal);
    hintBtn.addEventListener("click", () => {
        hintMode = true;
        updateHintUI();

        if (!secretVerified) {
            showHintImage();
            const secretInput = document.getElementById("secret-input");
            secretInput.focus();
        }
    });

    exitHintBtn.addEventListener("click", () => {
        hintMode = false;
        secretVerified = false;
        currentHoverRegionId = null;
        isMiddleSelecting = false;
        document.getElementById("secret-input").value = "";
        document.getElementById("secret-msg").textContent = "";
        updateHintUI();
        refreshRegionHighlight();
        hideHintImage();
    });
    secretInput.addEventListener("focus", () => {
        if (hintMode && !secretVerified) {
            showHintImage();
        }
    });

    secretInput.addEventListener("blur", () => {
        if (!secretVerified) {
            hideHintImage();
        }
    });
    secretInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const value = secretInput.value.trim();
            const msg = document.getElementById("secret-msg");
            const hintImage = document.getElementById("hint-image");

            if (value === SECRET_TEXT) {
                secretVerified = true;
                msg.style.color = "#1a7f37";
                msg.textContent = "口令正确，可以用鼠标中键选择局部。";
                hideHintImage();
            } else {
                secretVerified = false;
                msg.style.color = "#c0392b";
                msg.textContent = "口令错误，请重新输入。";
                secretInput.value = "";
            }

            updateHintUI();
        }
    });

    closeLocalBtn.addEventListener("click", closeLocalModal);
    backdrop.addEventListener("click", closeLocalModal);
    checkLocalBtn.addEventListener("click", checkLocalPuzzle);

    // 页面任意处鼠标松开
    /*document.addEventListener("mouseup", (e) => {
        // 主盘停止
        if (e.button === 0 || e.button === 2) {
            isMouseDown = false;
            drawMode = null;

            localIsMouseDown = false;
            localDrawMode = null;
        }

        // 中键选择局部
        if (e.button === 1 && isMiddleSelecting) {
            if (hintMode && secretVerified && currentHoverRegionId) {
                openLocalPuzzle(currentHoverRegionId);
            }

            isMiddleSelecting = false;
            currentHoverRegionId = null;
            refreshRegionHighlight();
        }
    });*/
    document.addEventListener("mouseup", (e) => {
        if (e.button === 0 || e.button === 2) {
            isMouseDown = false;
            //drawMode = null;
            dragButton = null;

            localIsMouseDown = false;
            //localDrawMode = null;
            localDragButton = null;
        }

        if (e.button === 1 && isMiddleSelecting) {
            if (hintMode && secretVerified && currentHoverRegionId) {
                openLocalPuzzle(currentHoverRegionId);
            }

            isMiddleSelecting = false;
            currentHoverRegionId = null;
            refreshRegionHighlight();
        }
    });

    document.addEventListener("contextmenu", (e) => {
        if (e.target.classList.contains("cell") || e.target.classList.contains("local-cell")) {
            e.preventDefault();
        }
    });
    window.addEventListener("blur", () => {
        isMouseDown = false;
        drawMode = null;
        localIsMouseDown = false;
        localDrawMode = null;
        isMiddleSelecting = false;
        currentHoverRegionId = null;
        refreshRegionHighlight();
    });
    document.addEventListener("mouseleave", () => {
        isMouseDown = false;
        drawMode = null;
        localIsMouseDown = false;
        localDrawMode = null;
    });
}

function updateHintUI() {
    const secretPanel = document.getElementById("secret-panel");
    const hintStatus = document.getElementById("hint-status");

    if (!hintMode) {
        secretPanel.style.display = "none";
        hintStatus.textContent = "当前未进入提示模式";
        return;
    }

    secretPanel.style.display = "block";

    if (!secretVerified) {
        hintStatus.textContent = "已进入提示模式，请先输入口令";
    } else {
        hintStatus.textContent = "提示模式已开启：按住鼠标中键选择局部";
    }
}


/* =========================
   12. 打开局部题
   ========================= */
function openLocalPuzzle(regionId) {
    const region = getRegionById(regionId);
    if (!region) return;
    if (activeRegion) return;

    activeRegion = region;
    localAnswerGrid = extractSubgrid(answerGrid, region);
    localPlayerGrid = createEmptyGrid(localAnswerGrid.length);

    const title = document.getElementById("local-title");
    const desc = document.getElementById("local-desc");
    const modal = document.getElementById("local-modal");
    const result = document.getElementById("local-result");

    title.textContent = `局部数织：${region.name}`;
    desc.textContent = `完成后点“核对局部”。正确则自动回填到主 25×25 棋盘。`;
    result.textContent = "";

    setupLocalLayout(region);
    renderLocalPuzzle();

    modal.classList.remove("hidden");
}

function closeLocalModal() {
    document.getElementById("local-modal").classList.add("hidden");
    document.getElementById("local-result").textContent = "";
    activeRegion = null;
    localDragButton = null;
    localAnswerGrid = [];
    localPlayerGrid = [];
    localIsMouseDown = false;
    localDrawMode = null;
}

function setupLocalLayout(region) {
    const localSize = region.rowEnd - region.rowStart + 1;

    // 局部题尺寸：小题更紧凑
    let cellSize = 28;
    let clueBand = 120;
    let clueWidth = 120;

    if (localSize === 15) {
        cellSize = 24;
        clueBand = 110;
        clueWidth = 110;
    }

    if (localSize === 5) {
        cellSize = 34;
        clueBand = 90;
        clueWidth = 90;
    }

    const wrapper = document.getElementById("local-wrapper");
    const topLeft = document.getElementById("local-top-left");
    const colClues = document.getElementById("local-col-clues");
    const rowClues = document.getElementById("local-row-clues");
    const board = document.getElementById("local-board");

    wrapper.style.gridTemplateColumns = `${clueWidth}px auto`;
    wrapper.style.gridTemplateRows = `${clueBand}px auto`;

    topLeft.style.width = `${clueWidth}px`;
    topLeft.style.height = `${clueBand}px`;
    topLeft.style.border = "2px solid #000";
    topLeft.style.background = "#f0f0f0";

    colClues.style.display = "grid";
    colClues.style.gridTemplateColumns = `repeat(${localSize}, ${cellSize}px)`;
    colClues.style.gridTemplateRows = `${clueBand}px`;
    colClues.style.borderTop = "2px solid #000";
    colClues.style.borderRight = "2px solid #000";
    colClues.style.borderBottom = "2px solid #000";

    rowClues.style.display = "grid";
    rowClues.style.gridTemplateColumns = `${clueWidth}px`;
    rowClues.style.gridTemplateRows = `repeat(${localSize}, ${cellSize}px)`;
    rowClues.style.borderLeft = "2px solid #000";
    rowClues.style.borderRight = "2px solid #000";
    rowClues.style.borderBottom = "2px solid #000";

    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${localSize}, ${cellSize}px)`;
    board.style.gridTemplateRows = `repeat(${localSize}, ${cellSize}px)`;
    board.style.borderRight = "2px solid #000";
    board.style.borderBottom = "2px solid #000";

    renderRowClues("local-row-clues", localAnswerGrid, true, cellSize, clueWidth);
    renderColClues("local-col-clues", localAnswerGrid, true, cellSize, clueBand);
}
//新增右侧/下方编号渲染
function renderSideLabels() {
    const rightLabels = document.getElementById("right-row-labels");
    const bottomLabels = document.getElementById("bottom-col-labels");

    rightLabels.innerHTML = "";
    bottomLabels.innerHTML = "";

    const rightFrag = document.createDocumentFragment();
    const bottomFrag = document.createDocumentFragment();

    for (let r = 0; r < SIZE; r++) {
        const label = document.createElement("div");
        label.className = "side-label right-row-label";
        label.dataset.row = r;
        label.textContent = r + 1;

        if (r % 5 === 0) {
            label.style.borderTop = "3px solid #000";
        }

        rightFrag.appendChild(label);
    }

    for (let c = 0; c < SIZE; c++) {
        const label = document.createElement("div");
        label.className = "side-label bottom-label bottom-col-label";
        label.dataset.col = c;
        label.textContent = c + 1;

        if (c % 5 === 0) {
            label.style.borderLeft = "3px solid #000";
        }

        bottomFrag.appendChild(label);
    }

    rightLabels.appendChild(rightFrag);
    bottomLabels.appendChild(bottomFrag);
}

/* =========================
   13. 局部题渲染与操作
   ========================= */
/*function setLocalCell(row, col, value, cellEl) {
    if (localPlayerGrid[row][col] === value) return;

    localPlayerGrid[row][col] = value;

    if (value === 1) {
        cellEl.classList.add("filled");
    } else {
        cellEl.classList.remove("filled");
    }
}*/
function applyLocalCellClass(cellEl, value) {
    cellEl.classList.remove("filled", "marked-empty");
    cellEl.textContent = "";

    if (value === 1) {
        cellEl.classList.add("filled");
        cellEl.textContent = "⬛";
    }

    if (value === 2) {
        cellEl.classList.add("marked-empty");
        cellEl.textContent = "✗";
    }
}

function setLocalCell(row, col, value, cellEl) {
    if (localPlayerGrid[row][col] === value) return;

    localPlayerGrid[row][col] = value;
    applyLocalCellClass(cellEl, value);
}

function setLocalCell(row, col, value, cellEl) {
    if (localPlayerGrid[row][col] === value) return;

    localPlayerGrid[row][col] = value;
    applyLocalCellClass(cellEl, value);
}

function handleLocalCellAction(row, col, cellEl) {
    if (localDrawMode === "fill") {
        setLocalCell(row, col, 1, cellEl);
    } else if (localDrawMode === "erase") {
        setLocalCell(row, col, 0, cellEl);
    }
}

/*function renderLocalPuzzle() {
    const board = document.getElementById("local-board");
    board.innerHTML = "";

    const localSize = localAnswerGrid.length;

    let cellSize = 28;
    if (localSize === 15) cellSize = 24;
    if (localSize === 5) cellSize = 34;

    const fragment = document.createDocumentFragment();

    for (let r = 0; r < localSize; r++) {
        for (let c = 0; c < localSize; c++) {
            const cell = document.createElement("div");
            cell.classList.add("local-cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;

            if (localPlayerGrid[r][c] === 1) {
                cell.classList.add("filled");
            }

            if (c % 5 === 0) {
                cell.classList.add("local-thick-left");
            }

            if (r % 5 === 0) {
                cell.classList.add("local-thick-top");
            }

            cell.addEventListener("mousedown", (e) => {
                e.preventDefault();

                // 左键：填涂
                if (e.button === 0) {
                    localIsMouseDown = true;
                    localDrawMode = "fill";
                    handleLocalCellAction(r, c, cell);
                }

                // 右键：擦除
                if (e.button === 2) {
                    localIsMouseDown = true;
                    localDrawMode = "erase";
                    handleLocalCellAction(r, c, cell);
                }
            });

            cell.addEventListener("mouseenter", () => {
                if (localIsMouseDown && localDrawMode) {
                    handleLocalCellAction(r, c, cell);
                }
            });

            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
            });

            fragment.appendChild(cell);
        }
    }

    board.appendChild(fragment);
}*/
function renderLocalPuzzle() {
    const board = document.getElementById("local-board");
    board.innerHTML = "";

    const localSize = localAnswerGrid.length;

    let cellSize = 28;
    if (localSize === 15) cellSize = 24;
    if (localSize === 5) cellSize = 34;

    const fragment = document.createDocumentFragment();

    for (let r = 0; r < localSize; r++) {
        for (let c = 0; c < localSize; c++) {
            const cell = document.createElement("div");
            cell.classList.add("local-cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;

            if (c % 5 === 0) {
                cell.classList.add("local-thick-left");
            }

            if (r % 5 === 0) {
                cell.classList.add("local-thick-top");
            }

            applyLocalCellClass(cell, localPlayerGrid[r][c]);

            cell.addEventListener("mousedown", (e) => {
                if (gameFinished) return;
                e.preventDefault();

                const current = localPlayerGrid[r][c];

                if (e.button === 0) {
                    localIsMouseDown = true;
                    localDragButton = "left";

                    if (current === 1) {
                        setLocalCell(r, c, 0, cell);
                    } else {
                        setLocalCell(r, c, 1, cell);
                    }
                }

                if (e.button === 2) {
                    localIsMouseDown = true;
                    localDragButton = "right";

                    if (current === 2) {
                        setLocalCell(r, c, 0, cell);
                    } else {
                        setLocalCell(r, c, 2, cell);
                    }
                }
            });

            cell.addEventListener("mouseenter", () => {
                if (!localIsMouseDown || !localDragButton) return;

                const current = localPlayerGrid[r][c];

                if (localDragButton === "left") {
                    if (current === 1) {
                        setLocalCell(r, c, 0, cell);
                    } else if (current === 0) {
                        setLocalCell(r, c, 1, cell);
                    }
                }

                if (localDragButton === "right") {
                    if (current === 0) {
                        setLocalCell(r, c, 2, cell);
                    } else if (current === 2) {
                        setLocalCell(r, c, 0, cell);
                    }
                }
            });

            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
            });

            fragment.appendChild(cell);
        }
    }

    board.appendChild(fragment);
}

function checkLocalPuzzle() {
    if (!activeRegion) return;

    for (let r = 0; r < localAnswerGrid.length; r++) {
        for (let c = 0; c < localAnswerGrid[0].length; c++) {
            const localPlayerIsBlack = localPlayerGrid[r][c] === 1 ? 1 : 0;
            if (localPlayerIsBlack !== localAnswerGrid[r][c]) {
                document.getElementById("local-result").textContent = "局部还没解对，请继续。";
                document.getElementById("local-result").style.color = "#c0392b";
                return;
            }
        }
    }

    applySubgridToMain(activeRegion, localPlayerGrid);
    solvedRegions.add(activeRegion.id);
    renderBoard();

    document.getElementById("local-result").textContent = "局部正确，已回填到主盘。";
    document.getElementById("local-result").style.color = "#1a7f37";

    setTimeout(() => {
        closeLocalModal();
    }, 500);
}

//新增计时器
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    return `${mm}:${ss}`;
}

function updateTimerUI() {
    document.getElementById("timer-text").textContent = formatTime(timerSeconds);
}

function startTimer() {
    if (timerInterval || gameFinished) return;

    timerInterval = setInterval(() => {
        timerSeconds += 1;
        updateTimerUI();
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
//核对函数
function checkMainPuzzle() {
    if (gameFinished) return;

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const playerIsBlack = playerGrid[r][c] === 1 ? 1 : 0;
            if (playerIsBlack !== answerGrid[r][c]) {
                const resultEl = document.getElementById("main-check-result");
                resultEl.textContent = "未全部正确填涂";
                resultEl.style.color = "#c0392b";
                return;
            }
        }
    }

    function showAchievementToast() {
        if (achievementShown) return;
        achievementShown = true;

        const toast = document.getElementById("achievement-toast");
        toast.classList.remove("hidden");
        toast.classList.remove("show");

        // 触发动画
        void toast.offsetWidth;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.add("hidden");
        }, 5200);
    }

    // 全部正确
    gameFinished = true;
    stopTimer();

    const resultEl = document.getElementById("main-check-result");
    resultEl.textContent = "全部正确！";
    resultEl.style.color = "#1a7f37";

    showFinishModal();
    showAchievementToast();
}
function showFinishModal() {
    const modal = document.getElementById("finish-modal");
    const message = document.getElementById("finish-message");

    if (message) {
        message.textContent = "任务完成，用时不到0.01个火星年，你就是世界上最聪明的人！";
    }

    if (modal) {
        modal.classList.remove("hidden");
    }
}

function hideFinishModal() {
    const modal = document.getElementById("finish-modal");
    if (modal) {
        modal.classList.add("hidden");
    }
}
/* =========================
   14. 启动
   ========================= */
initGame();