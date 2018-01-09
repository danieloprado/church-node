((angular) => {
  'use strict';

  angular.module('app').controller('app.quizFormModalCtrl', [
    '$scope',
    '$mdDialog',
    'uuid',
    'quizService',
    'question',
    QuizFormModalCtrl
  ]);

  function QuizFormModalCtrl($scope, $mdDialog, uuid, quizService, question) {
    this.types = quizService.getTypes();
    this.typesForList = quizService.getTypes().filter(t => ['text', 'boolean'].includes(t.value));
    this.model = question || { type: '' };

    $scope.$watch(() => this.model.type, type => {
      this.hasOptions = ['choose-one', 'multiple', 'list'].includes(type);
    });

    this.cancel = () => {
      $mdDialog.cancel();
    };

    this.addOption = () => {
      this.model.options = this.model.options || [];
      this.model.options.push({});
    };

    this.removeOption = (index) => {
      this.model.options.splice(index, 1);
    };

    this.submit = () => {
      if (this.hasOptions && (!this.model.options || !this.model.options.length)) {
        return;
      }

      if (!this.hasOptions) {
        this.model.enableOtherOption = false;
        delete this.model.options;
      }

      this.model.id = this.model.id || uuid();
      $mdDialog.hide(this.model);
    };
  }

})(angular);