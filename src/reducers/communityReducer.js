import { SET_CHANNEL_ID } from '../actions/communityActions'

let initalState = {
  channelId: ''
}

export const communityReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_CHANNEL_ID:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
