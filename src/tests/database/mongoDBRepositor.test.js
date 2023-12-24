const { expect } = require('chai');
const mongoose = require('mongoose');
const { db } = require('../../database/mongoDBRepository');

describe('MongoDB Connection', () => {
    it('should connect to MongoDB successfully', (done) => {
        expect(db.readyState).to.equal(1);// 1: connected

        done();
    });

    after((done) => {
        mongoose.disconnect();

        done();
    });
});
