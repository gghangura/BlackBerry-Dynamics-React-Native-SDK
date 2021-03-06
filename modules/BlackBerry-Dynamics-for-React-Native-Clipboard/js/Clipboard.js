/**
 * Copyright (c) 2020 BlackBerry Limited. All Rights Reserved.
 * Some modifications to the original Clipboard API of react-native
 * from https://github.com/facebook/react-native/tree/0.61-stable/Libraries/Components/Clipboard
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

'use strict';

const { NativeModules } = require('react-native');
const Clipboard = NativeModules.RNReactNativeBbdClipboardModule;

/**
 * `Clipboard` gives you an interface for setting and getting content from Clipboard on both iOS and Android
 */
module.exports = {
  /**
   * Get content of string type, this method returns a `Promise`, so you can use following code to get clipboard content
   * ```javascript
   * async _getContent() {
   *   var content = await Clipboard.getString();
   * }
   * ```
   */
  getString(): Promise<string> {
    return Clipboard.getString();
  },
  /**
   * Set content of string type. You can use following code to set clipboard content
   * ```javascript
   * _setContent() {
   *   Clipboard.setString('hello world');
   * }
   * ```
   * @param the content to be stored in the clipboard.
   */
  setString(content: string) {
    Clipboard.setString(content);
  },
};
