define(['services/logger'], function (logger) {
    var title = 'Home';
    //#region Internal Methods
    function activate() {
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }
    //#endregion

    var vm = {
        activate: activate,
        title: title
    };
    return vm;
   
});
