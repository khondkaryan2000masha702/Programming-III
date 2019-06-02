class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }


    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            GrassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 4;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {


        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {


        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            for (var i in GrassArr) {
                if (newX == GrassArr[i].x && newY == GrassArr[i].y) {
                    GrassArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }

    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            GrassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in GrassEaterArr) {
                if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);



                }
            }
        }
    }
}

class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 15;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {


        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in GrassEaterArr) {
                if (newX == GrassEaterArr[i].x && newY == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 3;
        }

    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in PredatorArr) {
                if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);



                }
            }
        }
    }

}


class Farmer {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 15;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 3, this.y + 3],
            [this.x + 4, this.y + 4],
            [this.x + 5, this.y + 5],
            [this.x + 6, this.y + 6]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {


        var newCell = random(this.chooseCell(3));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }

    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newFarmer = new Farmer(newCell[0], newCell[1], this.index);
            FarmerArr.push(newFarmer);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in FarmerArr) {
                if (this.x == FarmerArr[i].x && this.y == FarmerArr[i].y) {
                    FarmerArr.splice(i, 1);
                }
            }
        }
    }

}


class Zombie {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 6;
        this.G = false;

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(1);
        var newCell = random(newCell1.concat(newCell2))

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 0) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;

                this.y = newY;
                this.x = newX;
                this.energy--;
            }
            else if (matrix[newY][newX] == 1) {
                matrix[this.y][this.x] = 1;
                GrassArr.push(new Grass(this.x, this.y, 1))
                matrix[newY][newX] = this.index;
                for (var i in GrassArr) {
                    if (newX == GrassArr[i].x && newY == GrassArr[i].y) {
                        GrassArr.splice(i, 1);
                        break;
                    }
                }

                this.y = newY;
                this.x = newX;
                this.energy--;
            }
        }

    }


    kill() {

    var newCells1 = this.chooseCell(4);
    var newCells2 = this.chooseCell(3);
    var newCells = newCells1.concat(newCells2);
    var newCell = random(newCells);
    if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];

        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = this.index;

        for (var i in FarmerArr) {
            if (newX == FarmerArr[i].x && newY == FarmerArr[i].y) {
                FarmerArr.splice(i, 1);
                break;
            }
        }
        for (var i in PredatorArr) {
            if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }



        this.y = newY;
        this.x = newX;
        this.energy += 2;


    }

}
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newZombie = new Zombie(newCell[0], newCell[1], this.index);
            ZombieArr.push(newZombie);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 4;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in ZombieArr) {
                if (this.x == ZombieArr[i].x && this.y == ZombieArr[i].y) {
                    ZombieArr.splice(i, 1);



                }
            }
        }
    }

}