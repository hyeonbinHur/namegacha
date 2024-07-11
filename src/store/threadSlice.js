import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    globalThreadType: 'variable',
    currentVariableThread: null,
    currentFunctionthread: null,
    functionMessages: [],
    variableMessages: [],
};
const threadSlice = createSlice({
    name: 'currentThread',
    initialState: initialState,
    reducers: {
        setThread(state, action) {
            if (state.globalThreadType === 'variable') {
                console.log('variable thread set');
                state.currentVariableThread = action.payload.newThread;
            } else {
                console.log('function thread set');
                state.currentFunctionthread = action.payload.newThread;
            }
        },
        setMessages(state, action) {
            state.messages = action.payload.messages;
        },
        pushAiMessages(state, action) {
            const newMessage = JSON.parse(action.payload.message[0].text.value);
            // const newUserMessage = action.payload.userMessage[0].text.value;
            if (state.globalThreadType === 'variable') {
                state.variableMessages = [
                    ...state.variableMessages,
                    newMessage,
                ];
            } else {
                state.functionMessages = [
                    ...state.functionMessages,
                    newMessage,
                ];
            }
        },
        pushUserMessages(state, action) {
            const newMessage = action.payload.message;
            // const newUserMessage = action.payload.userMessage[0].text.value;
            if (state.globalThreadType === 'variable') {
                state.variableMessages = [
                    ...state.variableMessages,
                    newMessage,
                ];
            } else {
                state.functionMessages = [
                    ...state.functionMessages,
                    newMessage,
                ];
            }
        },

        clearThread(state) {
            state.globalThreadType = 'variable';
            state.currentVariableThread = null;
            state.currentFunctionthread = null;
            state.functionMessages = [];
            state.variableMessages = [];
        },
        chageGlobalThreadType(state, action) {
            if (action.payload.globaltype === 'variable') {
                state.globalThreadType = 'variable';
            } else if (action.payload.globaltype === 'function') {
                state.globalThreadType = 'function';
            }
        },
        editAiMessageExp(state, action) {
            const arrayIndex = action.payload.arrayIndex;
            if (state.globalThreadType === 'variable') {
                let newAiMeesage = [...state.variableMessages];
                console.log(newAiMeesage[arrayIndex].Exp);
                console.log(newAiMeesage[arrayIndex]);
                newAiMeesage[arrayIndex].Exp = action.payload.newExp;
                state.variableMessages = newAiMeesage;
            } else {
                let newAiMeesage = [...state.functionMessages];
                newAiMeesage[arrayIndex].Exp = action.payload.newExp;
                state.functionMessages = newAiMeesage;
            }
        },
        editAiMessageName(state, action) {
            const arrayIndex = action.payload.arrayIndex;
            const nameIndex = action.payload.nameIndex;

            if (state.globalThreadType === 'variable') {
                let newAiMeesage = [...state.variableMessages];
                newAiMeesage[arrayIndex].Names[nameIndex] =
                    action.payload.newName;
                state.variableMessages = newAiMeesage;
            } else {
                let newAiMeesage = [...state.functionMessages];
                newAiMeesage[arrayIndex].Names[nameIndex] =
                    action.payload.newName;
                state.functionMessages = newAiMeesage;
            }
        },
    },
});

export const {
    setThread,
    setMessages,
    pushAiMessages,
    pushUserMessages,
    clearThread,
    chageGlobalThreadType,
    editAiMessageExp,
    editAiMessageName,
} = threadSlice.actions;
export default threadSlice.reducer;
