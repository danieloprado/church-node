((angular) => {
  'use strict';

  angular.module('app').factory('quizService', [
    '$mdDialog',
    QuizService
  ]);

  function QuizService($mdDialog) {

    const getTypes = () => {
      return [
        { value: 'text', display: 'Texto Livre' },
        { value: 'email', display: 'Email' },
        { value: 'phone', display: 'Telefone' },
        { value: 'date', display: 'Data' },
        { value: 'zipcode', display: 'CEP' },
        { value: 'number', display: 'Número' },
        { value: 'boolean', display: 'Afirmativa' },
        { value: 'choose-one', display: 'Escolha única' },
        { value: 'multiple', display: 'Multipla escolha' },
        // { value: 'list', display: 'Lista' },
      ];
    };

    const form = (question, $event) => {
      return $mdDialog.show({
        controller: 'app.quizFormModalCtrl',
        controllerAs: '$ctrl',
        templateUrl: '/views/components/quiz-form/modal/modal.html',
        targetEvent: $event,
        fullscreen: true,
        resolve: {
          question: () => angular.copy(question)
        }
      });
    };

    return {
      form,
      getTypes
    };
  }

})(angular);