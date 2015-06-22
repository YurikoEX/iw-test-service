///<reference path='../node_modules/ironworks/ironworks.d.ts' />
var ironworks = require('ironworks');
var async = require('async');
var path = require('path');
var remoteWorker = require('./workers/remote-worker');
var RemoteService = (function () {
    function RemoteService() {
        this.service = new ironworks.service('remote-service', {
            dependencyCheckTimeout: 250,
            dependencyCheckFrequency: 10
        })
            .inject(function (service, use) {
            var w = new remoteWorker(service);
            use(w);
        })
            .inject(function (service, use) {
            use(new ironworks.plugins.http(service.comm, service.who()));
        })
            .inject(function (service, use) {
            use(new ironworks.plugins.socket(service.comm, service.who()));
        })
            .info('error', function (e) {
            throw e;
        })
            .info('ready', function (iw) {
            console.log('READY');
        })
            .start();
    }
    return RemoteService;
})();
module.exports = RemoteService;
//# sourceMappingURL=remote-service.js.map