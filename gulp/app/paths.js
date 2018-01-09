module.exports = {
  dist: 'dist/',
  publish: 'publish/dist/',
  js: ['app/main.js', 'app/**/module.js', 'app/**/*.js'],
  theme: ['app/theme/app.scss'],
  views: ['app/**/*.pug', '!app/index.pug'],
  viewIndex: 'app/index.pug',
  imgs: 'app/theme/imgs/**/*',
  svgs: [
    'app/theme/svgs/**/*',
    'bower_components/trumbowyg/dist/ui/icons.svg'
  ],
  fonts: ['app/theme/fonts/**/*.woff2', ],
  cssLibs: [
    'bower_components/animate.css/animate.min.css',
    'bower_components/angular-material/angular-material.min.css',
    'bower_components/angular-material-data-table/dist/md-data-table.min.css',
    //pickers
    'node_modules/angular-material-picker/dist/mdPickers.min.css',
    'bower_components/trumbowyg/dist/ui/trumbowyg.min.css',
    //graphs
    'bower_components/c3/c3.min.css'
  ],

  jsLibs: [
    'bower_components/jQuery/dist/jquery.min.js',
    'bower_components/lodash/dist/lodash.min.js',
    //angular
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-i18n/angular-locale_pt-br.js',
    'bower_components/angular-material/angular-material.min.js',
    'bower_components/angular-material-data-table/dist/md-data-table.min.js',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-jwt/dist/angular-jwt.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    //mask
    'bower_components/angular-input-masks/angular-input-masks-dependencies.min.js',
    'bower_components/angular-input-masks/angular-input-masks.min.js',
    //Maps
    'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
    'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
    //markdown
    'bower_components/marked/marked.min.js',
    //pickers
    'bower_components/moment/min/moment.min.js',
    'bower_components/moment/locale/pt-br.js',
    'node_modules/angular-material-picker/dist/mdPickers.min.js',
    //validator
    'bower_components/md-form-validator/dist/md-form-validator.min.js',
    'bower_components/angular-validator-async/dist/angular-validator-async.min.js',
    'bower_components/angular-validator-equals/dist/angular-validator-equals.min.js',
    //editor
    'bower_components/trumbowyg/dist/trumbowyg.min.js',
    'bower_components/trumbowyg/dist/langs/pt.min.js',
    //logger
    'bower_components/raven-js/dist/raven.min.js',
    'bower_components/raven-js/dist/plugins/angular.min.js',
    //graphs
    'bower_components/d3/d3.min.js',
    'bower_components/c3/c3.min.js',
    //uuid
    'bower_components/uuid-js/lib/uuid.js'
  ]
};