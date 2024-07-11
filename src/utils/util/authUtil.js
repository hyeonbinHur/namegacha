const checkIdValidation = (username) => {
    if (username.length >= 5) {
        return true;
    } else {
        return false;
    }
};

const checkPasswordValidation = (password) => {
    if (password.length >= 7) {
        return true;
    } else {
        return false;
    }
};

const checkIsPasswordMatch = (password, passwordCheck) => {
    if (password === passwordCheck && passwordCheck.length !== 0) {
        return true;
    } else {
        return false;
    }
};

const isNotEmpty = (input) => {
    if (input.length === 0) {
        return false;
    } else {
        return true;
    }
};

export {
    isNotEmpty,
    checkIdValidation,
    checkIsPasswordMatch,
    checkPasswordValidation,
};
