(angular => {
  'use strict';

  angular.module('appChurchReport').directive('appChurchReportIndexGraphsLine', [
    'c3',
    'lodash',
    'moment',
    Directive
  ]);

  function Directive(c3, lodash, moment) {

    function format(reports) {
      const columns = [];

      const dates = reports.reverse().reduce((acc, report) => {
        let date = acc.find(a => moment(a.date).isSame(report.date, 'day'));

        if (!date) {
          date = { date: report.date, reports: [] };
          acc.push(date);
        }

        date.reports.push(report);
        return acc;
      }, []);

      columns.push(['Dates', ...dates.map(d => moment(d.date).format('DD/MMM/YY - ddd'))]);
      columns.push(['Total', ...dates.map(d => d.reports.reduce((acc, r) => acc + r.total, 0))]);

      const types = lodash.uniqBy(reports.map(r => r.type), t => t.id);
      columns.push(...types.map(type => {
        return [type.name, ...dates.map(d => d.reports.filter(r => r.type.id === type.id).reduce((acc, r) => acc + r.total, 0))];
      }));

      return {
        x: 'Dates',
        columns
      };
    }

    return {
      scope: {
        reports: '='
      },
      template: '<div />',
      link: ($scope, elem) => {
        const chart = c3.generate({
          bindto: elem.find('div')[0],
          data: {
            x: 'Dates',
            columns: [
              ['Dates']
            ]
          },
          axis: {
            x: { type: 'categories' },
            y: { padding: { bottom: 0 } }
          }
        });

        $scope.$watchCollection(() => $scope.reports, reports => {
          if (!reports) return;
          chart.load(format(angular.copy(reports)));
        });

      }
    };
  }

})(angular);