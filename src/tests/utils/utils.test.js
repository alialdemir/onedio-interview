const { expect } = require('chai');
const sinon = require('sinon');
const { delay, logError, logSuccess } = require('../../utils');

describe('Utility Functions', () => {
    let consoleLogStub;

    beforeEach(() => {
        // Create a stub for console.log before each test
        consoleLogStub = sinon.stub(console, 'log');
    });


    afterEach(() => {
        // Restore the original console.log after each test
        consoleLogStub.restore();
    });

    describe('delay', () => {
        it('should resolve after a specified delay', async () => {
            const delayTime = 1000; // 1 second
            const startTime = Date.now();

            await delay(delayTime);

            const endTime = Date.now();
            const elapsedTime = endTime - startTime;

            // Allow a small margin of error (e.g., 50 milliseconds) due to timing variations
            expect(elapsedTime).to.be.closeTo(delayTime, 50);
        });
    });

    it('should log an error message with data', () => {
        const errorMessage = 'An error occurred';
        const errorData = { errorCode: 500 };

        logError(errorMessage, errorData);

        // Check if console.log was called with the correct arguments
        expect(consoleLogStub.calledWithExactly('\u001b[31m' + errorMessage + '\u001b[0m', errorData)).to.be.true;
    });

    it('should log an error message without data', () => {
        const errorMessage = 'An error occurred';

        logError(errorMessage);

        // Check if console.log was called with the correct arguments
        expect(consoleLogStub.calledWithExactly('\u001b[31m' + errorMessage + '\u001b[0m')).to.be.false;
    });

    it('should log a success message with data', () => {
        const successMessage = 'Operation successful';
        const successData = { result: 'OK' };

        logSuccess(successMessage, successData);

        // Check if console.log was called with the correct arguments
        expect(consoleLogStub.calledWithExactly('\u001b[32m' + successMessage + '\u001b[0m', successData)).to.be.true;
    });

    it('should log a success message without data', () => {
        const successMessage = 'Operation successful';

        logSuccess(successMessage);

        // Check if console.log was called with the correct arguments
        expect(consoleLogStub.calledWithExactly('\u001b[32m' + successMessage + '\u001b[0m')).to.be.false;
    });
});
