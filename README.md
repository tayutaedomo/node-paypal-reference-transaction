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
$ npm install
$ bin/www
```
Your app should now be running on http://localhost:3000.

