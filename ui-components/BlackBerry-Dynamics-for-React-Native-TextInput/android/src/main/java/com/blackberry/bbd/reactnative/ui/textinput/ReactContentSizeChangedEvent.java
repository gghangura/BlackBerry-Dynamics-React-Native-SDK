/**
 * Copyright (c) 2020 BlackBerry Limited. All Rights Reserved.
 * Some modifications to the original TextInput UI component for react-native
 * from https://github.com/facebook/react-native/tree/master/ReactAndroid/src/main/java/com/facebook/react/views/textinput
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.blackberry.bbd.reactnative.ui.textinput;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Event emitted by EditText native view when content size changes.
 */
public class ReactContentSizeChangedEvent extends Event<ReactTextChangedEvent> {

  public static final String EVENT_NAME = "topContentSizeChange";

  private float mContentWidth;
  private float mContentHeight;

  public ReactContentSizeChangedEvent(
    int viewId,
    float contentSizeWidth,
    float contentSizeHeight) {
    super(viewId);
    mContentWidth = contentSizeWidth;
    mContentHeight = contentSizeHeight;
  }

  @Override
  public String getEventName() {
    return EVENT_NAME;
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
  }

  private WritableMap serializeEventData() {
    WritableMap eventData = Arguments.createMap();

    WritableMap contentSize = Arguments.createMap();
    contentSize.putDouble("width", mContentWidth);
    contentSize.putDouble("height", mContentHeight);
    eventData.putMap("contentSize", contentSize);

    eventData.putInt("target", getViewTag());
    return eventData;
  }
}