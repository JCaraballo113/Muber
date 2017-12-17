const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

const assert = chai.assert;
const expect = chai.expect;

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

  it('GET to /api/drivers finds drivers in a location', (done) => {
    const seattleDriver = new Driver({ 
      email: 'seattle@test.com', 
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] } 
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com', 
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] } 
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()])
    .then(() => {
      request(app)
      .get('/api/drivers?lng=-80&lat=25')
      .end((err, response) => {
        console.log(response);
        done();
      });
    });

  });
});