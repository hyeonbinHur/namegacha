import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    item: {
        name: null,
        exp: null,
    },
};

const identifierModalSlice = createSlice({
    name: 'identifierModalSlice',
    initialState: initialState,
    reducers: {
        openIdentifierModal(state, action) {
            state.isOpen = true;
            state.item.name = action.payload.name;
            state.item.exp = action.payload.exp;
        },
        closeIedntifierModal(state) {
            state.isOpen = false;
            (state.item.name = null), (state.item.exp = null);
        },
    },
});

export const { openIdentifierModal, closeIedntifierModal } =
    identifierModalSlice.actions;
export default identifierModalSlice.reducer;
