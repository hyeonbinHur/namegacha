import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    target: {
        type: null,
        id: null,
        name: null,
    },
    isAdd: false,
    isEdit: false,
};

const detailPageSlice = createSlice({
    name: 'detailPageSlice',
    initialState: initialState,
    reducers: {
        setIsAdd(state, action) {
            const componentTarget = action.payload.target;
            state.target.type = componentTarget.type;
            state.target.id = componentTarget.id;
            state.target.name = componentTarget.name;
            state.isAdd = true;
        },
        setIsEdit(state, action) {
            const componentTarget = action.payload.target;
            state.target.type = componentTarget.type;
            state.target.id = componentTarget.id;
            state.target.name = componentTarget.name;
            state.isEdit = true;
        },
        setClear(state) {
            state.target.type = null;
            state.target.id = null;
            state.target.name = null;
            state.isAdd = false;
            state.isEdit = false;
        },
    },
});
export const { setIsAdd, setIsEdit, setTaget, setClear } =
    detailPageSlice.actions;
export default detailPageSlice.reducer;
