(function(angular) {
  'use strict';

  angular.module('app').directive('appEditor', [
    '$timeout',
    DatePicker
  ]);

  function DatePicker($timeout) {

    return {
      restrict: 'E',
      scope: {
        ngModel: '='
      },
      template: '<textarea />',
      link: ($scope, elem, attrs) => {
        let changeTimeout, ignoreChange;
        const textarea = elem.find('textarea');

        elem.css({ display: 'block' });
        textarea.attr('placeholder', attrs.placeholder);

        const change = value => {
          $timeout.cancel(changeTimeout);
          changeTimeout = $timeout(() => {
            ignoreChange = true;
            $scope.ngModel = value;
          }, 500);
        };

        textarea.trumbowyg({
          lang: 'pt',
          semantic: false,
          resetCss: true,
          removeformatPasted: true,
          useComposition: false,
          autogrow: true,
          svgPath: '/svgs/icons.svg',
          btns: [
            'viewHTML', ['h1', 'h2'],
            ['bold', 'italic', 'underline'],
            ['superscript', 'subscript'],
            'btnGrp-justify',
            'btnGrp-lists', ['horizontalRule'],
            ['removeformat'],
            ['fullscreen']
          ]
        }).on('tbwchange', () => {
          change(textarea.trumbowyg('html'));
        }).on('tbwblur', () => {
          change(textarea.trumbowyg('html'));
        });

        $scope.$watch('ngModel', value => {
          if (ignoreChange) {
            ignoreChange = false;
            return;
          }

          textarea.trumbowyg('html', value || '');
        });

      }
    };

  }


})(angular);