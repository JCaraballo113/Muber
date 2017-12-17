const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

const assert = chai.assert;
const expect = chai.expect;

const app = require('../../app');

describe('Drivers Controller', () => {
  it('POST to /api/drivers creates a new driver', (done) => {
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

  it('PUT to /api/drivers/:id updates a driver', (done) => {
    const driver = new Driver({ email: 'testedit@test.com', driving: false });

    driver.save()
    .then(driver => {
      request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({ driving: true })
      .end(() => {
        Driver.findOne({ email: 'testedit@test.com' })
        .then(driver => {
          assert(driver.driving === true);
          done();
        });
      });
    });
  });

  it('DELETE to /api/drivers/:id removes a driver', (done) => {
    const driver = new Driver({ email: 'testdelete@test.com', driving: false });
    driver.save()
    .then(driver => {
      request(app)
      .delete(`/api/drivers/${driver._id}`)
      .end(() => {
        Driver.findOne({ email: 'testdelete@test.com'})
        .then(driver => {
          assert(driver === null);
          done();
        });
      });
    });
  });
});