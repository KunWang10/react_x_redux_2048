import React, { Component } from 'react'
import Tile from './Tile'
import '../css/index.css';

class Board extends Component {
  
    render(){
        const boardMatrix = this.props.boardMatrix.state;
        return(
            <div className="game-container">
                <div className="grid-row">
                    <Tile value={boardMatrix[0][0]} col_end={false}/>
                    <Tile value={boardMatrix[0][1]} col_end={false}/>
                    <Tile value={boardMatrix[0][2]} col_end={false}/>
                    <Tile value={boardMatrix[0][3]} col_end={true}/>
                </div>
                <div className="grid-row">
                    <Tile value={boardMatrix[1][0]} col_end={false}/>
                    <Tile value={boardMatrix[1][1]} col_end={false}/>
                    <Tile value={boardMatrix[1][2]} col_end={false}/>
                    <Tile value={boardMatrix[1][3]} col_end={true}/>
                </div>
                <div className="grid-row">
                    <Tile value={boardMatrix[2][0]} col_end={false}/>
                    <Tile value={boardMatrix[2][1]} col_end={false}/>
                    <Tile value={boardMatrix[2][2]} col_end={false}/>
                    <Tile value={boardMatrix[2][3]} col_end={true}/>
                </div>
                <div className="grid-row">
                    <Tile value={boardMatrix[3][0]} col_end={false}/>
                    <Tile value={boardMatrix[3][1]} col_end={false}/>
                    <Tile value={boardMatrix[3][2]} col_end={false}/>
                    <Tile value={boardMatrix[3][3]} col_end={true}/>
                </div>
            </div>
        );
    }
    
  }
  
  export default Board
  