var express = require('express');
var router = express.Router();

var beautify = require('js-beautify').js_beautify;
var PayPalEC = require('paypal-ec2');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout', {
    title: 'Express Checkout',
    error: {},
    data: {}
  });
});

router.post('/checkout', function(req, res, next) {
  var cred = {
    username: process.env.PAYPAL_USER,
    password: process.env.PAYPAL_PWD,
    signature: process.env.PAYPAL_SIGNATURE
  };
  var opts = {
    sandbox: process.env.PAYPAL_MODE != 'production',
    version: process.env.PAYPAL_MODE || '86'
  };

  var ec = new PayPalEC(cred, opts);

  var params = {
    'PAYMENTREQUEST_0_PAYMENTACTION': 'AUTHORIZATION',
    'PAYMENTREQUEST_0_AMT': 0,
    'PAYMENTREQUEST_0_CURRENCYCODE': req.body.currency,
    'L_BILLINGTYPE0': 'MerchantInitiatedBilling',
    'cancelUrl': req.body.cancel_url,
    'returnUrl': req.body.return_url
  };
  ec.set(params, function(err, result) {
    var error = {};
    var data = {};

    if (err) {
      console.error(err);
      error.message = beautify(JSON.stringify(err), { indent_size: 2 });
    }

    if (result) {
      data.message = beautify(JSON.stringify(result), { indent_size: 2 });
    }

    res.render('checkout', {
      title: 'Express Checkout Post',
      error: error,
      data: data
    });
  });
});

router.get('/checkout/callback_cancel', function(req, res, next) {
  res.render('checkout', {
    title: 'Express Checkout Callback',
    error: {
      message: beautify(JSON.stringify(req.query), { indent_size: 2 })
    },
    data: {}
  });
});

router.get('/checkout/callback_success', function(req, res, next) {
  res.render('checkout', {
    title: 'Express Checkout Callback',
    error: {},
    data: {
      message: beautify(JSON.stringify(req.query), { indent_size: 2 })
    }
  });
});


module.exports = router;

