/// <reference path="../../Scripts/_references.js" />
//define(['durandal/app', 'services/logger', 'services/datacontext'], function (app, logger, datacontext) {

define(function (require) {
    var app = require('durandal/app'),
        logger = require('services/logger'),
        datacontext = require('services/datacontext');

    //An AJAX call is an asyncronous task so you need to return a promise in the activate function for 
    //tell to durandal to wait until the data is retrieved before to proceed to apply bindings.
    var vm = {};

    vm.orders = ko.observableArray([]);
    vm.isLoading = ko.observable(false);
    //vm.deferred;
    vm.isAttachedToView = ko.observable(false);

    vm.activate = function () {
        var self = this;
        //self.deferred = $.Deferred();
        vm.isLoading(true);

        if (amplify.store("NorthwindOrders")) {
            vm.successCallback(amplify.store("NorthwindOrders"));
            toastr.info("Retrieved data from LocalStorage Cache");
        }
        else {
            $.when(datacontext.getOrders()).done(vm.successCallback).fail(vm.failCallback);
            toastr.info("Cache expired : Retrieved data from server");
        }
        //return self.deferred.promise();
        return true;

    };

    vm.successCallback = function (data) {
        if (amplify.store("NorthwindOrders") === undefined)
            amplify.store("NorthwindOrders", data, { expires: 60000 }); // cache data in local storage for 1 min (60000 ms)
        vm.orders = data;
        vm.isLoading(false);
        vm.isAttachedToView(true);
        //self.deferred.resolve();
    };

    vm.failCallback = function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + jqXHR.responseText);
        // vm.deferred.reject();
    };

    vm.canDeactivate = function () {
        return true;
    };

    /*vm.viewAttached = function () {
        debugger;
        app.showMessage('View Attached', 'Success', ['OK']);
        //log('View Attached', null, true);
        vm.isAttachedToView(true);
        return true;
    };*/

    return vm;
});


/*also using deffered manually, but in different way to redirect unauthenticated user to signin module

var canActivate = function() {
    var deferred = $.Deferred();
    return deferred.then(UserHandler.IsAuthenticated().done(function(response) {
        if (response.d) {
            deferred.resolve(response.d);
        } else {
            deferred.resolve({ 'redirect': 'signin' });
        }
        return deferred.promise();
    }));
};*/
