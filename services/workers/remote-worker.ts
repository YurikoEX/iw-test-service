///<reference path='../../node_modules/ironworks/ironworks.d.ts' />

var _ = require('lodash');
var ironworks = require('ironworks');
var async = require('async');

class RemoteWorker{
    worker: any;
    constructor(service){
        this.worker = new ironworks.worker([
            'iw-socket'
        ], service.comm, service.who(), {
            id: 'remote-worker',
            name: 'remote-worker'
        });
        this.worker.answer('foo', function (cb) {
            cb(null,'bar');
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
}

export = RemoteWorker;