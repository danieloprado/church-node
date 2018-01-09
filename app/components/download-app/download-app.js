(angular => {
  'use strict';

  angular.module('app').component('appDownloadApp', {
    templateUrl: '/views/components/download-app/download-app.html',
    controller: [
      DownloadApp
    ]
  });

  function DownloadApp() {}

})(angular);