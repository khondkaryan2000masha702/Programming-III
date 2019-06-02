let matrix = [];
let rows = 40;
let columns = 40;

for (let y = 0; y < rows; y++) {
    matrix[y] = [];
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 20) {
            matrix[y][x] = 0;
        }
        if (a >= 20 && a < 40) {
            matrix[y][x] = 1;
        }
        else if (a >= 40 && a < 50) {
            matrix[y][x] = 2;
        }
        else if (a >= 50 && a < 70) {
            matrix[y][x] = 3;
        }
        else if (a >= 70 && a < 90) {
            matrix[y][x] = 4;
        }
        else if (a >= 90 && a < 100) {
            matrix[y][x] = 5;
        }
    }
}
var m = 70;
var GrassArr = [];
var GrassEaterArr = [];
var PredatorArr = [];
var FarmerArr = [];
var ZombieArr = [];
var side = 20;


function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                GrassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x, y, 2);
                GrassEaterArr.push(et);

            }
            else if (matrix[y][x] == 3) {
                var pd = new Predator(x, y, 3);
                PredatorArr.push(pd);
            }
            else if (matrix[y][x] == 4) {
                var fr = new Farmer(x, y, 4);
                FarmerArr.push(fr);
            }
            else if (matrix[y][x] == 5) {
                var zb = new Zombie(x, y, 5);
                ZombieArr.push(zb);
            }
        }
    }

}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in GrassArr) {
        GrassArr[i].mul();
    }
    for (var i in GrassEaterArr) {
        GrassEaterArr[i].move();
        GrassEaterArr[i].eat();
        GrassEaterArr[i].mul();
        GrassEaterArr[i].die();
    }
    for (var i in PredatorArr) {
        PredatorArr[i].move();
        PredatorArr[i].eat();
        PredatorArr[i].mul();
        PredatorArr[i].die();

    }
    for (var i in FarmerArr) {
        FarmerArr[i].move();
        FarmerArr[i].eat();
        FarmerArr[i].mul();
        FarmerArr[i].die();

    }
    for (var i in ZombieArr) {
        ZombieArr[i].move();
        ZombieArr[i].kill();
        ZombieArr[i].mul();
        ZombieArr[i].die();

    }



}
