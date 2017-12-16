const chai = require('chai');
const request = require('supertest');

const assert = chai.assert;
const expect = chai.expect;

const app = require('../app');

describe('The express app', () => {

  it('handles a GET request to /api', (done) => {
    request(app)
    .get('/api')
    .end((err, response) => {
      assert(response.body.hi === 'there');
      done();
    });
  });
  
});