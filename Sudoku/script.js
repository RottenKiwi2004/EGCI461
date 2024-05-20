// let startBoard = [
//     0, 2, 9, 0, 5, 4, 0, 3, 0,
//     0, 0, 5, 9, 7, 0, 0, 0, 2,
//     0, 8, 0, 0, 0, 1, 9, 0, 6,
//     0, 0, 3, 0, 0, 0, 7, 0, 9,
//     0, 0, 0, 0, 9, 0, 0, 4, 0,
//     8, 0, 0, 0, 0, 0, 0, 6, 0,
//     0, 3, 8, 5, 0, 9, 0, 7, 0,
//     4, 1, 0, 0, 0, 0, 3, 9, 0,
//     0, 5, 6, 4, 0, 7, 1, 0, 8,
// ];

// let startBoard = [
//     4, 1, 0, 7, 0, 0, 2, 0, 9,
//     8, 7, 9, 0, 0, 4, 1, 0, 0, 
//     0, 0, 0, 9, 1, 0, 8, 4, 7, 
//     0, 9, 7, 0, 4, 0, 0, 0, 0, 
//     0, 0, 8, 0, 7, 0, 0, 0, 0,
//     0, 0, 5, 8, 0, 1, 0, 0, 0,
//     0, 8, 2, 0, 6, 7, 4, 0, 0,
//     0, 0, 0, 4, 0, 8, 3, 7, 2,
//     7, 0, 4, 0, 0, 0, 6, 0, 8
// ];

// let startBoard = [
//     4, 2, 0, 8, 0, 6, 0, 0, 0,
//     8, 0, 0, 0, 0, 0, 0, 0, 4,
//     0, 7, 1, 2, 4, 0, 9, 0, 0,
//     0, 0, 4, 1, 5, 0, 0, 0, 7,
//     0, 0, 5, 6, 2, 7, 0, 3, 8,
//     0, 6, 8, 0, 3, 0, 0, 0, 0,
//     0, 9, 2, 5, 8, 1, 0, 4, 0,
//     1, 4, 0, 3, 0, 0, 0, 5, 9,
//     0, 0, 0, 9, 6, 4, 0, 1, 0
// ];

// let startBoard = [
//     1, 8, 4, 9, 0, 6, 0, 0, 0,
//     6, 7, 0, 0, 0, 0, 8, 0, 9,
//     3, 0, 0, 8, 0, 5, 0, 1, 4,
//     0, 0, 7, 0, 0, 8, 9, 3, 0,
//     2, 3, 1, 0, 9, 7, 0, 6, 0,
//     0, 0, 0, 0, 4, 3, 7, 5, 0,
//     7, 2, 0, 4, 0, 1, 0, 8, 6,
//     0, 0, 0, 0, 0, 0, 2, 4, 0,
//     4, 5, 3, 6, 8, 0, 1, 0, 7 
// ]

// let startBoard = [
//     8, 0, 0, 1, 4, 0, 0, 0, 0,
//     2, 0, 0, 0, 0, 6, 1, 7, 0,
//     0, 9, 0, 0, 8, 0, 0, 5, 0,
//     0, 2, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 2, 0, 9, 4, 8, 6,
//     0, 0, 0, 0, 7, 0, 0, 0, 0,
//     0, 3, 0, 8, 0, 0, 9, 0, 0,
//     0, 0, 0, 0, 0, 0, 5, 0, 0,
//     9, 0, 0, 0, 0, 0, 0, 0, 0
// ];

let startBoard = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
]


const MAIN_GRID = document.querySelector("#main");
const NUM_GRID = [];
for(let k=1; k<=9; k++) NUM_GRID[k] = document.querySelector(`#n${k}`);

const EMPTY = 0;
const FOCUSED = 1;
const OCCUPIED = 2, NO = 2;
const FOCUSED_OCCUPIED = 3, FOCUSED_NO = 3;

let paused = true;

// Add cells to the grids
document.querySelectorAll(".grid").forEach(e=>{

    if (e.classList.contains("grids")) return;

    for(let i=0; i<9; i++) {
        for(let j=0; j<9; j++) {
            const cell = document.createElement("div");
            cell.className = `cell r${i} c${j}`;

            // Make 3x3 grid thick!
            if (i % 3 == 2)
                cell.style.borderBottom = "3px solid #000";
            if (j % 3 == 2)
                cell.style.borderRight = "3px solid #000";
            if (i == 0)
                cell.style.borderTop = "3px solid #000";
            if (j == 0)
                cell.style.borderLeft = "3px solid #000";
            e.appendChild(cell);
        }
    }
})

class Sudoku {

    stuck = false;
    solved = false;

    // Initialising new Sudoku board
    constructor(board, states, gridState) {
        this.board = board;
        this.states = states;
        this.gridState = gridState;
        this.displayBoard();
    }

    // Update HTML with current state
    displayBoard() {

        for(let i=0; i<9; i++) {
            for(let j=0; j<9; j++) {

                let cell = MAIN_GRID.querySelector(`.cell.r${i}.c${j}`);
                // console.log(cell);
                let num = this.board[i * 9 + j];
                cell.textContent = num == 0 ? "" : num;

                // Set colour of grid state
                switch (this.gridState[i * 9 + j]) {
                    case EMPTY:
                        cell.classList.remove('focused');
                        cell.classList.remove('occupied');
                        break;
                    case FOCUSED:
                    case FOCUSED_OCCUPIED:
                        cell.classList.add('focused');
                        cell.classList.remove('occupied');
                        break;
                    case OCCUPIED:
                        cell.classList.remove('focused');
                        cell.classList.add('occupied');
                        break;
                }

                // Set colour of each number state
                for(let k=1; k<=9; k++) {
                    let cell = NUM_GRID[k].querySelector(`.cell.r${i}.c${j}`);
                    // console.log(k, i, j, this.states[k - 1][i * 9 + j])
                    switch (this.states[k - 1][i * 9 + j]) {
                        case EMPTY:
                            cell.classList.remove('focused');
                            cell.classList.remove('no');
                            break;
                        case FOCUSED:
                        case FOCUSED_NO:
                            cell.classList.add('focused');
                            cell.classList.remove('no');
                            break;
                        case NO:
                            cell.classList.remove('focused');
                            cell.classList.add('no');
                            break;
                    }
                }
            }
        }
    }

    * fillRow(num, row) {
        for(let i=0; i<9; i++) {
            this.states[num-1][row * 9 + i] = NO;
            this.focusNumCell(num-1, row, i);
            this.displayBoard();
            yield;
        }
    }

    * fillCol(num, col) {
        for(let i=0; i<9; i++) {
            this.states[num-1][i * 9 + col] = NO;
            this.focusNumCell(num-1, i, col);
            this.displayBoard();
            yield;
        }
    }

    * fillGrid(num, row, col) {
    
        let r = row - row % 3;
        let c = col - col % 3;

        for(let i=r; i<r+3; i++) {
            for(let j=c; j<c+3; j++) {
                this.states[num-1][i * 9 + j] = NO;
                this.focusNumCell(num-1, i, j);
                this.displayBoard();
                yield;
            }
        }
        
    }

    * fillCell (row, col) {
        for(let k=0; k<9; k++) {
            this.states[k][row * 9 + col] = NO;
            this.focusNumCell(k, row, col);
        }
        this.displayBoard();
    }

    getCellsInRow(num, row) {
        let arr = [];
        for (let j=0; j<9; j++) {
            if (this.states[num][row * 9 + j] < 2)
                arr.push(j);
        }
        return arr;
    }

    getCellsInCol(num, col) {
        let arr = [];
        for (let j=0; j<9; j++) {
            if (this.states[num][j * 9 + col] < 2)
                arr.push(j);
        }
        return arr;
    }

    getCellsIn3x3(num, row, col) {
        let arr = [];
        let r = row - row % 3;
        let c = col - col % 3;
        for (let i=r; i<r+3; i++) {
            for(let j=c; j<c+3; j++) {
                if (this.states[num][i * 9 + j] < 2)
                    arr.push([i, j]);
            }
        }
        return arr;
    }

    solveCell(row, col) {
        for(let num=0; num<9; num++) {

            let selected;

            // Check row
            let arrRow = this.getCellsInRow(num, row);
            if (arrRow.length == 1) selected = arrRow[0];
            if (selected != null) {
                console.log(`Row: (${row+1}, ${selected+1}) = ${num+1}`);
                this.board[row * 9 + selected] = num + 1;
                return true;
            }

            // Check col
            let arrCol = this.getCellsInCol(num, col);
            if (arrCol.length == 1) selected = arrCol[0];
            if (selected != null) {
                console.log(`Col: (${selected+1}, ${col+1}) = ${num+1}`);
                this.board[selected * 9 + col] = num + 1;
                return true;
            }

            // Check 3x3
            let arr3x3 = this.getCellsIn3x3(num, row, col);
            if (arr3x3.length == 1) selected = arr3x3[0];
            if (selected != null) {
                console.log(`3x3: (${selected[0]+1}, ${selected[1]+1}) = ${num+1}`);
                this.board[selected[0] * 9 + selected[1]] = num + 1;
                return true;
            }
        }

        let arr = [];
        for(let num=0; num<9; num++) {
            if (this.states[num][row * 9 + col] < 2)
                arr.push(num);
        }
        if (arr.length != 1) return false;
        this.board[row * 9 + col] = arr[0] + 1;
        return true; 
    }

    getMoves() {
        console.log("Getting new moves...");
        for(let i=0; i<9; i++) {
            for(let j=0; j<9; j++) {
                if (this.board[i * 9 + j] == 0) {
                    let arr = [];
                    for(let k=0; k<9; k++) {
                        if (this.states[k][i * 9 + j] < 2)
                            arr.push(k);
                    }
                    if (arr.length == 0) continue;
                    let result = [[i, j], arr];
                    return result;
                }
            }
        }
            
    }

    * solve() {
        while (true) {
            let filled = false;
            for(let i=0; i<9; i++) {
                for(let j=0; j<9; j++) {

                    // Cursor for main grid and all num
                    this.focusCell(i, j);
                    for(let k=0; k<9; k++) {
                        this.focusNumCell(k, i, j);
                    }

                    // Main logic goes here
                    let isEmpty = this.board[i * 9 + j] == 0;
                    let isCalculated = this.gridState[i * 9 + j] > 1;

                    // This cell is finished
                    if (!isEmpty && isCalculated) continue;

                    // Got the number, eliminate choices
                    if (!isEmpty) {
                        let num = this.board[i * 9 + j];
                        yield * this.fillRow(num, i);
                        yield * this.fillCol(num, j);
                        yield * this.fillGrid(num, i, j);
                        yield * this.fillCell(i, j);
                        this.gridState[i * 9 + j] = OCCUPIED;
                        filled = true;
                        yield;
                        continue;
                    }

                    // No number, find one
                    if (isEmpty) {
                        filled = filled || this.solveCell(i, j);
                        if (this.board[i * 9 + j] == 0) continue;
                        let num = this.board[i * 9 + j];
                        yield * this.fillRow(num, i);
                        yield * this.fillCol(num, j);
                        yield * this.fillGrid(num, i, j);
                        yield * this.fillCell(i, j);
                        this.gridState[i * 9 + j] = OCCUPIED;
                        filled = true;
                        yield;
                    }

                    this.displayBoard();
                    yield;
                }
            }
            if (!filled) {
                this.stuck = true;
                this.solved = this.isSolved();
                break;
            }
        }
    }

    isSolved() {
        for(let i=0; i<81; i++) {
            if (this.board[i] == 0) return false;
        }
        return true;
    }

    focusCell(row, col) {
        for(let i=0; i<81; i++) {
            if (row * 9 + col == i) {
                this.gridState[i] = this.gridState[i] == OCCUPIED ? FOCUSED_OCCUPIED : FOCUSED;
            }
            else if (this.gridState[i] % 2 == 1) {
                this.gridState[i] = this.gridState[i] == FOCUSED_OCCUPIED ? OCCUPIED : EMPTY;
            }
        }
    }

    focusNumCell(k, row, col) {
        for(let i=0; i<81; i++) {
            if (row * 9 + col == i) {
                this.states[k][i] = this.states[k][i] == NO ? FOCUSED_NO : FOCUSED;
            }
            else if (this.states[k][i] % 2 == 1) {
                this.states[k][i] = this.states[k][i] == FOCUSED_NO ? NO : EMPTY;
            }
        }
    }

}

let startState = [];
for(let k=0; k<9; k++) {
    startState.push([]);
    for (let i=0; i<81; i++)
        startState[k].push(0);
}

let gridState = [];

for (let i=0; i<81; i++)
    gridState.push(0);

let state = new Sudoku(startBoard, startState, gridState);

let searchStack = [state];

function * DFS() {

    while (paused) yield;

    // Stack not empty
    while (searchStack.length > 0) {
        console.log(searchStack);
        // Remove last element
        s = searchStack.pop();
        yield * s.solve();
        if (s.stuck) {
            let move = s.getMoves();
            console.log(move);
            if (move == undefined) {
                if (s.solved) {
                    console.log("Sudoku solved!!!")
                    console.log("Clearing stack...");
                    searchStack = [];
                    return;
                }
                continue;
            }
            for(let num of move[1]) {
                console.log(`Trying ${num+1} at (${move[0][0]+1}, ${move[0][1]+1})`);
                // Deep copy board, state, and grid state to new searches
                let newStartBoard = structuredClone(s.board);
                newStartBoard[move[0][0] * 9 + move[0][1]] = num+1;
                let newStartState = structuredClone(s.states);
                let newStartGrid  = structuredClone(s.gridState);
                let newState = new Sudoku(newStartBoard, newStartState, newStartGrid);
                searchStack.push(newState);
            }
            // pause();
            // while(paused) yield;
        }
    }
}

let iterate = DFS();

function step() {
    iterate.next();
}

setInterval(step, 1);

function pause() {
    paused = !paused;
}