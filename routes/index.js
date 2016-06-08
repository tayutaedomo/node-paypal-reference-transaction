var express = require('express');
var router = express.Router();

var beautify = require('js-beautify').js_beautify;
var PayPalEC = require('paypal-ec2');


function create_paypal_ec() {
  var cred = {
    username: process.env.PAYPAL_USER,
    password: process.env.PAYPAL_PWD,
    signature: process.env.PAYPAL_SIGNATURE
  };
  var opts = {
    sandbox: process.env.PAYPAL_MODE != 'production',
    version: process.env.PAYPAL_MODE || '86'
  };

  return new PayPalEC(cred, opts);
}


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
  var ec = create_paypal_ec();

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

      data.params = beautify(JSON.stringify(params), { indent_size: 2 });
      data.redirect_url = result.PAYMENTURL;
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

router.get('/agreement', function(req, res, next) {
  res.render('agreement', {
    title: 'Billing Agreement',
    error: {},
    data: {}
  });
});

router.post('/agreement', function(req, res, next) {
  var ec = create_paypal_ec();

  var params = {
    'TOKEN': req.body.token
  };
  ec.create_billing_agreement(params, function(err, result) {
    var error = {};
    var data = {};

    if (err) {
      console.error(err);
      error.message = beautify(JSON.stringify(err), { indent_size: 2 });
    }

    if (result) {
      data.message = beautify(JSON.stringify(result), { indent_size: 2 });
    }

    res.render('agreement', {
      title: 'Billing Agreement Post',
      error: error,
      data: data
    });
  });
});

router.get('/transaction', function(req, res, next) {
  res.render('transaction', {
    title: 'Reference Transaction',
    error: {},
    data: {}
  });
});

router.post('/transaction', function(req, res, next) {
  var ec = create_paypal_ec();

  var params = {
    'AMT': req.body.amount,
    'CURRENCYCODE': req.body.currency,
    'PAYMENTACTION': req.body.payment_action,
    'REFERENCEID': req.body.billing_agreement_id
  };
  ec.do_reference_transaction(params, function(err, result) {
    var error = {};
    var data = {};

    if (err) {
      console.error(err);
      error.message = beautify(JSON.stringify(err), { indent_size: 2 });
    }

    if (result) {
      data.message = beautify(JSON.stringify(result), { indent_size: 2 });

      data.params = beautify(JSON.stringify(params), { indent_size: 2 });
    }

    res.render('transaction', {
      title: 'Reference Transaction Post',
      error: error,
      data: data
    });
  });
});


module.exports = router;

