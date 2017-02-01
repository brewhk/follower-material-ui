Package.describe({
  name: 'brewhk:follower-material-ui',
  version: '0.0.4',
  summary: 'Material UI components for the brewhk:follower package',
  git: 'https://github.com/brewhk/follower-material-ui.git',
  documentation: 'README.md'
});

Npm.depends({
  "lodash.bindall": "4.4.0",
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('brewhk:follower@1.0.0');
  api.mainModule('client/main.js', 'client');
});
