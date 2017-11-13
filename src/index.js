import React from 'react'
import ReactDOM from 'react-dom'
import Game from './components/Game'

const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <Game/>,
  rootEl
)

render()
