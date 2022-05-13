import { ADD_ZONE } from "../actions/types";

export const INITIAL_STATE = {
  zonesData: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ZONE:
      return {
        ...state,
        zonesData: action.payload,
      };

    default:
      return state;
  }
};
