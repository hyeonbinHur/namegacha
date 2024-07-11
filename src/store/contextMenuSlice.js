import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    target: {
        id: null,
        name: null,
    },
    isOpen: false,
    isAdd: false,
    addType: null,
    isEdit: false,
    x: null,
    y: null,
};

const contextMenuSlice = createSlice({
    name: 'currentContextMenu',
    initialState: initialState,
    reducers: {
        openContextMenu(state, action) {
            state.target.name = action.payload.name;
            state.target.id = action.payload.id;
            state.isOpen = true;

            state.x = action.payload.x;
            state.y = action.payload.y;
        },
        closeContextMenu(state) {
            console.log('close');
            state.target.name = null;
            state.target.id = null;
            state.isOpen = false;
            state.isAdd = false;
            state.addType = null;
            state.isEdit = false;
            state.x = null;
            state.y = null;
        },

        clearContextMenu(state) {
            console.log('close');
            state.target.name = null;
            state.target.id = null;
            state.isOpen = false;
            state.isAdd = false;
            state.addType = null;
            state.isEdit = false;
            state.x = null;
            state.y = null;
        },

        addChild(state, action) {
            state.target.name = action.payload.name;
            state.target.id = action.payload.id;
            state.isAdd = true;
            state.addType = action.payload.addType;
            state.isOpen = false;
        },
        editItSelf(state, action) {
            console.log('edit start');
            state.target.name = action.payload.name;
            state.target.id = action.payload.id;
            state.isEdit = true;
            state.isOpen = false;
        },
        // deleteItSelf(){

        // }
    },
});

export const {
    openContextMenu,
    closeContextMenu,
    addChild,
    editItSelf,
    clearContextMenu,
} = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
