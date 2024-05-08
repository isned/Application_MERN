// Utilisation de l'importation dynamique pour chai
import('chai').then(chai => {
    // Utilisation de chai ici
    const chaiHttp = chai.default.use(require('chai-http'));
    const server = require('../app');
    const should = chai.default.should();
  
    describe('Authentication API', () => {
      describe('/POST login-user', () => {
        it('it should return error if email or password is missing', (done) => {
          chaiHttp.request(server)
            .post('/api/auth/login-user')
            .send({})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('msg').eql('Please enter all data');
              done();
            });
        });
      });
    });
  });
  