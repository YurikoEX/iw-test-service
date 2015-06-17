///<reference path='./node_modules/ironworks/ironworks.d.ts' />
var _ = require('lodash');

import RemoteService = require('./services/remote-service')

if (_.isUndefined(process.env.VCAP_APP_PORT)) {
    process.env.VCAP_APP_PORT = 8081;
}
console.log(process.env.VCAP_APP_PORT);

var service = new RemoteService();