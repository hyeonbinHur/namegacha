function checkPendingStatus(array) {
    for (let item of array) {
        if (item === 'pending') {
            return true;
        }
    }
    return false;
}

function checkLength(string, max) {
    if (string.length >= max) {
        return false;
    } else {
        return true;
    }
}

export { checkPendingStatus, checkLength };
