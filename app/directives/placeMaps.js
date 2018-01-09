((angular) => {
  'use strict';

  angular.module('app').directive('appPlaceMaps', [IcbPlaceMaps]);

  function IcbPlaceMaps() {

    return {
      restrict: 'E',
      scope: {
        ngModel: '=',
        placeholder: '@'
      },
      template: `
        <md-progress-circular
            md-diameter="60"
            md-mode="indeterminate">
        </md-progress-circular>

        <ui-gmap-google-map center="map.center" zoom="map.zoom" options="options">
          <ui-gmap-marker coords="marker.coords"
                          options="marker.options"
                          events="marker.events"
                          idkey="marker.id">
          </ui-gmap-marker>

          <ui-gmap-search-box template="searchbox.template" events="searchbox.events" />
        </ui-gmap-google-map>
      `,
      controller: ['$scope', '$templateCache', '$q', '$timeout', 'lodash', 'UI', Controller],
      link: ($scope, elem) => {

        $scope.$watch('ngModel', (v) => {
          if (!v) return;
          elem.find('input[type=text]').val(v.address);
        }, true);

        (function checkInput() {
          if (elem.find('input[type=text]').length > 0) {
            elem.find('input[type=text]').val($scope.ngModel.address);
            return;
          }

          setTimeout(checkInput, 50);
        })();

        elem.on('keypress keyup keydown', 'input[type=text]', ($event) => {
          const keyCode = $event.keyCode || $event.which;
          if (keyCode === 13) {
            $event.preventDefault();
          }
        });

      }
    };
  }

  function Controller($scope, $templateCache, $q, $timeout, _, UI) {
    $scope.placeholder = $scope.placeholder || 'Pesquisar';
    $scope.ngModel = $scope.ngModel || {};

    const defaultLocation = {
      lat: -23.5015338,
      lng: -47.45259440000001
    };

    const initialValue = {
      latitude: $scope.ngModel.lat || defaultLocation.lat,
      longitude: $scope.ngModel.lng || defaultLocation.lng,
    };


    const setCenter = (lat, lng) => {
      $scope.map.center.latitude = $scope.marker.coords.latitude = lat || defaultLocation.lat;
      $scope.map.center.longitude = $scope.marker.coords.longitude = lng || defaultLocation.lng;
    };

    const updateValue = (value) => {
      $scope.ngModel = $scope.ngModel || {};

      value = value || {};
      value.lat = value.lat || defaultLocation.lat;
      value.lng = value.lng || defaultLocation.lng;

      if (_.isEqual(value, {
          lat: $scope.ngModel.lat,
          lng: $scope.ngModel.lng,
          address: $scope.ngModel.address
        })) {
        return;
      }

      if (!value.address) {
        delete $scope.ngModel.lat;
        delete $scope.ngModel.lng;
        delete $scope.ngModel.address;
        return;
      }

      $scope.ngModel.lat = value.lat;
      $scope.ngModel.lng = value.lng;
      $scope.ngModel.address = value.address;
    };

    $scope.map = {
      center: angular.copy(initialValue),
      zoom: 16
    };

    $scope.options = {
      scrollwheel: false
    };

    $scope.marker = {
      id: 0,
      coords: angular.copy(initialValue),
      options: {
        draggable: true
      },
      events: {
        dragend: function(marker) {
          const deferred = $q.defer();

          (new google.maps.Geocoder()).geocode({
            location: marker.getPosition()
          }, (results, status) => {
            if (status !== google.maps.GeocoderStatus.OK) {
              deferred.reject(results);
              return;
            }

            deferred.resolve(results[0]);
          });

          UI.Loader(deferred.promise).then(address => {
            updateValue({
              lat: marker.getPosition().lat(),
              lng: marker.getPosition().lng(),
              address: address.formatted_address
            });
          }).catch(() => {
            UI.Toast('Não foi possivel achar o endereço', 'error');
          });

        }
      }
    };

    $templateCache.put('appPlaceMapsSearchBox',
      `<input type="text" class="ng-scope" placeholder="${$scope.placeholder}">`);

    $scope.searchbox = {
      template: 'appPlaceMapsSearchBox',
      events: {
        places_changed: (searchBox) => {
          const places = searchBox.getPlaces();

          if (places.length === 0) {
            UI.Toast('Não foi possivel achar o endereço', 'error');
            return;
          }

          const place = places[0];
          const coords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };

          updateValue({
            lat: coords.lat,
            lng: coords.lng,
            address: place.formatted_address
          });

        }
      }
    };

    $scope.$watch('ngModel', (value) => {
      if (!value) return;

      setCenter(value.lat, value.lng);
      updateValue(value);
    }, true);
  }

})(angular);