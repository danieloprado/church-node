(function(angular, raven) {
  'use strict';

  angular.module('app').factory('$exceptionHandler', [
    'ENV',
    'SENTRY_KEY',
    $exceptionHandler
  ]);

  function $exceptionHandler(ENV, SENTRY_KEY) {
    if (ENV !== 'production') {
      return (exception) => {
        console.error(exception);
      };
    }

    raven
      .config(SENTRY_KEY)
      .install();

    return (exception, cause) => {
      if (!exception) return;

      if (typeof exception === 'string') {
        exception = new Error(exception);
      }

      exception.cause = cause;
      raven.captureException(exception);
      console.error(exception);
    };

  }

})(angular, window.Raven);