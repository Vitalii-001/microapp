const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
      // TypeScript-Kompilierung + AOT

const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
      // Build Optimizer

const path = require('path');
const webpack = require('webpack');

const clientA = {
  entry: './components/client-a/src/main.ts',
  resolve: {
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [
      { test: /\.ts$/, loaders: ['@ngtools/webpack'] },
      { test: /\.html$/, loader: 'html-loader',  options: { minimize: true } },
      /*{
        test: /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "import": false
            }
          }
        ]
      },*/
      
      {
        test: /\.js$/,
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: {
          sourceMap: false
        }
      }
      
    ]
  },
  plugins: [
    
    new AotPlugin({
      skipCodeGeneration: false,
      tsConfigPath: './components/client-a/tsconfig.app.json',
      hostReplacementPaths: {
        "./src/environments/environment.ts": "./src/environments/environment.prod.ts"
      },
      entryModule: path.resolve(__dirname, './components/client-a/src/app/app.module#AppModule' )
    }),
    
    new PurifyPlugin()
    
  ],
  output: {
    path: __dirname + '/dist/frame/client-a',
    filename: 'main.bundle.js'
  },
  mode: 'production'
};

const clientB = {
  entry: './components/client-b/src/main.ts',
  resolve: {
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [
      { test: /\.ts$/, loaders: ['@ngtools/webpack'] },
      { test: /\.html$/, loader: 'html-loader',  options: { minimize: true } },
      /*{
        test: /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "import": false
            }
          }
        ]
      },*/
      
      {
        test: /\.js$/,
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: {
          sourceMap: false
        }
      }
      
    ]
  },
  plugins: [

    new AotPlugin({
      skipCodeGeneration: false,
      hostReplacementPaths: {
        "./src/environments/environment.ts": "./src/environments/environment.prod.ts"
      },
      tsConfigPath: './components/client-b/tsconfig.app.json',
      entryModule: path.resolve(__dirname, './components/client-b/src/app/app.module#AppModule' )
    }),
    
    new PurifyPlugin()
    
  ],
  output: {
    path: __dirname + '/dist/frame/client-b',
    filename: 'main.bundle.js'
  },
  mode: 'production'
};

module.exports = [clientA, clientB];
