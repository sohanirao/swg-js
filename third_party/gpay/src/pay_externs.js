/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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

/**
 * @fileoverview Externs for Payment APIs.
 * @externs
 */

/**
 * Options for using the Payment APIs.
 *
 * @typedef {{
 *   environment: (?string|undefined),
 *   merchantInfo: (?MerchantInfo|undefined),
 *   i: (?InternalParameters|undefined),
 * }}
 *
 * @property {string} environment The environment to use. Current available
 *     environments are PRODUCTION or TEST. If not set, defaults to
 *     environment PRODUCTION.
 * @property {MerchantInfo} merchantInfo
 * @property {InternalParameters} i
 */
var PaymentOptions;

/**
 * @typedef{{
 *  type: string,
 *  parameters: !Object
 * }}
 *
 * @property {string} type The type of allowed payment method.
 * @property {Object} parameters The parameters for the payment type.
 */
var PaymentMethod;

/**
 * Request object of isReadyToPay.
 *
 * @typedef {{
 *   allowedPaymentMethods: (?Array<string>|?Array<PaymentMethod>|undefined),
 *   apiVersion: (?number|undefined),
 *   apiVersionMinor: (?number|undefined),
 *   environment: (?string|undefined),
 *   existingPaymentMethodRequired: (boolean|undefined),
 *   merchantInfo: (?MerchantInfo|undefined),
 * }}
 *
 * @property {Array<string>} allowedPaymentMethods The allowedPaymentMethods can
 *     be 'CARD' or 'TOKENIZED_CARD'.
 * @property {number} apiVersion.
 * @property {number} apiVersionMinor.
 * @property {string} environment
 * @property {boolean} existingPaymentMethodRequired
 * @property {MerchantInfo} merchantInfo
 */
var IsReadyToPayRequest = {};


/**
 * Request object of loadPaymentData.
 *
 * @typedef {{
 *   merchantId: (?string|undefined),
 *   allowedPaymentMethods: (?Array<string>|undefined),
 *   apiVersion: (?number|undefined),
 *   paymentMethodTokenizationParameters: (?PaymentMethodTokenizationParameters|undefined),
 *   cardRequirements: (?CardRequirements|undefined),
 *   phoneNumberRequired: (?boolean|undefined),
 *   emailRequired: (?boolean|undefined),
 *   merchantInfo: (?MerchantInfo|undefined),
 *   shippingAddressRequired: (?boolean|undefined),
 *   shippingAddressRequirements: (?ShippingAddressRequirements|undefined),
 *   transactionInfo: (?TransactionInfo|undefined),
 *   swg: (?SwgParameters|undefined),
 * }}
 *
 * @property {string} merchantId The obfuscated merchant gaia id.
 * @property {Array<string>} allowedPaymentMethods The allowedPaymentMethods can
 *     be 'CARD' or 'TOKENIZED_CARD'.
 * @property {number} apiVersion.
 * @property {PaymentMethodTokenizationParameters}
 *     paymentMethodTokenizationParameters.
 * @property {CardRequirements} cardRequirements.
 * @property {boolean} phoneNumberRequired.
 * @property {boolean} emailRequired.
 * @property {boolean} shippingAddressRequired.
 * @property {MerchantInfo} merchantInfo
 * @property {ShippingAddressRequirements} shippingAddressRequirements.
 * @property {TransactionInfo} transactionInfo
 * @property {SwgParameters} swg
 * @property {InternalParameters} i
 */
var PaymentDataRequest = {};


/**
 * Payment method tokenization parameters which will be used to tokenize the
 * returned payment method.
 *
 * @typedef {{
 *   tokenizationType: (?string|undefined),
 *   parameters: ?Object<string>,
 * }}
 *
 * @property {string} tokenizationType The payment method tokenization type -
 *     PAYMENT_GATEWAY or DIRECT.
 * @property {Object<string>} parameters The payment method tokenization
 *     parameters.
 */
var PaymentMethodTokenizationParameters;


/**
 * Card requirements for the returned payment card.
 *
 * @typedef {{
 *   allowedCardNetworks: ?Array<string>,
 *   billingAddressRequired: (?boolean|undefined),
 *   billingAddressFormat: (?string|undefined),
 * }}
 *
 * @property {string} allowedCardNetworks Current supported card networks are
 *     AMEX, DISCOVER, JCB, MASTERCARD, VISA.
 * @property {boolean} billingAddressRequired Whether a billing address is
 *     required from the buyer.
 * @property {string} billingAddressFormat The required format for the returned
 *     billing address. Current available formats are:
 *         MIN - only contain the minimal info, including name, country code,
 *     and postal code. FULL - the full address.
 */
var CardRequirements;


/**
 * Shipping address requirements.
 *
 * @typedef {{
 *   allowedCountries: ?Array<string>
 * }}
 *
 * @property {Array<string>} allowedCountries The countries allowed for shipping
 *     address.
 */
var ShippingAddressRequirements;


/**
 * Transaction info.
 *
 * @typedef {{
 *   currencyCode: (?string|undefined),
 *   totalPriceStatus: (?string|undefined),
 *   totalPrice: (?string|undefined),
 *   checkoutOption: (?string|undefined),
 * }}
 *
 * @property {string} currencyCode The ISO 4217 currency code of the
 *     transaction.
 * @property {string} totalPriceStatus The status of total price used -
 *     NOT_CURRENTLY_KNOWN, ESTIMATED, FINAL.
 * @property {string} totalPrice The the total price of this transaction. The
 *     format of this string should follow the regex format:
 *         [0-9]+(\.[0-9][0-9])? (e.g., "10.45").
 * @property {string} checkoutOption. The checkoutOptions can be
 *     either 'DEFAULT' or 'COMPLETE_IMMEDIATE_PURCHASE'
 *
 */
var TransactionInfo;

/**
 * @typedef {{
 *   merchantId: (?string|undefined),
 *   merchantOrigin: (?string|undefined),
 *   merchantName: (?string|undefined),
 *   authJwt: (?string|undefined),
 * }}
 */
var MerchantInfo;


/**
 * Subscribe with Google specific parameters.
 *
 * @typedef {{
 *   skuId: string,
 *   publicationId: string,
 * }}
 *
 * @property {string} skuId The SkuId that the publisher has setup with Play.
 * @property {string} publicationId The publicationId that the publisher has
 *  setup with play.
 */
var SwgParameters;

/**
 * Internal parameters.
 *
 * @typedef {{
 *   ampMerchantOrigin: (string|undefined),
 *   googleTransactionId: (string|undefined),
 *   startTimeMs: (number|undefined),
 *   preferredAccountId: (string|undefined),
 *   userIndex: (string|undefined),
 *   renderContainerCenter: (boolean|undefined),
 *   redirectVerifier: (string|undefined),
 *   redirectKey: (string|undefined),
 * }}
 *
 * @property {(string|undefined)} ampMerchantOrigin The origin of an amp page.
 *     This field should only be trusted if loaded in Google Viewer.
 * @property {(string|undefined)} googleTransactionId The google transaction id
 *     to keep track of the current transaction.
 * @property {(number|undefined)} startTimeMs The unix time for when an API
 *     method was called.
 * @property {(string|undefined)} preferredAccountId The obfuscated id of the
 *     user.
 * @property {(string|undefined)} userIndex The current user's Gaia session
 *     cookie index, a string (e.g. "0" or "5").
 * @property {(boolean|undefined)} renderContainerCenter The flag to decide
 *     whether he PayJS container should be vertically centered or loaded from
 *     the bottom.
 * @property {(string|undefined)} redirectVerifier The redirect verifier. Can
 *     only be used for a payment request.
 * @property {(string|undefined)} redirectKey The redirect verifier. Can only
 *     be used for the payment client initialization.
 */
var InternalParameters;

/**
 * Instant buy parameters.
 *
 * @typedef {{
 *   clientParameters: (string|undefined),
 *   encryptedParameters: (string|undefined),
 * }}
 *
 * @property {(string|undefined)} clientParameters The buyflow client parameters.
 * @property {(string|undefined)} encryptedParameters The encrypted buyflow client
 *     parameters.
 */
var InstantBuyParameters;

/**
 * PaymentRequest.
 *
 * @constructor
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest/PaymentRequest
 */
function PaymentRequest(methodData, details) {};

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest/canMakePayment
 * @return {Promise<Boolean>}
 */
PaymentRequest.prototype.canMakePayment = function() {};

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest/show
 * @return {Promise<!PaymentResponse>}
 */
PaymentRequest.prototype.show = function() {};


/**
 * The response of Payment Request API after a user selects a payment method and
 * approves a payment request.
 *
 * @constructor
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PaymentResponse
 */
function PaymentResponse() {};

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PaymentResponse/details
 */
PaymentResponse.prototype.details = {};

/**
 * @param {string} result
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PaymentResponse/complete
 */
PaymentResponse.prototype.complete = function(result) {};

/**
 * A configuration object for rendering the button.
 *
 * @typedef {{
 *   buttonColor: (?string|undefined),
 *   buttonType: (?string|undefined),
 *   onClick: (?function():void|undefined)
 * }}
 *
 * @property {string} buttonColor Color theme: black; white; default.
 *     The default value currently maps to black.
 * @property {string} buttonType Either short or long (default: long).
 * @property {function()} onClick Callback on clicking the button.
 */
var ButtonOptions = {};

/**
 * Information about the selected payment method.
 *
 * @typedef {{
 *   cardDescription: string,
 *   cardClass: string,
 *   cardDetails: string,
 *   cardNetwork: string,
 *   cardImageUri: string,
 * }}
 */
var CardInfo = {};

/**
 * The payment data response object returned to the integrator.
 * This can have different contents depending upon the context in which the
 * buyflow is triggered.
 *
 * @typedef {{
 *   cardInfo: (CardInfo|undefined),
 *   paymentMethodToken: (Object|undefined),
 *   shippingAddress: (UserAddress|undefined),
 * }}
 */
var PaymentData = {};

/**
 * Information about a requested postal address. All properties are strings.
 *
 * @typedef {{
 *   name: string,
 *   postalCode: string,
 *   countryCode: string,
 *   phoneNumber: string,
 *   companyName: string,
 *   address1: string,
 *   address2: string,
 *   address3: string,
 *   locality: string,
 *   administrativeArea: string,
 *   sortingCode: string,
 * }}
 */
var UserAddress = {};
