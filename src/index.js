import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from "react-redux"
import PropTypes from 'prop-types'
import Board from "./components/Board"
import reducer from './reducers'
import * as Helper from "./reducers/helper";

import { ToastContainer, toast } from 'react-toastify';

const store = createStore(reducer)
const rootEl = document.getElementById('root')

class Game extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyDown(event) {
    console.log(event.keyCode)
    store.dispatch({ type: event.keyCode })

  }

  handleKeyUp(event) {
    console.log(store.getState());
    if (Helper.isWin(store.getState())) {
      let ctn = window.confirm("You are win!\n Click OK to double the target goal to "+ store.getState().target*2 +" points!\n Click Cancel to start a new Game")
      if(ctn) {
        store.dispatch({type: "double"})
      } else {
        store.dispatch({ type: 32 })        
      }
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

  }

  render() {
    const { state, onInit, onUp, onDown, onLeft, onRight, onNotify } = this.props
    return (
      <div>
        <ToastContainer />
        <h1><p>Score: {state.score}</p></h1>

        <h4>Press Enter or Space to start a new game;</h4>
        <h4>Press A(←), W(↑), S(↓) and D(→) on your keyboard or click the direction buttons to play this game;</h4>
        <Board boardMatrix={state} />

        <p>
          {' '}
          <button className="btn btn-success" onClick={onInit}>
            newGame
          </button>
          {' '}
          <button onClick={onUp}>
            up
          </button>
          {' '}
          <button onClick={onDown}>
            down
          </button>
          {' '}
          <button onClick={onLeft}>
            left
          </button>
          {' '}
          <button onClick={onRight}>
            right
        </button>
          {' '}
          <button onClick={onNotify}>
            toast
        </button>
          {' '}
          {/* <button onClick={this.upAsync}>
          Increment async
        </button> */}
        </p>

        {/* <p>{state.state[0].toString()}</p>
        <p>{state.state[1].toString()}</p>
        <p>{state.state[2].toString()}</p>
        <p>{state.state[3].toString()}</p> */}


      </div>
    )
  }
}

Game.propTypes = {
  state: PropTypes.object.isRequired,
  onInit: PropTypes.func.isRequired,
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onLeft: PropTypes.func.isRequired,
  onRight: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired
}
const render = () => ReactDOM.render(
  <Provider>

    <Game
      state={store.getState()}
      onInit={() => store.dispatch({ type: 32 })}
      onUp={() => store.dispatch({ type: 38 })}
      onDown={() => store.dispatch({ type: 40 })}
      onLeft={() => store.dispatch({ type: 37 })}
      onRight={() => store.dispatch({ type: 39 })}
      onNotify={() => store.dispatch({ type: "move" })}
    />
  </Provider>
  ,
  rootEl
)

render()
store.subscribe(render)
