const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('Restaurants API', () => {

  describe('POST /restaurant/getall', () => {
    it('It should get all restaurants', (done) => {
      chai.request(server)
        .post('/restaurant/getall')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.response.restaurants.should.be.a('array');
          done();
        })
    })
  })

  describe('POST /restaurant/create', () => {
    it('It should get all restaurants', (done) => {
      chai.request(server)
        .post('/restaurant/create')
        .send(restaurant)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.response.restaurants.should.be.a('array');
          done();
        })
    })
  })

});