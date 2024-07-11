import { configureStore } from '@reduxjs/toolkit';
import threadReducer from './threadSlice';
import contextMenuReducer from './contextMenuSlice';
import detailPageReducer from './detailPageSlice';
import errorReducer from './errorSlice';
import identifierReducer from './identifiyerModal';
import aiMessageEditReducer from './aiMessageEditSlice';

export const store = configureStore({
    reducer: {
        errorSlice: errorReducer,
        currentThread: threadReducer,
        currentContextMenu: contextMenuReducer,
        detailPageSlice: detailPageReducer,
        identifierModalSlice: identifierReducer,
        aiMessageEditSlice: aiMessageEditReducer,
    },
});
// export default store;
