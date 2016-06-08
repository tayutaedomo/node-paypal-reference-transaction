# node-paypal-reference-transaction
Try PayPal Reference Transaction on Node.js


# About Reference Transaction
See following:
- English: [https://developer.paypal.com/docs/classic/express-checkout/integration-guide/ECReferenceTxns/](https://developer.paypal.com/docs/classic/express-checkout/integration-guide/ECReferenceTxns/)
- Japanese: [pp_expresscheckout_advancedfeaturesguide_jp.pdf](https://www.paypalobjects.com/webstatic/ja_JP/developer/docs/pdf/pp_expresscheckout_advancedfeaturesguide_jp.pdf)


# Prepare
You should get the PayPal sandbox information. See following:
- [https://developer.paypal.com/docs/classic/lifecycle/ug_sandbox](https://developer.paypal.com/docs/classic/lifecycle/ug_sandbox)

You have to get a permission to use the Reference Transaction on sandbox.
If you don't have it yet, you should request to PayPal technical support.
- [https://jp.paypal-techsupport.com/](https://jp.paypal-techsupport.com/)


# Setup on your local
Install node-dev if you need.
```
$ npm install -g node-dev
```

Set environment variables.
```
export PAYPAL_MODE=sandbox
export PAYPAL_USER=<your user id for NVP API>
export PAYPAL_PWD=<your password for NVP API>
export PAYPAL_SIGNATURE=<your signature for NVP API>
```

`git clone` and start app.
```
$ git clone git@github.com:tayutaedomo/node-paypal-subscription.git
$ cd node-paypal-subscription
$ npm install
$ bin/www
```
Your app should now be running on http://localhost:3000.


# Operations
## SetExpressCheckout
Access [http://localhost:3000/checkout](http://localhost:3000/checkout) on your browser.

![checkout 1](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_checkout_1.png)

![checkout 2](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_checkout_2.png)

## Callback from PayPal
![checkout 3](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_checkout_3.png)


## CreateBillingAgreement
Access [http://localhost:3000/agreement](http://localhost:3000/agreement) on your browser.

![agreement 1](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_agreement_1.png)

![agreement 2](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_agreement_2.png)


## DoReferenceTransaction
Access [http://localhost:3000/transaction](http://localhost:3000/transaction) on your browser.

![transaction 1](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_transaction_1.png)

![transaction 2](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_transaction_2.png)


# References
## How to
- https://developer.paypal.com/docs/classic/express-checkout/ht_ec-refTrans-SetEC-DoRefTrans-curl-etc/

## API Docs
- SetExpressCheckout
  - https://developer.paypal.com/docs/classic/api/merchant/SetExpressCheckout_API_Operation_NVP/

- CreateBillingAgreement
  - https://developer.paypal.com/docs/classic/api/merchant/CreateBillingAgreement_API_Operation_NVP/

- DoReferenceTransaction
  - https://developer.paypal.com/docs/classic/api/merchant/DoReferenceTransaction_API_Operation_NVP/




