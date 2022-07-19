import React, { useEffect, useState } from 'react'
import '../styles/style.css'

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const initialState = ['@', '@', '@',  '@', '@',  '@', '@',  '@', '@']

function TicTacToe() {
    const [cellValues, setCellvalues] = useState(initialState)
    const [turn, setTurn] = useState('X')
    const [winner, setWinner] = useState(undefined)

    function setXorO(key, cell) {
        if (cell !== 'X' || cell !== 'O') {
            const cellState = [...cellValues]
            cellState[key] = turn
            setCellvalues(cellState)
            setTurn((prevState) => prevState === 'X' ? 'O' : 'X')
        }
    }

    function reset() {
        setCellvalues(initialState)
        setTurn('X')
        setWinner(undefined)
    } 

    useEffect(() => {
        lines.forEach(([a, b, c]) => {
            if (cellValues[a] !== '@' && cellValues[b] !== '@' && cellValues[c] !== '@') {
                if (cellValues[a] === cellValues[b] && cellValues[b] === cellValues[c]) {
                    setWinner(cellValues[a])
                }
            }
        })
    }, [cellValues, turn])

    return (
        <div>
            <div className={'cell-wrapper'}>
                {
                    cellValues.map((cell, key) => <span className='cell' key={key} onClick={!winner ? () => setXorO(key, cell) : null}>{cell !== '@' && cell}</span>)
                }
            </div>
            <div>
                {winner && `Winner is Player: ${winner}`}
            </div>
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default TicTacToe