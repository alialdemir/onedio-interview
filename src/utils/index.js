const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

const logError = (message, data) => console.log('\u001b[' + 31 + 'm' + message + '\u001b[0m', data || '')


const logSuccess = (message, data) => console.log('\u001b[' + 32 + 'm' + message + '\u001b[0m', data || '')

module.exports = {
    delay,
    logError,
    logSuccess
};