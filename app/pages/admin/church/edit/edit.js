((angular) => {
  'use strict';

  angular.module('appChurch')
    .controller('appChurch.editCtrl', [
      'UI',
      'churchService',
      EditCtrl
    ]);

  function EditCtrl(UI, service) {
    this.model = {};
    this.socials = [];

    UI.Loader([
      service.current(),
      service.socialList()
    ]).then((info) => {
      this.model = info[0];
      this.location = {
        address: this.model.address,
        lat: this.model.latitude,
        lng: this.model.longitude
      };

      const socialAlreadyAdded = angular.copy(this.model.social || []);
      this.model.social = [];
      info[1].forEach(social => {
        const currentValue = socialAlreadyAdded.filter(s => s.name === social.name).map(s => s.url)[0];
        this.model.social.push({
          display: social.display,
          name: social.name,
          icon: social.icon,
          url: currentValue
        });
      });
    }).catch(UI.Toast.httpHandler);

    this.submit = () => {
      const data = angular.copy(this.model);
      data.address = this.location.address;
      data.latitude = this.location.lat;
      data.longitude = this.location.lng;
      data.social = this.model.social.filter(s => s.url);

      UI.Loader(service.save(data)).then(() => {
        UI.Toast('Salvo', 'success');
      }).catch(UI.Toast.httpHandler);
    };

  }

})(angular);