((angular, $) => {
  'use strict';

  angular.module('app').directive('uploadFile', [
    '$timeout',
    'Toast',
    directive
  ]);

  function directive($timeout, Toast) {
    return {
      restrict: 'EA',
      scope: {
        callback: '&uploadFile'
      },
      link: function($scope, elem, attrs) {
        const extensions = (attrs.extensions || '').split(',').filter(e => e);
        const maxFileSize = attrs.maxFileSize === undefined ? 5e+6 : Number(attrs.maxFileSize);
        const readFile = attrs.readFile !== 'false';

        const updateScope = function() {
          $timeout(function() {});
        };

        const resultSuccess = function(src, file) {
          $scope.callback({
            $value: {
              success: true,
              base64: src,
              filename: file.name,
              original: file
            }
          });
          updateScope();
        };

        const resultFail = function(reason, filename) {
          switch (reason) {
            case 'invalidExtension':
              Toast.show(`ExtensÃ£o invÃ¡lida: ${filename}`, 'error');
              break;
            case 'maxFileSize':
              Toast.show(`Tamanho mÃ¡ximo Ã© de 5MB: ${filename}`, 'error');
              break;
          }
        };

        const hasExtension = function(filename) {
          if (!extensions.length) return true;
          return extensions.some(ext => {
            return new RegExp('[\\s\\S]+\\' + ext.toString().trim().toLowerCase() + '\\b', 'i').test(filename);
          });
        };

        elem.click(function() {
          $(`<input type="file" accept="${extensions.join()}" ${attrs.multiple ? 'multiple' : ''} />`).on('change', function() {
            const files = $(this)[0].files;

            for (let x = 0; x < files.length; x++) {
              const file = files[x];

              if (!hasExtension(file.name)) {
                resultFail('invalidExtension', file.name);
                return;
              }

              if (maxFileSize !== 0 && file.size > maxFileSize) {
                resultFail('maxFileSize', file.name);
                return;
              }

              if (!readFile) {
                resultSuccess(null, file);
                return;
              }

              const reader = new FileReader();
              reader.readAsDataURL(file);

              reader.onload = function(response) {
                resultSuccess(response.target.result, file);
              };
            }
          }).trigger('click');
        });
      }
    };
  }

})(angular, angular.element);