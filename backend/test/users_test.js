import('chai').then(chai => {
    const chaiHttp = chai.use(require('chai-http'));
    const server = require('../app'); 
    const should = chai.should();
  
    describe('User API', () => {
      describe('/POST register', () => {
        it('it should register a new user', (done) => {
          chai.request(server)
            .post('/api/users/register')
            .send({ name: 'John Doe', email: 'john@example.com', password: 'password' })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('token');
              res.body.should.have.property('user');
              done();
            });
        });
  
      });
  
      describe('/GET users', () => {
        it('it should get all users', (done) => {
          chai.request(server)
            .get('/api/users')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
      });
    });
  });
  