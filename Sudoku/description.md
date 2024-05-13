# Sudoku Solver

## How to run this?

1. Open [index.html](index.html)
2. Press F12 or open the browser console
3. Type `pause()` to unpause

<u>**Note**</u> If you need to change the board, go to [script.js](script.js) and change the `startBoard` variable (0 for blank)

## The algorithm involves 2 main parts:
- Solving Sudoku board
    - Trying to solve the board to eliminate excessive searching in search tree
- Depth-First Search (DFS)
    - Used for trying different choices when there is no obvious answer to any cell on the board
    - Also used to go back to previous stages, in case of selecting the wrong choice

## Explanation of the code

The `Sudoku` class has a constructor for loading board at any state. This can be used for 2 scenarios

1. Initialising the board at first load
2. Loading any possible state from `DFS`

Main loop is in `solve()` function. This is used for solving the Sudoku as much as possible.

It works by scanning each cell from top-left to bottom-right. If there is a cell that can surely be filled by a specific number, then insert that number and the loop continues. 

When there is no more move after one full search on the board, `break` will be reached status will be set.

From here, there are 2 cases

1. Got stuck, and the board is solved
    - There is no more move because the board is finished. Stop the `DFS`

2. Got stuck, and the board is not solved
    - This can either be the previous choice was wrong or the Sudoku is impossible to solve which can be determined when `DFS` is completed

## Why `DFS`, not `BFS`?

Sudoku search space tree is both deep and broad. However, since we eliminated non-sense choices, only few choices are left to be searched.

The actual reason that we chose `DFS` instead of `BFS` is that when the algorithm chooses the wrong choice, there will surely be conflicts in the board that can be found very quickly. This means finding the dead end sooner, thus faster.

`BFS` will need to expand the search space very broad into the search tree. Resulting in many dead ends to be found much later than `DFS` which will be very slow.

## About the code

Because we used JS to implement, there might be some language specific features that are useful but weird to people who writes other languages

- `yield` and `function *`
    
    `function *` is a function which returns an iterable. `yield` will pause the function at that specific moment and on the next call, function will be entered after the previous `yield`.

    Calling function with `*` in front is like passing the iterating state through the inner iterable.

    Basically, this is useful for animating the interface to see how it works in each step.

- `pop`, `push`, `shift` and `unshift`

    - `pop` and `push` deals with removing and inserting last element.

    - `shift` and `unshift` deals with removing and inserting first element.

    - This means using `pop` and `push` on an array  will work like a stack which is used for `DFS`