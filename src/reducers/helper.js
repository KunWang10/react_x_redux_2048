import { toast } from 'react-toastify';

/**
 * Initialize the Game
 * Starting with two random position of 2s OR 
 * a random position of 2 and a random position of 4
 * @returns {array} The initial state of the game
 */
export function initializeGame() {
    let a = Math.floor((Math.random() * 16));
    let b = Math.floor((Math.random() * 16));
    while (b === a) {
        b = Math.floor((Math.random() * 16));
    }
    let x0 = Math.floor(a / 4);
    let y0 = a % 4;

    let x1 = Math.floor(b / 4);
    let y1 = b % 4;

    let state = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    state[x0][y0] = setRandomValue();
    state[x1][y1] = state[x0][y0] === 4 ? 2 : setRandomValue();

    return state;
}

/**
 * The probability of 2: 90%
 * The probability of 4: 10%  
 * @returns {number} a number 2 or 4
 */
function setRandomValue() {
    return Math.random() < 0.9 ? 2 : 4;
}

/**
 * 
 * @param {Object} state The state before the move and merge
 * @param {number} direction The direction of the move the player made: 
 * left     37
 * up       38
 * right    39
 * down     40
 * @returns {Object} The state after the move and merge
 */

export function moveAndMerge(state, direction) {

    let keep = copy(state.state);

    state = move(state, direction);
    state = merge(state, direction);
    state = move(state, direction);

    if (isEqual(keep, state.state)) {
        console.log("Failed move!")
        toast("Invalid move!");
        return state;
    }

    toast.dismiss();
    let temp = copy(state.state);
    let score = state.score;
    let target = state.target;
    temp = addTile(temp);

    return {
        state: temp,
        score: score,
        target: target
    }

}

/**
 * 
 * @param {Object} state The state before the move
 * @param {number} direction The direction of the move the player made: 
 * left     37/65
 * up       38/87
 * right    39/68
 * down     40/83
 * @returns {Object} The state after the move
 */
function move(state, direction) {

    let score = state.score;
    let target = state.target;    
    //let keep = copy(state.state);
    let temp = copy(state.state);
    let result = [];
    switch (direction) {
        case 37: // left
        case 65:
            temp.forEach(element => {
                let after = [];
                for (let i = 0; i < 4; i++) {
                    if (element[i] !== 0) {
                        after.push(element[i]);
                    }
                }
                while (after.length < 4) {
                    after.push(0);
                }
                result.push(after);
            });

            break;
        case 38: // up
        case 87:
            result = state.state;
            for (let j = 0; j < 4; j++) {
                let after = [];
                for (let i = 0; i < 4; i++) {
                    if (temp[i][j] !== 0) {
                        after.push(temp[i][j]);
                    }
                }
                while (after.length < 4) {
                    after.push(0);
                }
                for (let i = 0; i < 4; i++) {
                    result[i][j] = after[i];
                }
            }


            break;
        case 39: // right
        case 68:
            temp.forEach(element => {
                let after = [];
                for (let i = 3; i >= 0; i--) {
                    if (element[i] !== 0) {
                        after.push(element[i]);
                    }
                }
                while (after.length < 4) {
                    after.push(0);
                }
                result.push(after.reverse());
            });

            break;
        case 40: // down
        case 83:
            result = state.state;
            for (let j = 0; j < 4; j++) {
                let after = [];
                for (let i = 3; i >= 0; i--) {
                    if (temp[i][j] !== 0) {
                        after.push(temp[i][j]);
                    }
                }
                while (after.length < 4) {
                    after.push(0);
                }
                after = after.reverse();
                for (let i = 0; i < 4; i++) {
                    result[i][j] = after[i];
                }
            }

            break;
        default:
            break;
    }

    return {
        state: result,
        score: score,
        target: target
    };

}

function merge(state, direction) {
    let score = state.score;
    let target = state.target;    
    let temp = copy(state.state);
    switch (direction) {
        case 37: // left
        case 65:
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    if (temp[i][j] !== 0 && temp[i][j + 1] !== 0 && temp[i][j] === temp[i][j + 1]) {
                        temp[i][j] *= 2;
                        temp[i][j + 1] = 0;
                        score += temp[i][j];
                    }
                }
            }
            break;
        case 38: // up
        case 87:
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < 3; i++) {
                    if (temp[i][j] !== 0 && temp[i + 1][j] !== 0 && temp[i][j] === temp[i + 1][j]) {
                        temp[i][j] *= 2;
                        temp[i + 1][j] = 0;
                        score += temp[i][j];
                    }
                }
            }

            break;
        case 39: // right
        case 68:
            for (let i = 0; i < 4; i++) {
                for (let j = 3; j > 0; j--) {
                    if (temp[i][j] !== 0 && temp[i][j - 1] !== 0 && temp[i][j] === temp[i][j - 1]) {
                        temp[i][j] *= 2;
                        temp[i][j - 1] = 0;
                        score += temp[i][j];
                    }
                }
            }

            break;
        case 40: // down
        case 83:
            for (let j = 0; j < 4; j++) {
                for (let i = 3; i > 0; i--) {
                    if (temp[i][j] !== 0 && temp[i - 1][j] !== 0 && temp[i][j] === temp[i - 1][j]) {
                        temp[i][j] *= 2;
                        temp[i - 1][j] = 0;
                        score += temp[i][j];
                    }
                }
            }

            break;
        default:
            break;
    }

    return {
        state: temp,
        score: score,
        target: target
    }

}

function copy(array) {
    let rtn = [];
    for (let i = 0; i < 4; i++) {
        let me = [];
        for (let j = 0; j < 4; j++) {
            me.push(array[i][j])
        }
        rtn.push(me);
    }
    return rtn;
}

function isEqual(me, you) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (me[i][j] !== you[i][j]) {
                return false;
            }
        }
    }
    return true;
}


function addTile(array) {
    let rtn = copy(array);
    let candidates = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (rtn[i][j] === 0) {
                candidates.push(i * 4 + j);
            }
        }
    }

    let k = Math.floor(Math.random() * candidates.length);
    k = candidates[k];

    let x = Math.floor(k / 4);
    let y = k % 4;
    rtn[x][y] = setRandomValue();

    return rtn;
}


//TODO: complete following functions
export function isWin(state) {
    let max = 0;
    state.state.forEach(array => (
        array.forEach(point => {
            max = point > max ? point : max;
        })
    ))
    return (max === state.target);
}

export function doubleTarget(state) {
    let temp = state.state;
    let score = state.score;
    let target = state.target * 2;
    return {
        state: temp,
        score: score,
        target: target
    }
}

function isLose(state) {

}
//TODO
// Enable user to continue the game after they reach 2048



