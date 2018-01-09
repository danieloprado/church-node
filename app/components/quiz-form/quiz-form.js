(angular => {
  'use strict';

  angular.module('app').component('appQuizFormComponent', {
    templateUrl: '/views/components/quiz-form/quiz-form.html',
    controller: [
      'quizService',
      'lodash',
      QuizFormComponent
    ],
    bindings: {
      ngModel: '='
    }
  });

  function QuizFormComponent(quizService, lodash) {
    this.ngModel = this.ngModel || {};
    this.ngModel.questions = this.ngModel.questions || [];

    this.form = (question, $event) => {
      quizService.form(question, $event).then(result => {
        this.ngModel = this.ngModel || {};
        this.ngModel.questions = this.ngModel.questions || [];

        if (!question) return this.ngModel.questions.push(result);

        lodash.merge(question, result);
        question.options = result.options;
      });
    };

    this.removeQuestion = (question) => {
      const index = this.ngModel.questions.findIndex(q => q === question);
      this.ngModel.questions.splice(index, 1);
    };
  }

})(angular);