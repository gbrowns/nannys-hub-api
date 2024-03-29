const { authJwt, filters } = require('../middlewares');
const controller = require('../controllers/mpesa.controller');
const {mpesaOAuth} = require('../utils');

module.exports = function(app){
      app.use((req, res, next) => {
            res.header("Access-Contol-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

            next();
      });

      app.get('/api/mpesa/access-token',[authJwt.verifyToken], controller.getAccessToken);
      app.get('/api/mpesa/payments',[authJwt.verifyToken, filters.paginate, filters.dynamicFilter], controller.getAllPayments);
      app.get('/api/mpesa/payments/:id', [authJwt.verifyToken], controller.getOnePayment);
      app.post('/api/mpesa/pay',[mpesaOAuth], controller.lipaNaMpesa);
      app.post('/api/mpesa/callback', controller.lipaNaMpesaCallback) //lipNaMpesaCallback
      app.post('/api/mpesa/confirm', controller.confirmPayment) //lipNaMpesaCallback
}