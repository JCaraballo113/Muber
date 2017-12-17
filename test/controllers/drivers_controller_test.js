const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

const assert = chai.assert;
const expect = chai.expect;

const app = require('../../app');

describe('Drivers Controller', () => {
  it('Post to /api/drivers creates a new driver', (done) => {
    Driver.count().then(count => {

      request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
      .end(() => {

        Driver.count().then(newCount => {
          assert(count + 1 === newCount);
          done();
        });

      });
    });
  });
});