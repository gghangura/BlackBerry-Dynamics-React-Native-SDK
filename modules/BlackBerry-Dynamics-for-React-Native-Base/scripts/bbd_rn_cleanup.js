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
  var shell = require('shelljs'),
    path = require('path'),
	  cleanupScriptIos = path.join('.', 'scripts', 'bbd_rn_cleanup_ios.rb'),
    cleanupScriptAndroid = path.join('.', 'scripts', 'bbd_rn_cleanup_android.js'),
    isWindows = process.platform === "win32",
    cmd = 'node ' + cleanupScriptAndroid.replace(' ', '\\ ');

  checkAndExitOrContinue();

  if (!isWindows) {
    cmd += ' && ruby ' + cleanupScriptIos.replace(' ', '\\ ');
  }
  
  shell.exec(cmd);

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
        ((filteredOriginal[1] && filteredOriginal[1].indexOf('BlackBerry-Dynamics-for-React-Native-Base') < 0) ||
          !filteredOriginal.includes('uninstall'))) {
      process.exit(0);
    } 
  }

})();
