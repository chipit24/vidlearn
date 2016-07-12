import { USER_STATUS } from '../constants/constants';

const initialState = {
  user: {
    status: USER_STATUS.INACTIVE
  }
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'BEGIN_SIGNUP':
      return {...state, user: {status: USER_STATUS.CREATING, uid: null}};
    case 'LOGIN':
      return {...state, user: {...action.payload, status: USER_STATUS.ACTIVE}};
    case 'LOGOUT':
      return {...state, user: {status: USER_STATUS.INACTIVE, uid: null}};
    default:
      return state;
  }
}

export default reducer;