(function(angular) {

  angular.module('app').filter('quizQuestionType', [
    'quizService',
    Filter
  ]);

  function Filter(quizService) {
    const types = quizService.getTypes();

    return value => {
      return (types.find(r => r.value === value) || { display: value }).display;
    };

  }
})(angular);