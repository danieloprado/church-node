(angular => {
  'use strict';

  angular.module('app').component('appImageUploadComponent', {
    templateUrl: '/views/components/image-upload/image-upload.html',
    controller: [
      ImageUploadComponent
    ],
    bindings: {
      ngModel: '=',
      label: '@',
      size: '@'
    }
  });

  function ImageUploadComponent() {
    this.ngModel = this.ngModel || {};

    this.getFileUrl = () => {
      if (!this.ngModel) return '';
      return this.ngModel.base64 || `/api/content/${this.ngModel}`;
    };

    this.hasFile = () => {
      return !!this.getFileUrl();
    };

    this.upload = (result) => {
      this.ngModel = { filename: result.filename, base64: result.base64 };
    };

    this.removeUpload = () => {
      this.ngModel = null;
    };
  }

})(angular);