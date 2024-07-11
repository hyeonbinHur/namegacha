/**slice target, sliceIsAdd, sliceIsEdit */

const isContextVerity = (sliceTarget, name, id) => {
    if (sliceTarget.name === name && sliceTarget.id === id) {
        return true;
    } else return false;
};

/**Shallow Equality Check */
const isDetailVerify = (sliceTarget, componentTarget) => {
    if (
        sliceTarget.name === componentTarget.name &&
        sliceTarget.type === componentTarget.type &&
        sliceTarget.id === componentTarget.id
    ) {
        return true;
    } else {
        return false;
    }
};

/**Shallow Equality check */
const isAiMessageVerify = (sliceTarget, componentTarget) => {
    if (
        sliceTarget.type === componentTarget.type &&
        sliceTarget.arrayIndex === componentTarget.arrayIndex &&
        sliceTarget.nameIndex === componentTarget.nameIndex
    ) {
        return true;
    } else {
        return false;
    }
};

// const isDetailVerify = (sliceTarget, componentTarget) => {
//     return JSON.stringify(sliceTarget) === JSON.stringify(componentTarget);
// };

const checkIsRename = (isThis, isRename) => {
    if (isThis && isRename) {
        return true;
    } else return false;
};

const checkIsEdit = (isThis, isRename) => {
    if (isThis && isRename) {
        return true;
    } else return false;
};

const isContextOpen = (isThis, sliceIsOpen) => {
    if (isThis && sliceIsOpen) {
        return true;
    } else return false;
};

const checkIsAdd = (isThis, sliceIsAdd) => {
    if (isThis && sliceIsAdd) {
        return true;
    } else return false;
};

const checkIsFunctionAdd = (addType, isThis, sliceIsAdd) => {
    if (addType === 'function' && isThis && sliceIsAdd) {
        return true;
    } else return false;
};
const checkIsVariableAdd = (addType, isThis, sliceIsAdd) => {
    if (addType === 'variable' && isThis && sliceIsAdd) {
        return true;
    } else return false;
};

export {
    isContextVerity,
    checkIsRename,
    isContextOpen,
    checkIsAdd,
    checkIsFunctionAdd,
    checkIsVariableAdd,
    isDetailVerify,
    checkIsEdit,
    isAiMessageVerify,
};
