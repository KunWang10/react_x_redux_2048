import * as Helper from "./helper";
import { toast } from "react-toastify";

export default (state = {
  state: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],

  ],
  score: 0,
  target: 16,
  toast: null
}, action) => {
  switch (action.type) {
    case "double":
      state = Helper.doubleTarget(state);
      return state;
    case 13:
    case 32:
      state.state = Helper.initializeGame();
      state.score = 0;
      state.target = 16;
      return state;

    case 37:
    case 38:
    case 39:
    case 40:
    case 65:
    case 68:
    case 87:
    case 83:
      state = Helper.moveAndMerge(state, action.type);
      return state;
    case "move":
      state.toast = toast("redux toast!");
      return state;

    default:
      //state.toast = toast("You pressed a wrong key!");
      return state
  }
}
