document.addEventListener("DOMContentLoaded", function() { });


/* The code basis for this game comes from
    this tutorial https://www.youtube.com/watch?v=3Nz4Yp7Y_uA
    Source code from Ania Kubow https://github.com/kubowania/space-invaders
    MIT Licence
    Copyright (c) 2020 Ania Kubow

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    Translation: Ofcourse you can use this for you project! Just make sure to say where you got this from :)
*/

const grid = document.querySelector('.game-grid')

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
 * This is the number of alien enemies
 */
const aliens = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38
]

/**
 * This code adds styling to the aliens array (enemies) above
 */
function draw() {
    for (let i = 0; i < aliens.length; i++) {
        squares[aliens[i]].classList.add('alien-enemies')
    }
}

draw()