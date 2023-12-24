const delay = (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay));
};

const logError = (message, data) => console.log('\u001b[' + 31 + 'm' + message + '\u001b[0m', data || '')


const logSuccess = (message, data) => console.log('\u001b[' + 32 + 'm' + message + '\u001b[0m', data || '')


module.exports = {
    delay,
    logError,
    logSuccess,
};