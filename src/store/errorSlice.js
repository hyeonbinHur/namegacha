import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isError: false,
    errorMessage: null,
    errorCode: null,
};

const errorSlice = createSlice({
    name: 'errorSlice',
    initialState: initialState,
    reducers: {
        setError(state, action) {
            console.log('error occured');
            state.isError = true;
            state.errorMessage = action.payload.message;
            state.errorCode = action.payload.code;
        },
        clearError(state) {
            state.isError = false;
            state.errorMessage = null;
            state.errorCode = null;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
