/**
 * @license
 * Copyright 2018 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

goog.module('googlecodelabs.CodelabStep');

const Templates = goog.require('googlecodelabs.CodelabStep.Templates');
const dom = goog.require('goog.dom');
const soy = goog.require('goog.soy');

/** @const {string} */
const LABEL_ATTR = 'label';

/** @const {string} */
const STEP_ATTR = 'step';

/**
 * @extends {HTMLElement}
 * @suppress {reportUnknownTypes}
 */
class CodelabStep extends HTMLElement {
  constructor() {
    super();

    /**
     * @private {?Element}
     */
    this.instructions_ = null;

    /**
     * @private {?Element}
     */
    this.inner_ = null;

    /** @private {boolean} */
    this.hasSetup_ = false;

    /**
     * @private {string}
     */
    this.step_ = '0';

    /**
     * @private {string}
     */
    this.label_ = '';

    /**
     * @private {?Element}
     */
    this.title_ = null;
  }

  /**
   * @export
   * @override
   */
  connectedCallback() {
    this.setupDom_();
  }

  /**
   * @return {!Array<string>}
   * @export
   */
  static get observedAttributes() {
    return [LABEL_ATTR, STEP_ATTR];
  }

  /**
   * @param {string} attr
   * @param {?string} oldValue
   * @param {?string} newValue
   * @param {?string} namespace
   * @export
   * @override
   */
  attributeChangedCallback(attr, oldValue, newValue, namespace) {
    if (attr === LABEL_ATTR || attr === STEP_ATTR) {
      this.updateTitle_();
    }
  }

  /**
   * @private
   */
  updateTitle_() {
    if (this.hasAttribute(LABEL_ATTR)) {
      this.label_ = this.getAttribute(LABEL_ATTR);
    }

    if (this.hasAttribute(STEP_ATTR)) {
      this.step_ = this.getAttribute(STEP_ATTR);
    }

    if (!this.title_) {
      return;
    }

    const title = soy.renderAsElement(Templates.title, {
      step: this.step_,
      label: this.label_
    });

    dom.replaceNode(title, this.title_);
    this.title_ = title;
  }

  /**
   * @private
   */
  setupDom_() {
    if (this.hasSetup_) {
      return;
    }

    this.instructions_ = dom.createElement('div');
    this.instructions_.classList.add('instructions');
    this.inner_ = dom.createElement('div');
    this.inner_.classList.add('inner');
    this.inner_.innerHTML = this.innerHTML;
    dom.removeChildren(this);

    const title = soy.renderAsElement(Templates.title, {
      step: this.step_,
      label: this.label_,
    });
    this.title_ = title;

    dom.insertChildAt(this.inner_, title, 0);

    const codeElements = this.inner_.querySelectorAll('pre code');
    codeElements.forEach((el) => {
      const code = window['prettyPrintOne'](el.innerHTML);
      el.innerHTML = code;
    });

    dom.appendChild(this.instructions_, this.inner_);
    dom.appendChild(this, this.instructions_);

    this.hasSetup_ = true;
  }
}

window.customElements.define('google-codelab-step', CodelabStep);

exports = CodelabStep;
