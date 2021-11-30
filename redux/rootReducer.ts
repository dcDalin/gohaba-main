import { combineReducers } from 'redux';

import { authModalsReducer } from '@/redux/AuthModals/reducer';

export const rootReducer = combineReducers({
  authModals: authModalsReducer
});

export default rootReducer;
