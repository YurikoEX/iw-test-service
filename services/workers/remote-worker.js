///<reference path='../../node_modules/ironworks/ironworks.d.ts' />
var _ = require('lodash');
var ironworks = require('ironworks');
var async = require('async');
var RemoteWorker = (function () {
    function RemoteWorker(service) {
        this.worker = new ironworks.worker([
            'iw-socket'
        ], service.comm, service.who(), {
            id: 'remote-worker',
            name: 'remote-worker'
        });
        this.worker.answer('foo', function (cb) {
            cb(null, 'bar');
        });
        this.worker.init = function (cb) {
            if (!_.isUndefined(cb)) {
                cb();
            }
        };
        this.worker.start = function (deps, cb) {
            if (!_.isUndefined(cb)) {
                cb();
            }
        };
        return this.worker;
    }
    return RemoteWorker;
})();
module.exports = RemoteWorker;
//# sourceMappingURL=remote-worker.js.map