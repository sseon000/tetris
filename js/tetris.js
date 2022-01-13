// DOM
const playground = document.querySelector(".playground > ul")

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// Varilables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
    tree: [
        [[2,1],[0,1],[1,0],[1,1]],
        [],
        [],
        [],
    ]
}

const movingItem = {
    type: "tree",
    direction: 0,
    top: 0,
    left: 3,
};

init();

// Functions
function init() {
    tempMovingItem = {...movingItem};   
    for(let i=0; i<20; i++){
        prependNewLine();
    }
    renderBlocks();
}
function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j=0; j<10; j++){
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}
function renderBlocks() {
    const { type, direction, top, left } = tempMovingItem;
    console.log(type,direction,top,left);
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving =>{
        moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].forEach(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target); 
        if(isAvailable){       
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = { ...movingItem }
            setTimeout(()=>{
                renderBlocks();
            },0)
        }
    });
}
function checkEmpty(target){
    if(!target){
        return false;
    }
    return true;
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks();
}
// Event handling
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39: 
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left",-1);
            break;
        case 40:
            moveBlock("top", 1);
            break;    
        default:
            break;
    }
})