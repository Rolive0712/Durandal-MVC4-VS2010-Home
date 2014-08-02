define(['amplify'], function (amplify) {
    var init = function () {

        amplify.request.define('northwind', 'ajax', {
            url: '/Northwind/GetOrders',
            dataType: 'json',
            type: 'GET',
            //cache: "persist",
            cache: {
                type: "localStorage", //html5 storage
                expires: 30           //milliseconds
            }
        });
    },

    getNorthwindOrders = function (callbacks, data) {
        return amplify.request({
            resourceId: 'northwind',
            data: data,
            success: callbacks.success,
            error: callbacks.error
        });
    }

    init();

    return {
        getNorthwindOrders: getNorthwindOrders
    };
});
