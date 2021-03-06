///<reference path='../node_modules/ironworks/ironworks.d.ts' />
var ironworks = require('ironworks');
var async = require('async');
var path = require('path');

import remoteWorker = require('./workers/remote-worker')

class RemoteService{
    service: any; //wish i had types :(
    constructor(){
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
}

export = RemoteService;