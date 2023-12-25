const sinon = require('sinon');
const { assert } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { main, askForCSVURL, isValidCSVURL } = require('../csv'); // Assuming the file is named main.js

// Mock dependencies
const csvReader = require('../csvReader');
const footballMatchService = require('../../services/footballMatchService');
const readline = require('readline');
const url = require('url');
const utils = require('../../utils');
const chai = require('chai');


// Use chai-as-promised with chai
chai.use(chaiAsPromised);

describe('askForCSVURL', () => {
    it('resolves with a valid CSV URL', async () => {
        const questionStub = sinon.stub().callsArgWith(1, 'http://example.com/test.csv');
        const closeStub = sinon.stub();

        sinon.replace(readline, 'createInterface', sinon.stub().returns({ question: questionStub, close: closeStub }));

        const result = await askForCSVURL();

        assert.strictEqual(result, 'http://example.com/test.csv');
        sinon.assert.calledOnce(questionStub);
        sinon.assert.calledOnce(closeStub);

        sinon.restore();
    });


    it('rejects when an invalid CSV URL is entered', async () => {
        const questionStub = sinon.stub().callsArgWith(1, 'invalid-url');
        const closeStub = sinon.stub();

        sinon.replace(readline, 'createInterface', sinon.stub().returns({ question: questionStub, close: closeStub }));

        // Use chai-as-promised's expect().to.be.rejected
        await chai.expect(askForCSVURL()).to.be.rejected;

        sinon.assert.calledOnce(questionStub);
        sinon.assert.calledOnce(closeStub);

        sinon.restore();
    });
});

describe('isValidCSVURL', () => {
    it('returns true for a valid CSV URL', () => {
        assert.isTrue(isValidCSVURL('https://static.onedio.com/case-studies/1819-E0.csv'));
    });

    it('returns false for an invalid protocol', () => {
        assert.isFalse(isValidCSVURL('ftp://example.com/test.csv'));
    });

    it('returns false for a non-CSV URL', () => {
        assert.isFalse(isValidCSVURL('http://example.com/test.txt'));
    });

    it('returns false for an invalid URL format', () => {
        assert.isFalse(isValidCSVURL('invalid-url'));
    });
});