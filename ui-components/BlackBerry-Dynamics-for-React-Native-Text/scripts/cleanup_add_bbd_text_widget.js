/**
 * Copyright (c) 2020 BlackBerry Limited. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
  var fs = require('fs'),
    path = require('path'),
    projectRoot = process.env.INIT_CWD,
    bbdTextWidgetName = 'AndroidTextBbd',
    bbdVirtualTextWidgetName = 'AndroidVirtualTextBbd',
    rn60RendererOssPath = path.join(projectRoot, 'node_modules', 'react-native', 'Libraries', 'Renderer', 'oss'),
    rn60RendererDevArr = [
      path.join(rn60RendererOssPath, 'ReactFabric-dev.js'),
      path.join(rn60RendererOssPath, 'ReactNativeRenderer-dev.js')
    ],
    rn60RendererOtherArr = [
      path.join(rn60RendererOssPath, 'ReactFabric-prod.js'),
      path.join(rn60RendererOssPath, 'ReactFabric-profiling.js'),
      path.join(rn60RendererOssPath, 'ReactNativeRenderer-prod.js'),
      path.join(rn60RendererOssPath, 'ReactNativeRenderer-profiling.js')
    ],
    rn61RendererImplementationsPath = path.join(projectRoot, 'node_modules', 'react-native', 'Libraries', 'Renderer', 'implementations'),
    rn61RendererDevArr = [
      path.join(rn61RendererImplementationsPath, 'ReactFabric-dev.fb.js'),
      path.join(rn61RendererImplementationsPath, 'ReactFabric-dev.js'),
      path.join(rn61RendererImplementationsPath, 'ReactNativeRenderer-dev.fb.js'),
      path.join(rn61RendererImplementationsPath, 'ReactNativeRenderer-dev.js')
    ],
    rn61RendererOtherArr = [
      path.join(rn61RendererImplementationsPath, 'ReactFabric-prod.fb.js'),
      path.join(rn61RendererImplementationsPath, 'ReactFabric-prod.js'),
      path.join(rn61RendererImplementationsPath, 'ReactFabric-profiling.fb.js'),
      path.join(rn61RendererImplementationsPath, 'ReactFabric-profiling.js'),
      path.join(rn61RendererImplementationsPath, 'ReactNativeRenderer-prod.fb.js'),
      path.join(rn61RendererImplementationsPath, 'ReactNativeRenderer-prod.js'),
      path.join(rn61RendererImplementationsPath, 'ReactNativeRenderer-profiling.fb.js'),
      path.join(rn61RendererImplementationsPath, 'ReactNativeRenderer-profiling.js')
    ];

  checkAndExitOrContinue();

  if (fs.existsSync(rn60RendererOssPath)) {
    rn60RendererDevArr.forEach(function(filePath) {
      var bbdTextWidgetCode = 'type === "' + bbdTextWidgetName + '" || // Android\n\t\t',
        bbdVirtualTextWidgetCode = 'type === "' + bbdVirtualTextWidgetName + '" || // Android\n\t\t';

      cleanupBbdTextWidget(filePath, bbdTextWidgetCode + bbdVirtualTextWidgetCode);
    });

    rn60RendererOtherArr.forEach(function(filePath) {
      var bbdTextWidgetCode = '"' + bbdTextWidgetName + '" === nextContext ||\n\t\t',
        bbdVirtualTextWidgetCode = '"' + bbdVirtualTextWidgetName + '" === nextContext ||\n\t\t';
      
      cleanupBbdTextWidget(filePath, bbdTextWidgetCode + bbdVirtualTextWidgetCode);
    });
  }

  if (fs.existsSync(rn61RendererImplementationsPath)) {
    rn61RendererDevArr.forEach(function(filePath) {
      var bbdTextWidgetCode = 'type === "' + bbdTextWidgetName + '" || // Android\n\t\t',
        bbdVirtualTextWidgetCode = 'type === "' + bbdVirtualTextWidgetName + '" || // Android\n\t\t';

      cleanupBbdTextWidget(filePath, bbdTextWidgetCode + bbdVirtualTextWidgetCode);
    });

    rn61RendererOtherArr.forEach(function(filePath) {
      var bbdTextWidgetCode = '"' + bbdTextWidgetName + '" === nextContext ||\n\t\t',
        bbdVirtualTextWidgetCode = '"' + bbdVirtualTextWidgetName + '" === nextContext ||\n\t\t';
      
      cleanupBbdTextWidget(filePath, bbdTextWidgetCode + bbdVirtualTextWidgetCode);
    });
  }

  function cleanupBbdTextWidget (filePath, widget) {
    var fileContent = fs.readFileSync(filePath, 'utf-8');

    if (fileContent.indexOf(bbdTextWidgetName) < 0) {return;}

    fileContent = fileContent.replace(widget, '');
    fs.writeFileSync(filePath, fileContent, 'utf-8');
  }

  function checkAndExitOrContinue() {
    // example of process.env.npm_config_argv
    // {"remain":["../../modules/BlackBerry-Dynamics-for-React-Native-Base/"],
    // "cooked":["--save","i","../../modules/BlackBerry-Dynamics-for-React-Native-Base/"],
    // "original":["--save","i","../../modules/BlackBerry-Dynamics-for-React-Native-Base/"]}
    
    var originalNpmConfigArgv = JSON.parse(process.env.npm_config_argv).original,
      filteredOriginal = originalNpmConfigArgv.filter(function(val, i) {
        return !['--save', '--verbose', '--d'].includes(val);
      });

    if (!filteredOriginal[1] || 
        ((filteredOriginal[1] && filteredOriginal[1].indexOf('BlackBerry-Dynamics-for-React-Native-Text') < 0) ||
          !filteredOriginal.includes('uninstall'))) {
      process.exit(0);
    } 
  }

})();