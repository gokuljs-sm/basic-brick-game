/**
    * @Auther : Gokul J S (yougovideo.com, greenpark809@gmail.com) 
    ** Don't change this comment.
*/

const direction = [ "H", "V" ], position = [ 1, 2, 3, 4, 5, 6 ], vert_position = [ 1, 2, 3, 4, 5, 6, 7, 8 ], colors = [ 'rgb(255, 195, 0)', 'rgb(255, 87, 51)', 'rgb(52, 152, 219)', 'rgb(40, 180, 99)' ];
var init, pouring, box_ids, settled, initiated = false, horz_pos = null, game_mode = false, settled_boxes = [], num_cols = 8, num_rows = 8;

var a = document.createElement('table');
document.getElementById('game-location').appendChild(a);

for(let i = 1; i <= num_rows; i++){

    var b = document.createElement('tr'); b.setAttribute('id', 'r-'+i); a.appendChild(b);

    for(let j = 1; j <= num_cols; j++){
        var c = document.createElement('td'); c.setAttribute('id', i + '-' + j); c.setAttribute('style', 'height: 30px; width: 30px;'); b.appendChild(c);
    }

}

function startPouring(){
    if(game_mode === true){
        if(horz_pos === null){
            init = getDirPos();
            if(init !== false){
                horz_pos = init[1];
                settled = false;
            }else{
                alert('Something went wrong');
            }
        }

        pouring = setInterval(bricksPouring, 500);
    }
}

function bricksPouring(){
    switch (init[0]) {
        case 'H':
            // erase the previous boxes
            if(initiated === true){
                document.getElementById(box_ids[0]).style.backgroundColor = null;
                document.getElementById(box_ids[1]).style.backgroundColor = null;
                document.getElementById(box_ids[2]).style.backgroundColor = null;
            }

            // get the box ids
            box_ids = getBoxHorizontalIds();

            // let find the before objects
            var find = getFrontObjects('H');

            // set the box background;
            if(typeof(find) === "undefined"){
                settled = true; initiated = false; horz_pos = null;
                clearInterval(pouring);
                alert('Something went wrong');
                window.location.reload(true);
            }
            
            if(typeof(find) === "object"){
                if(find.stoppedAtRow === 1){
                    settled = true; initiated = false; horz_pos = null; game_mode = false;
                    clearInterval(pouring);
                    alert('Game over');
                    window.location.reload(true);
                }else if(find.stoppedAtRow === parseInt(box_ids[0].substring(0, 1))){
                    document.getElementById(box_ids[0]).style.backgroundColor = init[2];
                    document.getElementById(box_ids[1]).style.backgroundColor = init[2];
                    document.getElementById(box_ids[2]).style.backgroundColor = init[2];

                    // push to the settled array
                    settled_boxes.push(box_ids[0]); 
                    settled_boxes.push(box_ids[1]); 
                    settled_boxes.push(box_ids[2]); 

                    if(find.isFrontBoxOccupied === true){
                        if(find.isColorSame === true){
                            // empty the front boxes
                            if(typeof(find.frontBoxes) === "object"){
                                document.getElementById(find.frontBoxes[0]).style.backgroundColor = "";
                                document.getElementById(find.frontBoxes[1]).style.backgroundColor = "";
                                document.getElementById(find.frontBoxes[2]).style.backgroundColor = "";

                                // empty the current boxes
                                document.getElementById(box_ids[0]).style.backgroundColor = "";
                                document.getElementById(box_ids[1]).style.backgroundColor = "";
                                document.getElementById(box_ids[2]).style.backgroundColor = "";

                                // remove the settled array position or it to be null
                                if(settled_boxes.indexOf(box_ids[0]) !== -1){
                                    settled_boxes[settled_boxes.indexOf(box_ids[0])] = "0-0";
                                }

                                if(settled_boxes.indexOf(find.frontBoxes[0]) !== -1){
                                    settled_boxes[settled_boxes.indexOf(find.frontBoxes[0])] = "0-0";
                                }

                                if(settled_boxes.indexOf(box_ids[1]) !== -1){
                                    settled_boxes[settled_boxes.indexOf(box_ids[1])] = "0-0";
                                }

                                if(settled_boxes.indexOf(find.frontBoxes[1]) !== -1){
                                    settled_boxes[settled_boxes.indexOf(find.frontBoxes[1])] = "0-0";
                                }

                                if(settled_boxes.indexOf(box_ids[1]) !== -1){
                                    settled_boxes[settled_boxes.indexOf(box_ids[1])] = "0-0";
                                }

                                if(settled_boxes.indexOf(find.frontBoxes[2]) !== -1){
                                    settled_boxes[settled_boxes.indexOf(find.frontBoxes[2])] = "0-0";
                                }

                                // set the score
                                set_the_score();
                            }else{
                                alert('Something went wrong. Please refresh the browser');
                            }
                        }
                    }
                    settled = true; initiated = false; horz_pos = null;
                    clearInterval(pouring);
                    startPouring();
                }else{
                    document.getElementById(box_ids[0]).style.backgroundColor = init[2];
                    document.getElementById(box_ids[1]).style.backgroundColor = init[2];
                    document.getElementById(box_ids[2]).style.backgroundColor = init[2];
                }
            }

            break;

        case 'V':
            // erase the previous boxes
            if(initiated === true){
                document.getElementById(box_ids[0]).style.backgroundColor = null;
                if(box_ids[1] !== null){
                    document.getElementById(box_ids[1]).style.backgroundColor = null;
                }

                if(box_ids[2] !== null){
                    document.getElementById(box_ids[2]).style.backgroundColor = null;
                }
            }

            // get the vertical box ids
            box_ids = getBoxVerticalIds();

            // let find the before objects
            var find = getFrontObjects('V');

            // set the box background;
            if(find.stoppedAtRow === 1 || find.stoppedAtRow === 2 || find.stoppedAtRow === 3){
                settled = true; initiated = false; horz_pos = null; game_mode = false;
                clearInterval(pouring);
                alert('Game over');
                window.location.reload(true);
            }else if(find.stoppedAtRow === parseInt(box_ids[0].substring(0, 1))){
                document.getElementById(box_ids[0]).style.backgroundColor = init[2];
                document.getElementById(box_ids[1]).style.backgroundColor = init[2];
                document.getElementById(box_ids[2]).style.backgroundColor = init[2];

                // push to the settled array
                settled_boxes.push(box_ids[0]); 
                settled_boxes.push(box_ids[1]); 
                settled_boxes.push(box_ids[2]);

                // find the same side boxes 
                var side = getSideBoxDetails();
                if(typeof(side) === "object"){
                    if(side.isColorSame === true){
                        // empty the side boxes
                        if(typeof(side.sideBoxes) === "object"){
                            document.getElementById(side.sideBoxes[0]).style.backgroundColor = "";
                            document.getElementById(side.sideBoxes[1]).style.backgroundColor = "";
                            document.getElementById(side.sideBoxes[2]).style.backgroundColor = "";
                        
                            // empty the current boxes
                            document.getElementById(box_ids[0]).style.backgroundColor = "";
                            document.getElementById(box_ids[1]).style.backgroundColor = "";
                            document.getElementById(box_ids[2]).style.backgroundColor = "";

                            // remove the settled array position or it to be null
                            if(settled_boxes.indexOf(box_ids[0]) !== -1){
                                settled_boxes[settled_boxes.indexOf(box_ids[0])] = "0-0";
                            }

                            if(settled_boxes.indexOf(side.sideBoxes[0]) !== -1){
                                settled_boxes[settled_boxes.indexOf(side.sideBoxes[0])] = "0-0";
                            }

                            if(settled_boxes.indexOf(box_ids[1]) !== -1){
                                settled_boxes[settled_boxes.indexOf(box_ids[1])] = "0-0";
                            }

                            if(settled_boxes.indexOf(side.sideBoxes[1]) !== -1){
                                settled_boxes[settled_boxes.indexOf(side.sideBoxes[1])] = "0-0";
                            }

                            if(settled_boxes.indexOf(box_ids[1]) !== -1){
                                settled_boxes[settled_boxes.indexOf(box_ids[1])] = "0-0";
                            }

                            if(settled_boxes.indexOf(side.sideBoxes[2]) !== -1){
                                settled_boxes[settled_boxes.indexOf(side.sideBoxes[2])] = "0-0";
                            }

                            // set the score
                            set_the_score();
                        }
                    }
                }else{
                    settled = true; initiated = false; horz_pos = null; game_mode = false;
                    clearInterval(pouring);
                    alert('Something went wrong');
                    window.location.reload(true);
                }

                settled = true; initiated = false; horz_pos = null;
                clearInterval(pouring);
                startPouring();
            }else{
                document.getElementById(box_ids[0]).style.backgroundColor = init[2];
                if(box_ids[1] !== null){
                    document.getElementById(box_ids[1]).style.backgroundColor = init[2];
                }

                if(box_ids[2] !== null){
                    document.getElementById(box_ids[2]).style.backgroundColor = init[2];
                }
            }

            break;

        default:
            console.log('Something went wrong');
            break;
    }
}

function getFrontObjects(Dir){
    
    switch (Dir) {

        case 'H':
            var box_lenth; 
            if(parseInt(box_ids[0].substring(0, 1)) < num_rows){
                box_lenth = [ (document.getElementById((parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + box_ids[0].substring(2)).style.backgroundColor.length), (document.getElementById((parseInt(box_ids[1].substring(0, 1)) + 1) + '-' + box_ids[1].substring(2)).style.backgroundColor.length), (document.getElementById((parseInt(box_ids[2].substring(0, 1)) + 1) + '-' + box_ids[2].substring(2)).style.backgroundColor.length) ];
                if((parseInt(box_ids[0].substring(0, 1)) + 1) <= num_rows && (parseInt(box_ids[1].substring(0, 1)) + 1) <= num_rows && (parseInt(box_ids[2].substring(0, 1)) + 1) <= num_rows){
                    // first brick
                    if(box_lenth[0] === 0 && box_lenth[1] === 0 && box_lenth[2] === 0){
                        return {
                            frontBoxes : [ (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + box_ids[0].substring(2), (parseInt(box_ids[1].substring(0, 1)) + 1) + '-' + box_ids[1].substring(2), (parseInt(box_ids[2].substring(0, 1)) + 1) + '-' + box_ids[2].substring(2) ],
                            isColorSame : false,
                            isFrontBoxOccupied : false,
                            stoppedAtRow : 8,
                        };
                    // next brick
                    }else if( box_lenth[0] > 4 || box_lenth[1] > 4 || box_lenth[2] > 4 ){
                        var colorSame;
                        if(init[2] === document.getElementById((parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + box_ids[0].substring(2)).style.backgroundColor && init[2] === document.getElementById((parseInt(box_ids[1].substring(0, 1)) + 1) + '-' + box_ids[1].substring(2)).style.backgroundColor && init[2] === document.getElementById((parseInt(box_ids[2].substring(0, 1)) + 1) + '-' + box_ids[2].substring(2)).style.backgroundColor){
                            colorSame = true;
                        }else{
                            colorSame = false;
                        }

                        return {
                            frontBoxes : [ (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + box_ids[0].substring(2), (parseInt(box_ids[1].substring(0, 1)) + 1) + '-' + box_ids[1].substring(2), (parseInt(box_ids[2].substring(0, 1)) + 1) + '-' + box_ids[2].substring(2) ],
                            isColorSame : colorSame,
                            isFrontBoxOccupied : true,
                            stoppedAtRow : parseInt(box_ids[0].substring(0, 1)),
                        };
                    // has error
                    }else{
                        console.log('This is an invalid position');
                        alert('This is an invalid position');
                        window.location.reload(true);
                    }

                }
            }

            if(parseInt(box_ids[0].substring(0, 1)) === num_rows){
                return {
                    frontBoxes : false,
                    isColorSame : false,
                    isFrontBoxOccupied : false,
                    stoppedAtRow : 8,
                };
            }

            break;

        case 'V':
            var front_box_lentgh;
            if(parseInt(box_ids[0].substring(0, 1)) < num_rows){
                front_box_lentgh = document.getElementById((parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + box_ids[0].substring(2)).style.backgroundColor.length;
                if((parseInt(box_ids[0].substring(0, 1)) + 1) <= num_rows){
                    // first brick
                    if(front_box_lentgh === 0){
                        return {
                            isFrontBoxOccupied : false,
                            stoppedAtRow : 8,
                        };
                    // next brick
                    }else if(front_box_lentgh > 4){
                        return {
                            isFrontBoxOccupied : true,
                            stoppedAtRow : parseInt(box_ids[0].substring(0, 1)),
                        };
                    // has error
                    }else{
                        console.log('This is an invalid position');
                        alert('This is an invalid position');
                        window.location.reload(true);
                    }
                }
            }

            if(parseInt(box_ids[0].substring(0, 1)) === num_rows){
                return {
                    isFrontBoxOccupied : false,
                    stoppedAtRow : 8,
                };
            }

            break;

        default:
            console.log('Something went wrong');
            break;

    }

}

function getSideBoxDetails(){
    if(parseInt(box_ids[0].substring(2)) === 1){
        if(init[2] === document.getElementById(box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) + 1)).style.backgroundColor && init[2] === document.getElementById(box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) + 1)).style.backgroundColor && init[2] === document.getElementById(box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) + 1)).style.backgroundColor){
            return {
                isColorSame : true,
                sideBoxes : [ box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) + 1), box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) + 1), box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) + 1) ],
            };
        }else{
            return {
                isColorSame : false,
                sideBoxes : false,
            };
        }
    }else if(parseInt(box_ids[0].substring(2)) === num_cols){
        if(init[2] === document.getElementById(box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) - 1)).style.backgroundColor && init[2] === document.getElementById(box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) - 1)).style.backgroundColor && init[2] === document.getElementById(box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) - 1)).style.backgroundColor){
            return {
                isColorSame : true,
                sideBoxes : [ box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) - 1), box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) - 1), box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) - 1) ],
            };
        }else{
            return {
                isColorSame : false,
                sideBoxes : false,
            };
        }
    }else if(parseInt(box_ids[0].substring(2)) >= 2 && parseInt(box_ids[0].substring(2)) <= (num_cols - 1)){
        if(init[2] === document.getElementById(box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) + 1)).style.backgroundColor && init[2] === document.getElementById(box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) + 1)).style.backgroundColor && init[2] === document.getElementById(box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) + 1)).style.backgroundColor){
            return {
                isColorSame : true,
                sideBoxes : [ box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) + 1), box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) + 1), box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) + 1) ],
            };
        }else if(init[2] === document.getElementById(box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) - 1)).style.backgroundColor && init[2] === document.getElementById(box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) - 1)).style.backgroundColor && init[2] === document.getElementById(box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) - 1)).style.backgroundColor){
            return {
                isColorSame : true,
                sideBoxes : [ box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) - 1), box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) - 1), box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) - 1) ],
            };
        }else{
            return {
                isColorSame : false,
                sideBoxes : false,
            };
        }
    }else{
        return false;
    }
}

function set_the_score(){
    var score = parseInt(document.getElementById('score').innerText.substring(7)) + 10;
    if(score === 100){
        settled = true; initiated = false; horz_pos = null; game_mode = false; settled_boxes = [];
        clearInterval(pouring);
        alert('You won the game');
        document.getElementById('score').innerText = 'Score: ' + score;
        document.getElementById('gameplay').innerText = 'Restart';
    }else{
        document.getElementById('score').innerText = 'Score: ' + score;
    }
}

function getBoxHorizontalIds(){
    if(initiated === false){
        initiated = true;
        if(typeof(horz_pos) === "number"){
            return [ '1-' + horz_pos, '1-' + (horz_pos + 1), '1-' + (horz_pos + 2) ];
        }else{
            console.log('Something went wrong');
        }
    }

    if(initiated === true){
        if(typeof(horz_pos) === "number"){
            return [ (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + horz_pos, (parseInt(box_ids[1].substring(0, 1)) + 1) + '-' + (horz_pos + 1), (parseInt(box_ids[2].substring(0, 1)) + 1) + '-' + (horz_pos + 2) ];
        }else{
            console.log('Something went wrong');
        }
    }
}

function getBoxVerticalIds(){
    if(initiated === false){
        initiated = true;
        if(typeof(horz_pos) === "number"){
            return [ '1-' + horz_pos, null, null ];
        }else{
            console.log('Something went wrong');
        }
    }

    if(initiated === true){
        if(typeof(horz_pos) === "number"){
            if(box_ids[1] === null && box_ids[2] === null){
                return [ (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + horz_pos, box_ids[0].substring(0, 1) + '-' + horz_pos, null ];
            }else if(box_ids[2] === null){
                return [ (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + horz_pos, (parseInt(box_ids[1].substring(0, 1)) + 1) + '-' + horz_pos, box_ids[1].substring(0, 1) + '-' + horz_pos ];
            }else{
                return [ (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + horz_pos, (parseInt(box_ids[1].substring(0, 1)) + 1) + '-' + horz_pos, (parseInt(box_ids[2].substring(0, 1)) + 1) + '-' + horz_pos ];
            }
        }else{
            console.log('Something went wrong');
        }
    }
}

function getDirPos(){
    switch (direction[Math.floor(Math.random() * direction.length)]){
        case 'H':
            return [ "H", position[Math.floor(Math.random() * position.length)], colors[Math.floor(Math.random() * colors.length)] ];
            break;

        case 'V':
            return [ "V", vert_position[Math.floor(Math.random() * vert_position.length)], colors[Math.floor(Math.random() * colors.length)] ];
            break;

        default:
            return false;
            break;

    }
}

document.onkeydown = changePosition;

function changePosition(e){
    var code;
    // play or pause 
    if(typeof(e) === "object"){
        if(e.keyCode === 32){
            changeCond(e, document.getElementById('gameplay'));
        }
    }

    if(game_mode === true){
        if(typeof(e) === "object"){
            e.preventDefault();
            code = parseInt(e.keyCode);
        }else if(typeof(e) === "number"){
            code = parseInt(e);
        }else{
            console.log('Invalid key is pressed');
        }
    }

    switch (code) {

        // to left
        case 37:
            if(horz_pos > 1 && settled === false && horz_pos <= num_cols){
                clearInterval(pouring);
                var detector = detectExtBoxes('L-' + init[0]);
                if(detector.isClearSpace === true){
                    horz_pos = horz_pos - 1;
                }
                startPouring();
            }
            
            break;

        // to right
        case 39:
            if(init[0] === "H"){
                if(horz_pos < (num_cols - 2) && settled === false){
                    clearInterval(pouring);
                    var detector = detectExtBoxes('R-' + init[0]);
                    if(detector.isClearSpace === true){
                        horz_pos = horz_pos + 1;
                    }
                    startPouring();
                }
            }

            if(init[0] === "V"){
                if(horz_pos < num_cols && settled === false){
                    clearInterval(pouring);
                    var detector = detectExtBoxes('R-' + init[0]);
                    if(detector.isClearSpace === true){
                        horz_pos = horz_pos + 1;
                    }
                    startPouring();
                }
            }

            break;

        default:
            return false;
            break;

    }

}

function detectExtBoxes(to){
    switch (to) {
        case 'L-H':
            if((parseInt(box_ids[0].substring(0, 1)) + 1) >= 2 && (parseInt(box_ids[0].substring(0, 1)) + 1) <= num_rows && (parseInt(box_ids[0].substring(2)) - 1) >= 1 && (parseInt(box_ids[0].substring(2)) - 1) <= (num_cols - 3)){ 

                var frontLeftCrBox = (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + (parseInt(box_ids[0].substring(2)) - 1);
                var LeftBox = box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) - 1);

                if(settled_boxes.indexOf(frontLeftCrBox) === -1 && settled_boxes.indexOf(LeftBox) === -1){
                    return {
                        isClearSpace : true,
                    };
                }else{
                    return {
                        isClearSpace : false,
                    };
                }

            }else{
                return {
                    isClearSpace : false,
                };
            }

            break;

        case 'R-H':
            if((parseInt(box_ids[2].substring(0, 1)) + 1) >= 2 && (parseInt(box_ids[2].substring(0, 1)) + 1) <= num_rows && (parseInt(box_ids[2].substring(2)) + 1) >= 4 && (parseInt(box_ids[2].substring(2)) + 1) <= num_cols){

                var frontRightCrBox = (parseInt(box_ids[2].substring(0, 1)) + 1) + '-' + (parseInt(box_ids[2].substring(2)) + 1);
                var rightBox = box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) + 1); 

                if(settled_boxes.indexOf(frontRightCrBox) === -1 && settled_boxes.indexOf(rightBox) === -1){
                    return {
                        isClearSpace : true,
                    };
                }else{
                    return {
                        isClearSpace : false,
                    };
                }

            }else{
                return {
                    isClearSpace : false,
                };
            }

            break;

        case 'L-V':
            if((parseInt(box_ids[0].substring(0, 1)) + 1) >= 2 && (parseInt(box_ids[0].substring(0, 1)) + 1) <= num_rows && (parseInt(box_ids[0].substring(2)) - 1) >= 1 && (parseInt(box_ids[0].substring(2)) - 1) <= (num_cols - 1)){

                var frontLeftCrBox = (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + (parseInt(box_ids[0].substring(2)) - 1);
                var LeftBox1 = null, LeftBox2 = null, LeftBox3 = null;
                if(box_ids[0] !== null){
                    LeftBox1 = box_ids[0].substring(0 ,1) + '-' + (parseInt(box_ids[0].substring(2)) - 1);
                } 
                
                if(box_ids[1] !== null){
                    LeftBox2 = box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) - 1);
                }

                if(box_ids[2] !== null){
                    LeftBox3 = box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) - 1);
                } 

                if(settled_boxes.indexOf(frontLeftCrBox) === -1 && settled_boxes.indexOf(LeftBox1) === -1 && settled_boxes.indexOf(LeftBox2) === -1 && settled_boxes.indexOf(LeftBox3) === -1){
                    return {
                        isClearSpace : true,
                    };
                }else{
                    return {
                        isClearSpace : false,
                    };
                }

            }else{
                return {
                    isClearSpace : false,
                };
            }

            break;

        case 'R-V':
            if((parseInt(box_ids[0].substring(0, 1)) + 1) >= 2 && (parseInt(box_ids[0].substring(0, 1)) + 1) <= num_rows && (parseInt(box_ids[0].substring(2)) + 1) >= 2 && (parseInt(box_ids[0].substring(2)) + 1) <= num_cols){

                var frontRightCrBox = (parseInt(box_ids[0].substring(0, 1)) + 1) + '-' + (parseInt(box_ids[0].substring(2)) + 1);
                var rightBox1 = null, rightBox2 = null, rightBox3 = null;

                if(box_ids[0] !== null){
                    rightBox1 = box_ids[0].substring(0, 1) + '-' + (parseInt(box_ids[0].substring(2)) + 1);
                }

                if(box_ids[1] !== null){
                    rightBox2 = box_ids[1].substring(0, 1) + '-' + (parseInt(box_ids[1].substring(2)) + 1);
                }

                if(box_ids[2] !== null){
                    rightBox3 = box_ids[2].substring(0, 1) + '-' + (parseInt(box_ids[2].substring(2)) + 1);
                }

                if(settled_boxes.indexOf(frontRightCrBox) === -1 && settled_boxes.indexOf(rightBox1) === -1 && settled_boxes.indexOf(rightBox2) === -1 && settled_boxes.indexOf(rightBox3) === -1){
                    return {
                        isClearSpace : true,
                    };
                }else{
                    return {
                        isClearSpace : false,
                    };
                }

            }else{
                return {
                    isClearSpace : false,
                };
            }

            break;

        default:
            return {
                isClearSpace : false,
            };
    }
}

function changeMove(event, id){
    event.preventDefault();

    if(typeof(parseInt(id)) === "number"){
        changePosition(parseInt(id));
    }
}

function changeCond(event, elem){
    event.preventDefault();
    switch (String(elem.innerText)){

        case 'Start':
            game_mode = true;
            elem.innerText = 'Pause';
            startPouring();
            break;

        case 'Pause':
            game_mode = false;
            elem.innerText = 'Start';
            clearInterval(pouring);
            break;

        case 'Restart':
            for(let i = 1; i <= num_rows; i++){
                for(let j = 1; j <= num_cols; j++){
                    if(document.getElementById(i + '-' + j)){
                        document.getElementById(i + '-' + j).style.backgroundColor = null;
                    }
                }
            }
            settled_boxes = [];
            game_mode = true;
            document.getElementById('gameplay').innerText = 'Score: 0';
            elem.innerText = 'Pause';
            startPouring();

            break;

        default:
            console.log('Something went wrong');
            break;

    }
}