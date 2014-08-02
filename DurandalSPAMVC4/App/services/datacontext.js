/// <reference path="../../Scripts/_references.js" />

define(['services/dataservice.northwind'],
    function (northwindService) {

        getOrders = function (callback) {
            var param = { viewname: "northwind", orderid: 1 };
            return northwindService.getNorthwindOrders(callback, param);
        };

        var datacontext = {
            getOrders: getOrders
        };

        return datacontext;
    });

/*function getOrders(callback) {
    var northwindService = require('services/dataservice.northwind');

    var param = { viewname: "northwind", orderid: 1 };

    return northwindService.getNorthwindOrders(callback, param);

    //return $.ajax({ // returns a promise
    //    url: "/Northwind/GetOrders",
    //    type: "POST",
    //    cache: false,
    //    data: JSON.stringify(param),
    //    async: true,
    //    dataType: "json",
    //    contentType: "application/json; charset=utf-8"

    //});
}

var datacontext = {
    getOrders: getOrders
};

return datacontext;
});*/
