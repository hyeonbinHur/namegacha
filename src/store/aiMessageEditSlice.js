import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    target: {
        type: null,
        arrayIndex: null,
        nameIndex: null,
    },
    isEdit: false,
};

const aiMessageEditSlice = createSlice({
    name: 'aiMessageEditSlice',
    initialState: initialState,
    reducers: {
        setIsEdit(state, action) {
            state.isEdit = true;
            const componetTarget = action.payload.target;
            state.target.type = componetTarget.type;
            state.target.arrayIndex = componetTarget.arrayIndex;
            state.target.nameIndex = componetTarget.nameIndex;
        },
        clearIsEdit(state) {
            state.target.type = null;
            state.target.arrayIndex = null;
            state.target.nameIndex = null;
            state.isEdit = false;
        },
    },
});

export const { setIsEdit, clearIsEdit } = aiMessageEditSlice.actions;
export default aiMessageEditSlice.reducer;
