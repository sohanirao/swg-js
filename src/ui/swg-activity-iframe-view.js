/**
 * Copyright 2019 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {View} from '../components/view';
import {createElement} from '../utils/dom';
import {isCancelError} from '../utils/errors';
import {SwGActivityPorts} from './swg-activity-ports';

 /** @const {!Object<string, string>} */
const iframeAttributes = {
  'frameborder': '0',
  'scrolling': 'no',
};


 /**
 * Class to build and render Activity iframe view.
 */
export class SwgActivityIframeView extends View {

   /**
   * @param {!Window} win
   * @param {!web-activities/activity-ports.ActivityPorts} activityPorts
   * @param {string} src
   * @param {!Object<string, ?>=} args
   * @param {boolean=} shouldFadeBody
   * @param {boolean=} hasLoadingIndicator
   */
  constructor(
      win,
      activityPorts,
      src,
      args,
      shouldFadeBody = false,
      hasLoadingIndicator = false) {
    super();

     /** @private @const {!Window} */
    this.win_ = win;

     /** @private @const {!Document} */
    this.doc_ = this.win_.document;

     /** @private @const {!HTMLIFrameElement} */
    this.iframe_ =
        /** @type {!HTMLIFrameElement} */ (
            createElement(this.doc_, 'iframe', iframeAttributes));

     /** @private @const {!SwGActivityPorts} */
    this.activityPorts_ = new SwGActivityPorts(activityPorts);

     /** @private @const {string} */
    this.src_ = src;

     /** @private @const {!Object<string, ?>} */
    this.args_ = args || {};

     /** @private @const {boolean} */
    this.shouldFadeBody_ = shouldFadeBody;

     /** @private @const {boolean} */
    this.hasLoadingIndicator_ = hasLoadingIndicator;

     /** @private {?./swg-activity-ports.SwgActivityIframePort} */
    this.port_ = null;

     /**
     * @private
     * {?function<!./swg-activity-ports.SwgActivityIframePort|!Promise>}
     */
    this.portResolver_ = null;

     /**
     * @private @const
     * {!Promise<./swg-activity-ports.SwgActivityIframePort>}
     */
    this.portPromise_ = new Promise(resolve => {
      this.portResolver_ = resolve;
    });
  }

   /** @override */
  getElement() {
    return this.iframe_;
  }

   /** @override */
  init(dialog) {
    return this.activityPorts_.openIframe(this.iframe_, this.src_, this.args_)
        .then(port => {
          return this.onOpenIframeResponse_(port, dialog);
        });
  }

   /**
   * Returns if document should fade for this view.
   * @return {boolean}
   */
  shouldFadeBody() {
    return this.shouldFadeBody_;
  }

   /**
   * Returns if the view shows loading indicator.
   * @return {boolean}
   */
  hasLoadingIndicator() {
    return this.hasLoadingIndicator_;
  }

   /**
   * @param {!web-activities/activity-ports.ActivityIframePort} port
   * @param {!../components/dialog.Dialog} dialog
   * @return {!Promise}
   */
  onOpenIframeResponse_(port, dialog) {
    this.port_ = port;
    this.portResolver_(port);

     this.port_.onResizeRequest(height => {
      dialog.resizeView(this, height);
    });

     return this.port_.whenReady();
  }

   /**
   * @return {!Promise<!./swg-activity-ports.SwgActivityIframePort>}
   * @private
   */
  getPortPromise_() {
    return this.portPromise_;
  }

   /**
   * @template T
   * @param {T} request
   */
  execute(request) {
    this.getPortPromise_().then(port => {
        port.execute(request);
    });
  }

   /**
   * @param {string} type
   * @param {function(T)} callback
   * @template T
   */
   on(type, callback) {
     this.getPortPromise_().then(port => {
       port.on(type, callback);
     });
   }

   /**
   * Completes the flow.
   * @return {!Promise}
   */
  whenComplete() {
    return this.getPortPromise_().then(port => port.whenComplete());
  }

   /**
   * @param {string} type
   * @param {function(T, string, boolean, boolean)} callback
   * @template T
   */
  onResult(type, callback) {
    this.getPortPromise_().then(port => {
      port.onResult(type, callback);
    });
  }

   /**
   * @param {function()} callback
   */
  onCancel(callback) {
    this.whenComplete().catch(reason => {
      if (isCancelError(reason)) {
        callback();
      }
      throw reason;
    });
  }

   /** @override */
  resized() {
    if (this.port_) {
      this.port_.resized();
    }
  }
}