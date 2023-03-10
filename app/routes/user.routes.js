const {authJwt} = require('../middlewares');
const controller = require('../controllers/user.controller')


module.exports = function(app){
     app.use(function(req, res, next){
          res.header("Access-Contol-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

          next();
     });

     app.get('/api/all-access', controller.allAccess);

     app.get("/api/users", [authJwt.verifyToken], controller.userBoard);

     app.get( "/api/admin", [ authJwt.verifyToken], controller.adminBoard);

}