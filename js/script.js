document.addEventListener("DOMContentLoaded", function() { });


/*  The code basis for this game comes from
    this tutorial https://www.youtube.com/watch?v=3Nz4Yp7Y_uA
    Source code from Ania Kubow https://github.com/kubowania/space-invaders
    MIT Licence
    Copyright (c) 2020 Ania Kubow

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    Translation: Ofcourse you can use this for you project! Just make sure to say where you got this from :)
*/

const grid = document.querySelector('.game-grid')
const winOrLoseDisplay = document.querySelector('.title')
const scoreDisplay = document.querySelector('.score-tally')

// This is the width of the grid in terms of squares
let width = 15

// This is the starting position of the ship in the grid
let shipPosition = 217

// The direction the aliens move, 1 is forward in the grid. -1 would backwards.
let direction = 1

let aliensId

// Empty array since no enemies are dead
let aliensDead = []

let goingRight = true

let score = 0

/**
 * This for loop creates the grid layout the game operates on
 */
for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

/**
 * This variable provides the basis to iterate through the grid and and enemies
 */
const squares = Array.from(document.querySelectorAll('.game-grid div'))


/**
 * This is the number of alien enemies and their position in the grid
 */
const aliens = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

/**
 * This code adds styling from CSS class to the aliens array (enemies) above.
 * Wherever an alien has been removed from the grid, it does not draw that
 * enemy on that position.
 */
function draw() {
    for (let i = 0; i < aliens.length; i++) {
        if (!aliensDead.includes(i)) {
            squares[aliens[i]].classList.add('alien-enemies')
        }
    }
}
// The function is called here
draw()

/**
 * This function removes the aliens.
 * It is called from the moveAlien function.
 * The funcionality is similar to the moveShip function,
 * where the ship is removed from the previous grid square it was displayed when moved
 */
function remove() {
    for (let i = 0; i < aliens.length; i++) {
        squares[aliens[i]].classList.remove('alien-enemies')
    }
}

// This code adds styling to ship from CSS class
squares[shipPosition].classList.add('ship')


/**
 * This function makes the ship move left or right depending on key used
 */
function moveShip(event) {
    // This removes the ship from the current grid square
    squares[shipPosition].classList.remove('ship')

    // This switches the if statement depending on which key is pressed
    switch(event.key) {
        case 'ArrowLeft':
            // If ship is not on the left edge of the grid, it can move left
            if (shipPosition % width !==0) shipPosition -=1
            break
        case 'ArrowRight' :
            // If ship is not on the right edge of the grid, it can move right
            if (shipPosition % width < width -1) shipPosition +=1
            break
    }
    // This draws in the ship on the new position
    squares[shipPosition].classList.add('ship')
}

// This eventListener calls the moveShip function on specific keydown events
document.addEventListener('keydown', moveShip)

/**
 * This function declares the edges of the grid so no aliens "move" outside of it.
 * It then loops through the array and adds 1 alien.
 */
function moveAlien() {
    // The left edge is declared to be the first column in the grid
    const leftEdge = aliens[0] % width === 0

    // The right edge is declared to be the last column in the grid
    const rightEdge = aliens[aliens.length - 1] % width === width -1

    // This calls the remove function
    remove()
    
    // If aliens are on the right edge and going right, change moving direction to left
    if (rightEdge && goingRight) {
        for (let i = 0; i < aliens.length; i++) {
            aliens[i] += width +1
            direction = -1
            goingRight = false
        }
    }

    // Opposite to above if statement
    if (leftEdge && !goingRight) {
        for (let i = 0; i < aliens.length; i++) {
            aliens[i] += width -1
            direction = 1
            goingRight = true
        }
    }

    // This adds a new alien to the array, "moving" the aliens forward through the grid
    for (i = 0; i < aliens.length; i++) {
        aliens[i] += direction
    }

    draw()

    // When ship is hit by alien, display GAME OVER instead of title
    if (squares[shipPosition].classList.contains('alien-enemies', 'ship')) {
        gameOverDisplay.innerHTML = 'GAME OVER'
        clearInterval(aliensId)
    }

    // When aliens hit bottom, same as above if statement
    for (let i = 0; i < aliens.length; i++) {
        if (aliens[i] > (squares.length)) {
            winOrLoseDisplay.innerHTML = 'GAME OVER'
            clearInterval(aliensId)
        }
    }

    if (aliensDead.length === aliens.length) {
        winOrLoseDisplay.innerHTML = 'VICTORY'
        score += 100
        clearInterval(aliensId)
    }
}
// This sets the time interval for the aliens to move
aliensID = setInterval(moveAlien, 200)


/**
 * This makes the ship fire a missile using space key
 */
function fire(event) {
    let missileId
    let missilePosition = shipPosition

    function moveMissile() {
        squares[missilePosition].classList.remove('missile')
        missilePosition -= width
        squares[missilePosition].classList.add('missile')

        if (squares[missilePosition].classList.contains('alien-enemies')) {
            squares[missilePosition].classList.remove('missile')
            squares[missilePosition].classList.remove('alien-enemies')
            squares[missilePosition].classList.add('explosion')

            // Missile stop moving and explosion time is set to 200ms
            setTimeout(()=> squares[missilePosition].classList.remove('explosion'), 200)
            clearInterval(missileId)

            // Aliens are removed from the square where collision with missile happens
            const alienDead = aliens.indexOf(missilePosition)
            aliensDead.push(alienDead)

            // This increments the score with 10 for each enemy defeated
            score += 10
            scoreDisplay.innerHTML = score
        }
    }

    // When pressing space key, missile is launched, moving one square in 100ms
    switch(event.key) {
        case ' ':
            missileId = setInterval(moveMissile, 150)
    }
}

document.addEventListener('keydown', fire)

setTimeout(fire, 500)