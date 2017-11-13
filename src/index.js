import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import PropTypes from 'prop-types'
import Board from "./components/Board"
import reducer from './reducers'

const store = createStore(reducer)
const rootEl = document.getElementById('root')

class Game extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    console.log(event.keyCode)
    store.dispatch({ type: event.keyCode })
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { state, onInit, onUp, onDown, onLeft, onRight } = this.props
    return (
      <div>
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
          {/* <button onClick={this.upAsync}>
          Increment async
        </button> */}
        </p>

        <p>Score: {state.score}</p>
        <p>{state.state[0].toString()}</p>
        <p>{state.state[1].toString()}</p>
        <p>{state.state[2].toString()}</p>
        <p>{state.state[3].toString()}</p>

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
  onRight: PropTypes.func.isRequired
}

const render = () => ReactDOM.render(
  <Game
    state={store.getState()}
    onInit={() => store.dispatch({ type: 32 })}
    onUp={() => store.dispatch({ type: 38 })}
    onDown={() => store.dispatch({ type: 40 })}
    onLeft={() => store.dispatch({ type: 37 })}
    onRight={() => store.dispatch({ type: 39 })}
  />,
  rootEl
)

render()
store.subscribe(render)
