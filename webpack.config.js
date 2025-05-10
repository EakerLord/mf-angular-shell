// Installation prompt -> ng add @angular-architects/module-federation --project mf-angular-shell --port 4200 host

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-angular-shell',

  remotes: {
    mfAngular16: "http://localhost:4202/remoteEntry.js",
    mfAngular19: "http://localhost:4201/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: false }),
    // ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
  },

});
