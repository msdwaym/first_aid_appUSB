"use strict";
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return expectsLowerCase ? (val) => set2.has(val.toLowerCase()) : (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$2.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s2 = str ? `on${capitalize(str)}` : ``;
  return s2;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i2) => {
          entries[stringifySymbol(key, i2) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v2) => stringifySymbol(v2))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v2, i2 = "") => {
  var _a;
  return isSymbol(v2) ? `Symbol(${(_a = v2.description) != null ? _a : i2})` : v2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E$1 = function() {
};
E$1.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len = evtArr.length;
    for (i2; i2 < len; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i2 = evts.length - 1; i2 >= 0; i2--) {
        if (evts[i2].fn === callback || evts[i2].fn._ === callback) {
          evts.splice(i2, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1$1 = E$1;
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile$1(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format2, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format2.length) {
    let char = format2[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format2[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format2[position++];
      }
      const isClosed = char === endDelimiter;
      const type2 = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type: type2 });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile$1(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages3) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages3 && messages3[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages3 && Object.keys(messages3).length > 0) {
    locales = Object.keys(messages3);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages: messages3, watcher, formater: formater2 }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater2 || defaultFormatter;
    this.messages = messages3 || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof index !== "undefined" && index.getLocale) {
    return index.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages3 = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    [locale, messages3] = [
      messages3,
      locale
    ];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages: messages3,
    watcher
  });
  let t2 = (key, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t2 = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t2(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t2(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn$1(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    const opts = protocol[i2];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type: type2, required: required2, validator } = prop;
  if (required2 && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required2) {
    return;
  }
  if (type2 != null) {
    let isValid = false;
    const types2 = isArray(type2) ? type2 : [type2];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types2.length && !isValid; i2++) {
      const { valid, expectedType } = assertType$1(value, types2[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type2) {
  let valid;
  const expectedType = getType$1(type2);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type2;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type2;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type2) {
  if (type2 === "String") {
    return `"${value}"`;
  } else if (type2 === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type2) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type2.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$2(hooks, data, params) {
  let promise2 = false;
  for (let i2 = 0; i2 < hooks.length; i2++) {
    const hook = hooks[i2];
    if (promise2) {
      promise2 = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise2 = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise2 || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$2(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method3, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method3];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method3) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method3];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method3, api, options, params) {
  const interceptor = getApiInterceptorHooks(method3);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$2(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method3), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise2) {
  return promise2;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i2 = 0; i2 < keys.length; i2++) {
    const name = keys[i2];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$1(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const apiErrMsg = name + ":fail" + (errMsg ? " " + errMsg : "");
  delete errRes.errCode;
  let res = extend({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number3, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number3 = Number(number3);
  if (number3 === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number3 / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number3 < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method3, interceptor) => {
  if (isString(method3) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method3] || (scopedInterceptors[method3] = {}), interceptor);
  } else if (isPlainObject(method3)) {
    mergeInterceptorHook(globalInterceptors, method3);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method3, interceptor) => {
  if (isString(method3)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method3], interceptor);
    } else {
      delete scopedInterceptors[method3];
    }
  } else if (isPlainObject(method3)) {
    removeInterceptorHook(globalInterceptors, method3);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i2 = 0; i2 < onPushMessageCallbacks.length; i2++) {
      const callback = onPushMessageCallbacks[i2];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_2, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise2 = this.constructor;
    return this.then((value) => promise2.resolve(onfinally && onfinally()).then(() => value), (reason) => promise2.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method3, returnValue) {
    return function(res) {
      return method3(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn$1(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$1(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method3) {
    if (!hasOwn$1(protocols2, methodName)) {
      return method3;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__0BFD040",
    appName: "first-aid",
    appVersion: "0.0.1.0.1",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.15",
    uniRuntimeVersion: "4.15",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__0BFD040",
      appName: "first-aid",
      appVersion: "0.0.1.0.1",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn$1(target, key)) {
        return target[key];
      }
      if (hasOwn$1(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn$1(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function toRaw$1(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw$1(raw) : observed;
}
function isRef$1(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack$1 = [];
function pushWarningContext$1(vnode) {
  stack$1.push(vnode);
}
function popWarningContext$1() {
  stack$1.pop();
}
function warn$1$1(msg, ...args) {
  const instance = stack$1.length ? stack$1[stack$1.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace$1();
  if (appWarnHandler) {
    callWithErrorHandling$1(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a2) => {
          var _a, _b;
          return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName$1(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace$1(trace));
    }
    console.warn(...warnArgs);
  }
}
function getComponentTrace$1() {
  let currentVNode = stack$1[stack$1.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace$1(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry$1(entry));
  });
  return logs;
}
function formatTraceEntry$1({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName$1(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps$1(vnode.props), close] : [open + close];
}
function formatProps$1(props2) {
  const res = [];
  const keys = Object.keys(props2);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp$1(key, props2[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp$1(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef$1(value)) {
    value = formatProp$1(key, toRaw$1(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw$1(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling$1(fn, instance, type2, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError$1(err, instance, type2);
  }
}
function handleError$1(err, instance, type2, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings$1[type2];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling$1(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError$1(err, type2, contextVNode, throwInDev);
}
function logError$1(err, type2, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings$1[type2];
    if (contextVNode) {
      pushWarningContext$1(contextVNode);
    }
    warn$1$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext$1();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing$1 = false;
let isFlushPending$1 = false;
const queue$1 = [];
let flushIndex$1 = 0;
const pendingPostFlushCbs$1 = [];
let activePostFlushCbs$1 = null;
let postFlushIndex$1 = 0;
const resolvedPromise$1 = /* @__PURE__ */ Promise.resolve();
const RECURSION_LIMIT$1 = 100;
function findInsertionIndex$1(id) {
  let start = flushIndex$1 + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId$1(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob$1(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing$1 && job.allowRecurse ? flushIndex$1 + 1 : flushIndex$1
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex$1(job.id), 0, job);
    }
    queueFlush$1();
  }
}
function queueFlush$1() {
  if (!isFlushing$1 && !isFlushPending$1) {
    isFlushPending$1 = true;
    resolvedPromise$1.then(flushJobs$1);
  }
}
function queuePostFlushCb$1(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs$1 || !activePostFlushCbs$1.includes(
      cb,
      cb.allowRecurse ? postFlushIndex$1 + 1 : postFlushIndex$1
    )) {
      pendingPostFlushCbs$1.push(cb);
    }
  } else {
    pendingPostFlushCbs$1.push(...cb);
  }
  queueFlush$1();
}
function flushPostFlushCbs$1(seen) {
  if (pendingPostFlushCbs$1.length) {
    const deduped = [...new Set(pendingPostFlushCbs$1)].sort(
      (a2, b2) => getId$1(a2) - getId$1(b2)
    );
    pendingPostFlushCbs$1.length = 0;
    if (activePostFlushCbs$1) {
      activePostFlushCbs$1.push(...deduped);
      return;
    }
    activePostFlushCbs$1 = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex$1 = 0; postFlushIndex$1 < activePostFlushCbs$1.length; postFlushIndex$1++) {
      if (checkRecursiveUpdates$1(seen, activePostFlushCbs$1[postFlushIndex$1])) {
        continue;
      }
      activePostFlushCbs$1[postFlushIndex$1]();
    }
    activePostFlushCbs$1 = null;
    postFlushIndex$1 = 0;
  }
}
const getId$1 = (job) => job.id == null ? Infinity : job.id;
const comparator$1 = (a2, b2) => {
  const diff2 = getId$1(a2) - getId$1(b2);
  if (diff2 === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs$1(seen) {
  isFlushPending$1 = false;
  isFlushing$1 = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator$1);
  const check = (job) => checkRecursiveUpdates$1(seen, job);
  try {
    for (flushIndex$1 = 0; flushIndex$1 < queue$1.length; flushIndex$1++) {
      const job = queue$1[flushIndex$1];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling$1(job, null, 14);
      }
    }
  } finally {
    flushIndex$1 = 0;
    queue$1.length = 0;
    flushPostFlushCbs$1(seen);
    isFlushing$1 = false;
    if (queue$1.length || pendingPostFlushCbs$1.length) {
      flushJobs$1(seen);
    }
  }
}
function checkRecursiveUpdates$1(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT$1) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName$1(instance.type);
      handleError$1(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent$1(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    instance.effect.dirty = true;
    instance.update();
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      instance.parent.effect.dirty = true;
      queueJob$1(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb$1(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e2) {
      console.error(e2);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
{
  const g2 = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g2[key]))
      setters = g2[key] = [];
    setters.push(setter);
    return (v2) => {
      if (setters.length > 1)
        setters.forEach((set2) => set2(v2));
      else
        setters[0](v2);
    };
  };
  registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v2) => v2
  );
  registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v2) => v2
  );
}
const classifyRE$1 = /(?:^|[-_])(\w)/g;
const classify$1 = (str) => str.replace(classifyRE$1, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName$1(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName$1(instance, Component2, isRoot = false) {
  let name = getComponentName$1(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify$1(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent$1(value) {
  return isFunction(value) && "__vccOpts" in value;
}
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect2 {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i2 = 0; i2 < this._depsLength; i2++) {
        const dep = this.deps[i2];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v2) {
    this._dirtyLevel = v2 ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i2 = effect2._depsLength; i2 < effect2.deps.length; i2++) {
      cleanupDepEffect(effect2.deps[i2], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type2, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type: type2,
        key
      }
    );
  }
}
function trigger(target, type2, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type2 === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type2) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type: type2,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler2 {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler2 extends BaseReactiveHandler2 {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn$1(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler2 extends BaseReactiveHandler2 {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler2();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler2();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler2(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler2(true);
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method3, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method3 === "entries" || method3 === Symbol.iterator && targetIsMap;
    const isKeyOnly = method3 === "keys" && targetIsMap;
    const innerIterator = target[method3](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type2) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type2)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type2 === "delete" ? false : type2 === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method3) => {
    mutableInstrumentations2[method3] = createIterableMethod(method3, false, false);
    readonlyInstrumentations2[method3] = createIterableMethod(method3, true, false);
    shallowInstrumentations2[method3] = createIterableMethod(method3, false, true);
    shallowReadonlyInstrumentations2[method3] = createIterableMethod(
      method3,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn$1(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type2 = toRawType(target);
    warn$2(
      `Reactive ${type2} contains both the raw and reactive versions of the same object${type2 === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect2(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v2) {
    this.effect.dirty = v2;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a2) => {
          var _a, _b;
          return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props2) {
  const res = [];
  const keys = Object.keys(props2);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props2[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type2, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type2);
  }
}
function callWithAsyncErrorHandling(fn, instance, type2, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type2, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type2);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type2, args));
  }
  return values;
}
function handleError(err, instance, type2, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type2] || type2;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type2, contextVNode, throwInDev);
}
function logError(err, type2, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type2] || type2;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i2 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i2 < queue.length; i2++) {
    const cb = queue[i2];
    if (cb && cb.pre) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a2, b2) => getId(a2) - getId(b2)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b2) => {
  const diff2 = getId(a2) - getId(b2);
  if (diff2 === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text: Text$1,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type2, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type2, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props2 = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props2) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number: number3, trim: trim2 } = props2[modifiersKey] || EMPTY_OBJ;
    if (trim2) {
      args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    }
    if (number3) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props2[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props2[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props2[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props2[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props2[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type2, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type2 === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type2] || Component2[type2], name) || // global registration
      resolve(instance.appContext[type2], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type2 === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type2.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type2.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect2(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, depth, currentDepth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version: version$1,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin2) {
        {
          if (!context.mixins.includes(mixin2)) {
            context.mixins.push(mixin2);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin2.name ? `: ${mixin2.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type2, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type2, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type2, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type2, target, keepAliveRoot) {
  const injected = injectHook(
    type2,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type2], injected);
  }, target);
}
function injectHook(type2, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type2)) {
      target = target.root;
    }
    const hooks = target[type2] || (target[type2] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type2, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type2] || type2.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook$1("bm");
const onMounted = createHook$1("m");
const onBeforeUpdate = createHook$1("bu");
const onUpdated = createHook$1("u");
const onBeforeUnmount = createHook$1("bum");
const onUnmounted = createHook$1("um");
const onServerPrefetch = createHook$1("sp");
const onRenderTriggered = createHook$1(
  "rtg"
);
const onRenderTracked = createHook$1(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i2) => i2.__$el || (i2.__$el = {}),
    $data: (i2) => i2.data,
    $props: (i2) => shallowReadonly(i2.props),
    $attrs: (i2) => shallowReadonly(i2.attrs),
    $slots: (i2) => shallowReadonly(i2.slots),
    $refs: (i2) => shallowReadonly(i2.refs),
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => {
      i2.effect.dirty = true;
      queueJob(i2.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props: props2, accessCache, type: type2, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props2[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props2[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type2.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$1(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props2) {
  return isArray(props2) ? props2.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props2;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type2, key) => {
    if (cache[key]) {
      warn$1(`${type2} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type2;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$1(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register2, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register2(_hook.bind(publicThis)));
    } else if (hook) {
      register2(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v2) => injected.value = v2
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type2) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type2
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props2 = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props2, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props2)) {
      props2[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props2, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props2 : shallowReactive(props2);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props2;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props: props2,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props2);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props2[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props2, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$1(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props2[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props2[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props2, instance);
  }
}
function setFullProps(instance, rawProps, props2, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props2[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props2);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props2[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn$1(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props2, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props2
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props2, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props2);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type2, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type2));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type2) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props2, instance) {
  const resolvedValues = toRaw(props2);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key))
    );
  }
}
function validateProp(name, value, prop, props2, isAbsent) {
  const { type: type2, required: required2, validator, skipCheck } = prop;
  if (required2 && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required2) {
    return;
  }
  if (type2 != null && type2 !== true && !skipCheck) {
    let isValid = false;
    const types2 = isArray(type2) ? type2 : [type2];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types2.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types2[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props2)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type2) {
  let valid;
  const expectedType = getType(type2);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type2;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type2;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type2) {
  if (type2 === "String") {
    return `"${value}"`;
  } else if (type2 === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type2) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type2.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance, type2) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type2}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type2, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type2) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type2}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type2}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type2, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text$1 = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props2) {
  if (!props2)
    return null;
  return isProxy(props2) || InternalObjectKey in props2 ? extend({}, props2) : props2;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type2 = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type: type2,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type2, appContext),
    emitsOptions: normalizeEmitsOptions(type2, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type2.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i2) => {
    currentInstance = i2;
  };
  setInSSRSetupState = (v2) => {
    isInSSRComponentSetup = v2;
  };
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props: props2
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props2, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions$1(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i2 = getCurrentInstance();
    if (i2 && i2.appContext.config.warnRecursiveComputed) {
      c2._warnRecursive = true;
    }
  }
  return c2;
};
const version$1 = "3.4.21";
const warn = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v2) {
  result[k] = v2;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type2 = typeof src;
  if (type2 === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i2 = 0; i2 < len; i2++) {
        copy[i2] = clone(src[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn$1(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type2 !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(
    options,
    instance,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    ctx: { $scope, $mpPlatform }
  } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$1(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$1(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props: props2,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props2, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props2,
        setupState,
        data,
        ctx
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props2,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props2, { attrs, slots, emit: emit2 }) : render2(
        props2,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props2, propsOptions, fallthroughAttrs2) {
  if (props2 && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter(
      (key) => key !== "class" && key !== "style"
    );
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props2[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props2[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(
        data,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance
  );
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u: u2 } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u2) {
        queuePostRenderEffect(u2);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance.effect = new ReactiveEffect2(
    componentUpdateFn,
    NOOP,
    () => queueJob(update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version$1);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function $callMethod(method3, ...args) {
  const fn = this[method3];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method3} not found`);
  return null;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error2) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error2.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props2) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props2)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method3 = "createApp";
  if (typeof global !== "undefined" && typeof global[method3] !== "undefined") {
    return global[method3];
  } else if (typeof my !== "undefined") {
    return my[method3];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq" || ctx.$mpPlatform === "mp-xhs") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$1(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$1(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn$1(event.detail, "checked") && !hasOwn$1(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
const o$1 = (value, key) => vOn(value, key);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value) => stringifyStyle(value);
const e$1 = (target, ...sources) => extend(target, ...sources);
const n$1 = (value) => normalizeClass(value);
const t$1 = (val) => toDisplayString(val);
const p$1 = (props2) => renderProps(props2);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method3) => {
    ctx[method3] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method3]) {
        return mpInstance[method3].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$1(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin2) => findHooks(mixin2, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$1(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin2) => {
        hooks.forEach((hook) => {
          if (hasOwn$1(mixin2, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const { onError } = internalInstance;
  if (onError) {
    internalInstance.appContext.config.errorHandler = (err) => {
      instance.$callHook(ON_ERROR, err);
    };
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$1(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$1(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$1(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("__GLOBAL__://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type2, defaultValue) {
  if (isArray(type2) && type2.length === 1) {
    return type2[0];
  }
  return type2;
}
function normalizePropType(type2, defaultValue) {
  const res = parsePropType(type2);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type2 = opts.type;
        opts.type = normalizePropType(type2);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "__GLOBAL__://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$1(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error2) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var dayjs_min = { exports: {} };
(function(module2, exports2) {
  !function(t2, e2) {
    module2.exports = e2();
  }(commonjsGlobal, function() {
    var t2 = 1e3, e2 = 6e4, n2 = 36e5, r2 = "millisecond", i2 = "second", s2 = "minute", u2 = "hour", a2 = "day", o2 = "week", c2 = "month", f2 = "quarter", h2 = "year", d2 = "date", l2 = "Invalid Date", $2 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
      var e3 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
      return "[" + t3 + (e3[(n3 - 20) % 10] || e3[n3] || e3[0]) + "]";
    } }, m2 = function(t3, e3, n3) {
      var r3 = String(t3);
      return !r3 || r3.length >= e3 ? t3 : "" + Array(e3 + 1 - r3.length).join(n3) + t3;
    }, v2 = { s: m2, z: function(t3) {
      var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r3 = Math.floor(n3 / 60), i3 = n3 % 60;
      return (e3 <= 0 ? "+" : "-") + m2(r3, 2, "0") + ":" + m2(i3, 2, "0");
    }, m: function t3(e3, n3) {
      if (e3.date() < n3.date())
        return -t3(n3, e3);
      var r3 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i3 = e3.clone().add(r3, c2), s3 = n3 - i3 < 0, u3 = e3.clone().add(r3 + (s3 ? -1 : 1), c2);
      return +(-(r3 + (n3 - i3) / (s3 ? i3 - u3 : u3 - i3)) || 0);
    }, a: function(t3) {
      return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
    }, p: function(t3) {
      return { M: c2, y: h2, w: o2, d: a2, D: d2, h: u2, m: s2, s: i2, ms: r2, Q: f2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t3) {
      return void 0 === t3;
    } }, g2 = "en", D2 = {};
    D2[g2] = M2;
    var p2 = "$isDayjsObject", S2 = function(t3) {
      return t3 instanceof _2 || !(!t3 || !t3[p2]);
    }, w2 = function t3(e3, n3, r3) {
      var i3;
      if (!e3)
        return g2;
      if ("string" == typeof e3) {
        var s3 = e3.toLowerCase();
        D2[s3] && (i3 = s3), n3 && (D2[s3] = n3, i3 = s3);
        var u3 = e3.split("-");
        if (!i3 && u3.length > 1)
          return t3(u3[0]);
      } else {
        var a3 = e3.name;
        D2[a3] = e3, i3 = a3;
      }
      return !r3 && i3 && (g2 = i3), i3 || !r3 && g2;
    }, O2 = function(t3, e3) {
      if (S2(t3))
        return t3.clone();
      var n3 = "object" == typeof e3 ? e3 : {};
      return n3.date = t3, n3.args = arguments, new _2(n3);
    }, b2 = v2;
    b2.l = w2, b2.i = S2, b2.w = function(t3, e3) {
      return O2(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
    };
    var _2 = function() {
      function M3(t3) {
        this.$L = w2(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p2] = true;
      }
      var m3 = M3.prototype;
      return m3.parse = function(t3) {
        this.$d = function(t4) {
          var e3 = t4.date, n3 = t4.utc;
          if (null === e3)
            return /* @__PURE__ */ new Date(NaN);
          if (b2.u(e3))
            return /* @__PURE__ */ new Date();
          if (e3 instanceof Date)
            return new Date(e3);
          if ("string" == typeof e3 && !/Z$/i.test(e3)) {
            var r3 = e3.match($2);
            if (r3) {
              var i3 = r3[2] - 1 || 0, s3 = (r3[7] || "0").substring(0, 3);
              return n3 ? new Date(Date.UTC(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3)) : new Date(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3);
            }
          }
          return new Date(e3);
        }(t3), this.init();
      }, m3.init = function() {
        var t3 = this.$d;
        this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
      }, m3.$utils = function() {
        return b2;
      }, m3.isValid = function() {
        return !(this.$d.toString() === l2);
      }, m3.isSame = function(t3, e3) {
        var n3 = O2(t3);
        return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
      }, m3.isAfter = function(t3, e3) {
        return O2(t3) < this.startOf(e3);
      }, m3.isBefore = function(t3, e3) {
        return this.endOf(e3) < O2(t3);
      }, m3.$g = function(t3, e3, n3) {
        return b2.u(t3) ? this[e3] : this.set(n3, t3);
      }, m3.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m3.valueOf = function() {
        return this.$d.getTime();
      }, m3.startOf = function(t3, e3) {
        var n3 = this, r3 = !!b2.u(e3) || e3, f3 = b2.p(t3), l3 = function(t4, e4) {
          var i3 = b2.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
          return r3 ? i3 : i3.endOf(a2);
        }, $3 = function(t4, e4) {
          return b2.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
        }, y3 = this.$W, M4 = this.$M, m4 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
        switch (f3) {
          case h2:
            return r3 ? l3(1, 0) : l3(31, 11);
          case c2:
            return r3 ? l3(1, M4) : l3(0, M4 + 1);
          case o2:
            var g3 = this.$locale().weekStart || 0, D3 = (y3 < g3 ? y3 + 7 : y3) - g3;
            return l3(r3 ? m4 - D3 : m4 + (6 - D3), M4);
          case a2:
          case d2:
            return $3(v3 + "Hours", 0);
          case u2:
            return $3(v3 + "Minutes", 1);
          case s2:
            return $3(v3 + "Seconds", 2);
          case i2:
            return $3(v3 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m3.endOf = function(t3) {
        return this.startOf(t3, false);
      }, m3.$set = function(t3, e3) {
        var n3, o3 = b2.p(t3), f3 = "set" + (this.$u ? "UTC" : ""), l3 = (n3 = {}, n3[a2] = f3 + "Date", n3[d2] = f3 + "Date", n3[c2] = f3 + "Month", n3[h2] = f3 + "FullYear", n3[u2] = f3 + "Hours", n3[s2] = f3 + "Minutes", n3[i2] = f3 + "Seconds", n3[r2] = f3 + "Milliseconds", n3)[o3], $3 = o3 === a2 ? this.$D + (e3 - this.$W) : e3;
        if (o3 === c2 || o3 === h2) {
          var y3 = this.clone().set(d2, 1);
          y3.$d[l3]($3), y3.init(), this.$d = y3.set(d2, Math.min(this.$D, y3.daysInMonth())).$d;
        } else
          l3 && this.$d[l3]($3);
        return this.init(), this;
      }, m3.set = function(t3, e3) {
        return this.clone().$set(t3, e3);
      }, m3.get = function(t3) {
        return this[b2.p(t3)]();
      }, m3.add = function(r3, f3) {
        var d3, l3 = this;
        r3 = Number(r3);
        var $3 = b2.p(f3), y3 = function(t3) {
          var e3 = O2(l3);
          return b2.w(e3.date(e3.date() + Math.round(t3 * r3)), l3);
        };
        if ($3 === c2)
          return this.set(c2, this.$M + r3);
        if ($3 === h2)
          return this.set(h2, this.$y + r3);
        if ($3 === a2)
          return y3(1);
        if ($3 === o2)
          return y3(7);
        var M4 = (d3 = {}, d3[s2] = e2, d3[u2] = n2, d3[i2] = t2, d3)[$3] || 1, m4 = this.$d.getTime() + r3 * M4;
        return b2.w(m4, this);
      }, m3.subtract = function(t3, e3) {
        return this.add(-1 * t3, e3);
      }, m3.format = function(t3) {
        var e3 = this, n3 = this.$locale();
        if (!this.isValid())
          return n3.invalidDate || l2;
        var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = b2.z(this), s3 = this.$H, u3 = this.$m, a3 = this.$M, o3 = n3.weekdays, c3 = n3.months, f3 = n3.meridiem, h3 = function(t4, n4, i4, s4) {
          return t4 && (t4[n4] || t4(e3, r3)) || i4[n4].slice(0, s4);
        }, d3 = function(t4) {
          return b2.s(s3 % 12 || 12, t4, "0");
        }, $3 = f3 || function(t4, e4, n4) {
          var r4 = t4 < 12 ? "AM" : "PM";
          return n4 ? r4.toLowerCase() : r4;
        };
        return r3.replace(y2, function(t4, r4) {
          return r4 || function(t5) {
            switch (t5) {
              case "YY":
                return String(e3.$y).slice(-2);
              case "YYYY":
                return b2.s(e3.$y, 4, "0");
              case "M":
                return a3 + 1;
              case "MM":
                return b2.s(a3 + 1, 2, "0");
              case "MMM":
                return h3(n3.monthsShort, a3, c3, 3);
              case "MMMM":
                return h3(c3, a3);
              case "D":
                return e3.$D;
              case "DD":
                return b2.s(e3.$D, 2, "0");
              case "d":
                return String(e3.$W);
              case "dd":
                return h3(n3.weekdaysMin, e3.$W, o3, 2);
              case "ddd":
                return h3(n3.weekdaysShort, e3.$W, o3, 3);
              case "dddd":
                return o3[e3.$W];
              case "H":
                return String(s3);
              case "HH":
                return b2.s(s3, 2, "0");
              case "h":
                return d3(1);
              case "hh":
                return d3(2);
              case "a":
                return $3(s3, u3, true);
              case "A":
                return $3(s3, u3, false);
              case "m":
                return String(u3);
              case "mm":
                return b2.s(u3, 2, "0");
              case "s":
                return String(e3.$s);
              case "ss":
                return b2.s(e3.$s, 2, "0");
              case "SSS":
                return b2.s(e3.$ms, 3, "0");
              case "Z":
                return i3;
            }
            return null;
          }(t4) || i3.replace(":", "");
        });
      }, m3.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m3.diff = function(r3, d3, l3) {
        var $3, y3 = this, M4 = b2.p(d3), m4 = O2(r3), v3 = (m4.utcOffset() - this.utcOffset()) * e2, g3 = this - m4, D3 = function() {
          return b2.m(y3, m4);
        };
        switch (M4) {
          case h2:
            $3 = D3() / 12;
            break;
          case c2:
            $3 = D3();
            break;
          case f2:
            $3 = D3() / 3;
            break;
          case o2:
            $3 = (g3 - v3) / 6048e5;
            break;
          case a2:
            $3 = (g3 - v3) / 864e5;
            break;
          case u2:
            $3 = g3 / n2;
            break;
          case s2:
            $3 = g3 / e2;
            break;
          case i2:
            $3 = g3 / t2;
            break;
          default:
            $3 = g3;
        }
        return l3 ? $3 : b2.a($3);
      }, m3.daysInMonth = function() {
        return this.endOf(c2).$D;
      }, m3.$locale = function() {
        return D2[this.$L];
      }, m3.locale = function(t3, e3) {
        if (!t3)
          return this.$L;
        var n3 = this.clone(), r3 = w2(t3, e3, true);
        return r3 && (n3.$L = r3), n3;
      }, m3.clone = function() {
        return b2.w(this.$d, this);
      }, m3.toDate = function() {
        return new Date(this.valueOf());
      }, m3.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m3.toISOString = function() {
        return this.$d.toISOString();
      }, m3.toString = function() {
        return this.$d.toUTCString();
      }, M3;
    }(), k = _2.prototype;
    return O2.prototype = k, [["$ms", r2], ["$s", i2], ["$m", s2], ["$H", u2], ["$W", a2], ["$M", c2], ["$y", h2], ["$D", d2]].forEach(function(t3) {
      k[t3[1]] = function(e3) {
        return this.$g(e3, t3[0], t3[1]);
      };
    }), O2.extend = function(t3, e3) {
      return t3.$i || (t3(e3, _2, O2), t3.$i = true), O2;
    }, O2.locale = w2, O2.isDayjs = S2, O2.unix = function(t3) {
      return O2(1e3 * t3);
    }, O2.en = D2[g2], O2.Ls = D2, O2.p = {}, O2;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
const onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
const defineMixin = (options) => {
  return options;
};
const buttonMixin = defineMixin({
  props: {
    lang: String,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    formType: String,
    openType: String
  }
});
const openType = defineMixin({
  props: {
    openType: String
  },
  methods: {
    onGetUserInfo(event) {
      this.$emit("getuserinfo", event.detail);
    },
    onContact(event) {
      this.$emit("contact", event.detail);
    },
    onGetPhoneNumber(event) {
      this.$emit("getphonenumber", event.detail);
    },
    onError(event) {
      this.$emit("error", event.detail);
    },
    onLaunchApp(event) {
      this.$emit("launchapp", event.detail);
    },
    onOpenSetting(event) {
      this.$emit("opensetting", event.detail);
    }
  }
});
const mpMixin = defineMixin({
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true
  }
});
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
}
function date(value) {
  if (!value)
    return false;
  if (number(value))
    value = +value;
  return !/Invalid|NaN/.test(new Date(value).toString());
}
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}
function string$1(value) {
  return typeof value === "string";
}
function digits(value) {
  return /^\d+$/.test(value);
}
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
    value
  );
}
function carNo(value) {
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }
  if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}
function amount(value) {
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}
function chinese(value) {
  const reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}
function enOrNum(value) {
  const reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}
function contains(value, param) {
  return value.indexOf(param) >= 0;
}
function range$1(value, param) {
  return value >= param[0] && value <= param[1];
}
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}
function landline(value) {
  const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}
function empty(value) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!value)
        return true;
      break;
    case "number":
      if (value === 0 || isNaN(value))
        return true;
      break;
    case "object":
      if (value === null || value.length === 0)
        return true;
      for (const i2 in value) {
        return false;
      }
      return true;
  }
  return false;
}
function jsonString(value) {
  if (typeof value === "string") {
    try {
      const obj = JSON.parse(value);
      if (typeof obj === "object" && obj) {
        return true;
      }
      return false;
    } catch (e2) {
      return false;
    }
  }
  return false;
}
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === "[object Array]";
}
function object(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function code(value, len = 6) {
  return new RegExp(`^\\d{${len}}$`).test(value);
}
function func(value) {
  return typeof value === "function";
}
function promise(value) {
  return object(value) && func(value.then) && func(value.catch);
}
function image(value) {
  const newValue = value.split("?")[0];
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(newValue);
}
function video(value) {
  const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(value);
}
function regExp(o2) {
  return o2 && Object.prototype.toString.call(o2) === "[object RegExp]";
}
const test = {
  email,
  mobile,
  url,
  date,
  dateISO,
  number,
  digits,
  idCard,
  carNo,
  amount,
  chinese,
  letter,
  enOrNum,
  contains,
  range: range$1,
  rangeLength,
  empty,
  isEmpty: empty,
  jsonString,
  landline,
  object,
  array,
  code,
  func,
  promise,
  video,
  image,
  regExp,
  string: string$1
};
const version = "3";
{
  console.log(`
 %c uview-plus V${version} %c https://ijry.github.io/uview-plus/ 

`, "color: #ffffff; background: #3c9cff; padding:5px 0;", "color: #3c9cff;background: #ffffff; padding:5px 0;");
}
const config = {
  v: version,
  version,
  // 主题名称
  type: [
    "primary",
    "success",
    "info",
    "error",
    "warning"
  ],
  // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
  color: {
    "u-primary": "#2979ff",
    "u-warning": "#ff9900",
    "u-success": "#19be6b",
    "u-error": "#fa3534",
    "u-info": "#909399",
    "u-main-color": "#303133",
    "u-content-color": "#606266",
    "u-tips-color": "#909399",
    "u-light-color": "#c0c4cc"
  },
  // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
  unit: "px"
};
function getPx(value, unit = false) {
  if (number(value)) {
    return unit ? `${value}px` : Number(value);
  }
  if (/(rpx|upx)$/.test(value)) {
    return unit ? `${index.upx2px(parseInt(value))}px` : Number(index.upx2px(parseInt(value)));
  }
  return unit ? `${parseInt(value)}px` : parseInt(value);
}
function sleep(value = 30) {
  return new Promise((resolve2) => {
    setTimeout(() => {
      resolve2();
    }, value);
  });
}
function os$1() {
  return index.getSystemInfoSync().platform.toLowerCase();
}
function sys() {
  return index.getSystemInfoSync();
}
function $parent(name = void 0) {
  let parent = this.$parent;
  while (parent) {
    if (parent.$options && parent.$options.name !== name) {
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}
function addStyle(customStyle, target = "object") {
  if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
    return customStyle;
  }
  if (target === "object") {
    customStyle = trim(customStyle);
    const styleArray = customStyle.split(";");
    const style = {};
    for (let i2 = 0; i2 < styleArray.length; i2++) {
      if (styleArray[i2]) {
        const item = styleArray[i2].split(":");
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  let string2 = "";
  if (typeof customStyle === "object") {
    customStyle.forEach((val, i2) => {
      const key = i2.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${val};`;
    });
  }
  return trim(string2);
}
function addUnit(value = "auto", unit = "") {
  if (!unit) {
    unit = config.unit;
  }
  value = String(value);
  return number(value) ? `${value}${unit}` : value;
}
function deepClone(obj) {
  if ([null, void 0, NaN, false].includes(obj))
    return obj;
  if (typeof obj !== "object" && typeof obj !== "function") {
    return obj;
  }
  const o2 = array(obj) ? [] : {};
  for (const i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      o2[i2] = typeof obj[i2] === "object" ? deepClone(obj[i2]) : obj[i2];
    }
  }
  return o2;
}
function deepMerge$1(targetOrigin = {}, source = {}) {
  let target = deepClone(targetOrigin);
  if (typeof target !== "object" || typeof source !== "object")
    return false;
  for (const prop in source) {
    if (!source.hasOwnProperty(prop))
      continue;
    if (prop in target) {
      if (source[prop] == null) {
        target[prop] = source[prop];
      } else if (typeof target[prop] !== "object") {
        target[prop] = source[prop];
      } else if (typeof source[prop] !== "object") {
        target[prop] = source[prop];
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop]);
      } else {
        target[prop] = deepMerge$1(target[prop], source[prop]);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
function error(err) {
  {
    console.error(`uView提示：${err}`);
  }
}
if (!String.prototype.padStart) {
  String.prototype.padStart = function(maxLength, fillString = " ") {
    if (Object.prototype.toString.call(fillString) !== "[object String]") {
      throw new TypeError(
        "fillString must be String"
      );
    }
    const str = this;
    if (str.length >= maxLength)
      return String(str);
    const fillLength = maxLength - str.length;
    let times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}
function trim(str, pos = "both") {
  str = String(str);
  if (pos == "both") {
    return str.replace(/^\s+|\s+$/g, "");
  }
  if (pos == "left") {
    return str.replace(/^\s*/, "");
  }
  if (pos == "right") {
    return str.replace(/(\s*$)/g, "");
  }
  if (pos == "all") {
    return str.replace(/\s+/g, "");
  }
  return str;
}
function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
  const prefix = isPrefix ? "?" : "";
  const _result = [];
  if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
    arrayFormat = "brackets";
  for (const key in data) {
    const value = data[key];
    if (["", void 0, null].indexOf(value) >= 0) {
      continue;
    }
    if (value.constructor === Array) {
      switch (arrayFormat) {
        case "indices":
          for (let i2 = 0; i2 < value.length; i2++) {
            _result.push(`${key}[${i2}]=${value[i2]}`);
          }
          break;
        case "brackets":
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
          break;
        case "repeat":
          value.forEach((_value) => {
            _result.push(`${key}=${_value}`);
          });
          break;
        case "comma":
          let commaStr = "";
          value.forEach((_value) => {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(`${key}=${commaStr}`);
          break;
        default:
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
      }
    } else {
      _result.push(`${key}=${value}`);
    }
  }
  return _result.length ? prefix + _result.join("&") : "";
}
function toast(title, duration = 2e3) {
  index.showToast({
    title: String(title),
    icon: "none",
    duration
  });
}
function formValidate(instance, event) {
  const formItem = $parent.call(instance, "u-form-item");
  const form = $parent.call(instance, "u-form");
  if (formItem && form) {
    form.validateField(formItem.prop, () => {
    }, event);
  }
}
function getProperty(obj, key) {
  if (typeof obj !== "object" || null == obj) {
    return "";
  }
  if (typeof key !== "string" || key === "") {
    return "";
  }
  if (key.indexOf(".") !== -1) {
    const keys = key.split(".");
    let firstObj = obj[keys[0]] || {};
    for (let i2 = 1; i2 < keys.length; i2++) {
      if (firstObj) {
        firstObj = firstObj[keys[i2]];
      }
    }
    return firstObj;
  }
  return obj[key];
}
function setProperty(obj, key, value) {
  if (typeof obj !== "object" || null == obj) {
    return;
  }
  const inFn = function(_obj, keys, v2) {
    if (keys.length === 1) {
      _obj[keys[0]] = v2;
      return;
    }
    while (keys.length > 1) {
      const k = keys[0];
      if (!_obj[k] || typeof _obj[k] !== "object") {
        _obj[k] = {};
      }
      keys.shift();
      inFn(_obj[k], keys, v2);
    }
  };
  if (typeof key !== "string" || key === "")
    ;
  else if (key.indexOf(".") !== -1) {
    const keys = key.split(".");
    inFn(obj, keys, value);
  } else {
    obj[key] = value;
  }
}
function page() {
  const pages2 = getCurrentPages();
  return `/${pages2[pages2.length - 1].route || ""}`;
}
class Router {
  constructor() {
    this.config = {
      type: "navigateTo",
      url: "",
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: "pop-in",
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false
      // 是否需要拦截
    };
    this.route = this.route.bind(this);
  }
  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  addRootPath(url3) {
    return url3[0] === "/" ? url3 : `/${url3}`;
  }
  // 整合路由参数
  mixinParam(url3, params) {
    url3 = url3 && this.addRootPath(url3);
    let query = "";
    if (/.*\/.*\?.*=.*/.test(url3)) {
      query = queryParams(params, false);
      return url3 += `&${query}`;
    }
    query = queryParams(params);
    return url3 += query;
  }
  // 对外的方法名称
  async route(options = {}, params = {}) {
    let mergeConfig = {};
    if (typeof options === "string") {
      mergeConfig.url = this.mixinParam(options, params);
      mergeConfig.type = "navigateTo";
    } else {
      mergeConfig = deepMerge$1(this.config, options);
      mergeConfig.url = this.mixinParam(options.url, options.params);
    }
    if (mergeConfig.url === page())
      return;
    if (params.intercept) {
      this.config.intercept = params.intercept;
    }
    mergeConfig.params = params;
    mergeConfig = deepMerge$1(this.config, mergeConfig);
    if (typeof index.$u.routeIntercept === "function") {
      const isNext = await new Promise((resolve2, reject) => {
        index.$u.routeIntercept(mergeConfig, resolve2);
      });
      isNext && this.openPage(mergeConfig);
    } else {
      this.openPage(mergeConfig);
    }
  }
  // 执行路由跳转
  openPage(config2) {
    const {
      url: url3,
      type: type2,
      delta,
      animationType,
      animationDuration
    } = config2;
    if (config2.type == "navigateTo" || config2.type == "to") {
      index.navigateTo({
        url: url3,
        animationType,
        animationDuration
      });
    }
    if (config2.type == "redirectTo" || config2.type == "redirect") {
      index.redirectTo({
        url: url3
      });
    }
    if (config2.type == "switchTab" || config2.type == "tab") {
      index.switchTab({
        url: url3
      });
    }
    if (config2.type == "reLaunch" || config2.type == "launch") {
      index.reLaunch({
        url: url3
      });
    }
    if (config2.type == "navigateBack" || config2.type == "back") {
      index.navigateBack({
        delta
      });
    }
  }
}
const route = new Router().route;
const mixin = defineMixin({
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: () => ({})
    },
    customClass: {
      type: String,
      default: ""
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: ""
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: "navigateTo"
    }
  },
  data() {
    return {};
  },
  onLoad() {
    this.$u.getRect = this.$uGetRect;
  },
  created() {
    this.$u.getRect = this.$uGetRect;
  },
  computed: {
    // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
    // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
    // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
    $u() {
      return deepMerge$1(index.$u, {
        props: void 0,
        http: void 0,
        mixin: void 0
      });
    },
    /**
     * 生成bem规则类名
     * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
     * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
     * @param {String} name 组件名称
     * @param {Array} fixed 一直会存在的类名
     * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
     * @returns {Array|string}
     */
    bem() {
      return function(name, fixed, change) {
        const prefix = `u-${name}--`;
        const classes = {};
        if (fixed) {
          fixed.map((item) => {
            classes[prefix + this[item]] = true;
          });
        }
        if (change) {
          change.map((item) => {
            this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
      };
    }
  },
  methods: {
    // 跳转某一个页面
    openPage(urlKey = "url") {
      const url3 = this[urlKey];
      if (url3) {
        route({ type: this.linkType, url: url3 });
      }
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect(selector, all) {
      return new Promise((resolve2) => {
        index.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve2(rect);
          }
          if (!all && rect) {
            resolve2(rect);
          }
        }).exec();
      });
    },
    getParentData(parentName = "") {
      if (!this.parent)
        this.parent = {};
      this.parent = $parent.call(this, parentName);
      if (this.parent.children) {
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent(e2) {
      e2 && typeof e2.stopPropagation === "function" && e2.stopPropagation();
    },
    // 空操作
    noop(e2) {
      this.preventEvent(e2);
    }
  },
  onReachBottom() {
    index.$emit("uOnReachBottom");
  },
  beforeUnmount() {
    if (this.parent && test.array(this.parent.children)) {
      const childrenList = this.parent.children;
      childrenList.map((child, index2) => {
        if (child === this) {
          childrenList.splice(index2, 1);
        }
      });
    }
  }
});
const ActionSheet = {
  // action-sheet组件
  actionSheet: {
    show: false,
    title: "",
    description: "",
    actions: [],
    index: "",
    cancelText: "",
    closeOnClickAction: true,
    safeAreaInsetBottom: true,
    openType: "",
    closeOnClickOverlay: true,
    round: 0
  }
};
const Album = {
  // album 组件
  album: {
    urls: [],
    keyName: "",
    singleSize: 180,
    multipleSize: 70,
    space: 6,
    singleMode: "scaleToFill",
    multipleMode: "aspectFill",
    maxCount: 9,
    previewFullImage: true,
    rowCount: 3,
    showMore: true
  }
};
const Alert = {
  // alert警告组件
  alert: {
    title: "",
    type: "warning",
    description: "",
    closable: false,
    showIcon: false,
    effect: "light",
    center: false,
    fontSize: 14
  }
};
const Avatar = {
  // avatar 组件
  avatar: {
    src: "",
    shape: "circle",
    size: 40,
    mode: "scaleToFill",
    text: "",
    bgColor: "#c0c4cc",
    color: "#ffffff",
    fontSize: 18,
    icon: "",
    mpAvatar: false,
    randomBgColor: false,
    defaultUrl: "",
    colorIndex: "",
    name: ""
  }
};
const AvatarGroup = {
  // avatarGroup 组件
  avatarGroup: {
    urls: [],
    maxCount: 5,
    shape: "circle",
    mode: "scaleToFill",
    showMore: true,
    size: 40,
    keyName: "",
    gap: 0.5,
    extraValue: 0
  }
};
const Backtop = {
  // backtop组件
  backtop: {
    mode: "circle",
    icon: "arrow-upward",
    text: "",
    duration: 100,
    scrollTop: 0,
    top: 400,
    bottom: 100,
    right: 20,
    zIndex: 9,
    iconStyle: {
      color: "#909399",
      fontSize: "19px"
    }
  }
};
const Badge = {
  // 徽标数组件
  badge: {
    isDot: false,
    value: "",
    show: true,
    max: 999,
    type: "error",
    showZero: false,
    bgColor: null,
    color: null,
    shape: "circle",
    numberType: "overflow",
    offset: [],
    inverted: false,
    absolute: false
  }
};
const Button = {
  // button组件
  button: {
    hairline: false,
    type: "info",
    size: "normal",
    shape: "square",
    plain: false,
    disabled: false,
    loading: false,
    loadingText: "",
    loadingMode: "spinner",
    loadingSize: 15,
    openType: "",
    formType: "",
    appParameter: "",
    hoverStopPropagation: true,
    lang: "en",
    sessionFrom: "",
    sendMessageTitle: "",
    sendMessagePath: "",
    sendMessageImg: "",
    showMessageCard: false,
    dataName: "",
    throttleTime: 0,
    hoverStartTime: 0,
    hoverStayTime: 200,
    text: "",
    icon: "",
    iconColor: "",
    color: ""
  }
};
const Calendar = {
  // calendar 组件
  calendar: {
    title: "日期选择",
    showTitle: true,
    showSubtitle: true,
    mode: "single",
    startText: "开始",
    endText: "结束",
    customList: [],
    color: "#3c9cff",
    minDate: 0,
    maxDate: 0,
    defaultDate: null,
    maxCount: Number.MAX_SAFE_INTEGER,
    // Infinity
    rowHeight: 56,
    formatter: null,
    showLunar: false,
    showMark: true,
    confirmText: "确定",
    confirmDisabledText: "确定",
    show: false,
    closeOnClickOverlay: false,
    readonly: false,
    showConfirm: true,
    maxRange: Number.MAX_SAFE_INTEGER,
    // Infinity
    rangePrompt: "",
    showRangePrompt: true,
    allowSameDay: false,
    round: 0,
    monthNum: 3
  }
};
const CarKeyboard = {
  // 车牌号键盘
  carKeyboard: {
    random: false
  }
};
const Cell = {
  // cell组件的props
  cell: {
    customClass: "",
    title: "",
    label: "",
    value: "",
    icon: "",
    disabled: false,
    border: true,
    center: false,
    url: "",
    linkType: "navigateTo",
    clickable: false,
    isLink: false,
    required: false,
    arrowDirection: "",
    iconStyle: {},
    rightIconStyle: {},
    rightIcon: "arrow-right",
    titleStyle: {},
    size: "",
    stop: true,
    name: ""
  }
};
const CellGroup = {
  // cell-group组件的props
  cellGroup: {
    title: "",
    border: true,
    customStyle: {}
  }
};
const Checkbox = {
  // checkbox组件
  checkbox: {
    name: "",
    shape: "",
    size: "",
    checkbox: false,
    disabled: "",
    activeColor: "",
    inactiveColor: "",
    iconSize: "",
    iconColor: "",
    label: "",
    labelSize: "",
    labelColor: "",
    labelDisabled: ""
  }
};
const CheckboxGroup = {
  // checkbox-group组件
  checkboxGroup: {
    name: "",
    value: [],
    shape: "square",
    disabled: false,
    activeColor: "#2979ff",
    inactiveColor: "#c8c9cc",
    size: 18,
    placement: "row",
    labelSize: 14,
    labelColor: "#303133",
    labelDisabled: false,
    iconColor: "#ffffff",
    iconSize: 12,
    iconPlacement: "left",
    borderBottom: false
  }
};
const CircleProgress = {
  // circleProgress 组件
  circleProgress: {
    percentage: 30
  }
};
const Code = {
  // code 组件
  code: {
    seconds: 60,
    startText: "获取验证码",
    changeText: "X秒重新获取",
    endText: "重新获取",
    keepRunning: false,
    uniqueKey: ""
  }
};
const CodeInput = {
  // codeInput 组件
  codeInput: {
    adjustPosition: true,
    maxlength: 6,
    dot: false,
    mode: "box",
    hairline: false,
    space: 10,
    value: "",
    focus: false,
    bold: false,
    color: "#606266",
    fontSize: 18,
    size: 35,
    disabledKeyboard: false,
    borderColor: "#c9cacc",
    disabledDot: true
  }
};
const Col = {
  // col 组件
  col: {
    span: 12,
    offset: 0,
    justify: "start",
    align: "stretch",
    textAlign: "left"
  }
};
const Collapse = {
  // collapse 组件
  collapse: {
    value: null,
    accordion: false,
    border: true
  }
};
const CollapseItem = {
  // collapseItem 组件
  collapseItem: {
    title: "",
    value: "",
    label: "",
    disabled: false,
    isLink: true,
    clickable: true,
    border: true,
    align: "left",
    name: "",
    icon: "",
    duration: 300
  }
};
const ColumnNotice = {
  // columnNotice 组件
  columnNotice: {
    text: "",
    icon: "volume",
    mode: "",
    color: "#f9ae3d",
    bgColor: "#fdf6ec",
    fontSize: 14,
    speed: 80,
    step: false,
    duration: 1500,
    disableTouch: true
  }
};
const CountDown = {
  // u-count-down 计时器组件
  countDown: {
    time: 0,
    format: "HH:mm:ss",
    autoStart: true,
    millisecond: false
  }
};
const CountTo = {
  // countTo 组件
  countTo: {
    startVal: 0,
    endVal: 0,
    duration: 2e3,
    autoplay: true,
    decimals: 0,
    useEasing: true,
    decimal: ".",
    color: "#606266",
    fontSize: 22,
    bold: false,
    separator: ""
  }
};
const DatetimePicker = {
  // datetimePicker 组件
  datetimePicker: {
    show: false,
    popupMode: "bottom",
    showToolbar: true,
    value: "",
    title: "",
    mode: "datetime",
    maxDate: new Date((/* @__PURE__ */ new Date()).getFullYear() + 10, 0, 1).getTime(),
    minDate: new Date((/* @__PURE__ */ new Date()).getFullYear() - 10, 0, 1).getTime(),
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    filter: null,
    formatter: null,
    loading: false,
    itemHeight: 44,
    cancelText: "取消",
    confirmText: "确认",
    cancelColor: "#909193",
    confirmColor: "#3c9cff",
    visibleItemCount: 5,
    closeOnClickOverlay: false,
    defaultIndex: []
  }
};
const Divider = {
  // divider组件
  divider: {
    dashed: false,
    hairline: true,
    dot: false,
    textPosition: "center",
    text: "",
    textSize: 14,
    textColor: "#909399",
    lineColor: "#dcdfe6"
  }
};
const Empty = {
  // empty组件
  empty: {
    icon: "",
    text: "",
    textColor: "#c0c4cc",
    textSize: 14,
    iconColor: "#c0c4cc",
    iconSize: 90,
    mode: "data",
    width: 160,
    height: 160,
    show: true,
    marginTop: 0
  }
};
const Form = {
  // form 组件
  form: {
    model: {},
    rules: {},
    errorType: "message",
    borderBottom: true,
    labelPosition: "left",
    labelWidth: 45,
    labelAlign: "left",
    labelStyle: {}
  }
};
const GormItem = {
  // formItem 组件
  formItem: {
    label: "",
    prop: "",
    rule: "",
    borderBottom: "",
    labelPosition: "",
    labelWidth: "",
    rightIcon: "",
    leftIcon: "",
    required: false,
    leftIconStyle: ""
  }
};
const Gap = {
  // gap组件
  gap: {
    bgColor: "transparent",
    height: 20,
    marginTop: 0,
    marginBottom: 0,
    customStyle: {}
  }
};
const Grid = {
  // grid组件
  grid: {
    col: 3,
    border: false,
    align: "left"
  }
};
const GridItem = {
  // grid-item组件
  gridItem: {
    name: null,
    bgColor: "transparent"
  }
};
const {
  color: color$3
} = config;
const Icon = {
  // icon组件
  icon: {
    name: "",
    color: color$3["u-content-color"],
    size: "16px",
    bold: false,
    index: "",
    hoverClass: "",
    customPrefix: "uicon",
    label: "",
    labelPos: "right",
    labelSize: "15px",
    labelColor: color$3["u-content-color"],
    space: "3px",
    imgMode: "",
    width: "",
    height: "",
    top: 0,
    stop: false
  }
};
const Image = {
  // image组件
  image: {
    src: "",
    mode: "aspectFill",
    width: "300",
    height: "225",
    shape: "square",
    radius: 0,
    lazyLoad: true,
    showMenuByLongpress: true,
    loadingIcon: "photo",
    errorIcon: "error-circle",
    showLoading: true,
    showError: true,
    fade: true,
    webp: false,
    duration: 500,
    bgColor: "#f3f4f6"
  }
};
const IndexAnchor = {
  // indexAnchor 组件
  indexAnchor: {
    text: "",
    color: "#606266",
    size: 14,
    bgColor: "#dedede",
    height: 32
  }
};
const IndexList = {
  // indexList 组件
  indexList: {
    inactiveColor: "#606266",
    activeColor: "#5677fc",
    indexList: [],
    sticky: true,
    customNavHeight: 0
  }
};
const Input = {
  // index 组件
  input: {
    value: "",
    type: "text",
    fixed: false,
    disabled: false,
    disabledColor: "#f5f7fa",
    clearable: false,
    password: false,
    maxlength: -1,
    placeholder: null,
    placeholderClass: "input-placeholder",
    placeholderStyle: "color: #c0c4cc",
    showWordLimit: false,
    confirmType: "done",
    confirmHold: false,
    holdKeyboard: false,
    focus: false,
    autoBlur: false,
    disableDefaultPadding: false,
    cursor: -1,
    cursorSpacing: 30,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    inputAlign: "left",
    fontSize: "15px",
    color: "#303133",
    prefixIcon: "",
    prefixIconStyle: "",
    suffixIcon: "",
    suffixIconStyle: "",
    border: "surround",
    readonly: false,
    shape: "square",
    formatter: null
  }
};
const Keyboard = {
  // 键盘组件
  keyboard: {
    mode: "number",
    dotDisabled: false,
    tooltip: true,
    showTips: true,
    tips: "",
    showCancel: true,
    showConfirm: true,
    random: false,
    safeAreaInsetBottom: true,
    closeOnClickOverlay: true,
    show: false,
    overlay: true,
    zIndex: 10075,
    cancelText: "取消",
    confirmText: "确定",
    autoChange: false
  }
};
const Line = {
  // line组件
  line: {
    color: "#d6d7d9",
    length: "100%",
    direction: "row",
    hairline: true,
    margin: 0,
    dashed: false
  }
};
const LineProgress = {
  // lineProgress 组件
  lineProgress: {
    activeColor: "#19be6b",
    inactiveColor: "#ececec",
    percentage: 0,
    showText: true,
    height: 12
  }
};
const {
  color: color$2
} = config;
const Link = {
  // link超链接组件props参数
  link: {
    color: color$2["u-primary"],
    fontSize: 15,
    underLine: false,
    href: "",
    mpTips: "链接已复制，请在浏览器打开",
    lineColor: "",
    text: ""
  }
};
const List = {
  // list 组件
  list: {
    showScrollbar: false,
    lowerThreshold: 50,
    upperThreshold: 0,
    scrollTop: 0,
    offsetAccuracy: 10,
    enableFlex: false,
    pagingEnabled: false,
    scrollable: true,
    scrollIntoView: "",
    scrollWithAnimation: false,
    enableBackToTop: false,
    height: 0,
    width: 0,
    preLoadScreen: 1
  }
};
const ListItem = {
  // listItem 组件
  listItem: {
    anchor: ""
  }
};
const {
  color: color$1
} = config;
const LoadingIcon = {
  // loading-icon加载中图标组件
  loadingIcon: {
    show: true,
    color: color$1["u-tips-color"],
    textColor: color$1["u-tips-color"],
    vertical: false,
    mode: "spinner",
    size: 24,
    textSize: 15,
    text: "",
    timingFunction: "ease-in-out",
    duration: 1200,
    inactiveColor: ""
  }
};
const LoadingPage = {
  // loading-page组件
  loadingPage: {
    loadingText: "正在加载",
    image: "",
    loadingMode: "circle",
    loading: false,
    bgColor: "#ffffff",
    color: "#C8C8C8",
    fontSize: 19,
    iconSize: 28,
    loadingColor: "#C8C8C8"
  }
};
const Loadmore = {
  // loadmore 组件
  loadmore: {
    status: "loadmore",
    bgColor: "transparent",
    icon: true,
    fontSize: 14,
    iconSize: 17,
    color: "#606266",
    loadingIcon: "spinner",
    loadmoreText: "加载更多",
    loadingText: "正在加载...",
    nomoreText: "没有更多了",
    isDot: false,
    iconColor: "#b7b7b7",
    marginTop: 10,
    marginBottom: 10,
    height: "auto",
    line: false,
    lineColor: "#E6E8EB",
    dashed: false
  }
};
const Modal = {
  // modal 组件
  modal: {
    show: false,
    title: "",
    content: "",
    confirmText: "确认",
    cancelText: "取消",
    showConfirmButton: true,
    showCancelButton: false,
    confirmColor: "#2979ff",
    cancelColor: "#606266",
    buttonReverse: false,
    zoom: true,
    asyncClose: false,
    closeOnClickOverlay: false,
    negativeTop: 0,
    width: "650rpx",
    confirmButtonShape: ""
  }
};
const color = {
  primary: "#3c9cff",
  info: "#909399",
  default: "#909399",
  warning: "#f9ae3d",
  error: "#f56c6c",
  success: "#5ac725",
  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed"
};
const Navbar = {
  // navbar 组件
  navbar: {
    safeAreaInsetTop: true,
    placeholder: false,
    fixed: true,
    border: false,
    leftIcon: "arrow-left",
    leftText: "",
    rightText: "",
    rightIcon: "",
    title: "",
    bgColor: "#ffffff",
    titleWidth: "400rpx",
    height: "44px",
    leftIconSize: 20,
    leftIconColor: color.mainColor,
    autoBack: false,
    titleStyle: ""
  }
};
const NoNetwork = {
  // noNetwork
  noNetwork: {
    tips: "哎呀，网络信号丢失",
    zIndex: "",
    image: "data:image/png;base64,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"
  }
};
const NoticeBar = {
  // noticeBar
  noticeBar: {
    text: [],
    direction: "row",
    step: false,
    icon: "volume",
    mode: "",
    color: "#f9ae3d",
    bgColor: "#fdf6ec",
    speed: 80,
    fontSize: 14,
    duration: 2e3,
    disableTouch: true,
    url: "",
    linkType: "navigateTo"
  }
};
const Notify = {
  // notify组件
  notify: {
    top: 0,
    type: "primary",
    color: "#ffffff",
    bgColor: "",
    message: "",
    duration: 3e3,
    fontSize: 15,
    safeAreaInsetTop: false
  }
};
const NumberBox = {
  // 步进器组件
  numberBox: {
    name: "",
    value: 0,
    min: 1,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    integer: false,
    disabled: false,
    disabledInput: false,
    asyncChange: false,
    inputWidth: 35,
    showMinus: true,
    showPlus: true,
    decimalLength: null,
    longPress: true,
    color: "#323233",
    buttonSize: 30,
    bgColor: "#EBECEE",
    cursorSpacing: 100,
    disableMinus: false,
    disablePlus: false,
    iconStyle: ""
  }
};
const NumberKeyboard = {
  // 数字键盘
  numberKeyboard: {
    mode: "number",
    dotDisabled: false,
    random: false
  }
};
const Overlay = {
  // overlay组件
  overlay: {
    show: false,
    zIndex: 10070,
    duration: 300,
    opacity: 0.5
  }
};
const Parse = {
  // parse
  parse: {
    copyLink: true,
    errorImg: "",
    lazyLoad: false,
    loadingImg: "",
    pauseVideo: true,
    previewImg: true,
    setTitle: true,
    showImgMenu: true
  }
};
const Picker = {
  // picker
  picker: {
    show: false,
    popupMode: "bottom",
    showToolbar: true,
    title: "",
    columns: [],
    loading: false,
    itemHeight: 44,
    cancelText: "取消",
    confirmText: "确定",
    cancelColor: "#909193",
    confirmColor: "#3c9cff",
    visibleItemCount: 5,
    keyName: "text",
    closeOnClickOverlay: false,
    defaultIndex: [],
    immediateChange: true
  }
};
const Popup = {
  // popup组件
  popup: {
    show: false,
    overlay: true,
    mode: "bottom",
    duration: 300,
    closeable: false,
    overlayStyle: {},
    closeOnClickOverlay: true,
    zIndex: 10075,
    safeAreaInsetBottom: true,
    safeAreaInsetTop: false,
    closeIconPos: "top-right",
    round: 0,
    zoom: true,
    bgColor: "",
    overlayOpacity: 0.5
  }
};
const Radio = {
  // radio组件
  radio: {
    name: "",
    shape: "",
    disabled: "",
    labelDisabled: "",
    activeColor: "",
    inactiveColor: "",
    iconSize: "",
    labelSize: "",
    label: "",
    labelColor: "",
    size: "",
    iconColor: "",
    placement: ""
  }
};
const RadioGroup = {
  // radio-group组件
  radioGroup: {
    value: "",
    disabled: false,
    shape: "circle",
    activeColor: "#2979ff",
    inactiveColor: "#c8c9cc",
    name: "",
    size: 18,
    placement: "row",
    label: "",
    labelColor: "#303133",
    labelSize: 14,
    labelDisabled: false,
    iconColor: "#ffffff",
    iconSize: 12,
    borderBottom: false,
    iconPlacement: "left"
  }
};
const Rate = {
  // rate组件
  rate: {
    value: 1,
    count: 5,
    disabled: false,
    size: 18,
    inactiveColor: "#b2b2b2",
    activeColor: "#FA3534",
    gutter: 4,
    minCount: 1,
    allowHalf: false,
    activeIcon: "star-fill",
    inactiveIcon: "star",
    touchable: true
  }
};
const ReadMore = {
  // readMore
  readMore: {
    showHeight: 400,
    toggle: false,
    closeText: "展开阅读全文",
    openText: "收起",
    color: "#2979ff",
    fontSize: 14,
    textIndent: "2em",
    name: ""
  }
};
const Row = {
  // row
  row: {
    gutter: 0,
    justify: "start",
    align: "center"
  }
};
const RowNotice = {
  // rowNotice
  rowNotice: {
    text: "",
    icon: "volume",
    mode: "",
    color: "#f9ae3d",
    bgColor: "#fdf6ec",
    fontSize: 14,
    speed: 80
  }
};
const ScrollList = {
  // scrollList
  scrollList: {
    indicatorWidth: 50,
    indicatorBarWidth: 20,
    indicator: true,
    indicatorColor: "#f2f2f2",
    indicatorActiveColor: "#3c9cff",
    indicatorStyle: ""
  }
};
const Search = {
  // search
  search: {
    shape: "round",
    bgColor: "#f2f2f2",
    placeholder: "请输入关键字",
    clearabled: true,
    focus: false,
    showAction: true,
    actionStyle: {},
    actionText: "搜索",
    inputAlign: "left",
    inputStyle: {},
    disabled: false,
    borderColor: "transparent",
    searchIconColor: "#909399",
    searchIconSize: 22,
    color: "#606266",
    placeholderColor: "#909399",
    searchIcon: "search",
    margin: "0",
    animation: false,
    value: "",
    maxlength: "-1",
    height: 32,
    label: null
  }
};
const Section = {
  // u-section组件
  section: {
    title: "",
    subTitle: "更多",
    right: true,
    fontSize: 15,
    bold: true,
    color: "#303133",
    subColor: "#909399",
    showLine: true,
    lineColor: "",
    arrow: true
  }
};
const Skeleton = {
  // skeleton
  skeleton: {
    loading: true,
    animate: true,
    rows: 0,
    rowsWidth: "100%",
    rowsHeight: 18,
    title: true,
    titleWidth: "50%",
    titleHeight: 18,
    avatar: false,
    avatarSize: 32,
    avatarShape: "circle"
  }
};
const Slider = {
  // slider组件
  slider: {
    value: 0,
    blockSize: 18,
    min: 0,
    max: 100,
    step: 1,
    activeColor: "#2979ff",
    inactiveColor: "#c0c4cc",
    blockColor: "#ffffff",
    showValue: false,
    disabled: false,
    blockStyle: {}
  }
};
const StatusBar = {
  // statusBar
  statusBar: {
    bgColor: "transparent"
  }
};
const Steps = {
  // steps组件
  steps: {
    direction: "row",
    current: 0,
    activeColor: "#3c9cff",
    inactiveColor: "#969799",
    activeIcon: "",
    inactiveIcon: "",
    dot: false
  }
};
const StepsItem = {
  // steps-item组件
  stepsItem: {
    title: "",
    desc: "",
    iconSize: 17,
    error: false
  }
};
const Sticky = {
  // sticky组件
  sticky: {
    offsetTop: 0,
    customNavHeight: 0,
    disabled: false,
    bgColor: "transparent",
    zIndex: "",
    index: ""
  }
};
const Subsection = {
  // subsection组件
  subsection: {
    list: [],
    current: 0,
    activeColor: "#3c9cff",
    inactiveColor: "#303133",
    mode: "button",
    fontSize: 12,
    bold: true,
    bgColor: "#eeeeef",
    keyName: "name"
  }
};
const SwipeAction = {
  // swipe-action组件
  swipeAction: {
    autoClose: true
  }
};
const SwipeActionItem = {
  // swipeActionItem 组件
  swipeActionItem: {
    show: false,
    name: "",
    disabled: false,
    threshold: 20,
    autoClose: true,
    options: [],
    duration: 300
  }
};
const Swiper = {
  // swiper 组件
  swiper: {
    list: [],
    indicator: false,
    indicatorActiveColor: "#FFFFFF",
    indicatorInactiveColor: "rgba(255, 255, 255, 0.35)",
    indicatorStyle: "",
    indicatorMode: "line",
    autoplay: true,
    current: 0,
    currentItemId: "",
    interval: 3e3,
    duration: 300,
    circular: false,
    previousMargin: 0,
    nextMargin: 0,
    acceleration: false,
    displayMultipleItems: 1,
    easingFunction: "default",
    keyName: "url",
    imgMode: "aspectFill",
    height: 130,
    bgColor: "#f3f4f6",
    radius: 4,
    loading: false,
    showTitle: false
  }
};
const SwipterIndicator = {
  // swiperIndicator 组件
  swiperIndicator: {
    length: 0,
    current: 0,
    indicatorActiveColor: "",
    indicatorInactiveColor: "",
    indicatorMode: "line"
  }
};
const Switch = {
  // switch
  switch: {
    loading: false,
    disabled: false,
    size: 25,
    activeColor: "#2979ff",
    inactiveColor: "#ffffff",
    value: false,
    activeValue: true,
    inactiveValue: false,
    asyncChange: false,
    space: 0
  }
};
const Tabbar = {
  // tabbar
  tabbar: {
    value: null,
    safeAreaInsetBottom: true,
    border: true,
    zIndex: 1,
    activeColor: "#1989fa",
    inactiveColor: "#7d7e80",
    fixed: true,
    placeholder: true
  }
};
const TabbarItem = {
  //
  tabbarItem: {
    name: null,
    icon: "",
    badge: null,
    dot: false,
    text: "",
    badgeStyle: "top: 6px;right:2px;"
  }
};
const Tabs = {
  //
  tabs: {
    duration: 300,
    list: [],
    lineColor: "#3c9cff",
    activeStyle: {
      color: "#303133"
    },
    inactiveStyle: {
      color: "#606266"
    },
    lineWidth: 20,
    lineHeight: 3,
    lineBgSize: "cover",
    itemStyle: {
      height: "44px"
    },
    scrollable: true,
    current: 0,
    keyName: "name"
  }
};
const Tag = {
  // tag 组件
  tag: {
    type: "primary",
    disabled: false,
    size: "medium",
    shape: "square",
    text: "",
    bgColor: "",
    color: "",
    borderColor: "",
    closeColor: "#C6C7CB",
    name: "",
    plainFill: false,
    plain: false,
    closable: false,
    show: true,
    icon: "",
    iconColor: ""
  }
};
const Text = {
  // text 组件
  text: {
    type: "",
    show: true,
    text: "",
    prefixIcon: "",
    suffixIcon: "",
    mode: "",
    href: "",
    format: "",
    call: false,
    openType: "",
    bold: false,
    block: false,
    lines: "",
    color: "#303133",
    size: 15,
    iconStyle: {
      fontSize: "15px"
    },
    decoration: "none",
    margin: 0,
    lineHeight: "",
    align: "left",
    wordWrap: "normal"
  }
};
const Textarea = {
  // textarea 组件
  textarea: {
    value: "",
    placeholder: "",
    placeholderClass: "textarea-placeholder",
    placeholderStyle: "color: #c0c4cc",
    height: 70,
    confirmType: "done",
    disabled: false,
    count: false,
    focus: false,
    autoHeight: false,
    fixed: false,
    cursorSpacing: 0,
    cursor: "",
    showConfirmBar: true,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    disableDefaultPadding: false,
    holdKeyboard: false,
    maxlength: 140,
    border: "surround",
    formatter: null
  }
};
const Toast = {
  // toast组件
  toast: {
    zIndex: 10090,
    loading: false,
    text: "",
    icon: "",
    type: "",
    loadingMode: "",
    show: "",
    overlay: false,
    position: "center",
    params: {},
    duration: 2e3,
    isTab: false,
    url: "",
    callback: null,
    back: false
  }
};
const Toolbar = {
  // toolbar 组件
  toolbar: {
    show: true,
    cancelText: "取消",
    confirmText: "确认",
    cancelColor: "#909193",
    confirmColor: "#3c9cff",
    title: ""
  }
};
const Tooltip = {
  // tooltip 组件
  tooltip: {
    text: "",
    copyText: "",
    size: 14,
    color: "#606266",
    bgColor: "transparent",
    direction: "top",
    zIndex: 10071,
    showCopy: true,
    buttons: [],
    overlay: true,
    showToast: true
  }
};
const Transition = {
  // transition动画组件的props
  transition: {
    show: false,
    mode: "fade",
    duration: "300",
    timingFunction: "ease-out"
  }
};
const Upload = {
  // upload组件
  upload: {
    accept: "image",
    extension: [],
    capture: ["album", "camera"],
    compressed: true,
    camera: "back",
    maxDuration: 60,
    uploadIcon: "camera-fill",
    uploadIconColor: "#D3D4D6",
    useBeforeRead: false,
    previewFullImage: true,
    maxCount: 52,
    disabled: false,
    imageMode: "aspectFill",
    name: "",
    sizeType: ["original", "compressed"],
    multiple: false,
    deletable: true,
    maxSize: Number.MAX_VALUE,
    fileList: [],
    uploadText: "",
    width: 80,
    height: 80,
    previewImage: true
  }
};
const defProps = {
  ...ActionSheet,
  ...Album,
  ...Alert,
  ...Avatar,
  ...AvatarGroup,
  ...Backtop,
  ...Badge,
  ...Button,
  ...Calendar,
  ...CarKeyboard,
  ...Cell,
  ...CellGroup,
  ...Checkbox,
  ...CheckboxGroup,
  ...CircleProgress,
  ...Code,
  ...CodeInput,
  ...Col,
  ...Collapse,
  ...CollapseItem,
  ...ColumnNotice,
  ...CountDown,
  ...CountTo,
  ...DatetimePicker,
  ...Divider,
  ...Empty,
  ...Form,
  ...GormItem,
  ...Gap,
  ...Grid,
  ...GridItem,
  ...Icon,
  ...Image,
  ...IndexAnchor,
  ...IndexList,
  ...Input,
  ...Keyboard,
  ...Line,
  ...LineProgress,
  ...Link,
  ...List,
  ...ListItem,
  ...LoadingIcon,
  ...LoadingPage,
  ...Loadmore,
  ...Modal,
  ...Navbar,
  ...NoNetwork,
  ...NoticeBar,
  ...Notify,
  ...NumberBox,
  ...NumberKeyboard,
  ...Overlay,
  ...Parse,
  ...Picker,
  ...Popup,
  ...Radio,
  ...RadioGroup,
  ...Rate,
  ...ReadMore,
  ...Row,
  ...RowNotice,
  ...ScrollList,
  ...Search,
  ...Section,
  ...Skeleton,
  ...Slider,
  ...StatusBar,
  ...Steps,
  ...StepsItem,
  ...Sticky,
  ...Subsection,
  ...SwipeAction,
  ...SwipeActionItem,
  ...Swiper,
  ...SwipterIndicator,
  ...Switch,
  ...Tabbar,
  ...TabbarItem,
  ...Tabs,
  ...Tag,
  ...Text,
  ...Textarea,
  ...Toast,
  ...Toolbar,
  ...Tooltip,
  ...Transition,
  ...Upload
};
const props$i = defineMixin({
  props: {
    // 是否细边框
    hairline: {
      type: Boolean,
      default: () => defProps.button.hairline
    },
    // 按钮的预置样式，info，primary，error，warning，success
    type: {
      type: String,
      default: () => defProps.button.type
    },
    // 按钮尺寸，large，normal，small，mini
    size: {
      type: String,
      default: () => defProps.button.size
    },
    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: () => defProps.button.shape
    },
    // 按钮是否镂空
    plain: {
      type: Boolean,
      default: () => defProps.button.plain
    },
    // 是否禁止状态
    disabled: {
      type: Boolean,
      default: () => defProps.button.disabled
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: () => defProps.button.loading
    },
    // 加载中提示文字
    loadingText: {
      type: [String, Number],
      default: () => defProps.button.loadingText
    },
    // 加载状态图标类型
    loadingMode: {
      type: String,
      default: () => defProps.button.loadingMode
    },
    // 加载图标大小
    loadingSize: {
      type: [String, Number],
      default: () => defProps.button.loadingSize
    },
    // 开放能力，具体请看uniapp稳定关于button组件部分说明
    // https://uniapp.dcloud.io/component/button
    openType: {
      type: String,
      default: () => defProps.button.openType
    },
    // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
    // 取值为submit（提交表单），reset（重置表单）
    formType: {
      type: String,
      default: () => defProps.button.formType
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    // 只微信小程序、QQ小程序有效
    appParameter: {
      type: String,
      default: () => defProps.button.appParameter
    },
    // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
    hoverStopPropagation: {
      type: Boolean,
      default: () => defProps.button.hoverStopPropagation
    },
    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
    lang: {
      type: String,
      default: () => defProps.button.lang
    },
    // 会话来源，open-type="contact"时有效。只微信小程序有效
    sessionFrom: {
      type: String,
      default: () => defProps.button.sessionFrom
    },
    // 会话内消息卡片标题，open-type="contact"时有效
    // 默认当前标题，只微信小程序有效
    sendMessageTitle: {
      type: String,
      default: () => defProps.button.sendMessageTitle
    },
    // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
    // 默认当前分享路径，只微信小程序有效
    sendMessagePath: {
      type: String,
      default: () => defProps.button.sendMessagePath
    },
    // 会话内消息卡片图片，open-type="contact"时有效
    // 默认当前页面截图，只微信小程序有效
    sendMessageImg: {
      type: String,
      default: () => defProps.button.sendMessageImg
    },
    // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
    // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
    showMessageCard: {
      type: Boolean,
      default: () => defProps.button.showMessageCard
    },
    // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
    dataName: {
      type: String,
      default: () => defProps.button.dataName
    },
    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: () => defProps.button.throttleTime
    },
    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: [String, Number],
      default: () => defProps.button.hoverStartTime
    },
    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: [String, Number],
      default: () => defProps.button.hoverStayTime
    },
    // 按钮文字，之所以通过props传入，是因为slot传入的话
    // nvue中无法控制文字的样式
    text: {
      type: [String, Number],
      default: () => defProps.button.text
    },
    // 按钮图标
    icon: {
      type: String,
      default: () => defProps.button.icon
    },
    // 按钮图标
    iconColor: {
      type: String,
      default: () => defProps.button.icon
    },
    // 按钮颜色，支持传入linear-gradient渐变色
    color: {
      type: String,
      default: () => defProps.button.color
    }
  }
});
let flag;
function throttle(func2, wait = 500, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      typeof func2 === "function" && func2();
      setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    setTimeout(() => {
      flag = false;
      typeof func2 === "function" && func2();
    }, wait);
  }
}
const easycom = {
  autoscan: true,
  custom: {
    "^u--(.*)": "uview-plus/components/u-$1/u-$1.vue",
    "^up-(.*)": "uview-plus/components/u-$1/u-$1.vue",
    "^u-([^-].*)": "uview-plus/components/u-$1/u-$1.vue"
  }
};
const pages = [
  {
    path: "pages/login/login",
    style: {
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "uni-app"
    }
  },
  {
    path: "pages/homepage/homepage",
    style: {
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/MaterialModule/MaterialModule",
    style: {
      navigationBarTitleText: "急救车信息页面",
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/MaterialUsedRecord/MaterialUsedRecord",
    style: {
      navigationBarTitleText: "物资使用登记",
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/register/register",
    style: {
      navigationBarTitleText: "用户注册",
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/userInfo/userInfo",
    style: {
      navigationBarTitleText: "个人信息",
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/report/report",
    style: {
      navigationBarTitleText: "报表",
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/feedback/feedback",
    style: {
      navigationBarTitleText: "反馈",
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/userInfo/revisePart/revisePart",
    style: {
      navigationBarTitleText: "修改信息",
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/medicalTrolleyRecord/medicalTrolleyRecord",
    style: {
      navigationBarTitleText: "急救车登记",
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/medicalInfo/index",
    style: {
      navigationBarTitleText: "物资信息",
      navigationBarBackgroundColor: "rgba(0, 170, 255, 1.0)",
      navigationBarTextStyle: "#ffffff",
      titleSize: "40upx"
    }
  },
  {
    path: "pages/checkInfo/index",
    style: {
      navigationBarTitleText: "盘点",
      navigationBarBackgroundColor: "rgba(0, 170, 255, 1.0)",
      navigationBarTextStyle: "#ffffff",
      titleSize: "40upx"
    }
  },
  {
    path: "pages/materialUseRegistration/index",
    style: {
      navigationBarTitleText: "使用登记",
      navigationBarBackgroundColor: "rgba(0, 170, 255, 1.0)",
      navigationBarTextStyle: "#ffffff",
      titleSize: "40upx"
    }
  },
  {
    path: "pages/materialInfoRegistration/index",
    style: {
      navigationBarTitleText: "物资登记",
      navigationBarBackgroundColor: "rgba(0, 170, 255, 1.0)",
      navigationBarTextStyle: "#ffffff",
      titleSize: "40upx"
    }
  }
];
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8"
};
const uniIdRouter = {};
const tabBar = {
  color: "lightgrey",
  selectedColor: "#89CFFB",
  borderStyle: "black",
  backgroundColor: "#FFFFFF",
  list: [
    {
      pagePath: "pages/homepage/homepage",
      iconPath: "static/Nav/ambulance.png",
      selectedIconPath: "static/Nav/ambulance-checked.png",
      text: "急救车"
    },
    {
      pagePath: "pages/report/report",
      iconPath: "static/Nav/report.png",
      selectedIconPath: "static/Nav/report-checked.png",
      text: "报表"
    },
    {
      pagePath: "pages/userInfo/userInfo",
      iconPath: "static/Nav/user.png",
      selectedIconPath: "static/Nav/user-checked.png",
      text: "我的"
    }
  ]
};
const e = {
  easycom,
  pages,
  globalStyle,
  uniIdRouter,
  tabBar
};
var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
function t(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function n(e2, t2, n2) {
  return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(null == t3 && n2.path);
  } }, n2.exports), n2.exports;
}
var s = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || /* @__PURE__ */ function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c2).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var i3 = 0; i3 < r3; i3++) {
          var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
          t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
        }
      else
        for (i3 = 0; i3 < r3; i3 += 4)
          t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s3 = [], r3 = function(t5) {
        t5 = t5;
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, i3 = 0; i3 < t4; i3 += 4) {
        var a3 = r3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new o2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new o2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(i3));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new o2.init(n4, t4);
    } }, h2 = a2.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u2.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u2.parse(unescape(encodeURIComponent(e4)));
    } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
      this._data = new o2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
      if (c3) {
        for (var h3 = 0; h3 < c3; h3 += i3)
          this._doProcessBlock(s3, h3);
        var l3 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new o2.init(l3, u3);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      l2.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d2.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d2 = s2.algo = {};
    return s2;
  }(Math), n2);
}), r = s, i = (n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c2 = o2.MD5 = i2.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, r3 = e4[s3];
        e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], A2 = e4[t4 + 14], P2 = e4[t4 + 15], T2 = i3[0], C2 = i3[1], x2 = i3[2], O2 = i3[3];
      T2 = u2(T2, C2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, T2, C2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, T2, C2, p2, 17, a2[2]), C2 = u2(C2, x2, O2, T2, f2, 22, a2[3]), T2 = u2(T2, C2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, T2, C2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, T2, C2, y2, 17, a2[6]), C2 = u2(C2, x2, O2, T2, _2, 22, a2[7]), T2 = u2(T2, C2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, T2, C2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, T2, C2, I2, 17, a2[10]), C2 = u2(C2, x2, O2, T2, S2, 22, a2[11]), T2 = u2(T2, C2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, T2, C2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, T2, C2, A2, 17, a2[14]), T2 = h2(T2, C2 = u2(C2, x2, O2, T2, P2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = h2(O2, T2, C2, x2, y2, 9, a2[17]), x2 = h2(x2, O2, T2, C2, S2, 14, a2[18]), C2 = h2(C2, x2, O2, T2, o3, 20, a2[19]), T2 = h2(T2, C2, x2, O2, m2, 5, a2[20]), O2 = h2(O2, T2, C2, x2, I2, 9, a2[21]), x2 = h2(x2, O2, T2, C2, P2, 14, a2[22]), C2 = h2(C2, x2, O2, T2, g2, 20, a2[23]), T2 = h2(T2, C2, x2, O2, v2, 5, a2[24]), O2 = h2(O2, T2, C2, x2, A2, 9, a2[25]), x2 = h2(x2, O2, T2, C2, f2, 14, a2[26]), C2 = h2(C2, x2, O2, T2, w2, 20, a2[27]), T2 = h2(T2, C2, x2, O2, k2, 5, a2[28]), O2 = h2(O2, T2, C2, x2, p2, 9, a2[29]), x2 = h2(x2, O2, T2, C2, _2, 14, a2[30]), T2 = l2(T2, C2 = h2(C2, x2, O2, T2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = l2(O2, T2, C2, x2, w2, 11, a2[33]), x2 = l2(x2, O2, T2, C2, S2, 16, a2[34]), C2 = l2(C2, x2, O2, T2, A2, 23, a2[35]), T2 = l2(T2, C2, x2, O2, c3, 4, a2[36]), O2 = l2(O2, T2, C2, x2, g2, 11, a2[37]), x2 = l2(x2, O2, T2, C2, _2, 16, a2[38]), C2 = l2(C2, x2, O2, T2, I2, 23, a2[39]), T2 = l2(T2, C2, x2, O2, k2, 4, a2[40]), O2 = l2(O2, T2, C2, x2, o3, 11, a2[41]), x2 = l2(x2, O2, T2, C2, f2, 16, a2[42]), C2 = l2(C2, x2, O2, T2, y2, 23, a2[43]), T2 = l2(T2, C2, x2, O2, v2, 4, a2[44]), O2 = l2(O2, T2, C2, x2, b2, 11, a2[45]), x2 = l2(x2, O2, T2, C2, P2, 16, a2[46]), T2 = d2(T2, C2 = l2(C2, x2, O2, T2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, T2, C2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, T2, C2, A2, 15, a2[50]), C2 = d2(C2, x2, O2, T2, m2, 21, a2[51]), T2 = d2(T2, C2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, T2, C2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, T2, C2, I2, 15, a2[54]), C2 = d2(C2, x2, O2, T2, c3, 21, a2[55]), T2 = d2(T2, C2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, T2, C2, x2, P2, 10, a2[57]), x2 = d2(x2, O2, T2, C2, y2, 15, a2[58]), C2 = d2(C2, x2, O2, T2, k2, 21, a2[59]), T2 = d2(T2, C2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, T2, C2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, T2, C2, p2, 15, a2[62]), C2 = d2(C2, x2, O2, T2, v2, 21, a2[63]), i3[0] = i3[0] + T2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var i3 = e3.floor(s3 / 4294967296), o3 = s3;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var h3 = c3[u3];
        c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function h2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function l2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function d2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, void function() {
    var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
    e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
      e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
      var n3 = e4.blockSize, r2 = 4 * n3;
      t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
      for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
        a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
      i2.sigBytes = o2.sigBytes = r2, this.reset();
    }, reset: function() {
      var e4 = this._hasher;
      e4.reset(), e4.update(this._iKey);
    }, update: function(e4) {
      return this._hasher.update(e4), this;
    }, finalize: function(e4) {
      var t4 = this._hasher, n3 = t4.finalize(e4);
      return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
    } });
  }());
}), n(function(e2, t2) {
  e2.exports = r.HmacMD5;
})), o = n(function(e2, t2) {
  e2.exports = r.enc.Utf8;
}), a = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function() {
    var e3 = n2, t3 = e3.lib.WordArray;
    function s2(e4, n3, s3) {
      for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
        if (o2 % 4) {
          var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
          r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
        }
      return t3.create(r2, i2);
    }
    e3.enc.Base64 = { stringify: function(e4) {
      var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
      e4.clamp();
      for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
        for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
          r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
      var c2 = s3.charAt(64);
      if (c2)
        for (; r2.length % 4; )
          r2.push(c2);
      return r2.join("");
    }, parse: function(e4) {
      var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
      if (!r2) {
        r2 = this._reverseMap = [];
        for (var i2 = 0; i2 < n3.length; i2++)
          r2[n3.charCodeAt(i2)] = i2;
      }
      var o2 = n3.charAt(64);
      if (o2) {
        var a2 = e4.indexOf(o2);
        -1 !== a2 && (t4 = a2);
      }
      return s2(e4, t4, r2);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
  }(), n2.enc.Base64);
});
const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
function f(e2) {
  return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
}
function g(e2) {
  return "object" === f(e2);
}
function m(e2) {
  return "function" == typeof e2;
}
function y(e2) {
  return function() {
    try {
      return e2.apply(e2, arguments);
    } catch (e3) {
      console.error(e3);
    }
  };
}
const _ = "REJECTED", w = "NOT_PENDING";
class v {
  constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
    this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
  }
  get needRetry() {
    if (!this.status)
      return true;
    switch (this.retryRule) {
      case _:
        return this.status === p;
      case w:
        return this.status !== l;
    }
  }
  exec() {
    return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
  }
}
function I(e2) {
  return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
}
const S = true, b = "mp-weixin", A = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), P = b, T = I(""), C = I("[]") || [];
let O = "";
try {
  O = "__UNI__0BFD040";
} catch (e2) {
}
let E = {};
function L(e2, t2 = {}) {
  var n2, s2;
  return n2 = E, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (E[e2] = t2), E[e2];
}
const R = ["invoke", "success", "fail", "complete"], U = L("_globalUniCloudInterceptor");
function N(e2, t2) {
  U[e2] || (U[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
    R.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s2 = U[e3][t3];
      s2 || (s2 = U[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
    }(e2, n2, t2[n2]);
  });
}
function D(e2, t2) {
  U[e2] || (U[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
    R.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s2 = U[e3][t3];
      if (!s2)
        return;
      const r2 = s2.indexOf(n3);
      r2 > -1 && s2.splice(r2, 1);
    }(e2, n2, t2[n2]);
  }) : delete U[e2];
}
function M(e2, t2) {
  return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function q(e2, t2) {
  return U[e2] && U[e2][t2] || [];
}
function F(e2) {
  N("callObject", e2);
}
const K = L("_globalUniCloudListener"), j = "response", $ = "needLogin", B = "refreshToken", W = "clientdb", H = "cloudfunction", z = "cloudobject";
function J(e2) {
  return K[e2] || (K[e2] = []), K[e2];
}
function G(e2, t2) {
  const n2 = J(e2);
  n2.includes(t2) || n2.push(t2);
}
function V(e2, t2) {
  const n2 = J(e2), s2 = n2.indexOf(t2);
  -1 !== s2 && n2.splice(s2, 1);
}
function Y(e2, t2) {
  const n2 = J(e2);
  for (let e3 = 0; e3 < n2.length; e3++) {
    (0, n2[e3])(t2);
  }
}
let Q, X = false;
function Z() {
  return Q || (Q = new Promise((e2) => {
    X && e2(), function t2() {
      if ("function" == typeof getCurrentPages) {
        const t3 = getCurrentPages();
        t3 && t3[0] && (X = true, e2());
      }
      X || setTimeout(() => {
        t2();
      }, 30);
    }();
  }), Q);
}
function ee(e2) {
  const t2 = {};
  for (const n2 in e2) {
    const s2 = e2[n2];
    m(s2) && (t2[n2] = y(s2));
  }
  return t2;
}
class te extends Error {
  constructor(e2) {
    super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
  }
  toJson(e2 = 0) {
    if (!(e2 >= 10))
      return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
  }
}
var ne = { request: (e2) => index.request(e2), uploadFile: (e2) => index.uploadFile(e2), setStorageSync: (e2, t2) => index.setStorageSync(e2, t2), getStorageSync: (e2) => index.getStorageSync(e2), removeStorageSync: (e2) => index.removeStorageSync(e2), clearStorageSync: () => index.clearStorageSync() };
function se(e2) {
  return e2 && se(e2.__v_raw) || e2;
}
function re() {
  return { token: ne.getStorageSync("uni_id_token") || ne.getStorageSync("uniIdToken"), tokenExpired: ne.getStorageSync("uni_id_token_expired") };
}
function ie({ token: e2, tokenExpired: t2 } = {}) {
  e2 && ne.setStorageSync("uni_id_token", e2), t2 && ne.setStorageSync("uni_id_token_expired", t2);
}
let oe, ae;
function ce() {
  return oe || (oe = index.getSystemInfoSync()), oe;
}
function ue() {
  let e2, t2;
  try {
    if (index.getLaunchOptionsSync) {
      if (index.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
        return;
      const { scene: n2, channel: s2 } = index.getLaunchOptionsSync();
      e2 = s2, t2 = n2;
    }
  } catch (e3) {
  }
  return { channel: e2, scene: t2 };
}
function he() {
  const e2 = index.getLocale && index.getLocale() || "en";
  if (ae)
    return { ...ae, locale: e2, LOCALE: e2 };
  const t2 = ce(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
  for (let e3 = 0; e3 < o2.length; e3++) {
    delete t2[o2[e3]];
  }
  return ae = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...ue(), ...t2 }, { ...ae, locale: e2, LOCALE: e2 };
}
var le = { sign: function(e2, t2) {
  let n2 = "";
  return Object.keys(e2).sort().forEach(function(t3) {
    e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
  }), n2 = n2.slice(1), i(n2, t2).toString();
}, wrappedRequest: function(e2, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e2, { complete(e3) {
      e3 || (e3 = {});
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400) {
        const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
        return s2(new te({ code: n3, message: r3, requestId: t3 }));
      }
      const r2 = e3.data;
      if (r2.error)
        return s2(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
}, toBase64: function(e2) {
  return a.stringify(o.parse(e2));
} };
var de = class {
  constructor(e2) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
      if (!e3.result || !e3.result.accessToken)
        throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
      this.setAccessToken(e3.result.accessToken);
    }), retryRule: w });
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e2) {
    this.accessToken = e2;
  }
  requestWrapped(e2) {
    return le.wrappedRequest(e2, this.adapter.request);
  }
  requestAuth(e2) {
    return this.requestWrapped(e2);
  }
  request(e2, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
      !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e2);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e2);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e2) {
    const t2 = Object.assign({}, e2);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = le.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = le.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    return this._getAccessTokenPromiseHub.exec();
  }
  async authorize() {
    await this.getAccessToken();
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request(this.setupRequest(t2));
  }
  getOSSUploadOptionsFromPath(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
    if ("string" !== f(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const o2 = i2 && i2.envType || this.config.envType;
    if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
      throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
    const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
    if (u2 && (_2["x-oss-security-token"] = u2), y2) {
      const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
      _2.callback = le.toBase64(e3);
    }
    const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
    if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
      return { success: true, filePath: e2, fileID: c2 };
    if ((await this.reportOSSUpload({ id: g2 })).success)
      return { success: true, filePath: e2, fileID: c2 };
    throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
  }
  getTempFileURL({ fileList: e2 } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e2) && 0 !== e2.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
  async getFileInfo({ fileList: e2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
    return { fileList: (await this.request(this.setupRequest(t2))).result };
  }
};
var pe = { init(e2) {
  const t2 = new de(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const fe = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var ge;
!function(e2) {
  e2.local = "local", e2.none = "none", e2.session = "session";
}(ge || (ge = {}));
var me = function() {
}, ye = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
    !function() {
      function t4(t5) {
        for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
          if (!(t5 % s4))
            return false;
        return true;
      }
      function n3(e4) {
        return 4294967296 * (e4 - (0 | e4)) | 0;
      }
      for (var s3 = 2, r3 = 0; r3 < 64; )
        t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
    }();
    var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
      this._hash = new r2.init(a2.slice(0));
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
        if (p2 < 16)
          u2[p2] = 0 | e4[t4 + p2];
        else {
          var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
          u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
        }
        var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
        d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
      }
      n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
  }(Math), n2.SHA256);
}), _e = ye, we = n(function(e2, t2) {
  e2.exports = r.HmacSHA256;
});
const ve = () => {
  let e2;
  if (!Promise) {
    e2 = () => {
    }, e2.promise = {};
    const t3 = () => {
      throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
    };
    return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
  }
  const t2 = new Promise((t3, n2) => {
    e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
  });
  return e2.promise = t2, e2;
};
function Ie(e2) {
  return void 0 === e2;
}
function Se(e2) {
  return "[object Null]" === Object.prototype.toString.call(e2);
}
var be;
function ke(e2) {
  const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
  var n2;
  for (const e3 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e2) {
  e2.WEB = "web", e2.WX_MP = "wx_mp";
}(be || (be = {}));
const Ae = { adapter: null, runtime: void 0 }, Pe = ["anonymousUuidKey"];
class Te extends me {
  constructor() {
    super(), Ae.adapter.root.tcbObject || (Ae.adapter.root.tcbObject = {});
  }
  setItem(e2, t2) {
    Ae.adapter.root.tcbObject[e2] = t2;
  }
  getItem(e2) {
    return Ae.adapter.root.tcbObject[e2];
  }
  removeItem(e2) {
    delete Ae.adapter.root.tcbObject[e2];
  }
  clear() {
    delete Ae.adapter.root.tcbObject;
  }
}
function Ce(e2, t2) {
  switch (e2) {
    case "local":
      return t2.localStorage || new Te();
    case "none":
      return new Te();
    default:
      return t2.sessionStorage || new Te();
  }
}
class xe {
  constructor(e2) {
    if (!this._storage) {
      this._persistence = Ae.adapter.primaryStorage || e2.persistence, this._storage = Ce(this._persistence, Ae.adapter);
      const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = `user_info_${e2.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
    }
  }
  updatePersistence(e2) {
    if (e2 === this._persistence)
      return;
    const t2 = "local" === this._persistence;
    this._persistence = e2;
    const n2 = Ce(e2, Ae.adapter);
    for (const e3 in this.keys) {
      const s2 = this.keys[e3];
      if (t2 && Pe.includes(e3))
        continue;
      const r2 = this._storage.getItem(s2);
      Ie(r2) || Se(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e2, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e2, r2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e2, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e2);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e2) {
    this._storage.removeItem(e2);
  }
}
const Oe = {}, Ee = {};
function Le(e2) {
  return Oe[e2];
}
class Re {
  constructor(e2, t2) {
    this.data = t2 || null, this.name = e2;
  }
}
class Ue extends Re {
  constructor(e2, t2) {
    super("error", { error: e2, data: t2 }), this.error = e2;
  }
}
const Ne = new class {
  constructor() {
    this._listeners = {};
  }
  on(e2, t2) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e2, t2, this._listeners), this;
  }
  off(e2, t2) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s2 = n2[e3].indexOf(t3);
        -1 !== s2 && n2[e3].splice(s2, 1);
      }
    }(e2, t2, this._listeners), this;
  }
  fire(e2, t2) {
    if (e2 instanceof Ue)
      return console.error(e2.error), this;
    const n2 = "string" == typeof e2 ? new Re(e2, t2 || {}) : e2;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e2) {
    return this._listeners[e2] && this._listeners[e2].length > 0;
  }
}();
function De(e2, t2) {
  Ne.on(e2, t2);
}
function Me(e2, t2 = {}) {
  Ne.fire(e2, t2);
}
function qe(e2, t2) {
  Ne.off(e2, t2);
}
const Fe = "loginStateChanged", Ke = "loginStateExpire", je = "loginTypeChanged", $e = "anonymousConverted", Be = "refreshAccessToken";
var We;
!function(e2) {
  e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
}(We || (We = {}));
const He = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], ze = { "X-SDK-Version": "1.3.5" };
function Je(e2, t2, n2) {
  const s2 = e2[t2];
  e2[t2] = function(t3) {
    const r2 = {}, i2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: o3 } = n3.call(e2, t3);
      Object.assign(r2, s3), Object.assign(i2, o3);
    });
    const o2 = t3.data;
    return o2 && (() => {
      var e3;
      if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
        t3.data = { ...o2, ...r2 };
      else
        for (const e4 in r2)
          o2.append(e4, r2[e4]);
    })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
  };
}
function Ge() {
  const e2 = Math.random().toString(16).slice(2);
  return { data: { seqId: e2 }, headers: { ...ze, "x-seqid": e2 } };
}
class Ve {
  constructor(e2 = {}) {
    var t2;
    this.config = e2, this._reqClass = new Ae.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Le(this.config.env), this._localCache = (t2 = this.config.env, Ee[t2]), Je(this._reqClass, "post", [Ge]), Je(this._reqClass, "upload", [Ge]), Je(this._reqClass, "download", [Ge]);
  }
  async post(e2) {
    return await this._reqClass.post(e2);
  }
  async upload(e2) {
    return await this._reqClass.upload(e2);
  }
  async download(e2) {
    return await this._reqClass.download(e2);
  }
  async refreshAccessToken() {
    let e2, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e2 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t2 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e2;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e2), this._cache.removeStore(t2);
    let i2 = this._cache.getStore(n2);
    if (!i2)
      throw new te({ message: "未登录CloudBase" });
    const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
    if (a2.data.code) {
      const { code: e3 } = a2.data;
      if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
        if (this._cache.getStore(s2) === We.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
          const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        Me(Ke), this._cache.removeStore(n2);
      }
      throw new te({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
    }
    if (a2.data.access_token)
      return Me(Be), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new te({ message: "refresh token不存在，登录状态异常" });
    let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
  }
  async request(e2, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
    if (-1 === He.indexOf(e2)) {
      const { refreshTokenKey: e3 } = this._cache.keys;
      this._cache.getStore(e3) && (i2.access_token = (await this.getAccessToken()).accessToken);
    }
    let o2;
    if ("storage.uploadFile" === e2) {
      o2 = new FormData();
      for (let e3 in o2)
        o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", o2 = {};
      for (let e3 in i2)
        void 0 !== i2[e3] && (o2[e3] = i2[e3]);
    }
    let a2 = { headers: { "content-type": r2 } };
    n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: h2, search: l2 } = t2;
    let d2 = { env: this.config.env };
    u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
    let p2 = function(e3, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let r3 = "";
      for (let e4 in n3)
        "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
    }(fe, "//tcb-api.tencentcloudapi.com/web", d2);
    l2 && (p2 += l2);
    const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
    if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
      throw new te({ code: "NETWORK_ERROR", message: "network request error" });
    return f2;
  }
  async send(e2, t2 = {}) {
    const n2 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
    if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === He.indexOf(e2)) {
      await this.refreshAccessToken();
      const n3 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
      if (n3.data.code)
        throw new te({ code: n3.data.code, message: n3.data.message });
      return n3.data;
    }
    if (n2.data.code)
      throw new te({ code: n2.data.code, message: n2.data.message });
    return n2.data;
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
}
const Ye = {};
function Qe(e2) {
  return Ye[e2];
}
class Xe {
  constructor(e2) {
    this.config = e2, this._cache = Le(e2.env), this._request = Qe(e2.env);
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
  setAccessToken(e2, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2);
  }
}
class Ze {
  constructor(e2) {
    if (!e2)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._envId = e2, this._cache = Le(this._envId), this._request = Qe(this._envId), this.setUserInfo();
  }
  linkWithTicket(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
    return this._request.send("auth.linkWithTicket", { ticket: e2 });
  }
  linkWithRedirect(e2) {
    e2.signInWithRedirect();
  }
  updatePassword(e2, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
  }
  updateEmail(e2) {
    return this._request.send("auth.updateEmail", { newEmail: e2 });
  }
  updateUsername(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    return this._request.send("auth.updateUsername", { username: e2 });
  }
  async getLinkedUidList() {
    const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e2;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e2) {
    return this._request.send("auth.setPrimaryUid", { uid: e2 });
  }
  unlink(e2) {
    return this._request.send("auth.unlink", { platform: e2 });
  }
  async update(e2) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setUserInfo() {
    const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t2[e3];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2), this.setUserInfo();
  }
}
class et {
  constructor(e2) {
    if (!e2)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._cache = Le(e2);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
    this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ze(e2);
  }
  get isAnonymousAuth() {
    return this.loginType === We.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === We.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === We.WECHAT || this.loginType === We.WECHAT_OPEN || this.loginType === We.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class tt extends Xe {
  async signIn() {
    this._cache.updatePersistence("local");
    const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
    if (r2.uuid && r2.refresh_token) {
      this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Me(Fe), Me(je, { env: this.config.env, loginType: We.ANONYMOUS, persistence: "local" });
      const e3 = new et(this.config.env);
      return await e3.user.refresh(), e3;
    }
    throw new te({ message: "匿名登录失败" });
  }
  async linkAndRetrieveDataWithTicket(e2) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
    if (i2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Me($e, { env: this.config.env }), Me(je, { loginType: We.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
    throw new te({ message: "匿名转化失败" });
  }
  _setAnonymousUUID(e2) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, We.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class nt extends Xe {
  async signIn(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Me(Fe), Me(je, { env: this.config.env, loginType: We.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new et(this.config.env);
    throw new te({ message: "自定义登录失败" });
  }
}
class st extends Xe {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Me(Fe), Me(je, { env: this.config.env, loginType: We.EMAIL, persistence: this.config.persistence }), new et(this.config.env);
    throw s2.code ? new te({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new te({ message: "邮箱登录失败" });
  }
  async activate(e2) {
    return this._request.send("auth.activateEndUserMail", { token: e2 });
  }
  async resetPasswordWithToken(e2, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
  }
}
class rt extends Xe {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: We.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Me(Fe), Me(je, { env: this.config.env, loginType: We.USERNAME, persistence: this.config.persistence }), new et(this.config.env);
    throw s2.code ? new te({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new te({ message: "用户名密码登录失败" });
  }
}
class it {
  constructor(e2) {
    this.config = e2, this._cache = Le(e2.env), this._request = Qe(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), De(je, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e2 = this.hasLoginState();
    return e2 && e2.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new tt(this.config);
  }
  customAuthProvider() {
    return new nt(this.config);
  }
  emailAuthProvider() {
    return new st(this.config);
  }
  usernameAuthProvider() {
    return new rt(this.config);
  }
  async signInAnonymously() {
    return new tt(this.config).signIn();
  }
  async signInWithEmailAndPassword(e2, t2) {
    return new st(this.config).signIn(e2, t2);
  }
  signInWithUsernameAndPassword(e2, t2) {
    return new rt(this.config).signIn(e2, t2);
  }
  async linkAndRetrieveDataWithTicket(e2) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new tt(this.config)), De($e, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
  }
  async signOut() {
    if (this.loginType === We.ANONYMOUS)
      throw new te({ message: "匿名用户不支持登出操作" });
    const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
    if (!s2)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), Me(Fe), Me(je, { env: this.config.env, loginType: We.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e2, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
  }
  async sendPasswordResetEmail(e2) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
  }
  onLoginStateChanged(e2) {
    De(Fe, () => {
      const t3 = this.hasLoginState();
      e2.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e2.call(this, t2);
  }
  onLoginStateExpired(e2) {
    De(Ke, e2.bind(this));
  }
  onAccessTokenRefreshed(e2) {
    De(Be, e2.bind(this));
  }
  onAnonymousConverted(e2) {
    De($e, e2.bind(this));
  }
  onLoginTypeChanged(e2) {
    De(je, () => {
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { refreshTokenKey: e2 } = this._cache.keys;
    return this._cache.getStore(e2) ? new et(this.config.env) : null;
  }
  async isUsernameRegistered(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e2) {
    return new nt(this.config).signIn(e2);
  }
  shouldRefreshAccessToken(e2) {
    this._request._shouldRefreshAccessTokenHook = e2.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
  }
  getAuthHeader() {
    const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e2) {
    const { env: t2 } = e2.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e2) {
    const { loginType: t2, persistence: n2, env: s2 } = e2.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const ot = function(e2, t2) {
  t2 = t2 || ve();
  const n2 = Qe(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
      201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
    }).catch((e4) => {
      t2(e4);
    });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, at = function(e2, t2) {
  t2 = t2 || ve();
  const n2 = Qe(this.config.env), { cloudPath: s2 } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    t2(null, e3);
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ct = function({ fileList: e2 }, t2) {
  if (t2 = t2 || ve(), !e2 || !Array.isArray(e2))
    return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
  for (let t3 of e2)
    if (!t3 || "string" != typeof t3)
      return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
  const n2 = { fileid_list: e2 };
  return Qe(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ut = function({ fileList: e2 }, t2) {
  t2 = t2 || ve(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
  let n2 = [];
  for (let s3 of e2)
    "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
  const s2 = { file_list: n2 };
  return Qe(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ht = async function({ fileID: e2 }, t2) {
  const n2 = (await ut.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
  if ("SUCCESS" !== n2.code)
    return t2 ? t2(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s2 = Qe(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t2)
    return s2.download({ url: r2 });
  t2(await s2.download({ url: r2 }));
}, lt = function({ name: e2, data: t2, query: n2, parse: s2, search: r2 }, i2) {
  const o2 = i2 || ve();
  let a2;
  try {
    a2 = t2 ? JSON.stringify(t2) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e2)
    return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
  const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: a2 };
  return Qe(this.config.env).send("functions.invokeFunction", c2).then((e3) => {
    if (e3.code)
      o2(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s2)
        o2(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), o2(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          o2(new te({ message: "response data must be json" }));
        }
    }
    return o2.promise;
  }).catch((e3) => {
    o2(e3);
  }), o2.promise;
}, dt = { timeout: 15e3, persistence: "session" }, pt = {};
class ft {
  constructor(e2) {
    this.config = e2 || this.config, this.authObj = void 0;
  }
  init(e2) {
    switch (Ae.adapter || (this.requestClient = new Ae.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...dt, ...e2 }, true) {
      case this.config.timeout > 6e5:
        console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
        break;
      case this.config.timeout < 100:
        console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
    }
    return new ft(this.config);
  }
  auth({ persistence: e2 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e2 || Ae.adapter.primaryStorage || dt.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
      const { env: t3 } = e3;
      Oe[t3] = new xe(e3), Ee[t3] = new xe({ ...e3, persistence: "local" });
    }(this.config), n2 = this.config, Ye[n2.env] = new Ve(n2), this.authObj = new it(this.config), this.authObj;
  }
  on(e2, t2) {
    return De.apply(this, [e2, t2]);
  }
  off(e2, t2) {
    return qe.apply(this, [e2, t2]);
  }
  callFunction(e2, t2) {
    return lt.apply(this, [e2, t2]);
  }
  deleteFile(e2, t2) {
    return ct.apply(this, [e2, t2]);
  }
  getTempFileURL(e2, t2) {
    return ut.apply(this, [e2, t2]);
  }
  downloadFile(e2, t2) {
    return ht.apply(this, [e2, t2]);
  }
  uploadFile(e2, t2) {
    return ot.apply(this, [e2, t2]);
  }
  getUploadMetadata(e2, t2) {
    return at.apply(this, [e2, t2]);
  }
  registerExtension(e2) {
    pt[e2.name] = e2;
  }
  async invokeExtension(e2, t2) {
    const n2 = pt[e2];
    if (!n2)
      throw new te({ message: `扩展${e2} 必须先注册` });
    return await n2.invoke(t2, this);
  }
  useAdapters(e2) {
    const { adapter: t2, runtime: n2 } = ke(e2) || {};
    t2 && (Ae.adapter = t2), n2 && (Ae.runtime = n2);
  }
}
var gt = new ft();
function mt(e2, t2, n2) {
  void 0 === n2 && (n2 = {});
  var s2 = /\?/.test(t2), r2 = "";
  for (var i2 in n2)
    "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
  return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
}
class yt {
  post(e2) {
    const { url: t2, data: n2, headers: s2 } = e2;
    return new Promise((e3, r2) => {
      ne.request({ url: mt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
        e3(t3);
      }, fail(e4) {
        r2(e4);
      } });
    });
  }
  upload(e2) {
    return new Promise((t2, n2) => {
      const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = ne.uploadFile({ url: mt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
      }, fail(e3) {
        n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
        e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const _t = { setItem(e2, t2) {
  ne.setStorageSync(e2, t2);
}, getItem: (e2) => ne.getStorageSync(e2), removeItem(e2) {
  ne.removeStorageSync(e2);
}, clear() {
  ne.clearStorageSync();
} };
var wt = { genAdapter: function() {
  return { root: {}, reqClass: yt, localStorage: _t, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
gt.useAdapters(wt);
const vt = gt, It = vt.init;
vt.init = function(e2) {
  e2.env = e2.spaceId;
  const t2 = It.call(this, e2);
  t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      var n3;
      t3[e4] = (n3 = t3[e4], function(e5) {
        e5 = e5 || {};
        const { success: t4, fail: s2, complete: r2 } = ee(e5);
        if (!(t4 || s2 || r2))
          return n3.call(this, e5);
        n3.call(this, e5).then((e6) => {
          t4 && t4(e6), r2 && r2(e6);
        }, (e6) => {
          s2 && s2(e6), r2 && r2(e6);
        });
      }).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var St = vt;
var bt = class extends de {
  getAccessToken() {
    return new Promise((e2, t2) => {
      const n2 = "Anonymous_Access_token";
      this.setAccessToken(n2), e2(n2);
    });
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = le.sign(n2, this.config.clientSecret);
    const r2 = he();
    s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
    const { token: i2 } = re();
    return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
    let r2;
    return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
      const { url: i2, formData: o2, name: a2 } = t3.result;
      r2 = t3.result.fileUrl;
      const c2 = { url: i2, formData: o2, name: a2, filePath: e2, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2)).then((e3) => {
      if (e3.success)
        return e3.result;
      throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
    });
  }
  getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
    return this.request(this.setupRequest(n2)).then((e3) => {
      if (e3.success)
        return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
      throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
    });
  }
};
var kt = { init(e2) {
  const t2 = new bt(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} }, At = n(function(e2, t2) {
  e2.exports = r.enc.Hex;
});
function Pt(e2 = "", t2 = {}) {
  const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = Date.now(), u2 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e3) {
    var t3 = 16 * Math.random() | 0;
    return ("x" === e3 ? t3 : 3 & t3 | 8).toString(16);
  }), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
    const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = _e(e3.body).toString(At), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = _e(r3).toString(At), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = we(o3, e3.secretKey).toString(At);
    return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
  }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
  return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
}
function Tt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {} }) {
  return new Promise((r2, i2) => {
    ne.request({ url: e2, method: n2, data: t2, header: s2, dataType: "json", complete: (e3 = {}) => {
      const t3 = s2["x-trace-id"] || "";
      if (!e3.statusCode || e3.statusCode >= 400) {
        const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
        return i2(new te({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
      }
      r2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
    } });
  });
}
function Ct(e2, t2) {
  const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Pt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
  return Tt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
    const t3 = e3.data || {};
    if (!t3.success)
      throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    return t3.data || {};
  }).catch((e3) => {
    throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
  });
}
function xt(e2 = "") {
  const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
  if (n2 <= 0)
    throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
  const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
  return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
}
function Ot(e2 = "") {
  return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
}
var Et = class {
  constructor(e2) {
    if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), e2.endpoint) {
      if ("string" != typeof e2.endpoint)
        throw new Error("endpoint must be string");
      if (!/^https:\/\//.test(e2.endpoint))
        throw new Error("endpoint must start with https://");
      e2.endpoint = e2.endpoint.replace(/\/$/, "");
    }
    this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn` });
  }
  callFunction(e2) {
    return function(e3, t2) {
      const { name: n2, data: s2 } = e3, r2 = "POST", { url: i2, headers: o2 } = Pt("/functions/invokeFunction", { functionName: n2, data: s2, method: r2, headers: { "x-to-function-name": n2 }, signHeaderKeys: ["x-to-function-name"], config: t2 });
      return Tt({ url: i2, data: s2, method: r2, headers: o2 }).then((e4) => ({ errCode: 0, success: true, requestId: e4.requestId, result: e4.data })).catch((e4) => {
        throw new te({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
      });
    }(e2, this.config);
  }
  uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
    return new Promise((i2, o2) => {
      const a2 = ne.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        o2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
        r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
    if ("string" !== f(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const r2 = await Ct({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
    return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
  }
  async getTempFileURL({ fileList: e2 }) {
    return new Promise((t2, n2) => {
      (!e2 || e2.length < 0) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList不能为空数组" })), e2.length > 50 && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList数组长度不能超过50" }));
      const s2 = [];
      for (const t3 of e2) {
        "string" !== f(t3) && n2(new te({ errCode: "INVALID_PARAM", errMsg: "fileList的元素必须是非空的字符串" }));
        const e3 = xt.call(this, t3);
        s2.push({ file_id: e3, expire: 600 });
      }
      Ct({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
        const { file_list: n3 = [] } = e3;
        t2({ fileList: n3.map((e4) => ({ fileID: Ot.call(this, e4.file_id), tempFileURL: e4.download_url })) });
      }).catch((e3) => n2(e3));
    });
  }
};
var Lt = { init: (e2) => {
  e2.provider = "alipay";
  const t2 = new Et(e2);
  return t2.auth = function() {
    return { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(true);
    } };
  }, t2;
} };
function Rt({ data: e2 }) {
  let t2;
  t2 = he();
  const n2 = JSON.parse(JSON.stringify(e2 || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e3 } = re();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
async function Ut({ name: e2, data: t2 } = {}) {
  await this.__dev__.initLocalNetwork();
  const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e2}`;
  return new Promise((t3, n3) => {
    ne.request({ method: "POST", url: o2, data: { name: e2, platform: P, provider: r2, spaceId: i2 }, timeout: 3e3, success(e3) {
      t3(e3);
    }, fail() {
      t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
    } });
  }).then(({ data: e3 } = {}) => {
    const { code: t3, message: n3 } = e3 || {};
    return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
  }).then(({ code: n3, message: s3 }) => {
    if (0 !== n3) {
      switch (n3) {
        case "MODULE_ENCRYPTED":
          console.error(`此云函数（${e2}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "FUNCTION_ENCRYPTED":
          console.error(`此云函数（${e2}）已加密不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "ACTION_ENCRYPTED":
          console.error(s3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
          break;
        case "NETWORK_ERROR": {
          const e3 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
          throw console.error(e3), new Error(e3);
        }
        case "SWITCH_TO_CLOUD":
          break;
        default: {
          const e3 = `检测本地调试服务出现错误：${s3}，请检查网络环境或重启客户端再试`;
          throw console.error(e3), new Error(e3);
        }
      }
      return this._callCloudFunction({ name: e2, data: t2 });
    }
    return new Promise((e3, n4) => {
      const s4 = Rt.call(this, { data: t2 });
      ne.request({ method: "POST", url: a2, data: { provider: r2, platform: P, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new te({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e3({ result: s5 }), fail(e4) {
        n4(new te({ code: e4.code || e4.errCode || "SYS_ERR", message: e4.message || e4.errMsg || "request:fail" }));
      } });
    });
  });
}
const Nt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
var Dt = /[\\^$.*+?()[\]{}|]/g, Mt = RegExp(Dt.source);
function qt(e2, t2, n2) {
  return e2.replace(new RegExp((s2 = t2) && Mt.test(s2) ? s2.replace(Dt, "\\$&") : s2, "g"), n2);
  var s2;
}
const Kt = "request", jt = "response", $t = "both";
const An = { code: 2e4, message: "System error" }, Pn = { code: 20101, message: "Invalid client" };
function xn(e2) {
  const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
  return new te({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || An.code, message: r2 || o2, cause: a2 });
}
let En;
function Dn({ secretType: e2 } = {}) {
  return e2 === Kt || e2 === jt || e2 === $t;
}
function Mn({ name: e2, data: t2 = {} } = {}) {
  return "app" === P;
}
function qn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
  const { appId: s2, uniPlatform: r2, osName: i2 } = ce();
  let o2 = r2;
  "app" === r2 && (o2 = i2);
  const a2 = function({ provider: e3, spaceId: t3 } = {}) {
    const n3 = A;
    if (!n3)
      return {};
    e3 = /* @__PURE__ */ function(e4) {
      return "tencent" === e4 ? "tcb" : e4;
    }(e3);
    const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
    return s3 && s3.config;
  }({ provider: e2, spaceId: t2 });
  if (!a2 || !a2.accessControl || !a2.accessControl.enable)
    return false;
  const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
  if (0 === u2.length)
    return true;
  const h2 = function(e3, t3) {
    let n3, s3, r3;
    for (let i3 = 0; i3 < e3.length; i3++) {
      const o3 = e3[i3];
      o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
    }
    return n3 || s3 || r3;
  }(u2, n2);
  if (!h2)
    return false;
  if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
    return true;
  throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), xn(Pn);
}
function Fn({ functionName: e2, result: t2, logPvd: n2 }) {
  if (this.__dev__.debugLog && t2 && t2.requestId) {
    const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
    console.log(`[${n2}-request]${s2}[/${n2}-request]`);
  }
}
function Kn(e2) {
  const t2 = e2.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = Rt.call(e2, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay" }[this.config.provider], i2 = Dn(n3), o2 = Mn(n3), a2 = i2 || o2;
    return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Fn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Fn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
        if (!a3)
          continue;
        let c2 = i3;
        for (let e5 = 1; e5 < a3.length; e5++)
          c2 = qt(c2, `{$${e5}}`, a3[e5]);
        for (const e5 in t3)
          c2 = qt(c2, `{${e5}}`, t3[e5]);
        return "replace" === o3 ? c2 : e4 + c2;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: Nt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
  };
  e2.callFunction = function(t3) {
    const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
    let o2, a2;
    if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && C ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Ut), o2 = Ut) : o2 = n2, o2 = o2.bind(e2), Mn(t3))
      ;
    else if (function({ name: e3, data: t4 = {} }) {
      return "uni-id-co" === e3 && "secureNetworkHandshakeByWeixin" === t4.method;
    }(t3))
      a2 = o2.call(e2, t3);
    else if (Dn(t3)) {
      a2 = new En({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
    } else if (qn({ provider: s2, spaceId: r2, functionName: i2 })) {
      a2 = new En({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
    } else
      a2 = o2(t3);
    return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && (e3.result = new UTSJSONObject(e3.result)), e3));
  };
}
En = class {
  constructor() {
    throw xn({ message: `Platform ${P} is not enabled, please check whether secure network module is enabled in your manifest.json` });
  }
};
const jn = Symbol("CLIENT_DB_INTERNAL");
function $n(e2, t2) {
  return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = jn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
    if ("_uniClient" === n2)
      return null;
    if ("symbol" == typeof n2)
      return e3[n2];
    if (n2 in e3 || "string" != typeof n2) {
      const t3 = e3[n2];
      return "function" == typeof t3 ? t3.bind(e3) : t3;
    }
    return t2.get(e3, n2, s2);
  } });
}
function Bn(e2) {
  return { on: (t2, n2) => {
    e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
  }, off: (t2, n2) => {
    e2[t2] = e2[t2] || [];
    const s2 = e2[t2].indexOf(n2);
    -1 !== s2 && e2[t2].splice(s2, 1);
  } };
}
const Wn = ["db.Geo", "db.command", "command.aggregate"];
function Hn(e2, t2) {
  return Wn.indexOf(`${e2}.${t2}`) > -1;
}
function zn(e2) {
  switch (f(e2 = se(e2))) {
    case "array":
      return e2.map((e3) => zn(e3));
    case "object":
      return e2._internalType === jn || Object.keys(e2).forEach((t2) => {
        e2[t2] = zn(e2[t2]);
      }), e2;
    case "regexp":
      return { $regexp: { source: e2.source, flags: e2.flags } };
    case "date":
      return { $date: e2.toISOString() };
    default:
      return e2;
  }
}
function Jn(e2) {
  return e2 && e2.content && e2.content.$method;
}
class Gn {
  constructor(e2, t2, n2) {
    this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e2 = this;
    const t2 = [e2.content];
    for (; e2.prevStage; )
      e2 = e2.prevStage, t2.push(e2.content);
    return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: zn(e3.$param) })) };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  getAction() {
    const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
    return e2 && e2.$param && e2.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
  }
  get isAggregate() {
    let e2 = this;
    for (; e2; ) {
      const t2 = Jn(e2), n2 = Jn(e2.prevStage);
      if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isCommand() {
    let e2 = this;
    for (; e2; ) {
      if ("command" === Jn(e2))
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isAggregateCommand() {
    let e2 = this;
    for (; e2; ) {
      const t2 = Jn(e2), n2 = Jn(e2.prevStage);
      if ("aggregate" === t2 && "command" === n2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  getNextStageFn(e2) {
    const t2 = this;
    return function() {
      return Vn({ $method: e2, $param: zn(Array.from(arguments)) }, t2, t2._database);
    };
  }
  get count() {
    return this.isAggregate ? this.getNextStageFn("count") : function() {
      return this._send("count", Array.from(arguments));
    };
  }
  get remove() {
    return this.isCommand ? this.getNextStageFn("remove") : function() {
      return this._send("remove", Array.from(arguments));
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  get add() {
    return this.isCommand ? this.getNextStageFn("add") : function() {
      return this._send("add", Array.from(arguments));
    };
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  get set() {
    return this.isCommand ? this.getNextStageFn("set") : function() {
      throw new Error("JQL禁止使用set方法");
    };
  }
  _send(e2, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e2, $param: zn(t2) }), S) {
      const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
      t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
    }
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function Vn(e2, t2, n2) {
  return $n(new Gn(e2, t2, n2), { get(e3, t3) {
    let s2 = "db";
    return e3 && e3.content && (s2 = e3.content.$method), Hn(s2, t3) ? Vn({ $method: t3 }, e3, n2) : function() {
      return Vn({ $method: t3, $param: zn(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function Yn({ path: e2, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
  };
}
function Qn(e2, t2 = {}) {
  return $n(new e2(t2), { get: (e3, t3) => Hn("db", t3) ? Vn({ $method: t3 }, null, e3) : function() {
    return Vn({ $method: t3, $param: zn(Array.from(arguments)) }, null, e3);
  } });
}
class Xn extends class {
  constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
    this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = L("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Bn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Bn(this._dbCallBacks)), this.env = $n({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = $n({}, { get: (e3, t3) => Yn({ path: ["Geo"], method: t3 }) }), this.serverDate = Yn({ path: [], method: "serverDate" }), this.RegExp = Yn({ path: [], method: "RegExp" });
  }
  getCloudEnv(e2) {
    if ("string" != typeof e2 || !e2.trim())
      throw new Error("getCloudEnv参数错误");
    return { $env: e2.replace("$cloudEnv_", "") };
  }
  _callback(e2, t2) {
    const n2 = this._dbCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  _callbackAuth(e2, t2) {
    const n2 = this._authCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  multiSend() {
    const e2 = Array.from(arguments), t2 = e2.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
        throw new Error("multiSend只支持子命令内使用getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
  }
} {
  _parseResult(e2) {
    return this._isJQL ? e2.result : e2;
  }
  _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
    function r2(e3, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const r3 = s2[n3];
          r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
    function a2(e3) {
      return i2._callback("error", [e3]), M(q(o2, "fail"), e3).then(() => M(q(o2, "complete"), e3)).then(() => (r2(null, e3), Y(j, { type: W, content: e3 }), Promise.reject(e3)));
    }
    const c2 = M(q(o2, "invoke")), u2 = this._uniClient;
    return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
      if (u3)
        for (let e4 = 0; e4 < u3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console[t4] || console.log;
          let i3 = "[System Info]" + n4;
          s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
        }
      if (t3) {
        return a2(new te({ code: t3, message: n3, requestId: e3.requestId }));
      }
      e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ie({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(B, { token: s3, tokenExpired: c3 }));
      const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
      for (let t4 = 0; t4 < h2.length; t4++) {
        const { prop: n4, tips: s4 } = h2[t4];
        if (n4 in e3.result) {
          const t5 = e3.result[n4];
          Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
        }
      }
      return function(e4) {
        return M(q(o2, "success"), e4).then(() => M(q(o2, "complete"), e4)).then(() => {
          r2(e4, null);
          const t4 = i2._parseResult(e4);
          return Y(j, { type: W, content: t4 }), Promise.resolve(t4);
        });
      }(e3);
    }, (e3) => {
      /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
      return a2(new te({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
    });
  }
}
const Zn = "token无效，跳转登录页面", es = "token过期，跳转登录页面", ts = { TOKEN_INVALID_TOKEN_EXPIRED: es, TOKEN_INVALID_INVALID_CLIENTID: Zn, TOKEN_INVALID: Zn, TOKEN_INVALID_WRONG_TOKEN: Zn, TOKEN_INVALID_ANONYMOUS_USER: Zn }, ns = { "uni-id-token-expired": es, "uni-id-check-token-failed": Zn, "uni-id-token-not-exist": Zn, "uni-id-check-device-feature-failed": Zn };
function ss(e2, t2) {
  let n2 = "";
  return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
}
function rs(e2 = [], t2 = "") {
  const n2 = [], s2 = [];
  return e2.forEach((e3) => {
    true === e3.needLogin ? n2.push(ss(t2, e3.path)) : false === e3.needLogin && s2.push(ss(t2, e3.path));
  }), { needLoginPage: n2, notNeedLoginPage: s2 };
}
function is(e2) {
  return e2.split("?")[0].replace(/^\//, "");
}
function os() {
  return function(e2) {
    let t2 = e2 && e2.$page && e2.$page.fullPath || "";
    return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
  }(function() {
    const e2 = getCurrentPages();
    return e2[e2.length - 1];
  }());
}
function as() {
  return is(os());
}
function cs(e2 = "", t2 = {}) {
  if (!e2)
    return false;
  if (!(t2 && t2.list && t2.list.length))
    return false;
  const n2 = t2.list, s2 = is(e2);
  return n2.some((e3) => e3.pagePath === s2);
}
const us = !!e.uniIdRouter;
const { loginPage: hs, routerNeedLogin: ls, resToLogin: ds, needLoginPage: ps, notNeedLoginPage: fs, loginPageInTabBar: gs } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
  const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = rs(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
    const t3 = [], n3 = [];
    return e2.forEach((e3) => {
      const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = rs(r3, s3);
      t3.push(...i3), n3.push(...o3);
    }), { needLoginPage: t3, notNeedLoginPage: n3 };
  }(n2);
  return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: cs(i2, r2) };
}();
if (ps.indexOf(hs) > -1)
  throw new Error(`Login page [${hs}] should not be "needLogin", please check your pages.json`);
function ms(e2) {
  const t2 = as();
  if ("/" === e2.charAt(0))
    return e2;
  const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
  i2.pop();
  for (let e3 = 0; e3 < r2.length; e3++) {
    const t3 = r2[e3];
    ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
  }
  return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
}
function ys(e2) {
  const t2 = is(ms(e2));
  return !(fs.indexOf(t2) > -1) && (ps.indexOf(t2) > -1 || ls.some((t3) => function(e3, t4) {
    return new RegExp(t4).test(e3);
  }(e2, t3)));
}
function _s({ redirect: e2 }) {
  const t2 = is(e2), n2 = is(hs);
  return as() !== n2 && t2 !== n2;
}
function ws({ api: e2, redirect: t2 } = {}) {
  if (!t2 || !_s({ redirect: t2 }))
    return;
  const n2 = function(e3, t3) {
    return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
  }(hs, t2);
  gs ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
  const s2 = { navigateTo: index.navigateTo, redirectTo: index.redirectTo, switchTab: index.switchTab, reLaunch: index.reLaunch };
  setTimeout(() => {
    s2[e2]({ url: n2 });
  }, 0);
}
function vs({ url: e2 } = {}) {
  const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
    const { token: e3, tokenExpired: t3 } = re();
    let n3;
    if (e3) {
      if (t3 < Date.now()) {
        const e4 = "uni-id-token-expired";
        n3 = { errCode: e4, errMsg: ns[e4] };
      }
    } else {
      const e4 = "uni-id-check-token-failed";
      n3 = { errCode: e4, errMsg: ns[e4] };
    }
    return n3;
  }();
  if (ys(e2) && n2) {
    n2.uniIdRedirectUrl = e2;
    if (J($).length > 0)
      return setTimeout(() => {
        Y($, n2);
      }, 0), t2.abortLoginPageJump = true, t2;
    t2.autoToLoginPage = true;
  }
  return t2;
}
function Is() {
  !function() {
    const e3 = os(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = vs({ url: e3 });
    t2 || n2 && ws({ api: "redirectTo", redirect: e3 });
  }();
  const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  for (let t2 = 0; t2 < e2.length; t2++) {
    const n2 = e2[t2];
    index.addInterceptor(n2, { invoke(e3) {
      const { abortLoginPageJump: t3, autoToLoginPage: s2 } = vs({ url: e3.url });
      return t3 ? e3 : s2 ? (ws({ api: n2, redirect: ms(e3.url) }), false) : e3;
    } });
  }
}
function Ss() {
  this.onResponse((e2) => {
    const { type: t2, content: n2 } = e2;
    let s2 = false;
    switch (t2) {
      case "cloudobject":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in ns;
        }(n2);
        break;
      case "clientdb":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in ts;
        }(n2);
    }
    s2 && function(e3 = {}) {
      const t3 = J($);
      Z().then(() => {
        const n3 = os();
        if (n3 && _s({ redirect: n3 }))
          return t3.length > 0 ? Y($, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (hs && ws({ api: "navigateTo", redirect: n3 }));
      });
    }(n2);
  });
}
function bs(e2) {
  !function(e3) {
    e3.onResponse = function(e4) {
      G(j, e4);
    }, e3.offResponse = function(e4) {
      V(j, e4);
    };
  }(e2), function(e3) {
    e3.onNeedLogin = function(e4) {
      G($, e4);
    }, e3.offNeedLogin = function(e4) {
      V($, e4);
    }, us && (L("_globalUniCloudStatus").needLoginInit || (L("_globalUniCloudStatus").needLoginInit = true, Z().then(() => {
      Is.call(e3);
    }), ds && Ss.call(e3)));
  }(e2), function(e3) {
    e3.onRefreshToken = function(e4) {
      G(B, e4);
    }, e3.offRefreshToken = function(e4) {
      V(B, e4);
    };
  }(e2);
}
let ks;
const As = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ps = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function Ts() {
  const e2 = re().token || "", t2 = e2.split(".");
  if (!e2 || 3 !== t2.length)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ks(s2).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
ks = "function" != typeof atob ? function(e2) {
  if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !Ps.test(e2))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e2 += "==".slice(2 - (3 & e2.length));
  for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
    t2 = As.indexOf(e2.charAt(i2++)) << 18 | As.indexOf(e2.charAt(i2++)) << 12 | (n2 = As.indexOf(e2.charAt(i2++))) << 6 | (s2 = As.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return r2;
} : atob;
var Cs = n(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function r2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
    return t3.then((e4) => {
      if (s3) {
        const t4 = s3(e4);
        if (void 0 !== t4)
          return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
      }
      return e4;
    }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const i3 = t5.tempFiles, o2 = i3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= o2)
            return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u2 = i3[s5];
          e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
          } }).then((e5) => {
            u2.url = e5.fileID, s5 < o2 && c2();
          }).catch((e5) => {
            u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
          });
        }
      });
    }(e3, t4, 5, r3));
  }
  t2.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return "image" === t3.type ? i2(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
        return new Promise((e5, a2) => {
          index.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
            e5(r2(t5, "image"));
          }, fail(e6) {
            a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
        return new Promise((e5, c2) => {
          index.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
            e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : i2(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, i3) => {
          let o2 = index.chooseFile;
          if ("undefined" != typeof wx$1 && "function" == typeof wx$1.chooseMessageFile && (o2 = wx$1.chooseMessageFile), "function" != typeof o2)
            return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
          o2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(r2(t5));
          }, fail(e6) {
            i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}), xs = t(Cs);
const Os = "manual";
function Es(e2) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e3.push(this[t2]);
      }), e3;
    }, (e3, t2) => {
      if (this.loadtime === Os)
        return;
      let n2 = false;
      const s2 = [];
      for (let r2 = 2; r2 < e3.length; r2++)
        e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
      e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t2) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = i2, t2 && t2(i2);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2;
    t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const r2 = t2.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const i2 = t2.where || this.where;
    i2 && Object.keys(i2).length && (n2 = n2.where(i2));
    const o2 = t2.field || this.field;
    o2 && (n2 = n2.field(o2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
    const h2 = t2.orderby || this.orderby;
    h2 && (n2 = n2.orderBy(h2));
    const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
    return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
  } } };
}
function Ls(e2) {
  return function(t2, n2 = {}) {
    n2 = function(e3, t3 = {}) {
      return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
    }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
    return new Proxy({}, { get(s3, c2) {
      switch (c2) {
        case "toString":
          return "[object UniCloudObject]";
        case "toJSON":
          return {};
      }
      return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await M(q(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await M(q(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e4) {
            throw o3 = e4, await M(q(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await M(q(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...h2) {
        let l2;
        a2 && index.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
        "object" == typeof n2.secretMethods && function(e3, t3) {
          const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let p2 = false;
        try {
          l2 = await e2.callFunction(d2);
        } catch (e3) {
          p2 = true, l2 = { result: new te(e3) };
        }
        const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
        if (a2 && index.hideLoading(), y2 && y2.token && y2.tokenExpired && (ie(y2), Y(B, { ...y2 })), g2) {
          let e3 = m2;
          if (p2 && o2) {
            e3 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              index.showToast({ title: e3, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    index.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                      i3(e5);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                if (i2.retry && t3)
                  return s4(...h2);
              }
            }
          const n3 = new te({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
          throw n3.detail = l2.result, Y(j, { type: z, content: n3 }), n3;
        }
        return Y(j, { type: z, content: l2.result }), l2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
        return { objectName: t2, methodName: c2, params: e3 };
      } });
    } });
  };
}
function Rs(e2) {
  return L("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
}
async function Us({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
  const n2 = Rs(this);
  if (e2 && t2)
    throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");
  if (e2)
    return n2.mpWeixinOpenid = e2, {};
  const s2 = await new Promise((e3, t3) => {
    index.login({ success(t4) {
      e3(t4.code);
    }, fail(e4) {
      t3(new Error(e4.errMsg));
    } });
  }), r2 = this.importObject("uni-id-co", { customUI: true });
  return await r2.secureNetworkHandshakeByWeixin({ code: s2, callLoginByWeixin: t2 }), n2.mpWeixinCode = s2, { code: s2 };
}
async function Ns(e2) {
  const t2 = Rs(this);
  return t2.initPromise || (t2.initPromise = Us.call(this, e2).then((e3) => e3).catch((e3) => {
    throw delete t2.initPromise, e3;
  })), t2.initPromise;
}
function Ds(e2) {
  return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
    return Ns.call(e2, { openid: t2, callLoginByWeixin: n2 });
  };
}
function Ms(e2) {
  const t2 = { getSystemInfo: index.getSystemInfo, getPushClientId: index.getPushClientId };
  return function(n2) {
    return new Promise((s2, r2) => {
      t2[e2]({ ...n2, success(e3) {
        s2(e3);
      }, fail(e3) {
        r2(e3);
      } });
    });
  };
}
class qs extends class {
  constructor() {
    this._callback = {};
  }
  addListener(e2, t2) {
    this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
  }
  on(e2, t2) {
    return this.addListener(e2, t2);
  }
  removeListener(e2, t2) {
    if (!t2)
      throw new Error('The "listener" argument must be of type function. Received undefined');
    const n2 = this._callback[e2];
    if (!n2)
      return;
    const s2 = function(e3, t3) {
      for (let n3 = e3.length - 1; n3 >= 0; n3--)
        if (e3[n3] === t3)
          return n3;
      return -1;
    }(n2, t2);
    n2.splice(s2, 1);
  }
  off(e2, t2) {
    return this.removeListener(e2, t2);
  }
  removeAllListener(e2) {
    delete this._callback[e2];
  }
  emit(e2, ...t2) {
    const n2 = this._callback[e2];
    if (n2)
      for (let e3 = 0; e3 < n2.length; e3++)
        n2[e3](...t2);
  }
} {
  constructor() {
    super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
  }
  init() {
    return Promise.all([Ms("getSystemInfo")(), Ms("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
      if (!e2)
        throw new Error("Invalid appId, please check the manifest.json file");
      if (!t2)
        throw new Error("Invalid push client id");
      this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
    }, (e2) => {
      throw this.emit("error", e2), this.close(), e2;
    });
  }
  async open() {
    return this.init();
  }
  _isUniCloudSSE(e2) {
    if ("receive" !== e2.type)
      return false;
    const t2 = e2 && e2.data && e2.data.payload;
    return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
  }
  _receivePushMessage(e2) {
    if (!this._isUniCloudSSE(e2))
      return;
    const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
    this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
  }
  _consumMessage() {
    for (; ; ) {
      const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
      if (!e2)
        break;
      this._currentMessageId++, this._parseMessagePayload(e2);
    }
  }
  _parseMessagePayload(e2) {
    const { action: t2, messageId: n2, message: s2 } = e2;
    "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
  }
  _appendMessage({ messageId: e2, message: t2 } = {}) {
    this.emit("message", t2);
  }
  _end({ messageId: e2, message: t2 } = {}) {
    this.emit("end", t2), this.close();
  }
  _initMessageListener() {
    index.onPushMessage(this._uniPushMessageCallback);
  }
  _destroy() {
    index.offPushMessage(this._uniPushMessageCallback);
  }
  toJSON() {
    return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
  }
  close() {
    this._destroy(), this.emit("close");
  }
}
async function Fs(e2, t2) {
  const n2 = `http://${e2}:${t2}/system/ping`;
  try {
    const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      ne.request({ ...s2, success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } });
    }));
    return !(!e3.data || 0 !== e3.data.code);
  } catch (e3) {
    return false;
  }
  var s2;
}
async function Ks(e2) {
  const t2 = e2.__dev__;
  if (!t2.debugInfo)
    return;
  const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await async function(e3, t3) {
    let n3;
    for (let s3 = 0; s3 < e3.length; s3++) {
      const r3 = e3[s3];
      if (await Fs(r3, t3)) {
        n3 = r3;
        break;
      }
    }
    return { address: n3, port: t3 };
  }(n2, s2);
  if (r2)
    return t2.localAddress = r2, void (t2.localPort = s2);
  const i2 = console["warn"];
  let o2 = "";
  if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === P.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
    throw new Error(o2);
  i2(o2);
}
function js(e2) {
  e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e3) => {
      setTimeout(() => {
        e3();
      }, n2);
    });
    const s2 = e2.auth();
    return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
  } }));
}
const $s = { tcb: St, tencent: St, aliyun: pe, private: kt, alipay: Lt };
let Bs = new class {
  init(e2) {
    let t2 = {};
    const n2 = $s[e2.provider];
    if (!n2)
      throw new Error("未提供正确的provider参数");
    t2 = n2.init(e2), function(e3) {
      const t3 = {};
      e3.__dev__ = t3, t3.debugLog = "app" === P;
      const n3 = T;
      n3 && !n3.code && (t3.debugInfo = n3);
      const s2 = new v({ createPromise: function() {
        return Ks(e3);
      } });
      t3.initLocalNetwork = function() {
        return s2.exec();
      };
    }(t2), js(t2), Kn(t2), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t2), function(e3) {
      e3.database = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).database();
        if (this._database)
          return this._database;
        const n3 = Qn(Xn, { uniClient: e3 });
        return this._database = n3, n3;
      }, e3.databaseForJQL = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).databaseForJQL();
        if (this._databaseForJQL)
          return this._databaseForJQL;
        const n3 = Qn(Xn, { uniClient: e3, isJQL: true });
        return this._databaseForJQL = n3, n3;
      };
    }(t2), function(e3) {
      e3.getCurrentUserInfo = Ts, e3.chooseAndUploadFile = xs.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
        return Es(e3);
      } }), e3.SSEChannel = qs, e3.initSecureNetworkByWeixin = Ds(e3), e3.importObject = Ls(e3);
    }(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t2[e3])
        return;
      const n3 = t2[e3];
      t2[e3] = function() {
        return n3.apply(t2, Array.from(arguments));
      }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
        return function(n4) {
          let s2 = false;
          if ("callFunction" === t3) {
            const e5 = n4 && n4.type || c;
            s2 = e5 !== c;
          }
          const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
          n4 = n4 || {};
          const { success: o2, fail: a2, complete: u2 } = ee(n4), h2 = i2.then(() => s2 ? Promise.resolve() : M(q(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : M(q(t3, "success"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (r2 && Y(j, { type: H, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : M(q(t3, "fail"), e5).then(() => M(q(t3, "complete"), e5)).then(() => (Y(j, { type: H, content: e5 }), Promise.reject(e5))));
          if (!(o2 || a2 || u2))
            return h2;
          h2.then((e5) => {
            o2 && o2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
          }, (e5) => {
            a2 && a2(e5), u2 && u2(e5), r2 && Y(j, { type: H, content: e5 });
          });
        };
      }(t2[e3], e3)).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  const e2 = C;
  let t2 = {};
  if (e2 && 1 === e2.length)
    t2 = e2[0], Bs = Bs.init(t2), Bs._isDefault = true;
  else {
    const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
    let n2;
    n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
      Bs[e3] = function() {
        return console.error(n2), Promise.reject(new te({ code: "SYS_ERR", message: n2 }));
      };
    });
  }
  Object.assign(Bs, { get mixinDatacom() {
    return Es(Bs);
  } }), bs(Bs), Bs.addInterceptor = N, Bs.removeInterceptor = D, Bs.interceptObject = F;
})();
var Ws = Bs;
const props$h = defineMixin({
  props: {
    // 是否展示弹窗
    show: {
      type: Boolean,
      default: () => defProps.popup.show
    },
    // 是否显示遮罩
    overlay: {
      type: Boolean,
      default: () => defProps.popup.overlay
    },
    // 弹出的方向，可选值为 top bottom right left center
    mode: {
      type: String,
      default: () => defProps.popup.mode
    },
    // 动画时长，单位ms
    duration: {
      type: [String, Number],
      default: () => defProps.popup.duration
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: () => defProps.popup.closeable
    },
    // 自定义遮罩的样式
    overlayStyle: {
      type: [Object, String],
      default: () => defProps.popup.overlayStyle
    },
    // 点击遮罩是否关闭弹窗
    closeOnClickOverlay: {
      type: Boolean,
      default: () => defProps.popup.closeOnClickOverlay
    },
    // 层级
    zIndex: {
      type: [String, Number],
      default: () => defProps.popup.zIndex
    },
    // 是否为iPhoneX留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      default: () => defProps.popup.safeAreaInsetBottom
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      default: () => defProps.popup.safeAreaInsetTop
    },
    // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
    closeIconPos: {
      type: String,
      default: () => defProps.popup.closeIconPos
    },
    // 是否显示圆角
    round: {
      type: [Boolean, String, Number],
      default: () => defProps.popup.round
    },
    // mode=center，也即中部弹出时，是否使用缩放模式
    zoom: {
      type: Boolean,
      default: () => defProps.popup.zoom
    },
    // 弹窗背景色，设置为transparent可去除白色背景
    bgColor: {
      type: String,
      default: () => defProps.popup.bgColor
    },
    // 遮罩的透明度，0-1之间
    overlayOpacity: {
      type: [Number, String],
      default: () => defProps.popup.overlayOpacity
    }
  }
});
const props$g = defineMixin({
  props: {
    // 滑块的移动过渡时间，单位ms
    duration: {
      type: Number,
      default: () => defProps.tabs.duration
    },
    // tabs标签数组
    list: {
      type: Array,
      default: () => defProps.tabs.list
    },
    // 滑块颜色
    lineColor: {
      type: String,
      default: () => defProps.tabs.lineColor
    },
    // 菜单选择中时的样式
    activeStyle: {
      type: [String, Object],
      default: () => defProps.tabs.activeStyle
    },
    // 菜单非选中时的样式
    inactiveStyle: {
      type: [String, Object],
      default: () => defProps.tabs.inactiveStyle
    },
    // 滑块长度
    lineWidth: {
      type: [String, Number],
      default: () => defProps.tabs.lineWidth
    },
    // 滑块高度
    lineHeight: {
      type: [String, Number],
      default: () => defProps.tabs.lineHeight
    },
    // 滑块背景显示大小，当滑块背景设置为图片时使用
    lineBgSize: {
      type: String,
      default: () => defProps.tabs.lineBgSize
    },
    // 菜单item的样式
    itemStyle: {
      type: [String, Object],
      default: () => defProps.tabs.itemStyle
    },
    // 菜单是否可滚动
    scrollable: {
      type: Boolean,
      default: () => defProps.tabs.scrollable
    },
    // 当前选中标签的索引
    current: {
      type: [Number, String],
      default: () => defProps.tabs.current
    },
    // 默认读取的键名
    keyName: {
      type: String,
      default: () => defProps.tabs.keyName
    }
  }
});
const props$f = defineMixin({
  props: {
    // 输入框的内容
    value: {
      type: [String, Number],
      default: () => defProps.textarea.value
    },
    // 输入框的内容
    modelValue: {
      type: [String, Number],
      default: () => defProps.textarea.value
    },
    // 输入框为空时占位符
    placeholder: {
      type: [String, Number],
      default: () => defProps.textarea.placeholder
    },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: {
      type: String,
      default: () => defProps.input.placeholderClass
    },
    // 指定placeholder的样式
    placeholderStyle: {
      type: [String, Object],
      default: () => defProps.input.placeholderStyle
    },
    // 输入框高度
    height: {
      type: [String, Number],
      default: () => defProps.textarea.height
    },
    // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
    confirmType: {
      type: String,
      default: () => defProps.textarea.confirmType
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: () => defProps.textarea.disabled
    },
    // 是否显示统计字数
    count: {
      type: Boolean,
      default: () => defProps.textarea.count
    },
    // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
    focus: {
      type: Boolean,
      default: () => defProps.textarea.focus
    },
    // 是否自动增加高度
    autoHeight: {
      type: Boolean,
      default: () => defProps.textarea.autoHeight
    },
    // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
    fixed: {
      type: Boolean,
      default: () => defProps.textarea.fixed
    },
    // 指定光标与键盘的距离
    cursorSpacing: {
      type: Number,
      default: () => defProps.textarea.cursorSpacing
    },
    // 指定focus时的光标位置
    cursor: {
      type: [String, Number],
      default: () => defProps.textarea.cursor
    },
    // 是否显示键盘上方带有”完成“按钮那一栏，
    showConfirmBar: {
      type: Boolean,
      default: () => defProps.textarea.showConfirmBar
    },
    // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
    selectionStart: {
      type: Number,
      default: () => defProps.textarea.selectionStart
    },
    // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
    selectionEnd: {
      type: Number,
      default: () => defProps.textarea.selectionEnd
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: () => defProps.textarea.adjustPosition
    },
    // 是否去掉 iOS 下的默认内边距，只微信小程序有效
    disableDefaultPadding: {
      type: Boolean,
      default: () => defProps.textarea.disableDefaultPadding
    },
    // focus时，点击页面的时候不收起键盘，只微信小程序有效
    holdKeyboard: {
      type: Boolean,
      default: () => defProps.textarea.holdKeyboard
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: [String, Number],
      default: () => defProps.textarea.maxlength
    },
    // 边框类型，surround-四周边框，bottom-底部边框
    border: {
      type: String,
      default: () => defProps.textarea.border
    },
    // 用于处理或者过滤输入框内容的方法
    formatter: {
      type: [Function, null],
      default: () => defProps.textarea.formatter
    },
    // 是否忽略组件内对文本合成系统事件的处理
    ignoreCompositionEvent: {
      type: Boolean,
      default: true
    }
  }
});
function pickExclude(obj, keys) {
  if (!["[object Object]", "[object File]"].includes(Object.prototype.toString.call(obj))) {
    return {};
  }
  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}
function formatImage(res) {
  return res.tempFiles.map((item) => ({
    ...pickExclude(item, ["path"]),
    type: "image",
    url: item.path,
    thumb: item.path,
    size: item.size
  }));
}
function formatVideo(res) {
  return [
    {
      ...pickExclude(res, ["tempFilePath", "thumbTempFilePath", "errMsg"]),
      type: "video",
      url: res.tempFilePath,
      thumb: res.thumbTempFilePath,
      size: res.size
    }
  ];
}
function formatMedia(res) {
  return res.tempFiles.map((item) => ({
    ...pickExclude(item, ["fileType", "thumbTempFilePath", "tempFilePath"]),
    type: res.type,
    url: item.tempFilePath,
    thumb: res.type === "video" ? item.thumbTempFilePath : item.tempFilePath,
    size: item.size
  }));
}
function formatFile(res) {
  return res.tempFiles.map((item) => ({
    ...pickExclude(item, ["path"]),
    url: item.path,
    size: item.size
  }));
}
function chooseFile({
  accept,
  multiple,
  capture,
  compressed,
  maxDuration,
  sizeType,
  camera,
  maxCount,
  extension
}) {
  return new Promise((resolve2, reject) => {
    switch (accept) {
      case "image":
        index.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          sizeType,
          success: (res) => resolve2(formatImage(res)),
          fail: reject
        });
        break;
      case "media":
        wx$1.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          maxDuration,
          sizeType,
          camera,
          success: (res) => resolve2(formatMedia(res)),
          fail: reject
        });
        break;
      case "video":
        index.chooseVideo({
          sourceType: capture,
          compressed,
          maxDuration,
          camera,
          success: (res) => resolve2(formatVideo(res)),
          fail: reject
        });
        break;
      case "file":
        wx$1.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: accept,
          success: (res) => resolve2(formatFile(res)),
          fail: reject
        });
        break;
      default:
        wx$1.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: "all",
          success: (res) => resolve2(formatFile(res)),
          fail: reject
        });
    }
  });
}
const mixinUpload = {
  watch: {
    // 监听accept的变化，判断是否符合个平台要求
    // 只有微信小程序才支持选择媒体，文件类型，所以这里做一个判断提示
    accept: {
      immediate: true,
      handler(val) {
      }
    }
  }
};
const props$e = defineMixin({
  props: {
    // 接受的文件类型, 可选值为all media image file video
    accept: {
      type: String,
      default: () => defProps.upload.accept
    },
    extension: {
      type: Array,
      default: () => defProps.upload.extension
    },
    // 	图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头
    capture: {
      type: [String, Array],
      default: () => defProps.upload.capture
    },
    // 当accept为video时生效，是否压缩视频，默认为true
    compressed: {
      type: Boolean,
      default: () => defProps.upload.compressed
    },
    // 当accept为video时生效，可选值为back或front
    camera: {
      type: String,
      default: () => defProps.upload.camera
    },
    // 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
    maxDuration: {
      type: Number,
      default: () => defProps.upload.maxDuration
    },
    // 上传区域的图标，只能内置图标
    uploadIcon: {
      type: String,
      default: () => defProps.upload.uploadIcon
    },
    // 上传区域的图标的颜色，默认
    uploadIconColor: {
      type: String,
      default: () => defProps.upload.uploadIconColor
    },
    // 是否开启文件读取前事件
    useBeforeRead: {
      type: Boolean,
      default: () => defProps.upload.useBeforeRead
    },
    // 读取后的处理函数
    afterRead: {
      type: Function,
      default: null
    },
    // 读取前的处理函数
    beforeRead: {
      type: Function,
      default: null
    },
    // 是否显示组件自带的图片预览功能
    previewFullImage: {
      type: Boolean,
      default: () => defProps.upload.previewFullImage
    },
    // 最大上传数量
    maxCount: {
      type: [String, Number],
      default: () => defProps.upload.maxCount
    },
    // 是否启用
    disabled: {
      type: Boolean,
      default: () => defProps.upload.disabled
    },
    // 预览上传的图片时的裁剪模式，和image组件mode属性一致
    imageMode: {
      type: String,
      default: () => defProps.upload.imageMode
    },
    // 标识符，可以在回调函数的第二项参数中获取
    name: {
      type: String,
      default: () => defProps.upload.name
    },
    // 所选的图片的尺寸, 可选值为original compressed
    sizeType: {
      type: Array,
      default: () => defProps.upload.sizeType
    },
    // 是否开启图片多选，部分安卓机型不支持
    multiple: {
      type: Boolean,
      default: () => defProps.upload.multiple
    },
    // 是否展示删除按钮
    deletable: {
      type: Boolean,
      default: () => defProps.upload.deletable
    },
    // 文件大小限制，单位为byte
    maxSize: {
      type: [String, Number],
      default: () => defProps.upload.maxSize
    },
    // 显示已上传的文件列表
    fileList: {
      type: Array,
      default: () => defProps.upload.fileList
    },
    // 上传区域的提示文字
    uploadText: {
      type: String,
      default: () => defProps.upload.uploadText
    },
    // 内部预览图片区域和选择图片按钮的区域宽度
    width: {
      type: [String, Number],
      default: () => defProps.upload.width
    },
    // 内部预览图片区域和选择图片按钮的区域高度
    height: {
      type: [String, Number],
      default: () => defProps.upload.height
    },
    // 是否在上传完成后展示预览图
    previewImage: {
      type: Boolean,
      default: () => defProps.upload.previewImage
    }
  }
});
const props$d = defineMixin({
  props: {
    // 绑定的值
    modelValue: {
      type: [String, Number],
      default: () => defProps.input.value
    },
    // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
    // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
    // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
    // text-文本输入键盘
    type: {
      type: String,
      default: () => defProps.input.type
    },
    // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，
    // 兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序
    fixed: {
      type: Boolean,
      default: () => defProps.input.fixed
    },
    // 是否禁用输入框
    disabled: {
      type: Boolean,
      default: () => defProps.input.disabled
    },
    // 禁用状态时的背景色
    disabledColor: {
      type: String,
      default: () => defProps.input.disabledColor
    },
    // 是否显示清除控件
    clearable: {
      type: Boolean,
      default: () => defProps.input.clearable
    },
    // 是否密码类型
    password: {
      type: Boolean,
      default: () => defProps.input.password
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: [String, Number],
      default: () => defProps.input.maxlength
    },
    // 	输入框为空时的占位符
    placeholder: {
      type: String,
      default: () => defProps.input.placeholder
    },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: {
      type: String,
      default: () => defProps.input.placeholderClass
    },
    // 指定placeholder的样式
    placeholderStyle: {
      type: [String, Object],
      default: () => defProps.input.placeholderStyle
    },
    // 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效
    showWordLimit: {
      type: Boolean,
      default: () => defProps.input.showWordLimit
    },
    // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
    // https://uniapp.dcloud.io/component/input
    // https://uniapp.dcloud.io/component/textarea
    confirmType: {
      type: String,
      default: () => defProps.input.confirmType
    },
    // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
    confirmHold: {
      type: Boolean,
      default: () => defProps.input.confirmHold
    },
    // focus时，点击页面的时候不收起键盘，微信小程序有效
    holdKeyboard: {
      type: Boolean,
      default: () => defProps.input.holdKeyboard
    },
    // 自动获取焦点
    // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
    focus: {
      type: Boolean,
      default: () => defProps.input.focus
    },
    // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
    autoBlur: {
      type: Boolean,
      default: () => defProps.input.autoBlur
    },
    // 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效
    disableDefaultPadding: {
      type: Boolean,
      default: () => defProps.input.disableDefaultPadding
    },
    // 指定focus时光标的位置
    cursor: {
      type: [String, Number],
      default: () => defProps.input.cursor
    },
    // 输入框聚焦时底部与键盘的距离
    cursorSpacing: {
      type: [String, Number],
      default: () => defProps.input.cursorSpacing
    },
    // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
    selectionStart: {
      type: [String, Number],
      default: () => defProps.input.selectionStart
    },
    // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
    selectionEnd: {
      type: [String, Number],
      default: () => defProps.input.selectionEnd
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: () => defProps.input.adjustPosition
    },
    // 输入框内容对齐方式，可选值为：left|center|right
    inputAlign: {
      type: String,
      default: () => defProps.input.inputAlign
    },
    // 输入框字体的大小
    fontSize: {
      type: [String, Number],
      default: () => defProps.input.fontSize
    },
    // 输入框字体颜色
    color: {
      type: String,
      default: () => defProps.input.color
    },
    // 输入框前置图标
    prefixIcon: {
      type: String,
      default: () => defProps.input.prefixIcon
    },
    // 前置图标样式，对象或字符串
    prefixIconStyle: {
      type: [String, Object],
      default: () => defProps.input.prefixIconStyle
    },
    // 输入框后置图标
    suffixIcon: {
      type: String,
      default: () => defProps.input.suffixIcon
    },
    // 后置图标样式，对象或字符串
    suffixIconStyle: {
      type: [String, Object],
      default: () => defProps.input.suffixIconStyle
    },
    // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
    border: {
      type: String,
      default: () => defProps.input.border
    },
    // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
    readonly: {
      type: Boolean,
      default: () => defProps.input.readonly
    },
    // 输入框形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: () => defProps.input.shape
    },
    // 用于处理或者过滤输入框内容的方法
    formatter: {
      type: [Function, null],
      default: () => defProps.input.formatter
    },
    // 是否忽略组件内对文本合成系统事件的处理
    ignoreCompositionEvent: {
      type: Boolean,
      default: true
    }
  }
});
const props$c = defineMixin({
  props: {
    // 是否展示modal
    show: {
      type: Boolean,
      default: () => defProps.modal.show
    },
    // 标题
    title: {
      type: [String],
      default: () => defProps.modal.title
    },
    // 弹窗内容
    content: {
      type: String,
      default: () => defProps.modal.content
    },
    // 确认文案
    confirmText: {
      type: String,
      default: () => defProps.modal.confirmText
    },
    // 取消文案
    cancelText: {
      type: String,
      default: () => defProps.modal.cancelText
    },
    // 是否显示确认按钮
    showConfirmButton: {
      type: Boolean,
      default: () => defProps.modal.showConfirmButton
    },
    // 是否显示取消按钮
    showCancelButton: {
      type: Boolean,
      default: () => defProps.modal.showCancelButton
    },
    // 确认按钮颜色
    confirmColor: {
      type: String,
      default: () => defProps.modal.confirmColor
    },
    // 取消文字颜色
    cancelColor: {
      type: String,
      default: () => defProps.modal.cancelColor
    },
    // 对调确认和取消的位置
    buttonReverse: {
      type: Boolean,
      default: () => defProps.modal.buttonReverse
    },
    // 是否开启缩放效果
    zoom: {
      type: Boolean,
      default: () => defProps.modal.zoom
    },
    // 是否异步关闭，只对确定按钮有效
    asyncClose: {
      type: Boolean,
      default: () => defProps.modal.asyncClose
    },
    // 是否允许点击遮罩关闭modal
    closeOnClickOverlay: {
      type: Boolean,
      default: () => defProps.modal.closeOnClickOverlay
    },
    // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
    negativeTop: {
      type: [String, Number],
      default: () => defProps.modal.negativeTop
    },
    // modal宽度，不支持百分比，可以数值，px，rpx单位
    width: {
      type: [String, Number],
      default: () => defProps.modal.width
    },
    // 确认按钮的样式，circle-圆形，square-方形，如设置，将不会显示取消按钮
    confirmButtonShape: {
      type: String,
      default: () => defProps.modal.confirmButtonShape
    }
  }
});
const icons = {
  "uicon-level": "",
  "uicon-column-line": "",
  "uicon-checkbox-mark": "",
  "uicon-folder": "",
  "uicon-movie": "",
  "uicon-star-fill": "",
  "uicon-star": "",
  "uicon-phone-fill": "",
  "uicon-phone": "",
  "uicon-apple-fill": "",
  "uicon-chrome-circle-fill": "",
  "uicon-backspace": "",
  "uicon-attach": "",
  "uicon-cut": "",
  "uicon-empty-car": "",
  "uicon-empty-coupon": "",
  "uicon-empty-address": "",
  "uicon-empty-favor": "",
  "uicon-empty-permission": "",
  "uicon-empty-news": "",
  "uicon-empty-search": "",
  "uicon-github-circle-fill": "",
  "uicon-rmb": "",
  "uicon-person-delete-fill": "",
  "uicon-reload": "",
  "uicon-order": "",
  "uicon-server-man": "",
  "uicon-search": "",
  "uicon-fingerprint": "",
  "uicon-more-dot-fill": "",
  "uicon-scan": "",
  "uicon-share-square": "",
  "uicon-map": "",
  "uicon-map-fill": "",
  "uicon-tags": "",
  "uicon-tags-fill": "",
  "uicon-bookmark-fill": "",
  "uicon-bookmark": "",
  "uicon-eye": "",
  "uicon-eye-fill": "",
  "uicon-mic": "",
  "uicon-mic-off": "",
  "uicon-calendar": "",
  "uicon-calendar-fill": "",
  "uicon-trash": "",
  "uicon-trash-fill": "",
  "uicon-play-left": "",
  "uicon-play-right": "",
  "uicon-minus": "",
  "uicon-plus": "",
  "uicon-info": "",
  "uicon-info-circle": "",
  "uicon-info-circle-fill": "",
  "uicon-question": "",
  "uicon-error": "",
  "uicon-close": "",
  "uicon-checkmark": "",
  "uicon-android-circle-fill": "",
  "uicon-android-fill": "",
  "uicon-ie": "",
  "uicon-IE-circle-fill": "",
  "uicon-google": "",
  "uicon-google-circle-fill": "",
  "uicon-setting-fill": "",
  "uicon-setting": "",
  "uicon-minus-square-fill": "",
  "uicon-plus-square-fill": "",
  "uicon-heart": "",
  "uicon-heart-fill": "",
  "uicon-camera": "",
  "uicon-camera-fill": "",
  "uicon-more-circle": "",
  "uicon-more-circle-fill": "",
  "uicon-chat": "",
  "uicon-chat-fill": "",
  "uicon-bag-fill": "",
  "uicon-bag": "",
  "uicon-error-circle-fill": "",
  "uicon-error-circle": "",
  "uicon-close-circle": "",
  "uicon-close-circle-fill": "",
  "uicon-checkmark-circle": "",
  "uicon-checkmark-circle-fill": "",
  "uicon-question-circle-fill": "",
  "uicon-question-circle": "",
  "uicon-share": "",
  "uicon-share-fill": "",
  "uicon-shopping-cart": "",
  "uicon-shopping-cart-fill": "",
  "uicon-bell": "",
  "uicon-bell-fill": "",
  "uicon-list": "",
  "uicon-list-dot": "",
  "uicon-zhihu": "",
  "uicon-zhihu-circle-fill": "",
  "uicon-zhifubao": "",
  "uicon-zhifubao-circle-fill": "",
  "uicon-weixin-circle-fill": "",
  "uicon-weixin-fill": "",
  "uicon-twitter-circle-fill": "",
  "uicon-twitter": "",
  "uicon-taobao-circle-fill": "",
  "uicon-taobao": "",
  "uicon-weibo-circle-fill": "",
  "uicon-weibo": "",
  "uicon-qq-fill": "",
  "uicon-qq-circle-fill": "",
  "uicon-moments-circel-fill": "",
  "uicon-moments": "",
  "uicon-qzone": "",
  "uicon-qzone-circle-fill": "",
  "uicon-baidu-circle-fill": "",
  "uicon-baidu": "",
  "uicon-facebook-circle-fill": "",
  "uicon-facebook": "",
  "uicon-car": "",
  "uicon-car-fill": "",
  "uicon-warning-fill": "",
  "uicon-warning": "",
  "uicon-clock-fill": "",
  "uicon-clock": "",
  "uicon-edit-pen": "",
  "uicon-edit-pen-fill": "",
  "uicon-email": "",
  "uicon-email-fill": "",
  "uicon-minus-circle": "",
  "uicon-minus-circle-fill": "",
  "uicon-plus-circle": "",
  "uicon-plus-circle-fill": "",
  "uicon-file-text": "",
  "uicon-file-text-fill": "",
  "uicon-pushpin": "",
  "uicon-pushpin-fill": "",
  "uicon-grid": "",
  "uicon-grid-fill": "",
  "uicon-play-circle": "",
  "uicon-play-circle-fill": "",
  "uicon-pause-circle-fill": "",
  "uicon-pause": "",
  "uicon-pause-circle": "",
  "uicon-eye-off": "",
  "uicon-eye-off-outline": "",
  "uicon-gift-fill": "",
  "uicon-gift": "",
  "uicon-rmb-circle-fill": "",
  "uicon-rmb-circle": "",
  "uicon-kefu-ermai": "",
  "uicon-server-fill": "",
  "uicon-coupon-fill": "",
  "uicon-coupon": "",
  "uicon-integral": "",
  "uicon-integral-fill": "",
  "uicon-home-fill": "",
  "uicon-home": "",
  "uicon-hourglass-half-fill": "",
  "uicon-hourglass": "",
  "uicon-account": "",
  "uicon-plus-people-fill": "",
  "uicon-minus-people-fill": "",
  "uicon-account-fill": "",
  "uicon-thumb-down-fill": "",
  "uicon-thumb-down": "",
  "uicon-thumb-up": "",
  "uicon-thumb-up-fill": "",
  "uicon-lock-fill": "",
  "uicon-lock-open": "",
  "uicon-lock-opened-fill": "",
  "uicon-lock": "",
  "uicon-red-packet-fill": "",
  "uicon-photo-fill": "",
  "uicon-photo": "",
  "uicon-volume-off-fill": "",
  "uicon-volume-off": "",
  "uicon-volume-fill": "",
  "uicon-volume": "",
  "uicon-red-packet": "",
  "uicon-download": "",
  "uicon-arrow-up-fill": "",
  "uicon-arrow-down-fill": "",
  "uicon-play-left-fill": "",
  "uicon-play-right-fill": "",
  "uicon-rewind-left-fill": "",
  "uicon-rewind-right-fill": "",
  "uicon-arrow-downward": "",
  "uicon-arrow-leftward": "",
  "uicon-arrow-rightward": "",
  "uicon-arrow-upward": "",
  "uicon-arrow-down": "",
  "uicon-arrow-right": "",
  "uicon-arrow-left": "",
  "uicon-arrow-up": "",
  "uicon-skip-back-left": "",
  "uicon-skip-forward-right": "",
  "uicon-rewind-right": "",
  "uicon-rewind-left": "",
  "uicon-arrow-right-double": "",
  "uicon-arrow-left-double": "",
  "uicon-wifi-off": "",
  "uicon-wifi": "",
  "uicon-empty-data": "",
  "uicon-empty-history": "",
  "uicon-empty-list": "",
  "uicon-empty-page": "",
  "uicon-empty-order": "",
  "uicon-man": "",
  "uicon-woman": "",
  "uicon-man-add": "",
  "uicon-man-add-fill": "",
  "uicon-man-delete": "",
  "uicon-man-delete-fill": "",
  "uicon-zh": "",
  "uicon-en": ""
};
const props$b = defineMixin({
  props: {
    // 图标类名
    name: {
      type: String,
      default: () => defProps.icon.name
    },
    // 图标颜色，可接受主题色
    color: {
      type: String,
      default: () => defProps.icon.color
    },
    // 字体大小，单位px
    size: {
      type: [String, Number],
      default: () => defProps.icon.size
    },
    // 是否显示粗体
    bold: {
      type: Boolean,
      default: () => defProps.icon.bold
    },
    // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
    index: {
      type: [String, Number],
      default: () => defProps.icon.index
    },
    // 触摸图标时的类名
    hoverClass: {
      type: String,
      default: () => defProps.icon.hoverClass
    },
    // 自定义扩展前缀，方便用户扩展自己的图标库
    customPrefix: {
      type: String,
      default: () => defProps.icon.customPrefix
    },
    // 图标右边或者下面的文字
    label: {
      type: [String, Number],
      default: () => defProps.icon.label
    },
    // label的位置，只能右边或者下边
    labelPos: {
      type: String,
      default: () => defProps.icon.labelPos
    },
    // label的大小
    labelSize: {
      type: [String, Number],
      default: () => defProps.icon.labelSize
    },
    // label的颜色
    labelColor: {
      type: String,
      default: () => defProps.icon.labelColor
    },
    // label与图标的距离
    space: {
      type: [String, Number],
      default: () => defProps.icon.space
    },
    // 图片的mode
    imgMode: {
      type: String,
      default: () => defProps.icon.imgMode
    },
    // 用于显示图片小图标时，图片的宽度
    width: {
      type: [String, Number],
      default: () => defProps.icon.width
    },
    // 用于显示图片小图标时，图片的高度
    height: {
      type: [String, Number],
      default: () => defProps.icon.height
    },
    // 用于解决某些情况下，让图标垂直居中的用途
    top: {
      type: [String, Number],
      default: () => defProps.icon.top
    },
    // 是否阻止事件传播
    stop: {
      type: Boolean,
      default: () => defProps.icon.stop
    }
  }
});
const props$a = defineMixin({
  props: {
    // input的label提示语
    label: {
      type: String,
      default: () => defProps.formItem.label
    },
    // 绑定的值
    prop: {
      type: String,
      default: () => defProps.formItem.prop
    },
    // 绑定的规则
    rule: {
      type: String,
      default: () => defProps.formItem.rule
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: [String, Boolean],
      default: () => defProps.formItem.borderBottom
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: () => defProps.formItem.labelPosition
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: () => defProps.formItem.labelWidth
    },
    // 右侧图标
    rightIcon: {
      type: String,
      default: () => defProps.formItem.rightIcon
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: () => defProps.formItem.leftIcon
    },
    // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
    required: {
      type: Boolean,
      default: () => defProps.formItem.required
    },
    leftIconStyle: {
      type: [String, Object],
      default: () => defProps.formItem.leftIconStyle
    }
  }
});
const props$9 = defineMixin({
  props: {
    // 当前form的需要验证字段的集合
    model: {
      type: Object,
      default: () => defProps.form.model
    },
    // 验证规则
    rules: {
      type: [Object, Function, Array],
      default: () => defProps.form.rules
    },
    // 有错误时的提示方式，message-提示信息，toast-进行toast提示
    // border-bottom-下边框呈现红色，none-无提示
    errorType: {
      type: String,
      default: () => defProps.form.errorType
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: Boolean,
      default: () => defProps.form.borderBottom
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: () => defProps.form.labelPosition
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: () => defProps.form.labelWidth
    },
    // lable字体的对齐方式
    labelAlign: {
      type: String,
      default: () => defProps.form.labelAlign
    },
    // lable的样式，对象形式
    labelStyle: {
      type: Object,
      default: () => defProps.form.labelStyle
    }
  }
});
const formatRegExp = /%[sdj%]/g;
let warning = function warning2() {
};
if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
  warning = function warning3(type2, errors) {
    if (typeof console !== "undefined" && console.warn) {
      if (errors.every((e2) => typeof e2 === "string")) {
        console.warn(type2, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length)
    return null;
  const fields = {};
  errors.forEach((error2) => {
    const { field } = error2;
    fields[field] = fields[field] || [];
    fields[field].push(error2);
  });
  return fields;
}
function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  let i2 = 1;
  const f2 = args[0];
  const len = args.length;
  if (typeof f2 === "function") {
    return f2.apply(null, args.slice(1));
  }
  if (typeof f2 === "string") {
    let str = String(f2).replace(formatRegExp, (x) => {
      if (x === "%%") {
        return "%";
      }
      if (i2 >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i2++]);
        case "%d":
          return Number(args[i2++]);
        case "%j":
          try {
            return JSON.stringify(args[i2++]);
          } catch (_2) {
            return "[Circular]";
          }
          break;
        default:
          return x;
      }
    });
    for (let arg = args[i2]; i2 < len; arg = args[++i2]) {
      str += ` ${arg}`;
    }
    return str;
  }
  return f2;
}
function isNativeStringType(type2) {
  return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
}
function isEmptyValue(value, type2) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (type2 === "array" && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type2) && typeof value === "string" && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func2, callback) {
  const results = [];
  let total = 0;
  const arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach((a2) => {
    func2(a2, count);
  });
}
function asyncSerialArray(arr, func2, callback) {
  let index2 = 0;
  const arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    const original = index2;
    index2 += 1;
    if (original < arrLength) {
      func2(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  const ret = [];
  Object.keys(objArr).forEach((k) => {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}
function asyncMap(objArr, option, func2, callback) {
  if (option.first) {
    const _pending = new Promise((resolve2, reject) => {
      const next = function next2(errors) {
        callback(errors);
        return errors.length ? reject({
          errors,
          fields: convertFieldsError(errors)
        }) : resolve2();
      };
      const flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func2, next);
    });
    _pending.catch((e2) => e2);
    return _pending;
  }
  let firstFields = option.firstFields || [];
  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }
  const objArrKeys = Object.keys(objArr);
  const objArrLength = objArrKeys.length;
  let total = 0;
  const results = [];
  const pending = new Promise((resolve2, reject) => {
    const next = function next2(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results)
        }) : resolve2();
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve2();
    }
    objArrKeys.forEach((key) => {
      const arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func2, next);
      } else {
        asyncParallelArray(arr, func2, next);
      }
    });
  });
  pending.catch((e2) => e2);
  return pending;
}
function complementError(rule) {
  return function(oe2) {
    if (oe2 && oe2.message) {
      oe2.field = oe2.field || rule.fullField;
      return oe2;
    }
    return {
      message: typeof oe2 === "function" ? oe2() : oe2,
      field: oe2.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (const s2 in source) {
      if (source.hasOwnProperty(s2)) {
        const value = source[s2];
        if (typeof value === "object" && typeof target[s2] === "object") {
          target[s2] = { ...target[s2], ...value };
        } else {
          target[s2] = value;
        }
      }
    }
  }
  return target;
}
function required(rule, value, source, errors, options, type2) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type2 || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}
function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === "") {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}
const pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
    "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
    "i"
  ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return /^(-)?\d+$/.test(value);
  },
  float: function float(value) {
    return /^(-)?\d+(\.\d+)?$/.test(value);
  },
  array: function array2(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e2) {
      return false;
    }
  },
  date: function date2(value) {
    return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function";
  },
  number: function number2(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof +value === "number";
  },
  object: function object2(value) {
    return typeof value === "object" && !types.array(value);
  },
  method: function method(value) {
    return typeof value === "function";
  },
  email: function email2(value) {
    return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url2(value) {
    return typeof value === "string" && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === "string" && !!value.match(pattern.hex);
  }
};
function type(rule, value, source, errors, options) {
  if (rule.required && value === void 0) {
    required(rule, value, source, errors, options);
    return;
  }
  const custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
  const ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}
function range(rule, value, source, errors, options) {
  const len = typeof rule.len === "number";
  const min = typeof rule.min === "number";
  const max = typeof rule.max === "number";
  const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  let val = value;
  let key = null;
  const num = typeof value === "number";
  const str = typeof value === "string";
  const arr = Array.isArray(value);
  if (num) {
    key = "number";
  } else if (str) {
    key = "string";
  } else if (arr) {
    key = "array";
  }
  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    val = value.replace(spRegexp, "_").length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}
const ENUM = "enum";
function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
  }
}
function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      const _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}
const rules = {
  required,
  whitespace,
  type,
  range,
  enum: enumerable,
  pattern: pattern$1
};
function string(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "string");
    if (!isEmptyValue(value, "string")) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
}
function method2(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function number22(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (value === "") {
      value = void 0;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function _boolean(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function regexp2(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function integer2(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function floatFn(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function array22(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value, "array") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "array");
    if (!isEmptyValue(value, "array")) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function object22(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
const ENUM$1 = "enum";
function enumerable$1(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function pattern$2(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "string")) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function date22(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      let dateObject;
      if (typeof value === "number") {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
}
function required$1(rule, value, callback, source, options) {
  const errors = [];
  const type2 = Array.isArray(value) ? "array" : typeof value;
  rules.required(rule, value, source, errors, options, type2);
  callback(errors);
}
function type$1(rule, value, callback, source, options) {
  const ruleType = rule.type;
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function any(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
  }
  callback(errors);
}
const validators = {
  string,
  method: method2,
  number: number22,
  boolean: _boolean,
  regexp: regexp2,
  integer: integer2,
  float: floatFn,
  array: array22,
  object: object22,
  enum: enumerable$1,
  pattern: pattern$2,
  date: date22,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any
};
function newMessages() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function clone2() {
      const cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
const messages = newMessages();
function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}
Schema.prototype = {
  messages: function messages2(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  },
  define: function define(rules2) {
    if (!rules2) {
      throw new Error("Cannot configure a schema with no rules");
    }
    if (typeof rules2 !== "object" || Array.isArray(rules2)) {
      throw new Error("Rules must be an object");
    }
    this.rules = {};
    let z2;
    let item;
    for (z2 in rules2) {
      if (rules2.hasOwnProperty(z2)) {
        item = rules2[z2];
        this.rules[z2] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o2, oc) {
    const _this = this;
    if (o2 === void 0) {
      o2 = {};
    }
    if (oc === void 0) {
      oc = function oc2() {
      };
    }
    let source = source_;
    let options = o2;
    let callback = oc;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }
      return Promise.resolve();
    }
    function complete(results) {
      let i2;
      let errors = [];
      let fields = {};
      function add2(e2) {
        if (Array.isArray(e2)) {
          let _errors;
          errors = (_errors = errors).concat.apply(_errors, e2);
        } else {
          errors.push(e2);
        }
      }
      for (i2 = 0; i2 < results.length; i2++) {
        add2(results[i2]);
      }
      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }
      callback(errors, fields);
    }
    if (options.messages) {
      let messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    let arr;
    let value;
    const series = {};
    const keys = options.keys || Object.keys(this.rules);
    keys.forEach((z2) => {
      arr = _this.rules[z2];
      value = source[z2];
      arr.forEach((r2) => {
        let rule = r2;
        if (typeof rule.transform === "function") {
          if (source === source_) {
            source = { ...source };
          }
          value = source[z2] = rule.transform(value);
        }
        if (typeof rule === "function") {
          rule = {
            validator: rule
          };
        } else {
          rule = { ...rule };
        }
        rule.validator = _this.getValidationMethod(rule);
        rule.field = z2;
        rule.fullField = rule.fullField || z2;
        rule.type = _this.getType(rule);
        if (!rule.validator) {
          return;
        }
        series[z2] = series[z2] || [];
        series[z2].push({
          rule,
          value,
          source,
          field: z2
        });
      });
    });
    const errorFields = {};
    return asyncMap(series, options, (data, doIt) => {
      const { rule } = data;
      let deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullfield(key, schema) {
        return { ...schema, fullField: `${rule.fullField}.${key}` };
      }
      function cb(e2) {
        if (e2 === void 0) {
          e2 = [];
        }
        let errors = e2;
        if (!Array.isArray(errors)) {
          errors = [errors];
        }
        if (!options.suppressWarning && errors.length) {
          Schema.warning("async-validator:", errors);
        }
        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }
        errors = errors.map(complementError(rule));
        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }
        if (!deep) {
          doIt(errors);
        } else {
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }
            return doIt(errors);
          }
          let fieldsSchema = {};
          if (rule.defaultField) {
            for (const k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }
          fieldsSchema = { ...fieldsSchema, ...data.rule.fields };
          for (const f2 in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f2)) {
              const fieldSchema = Array.isArray(fieldsSchema[f2]) ? fieldsSchema[f2] : [fieldsSchema[f2]];
              fieldsSchema[f2] = fieldSchema.map(addFullfield.bind(null, f2));
            }
          }
          const schema = new Schema(fieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, (errs) => {
            const finalErrors = [];
            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      let res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || `${rule.field} fails`);
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(() => cb(), (e2) => cb(e2));
      }
    }, (results) => {
      complete(results);
    });
  },
  getType: function getType2(rule) {
    if (rule.type === void 0 && rule.pattern instanceof RegExp) {
      rule.type = "pattern";
    }
    if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format("Unknown rule type %s", rule.type));
    }
    return rule.type || "string";
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === "function") {
      return rule.validator;
    }
    const keys = Object.keys(rule);
    const messageIndex = keys.indexOf("message");
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === "required") {
      return validators.required;
    }
    return validators[this.getType(rule)] || false;
  }
};
Schema.register = function register(type2, validator) {
  if (typeof validator !== "function") {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators[type2] = validator;
};
Schema.warning = warning;
Schema.messages = messages;
const props$8 = defineMixin({
  props: {
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: () => defProps.overlay.show
    },
    // 层级z-index
    zIndex: {
      type: [String, Number],
      default: () => defProps.overlay.zIndex
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
      type: [String, Number],
      default: () => defProps.overlay.duration
    },
    // 不透明度值，当做rgba的第四个参数
    opacity: {
      type: [String, Number],
      default: () => defProps.overlay.opacity
    }
  }
});
const props$7 = defineMixin({
  props: {
    // radio的名称
    name: {
      type: [String, Number, Boolean],
      default: () => defProps.radio.name
    },
    // 形状，square为方形，circle为圆型
    shape: {
      type: String,
      default: () => defProps.radio.shape
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: () => defProps.radio.disabled
    },
    // 是否禁止点击提示语选中单选框
    labelDisabled: {
      type: [String, Boolean],
      default: () => defProps.radio.labelDisabled
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: () => defProps.radio.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: () => defProps.radio.inactiveColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: () => defProps.radio.iconSize
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: () => defProps.radio.labelSize
    },
    // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
    label: {
      type: [String, Number],
      default: () => defProps.radio.label
    },
    // 整体的大小
    size: {
      type: [String, Number],
      default: () => defProps.radio.size
    },
    // 图标颜色
    color: {
      type: String,
      default: () => defProps.radio.color
    },
    // label的颜色
    labelColor: {
      type: String,
      default: () => defProps.radio.labelColor
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: () => defProps.radio.iconColor
    }
  }
});
const props$6 = defineMixin({
  props: {
    // 绑定的值
    modelValue: {
      type: [String, Number, Boolean],
      default: () => defProps.radioGroup.value
    },
    // 是否禁用全部radio
    disabled: {
      type: Boolean,
      default: () => defProps.radioGroup.disabled
    },
    // 形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: () => defProps.radioGroup.shape
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: () => defProps.radioGroup.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: () => defProps.radioGroup.inactiveColor
    },
    // 标识符
    name: {
      type: String,
      default: () => defProps.radioGroup.name
    },
    // 整个组件的尺寸，默认px
    size: {
      type: [String, Number],
      default: () => defProps.radioGroup.size
    },
    // 布局方式，row-横向，column-纵向
    placement: {
      type: String,
      default: () => defProps.radioGroup.placement
    },
    // label的文本
    label: {
      type: [String],
      default: () => defProps.radioGroup.label
    },
    // label的颜色 （默认 '#303133' ）
    labelColor: {
      type: [String],
      default: () => defProps.radioGroup.labelColor
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: () => defProps.radioGroup.labelSize
    },
    // 是否禁止点击文本操作checkbox(默认 false )
    labelDisabled: {
      type: Boolean,
      default: () => defProps.radioGroup.labelDisabled
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: () => defProps.radioGroup.iconColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: () => defProps.radioGroup.iconSize
    },
    // 竖向配列时，是否显示下划线
    borderBottom: {
      type: Boolean,
      default: () => defProps.radioGroup.borderBottom
    },
    // 图标与文字的对齐方式
    iconPlacement: {
      type: String,
      default: () => defProps.radio.iconPlacement
    }
  }
});
const props$5 = defineMixin({
  props: {
    // 是否显示组件
    show: {
      type: Boolean,
      default: () => defProps.loadingIcon.show
    },
    // 颜色
    color: {
      type: String,
      default: () => defProps.loadingIcon.color
    },
    // 提示文字颜色
    textColor: {
      type: String,
      default: () => defProps.loadingIcon.textColor
    },
    // 文字和图标是否垂直排列
    vertical: {
      type: Boolean,
      default: () => defProps.loadingIcon.vertical
    },
    // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
    mode: {
      type: String,
      default: () => defProps.loadingIcon.mode
    },
    // 图标大小，单位默认px
    size: {
      type: [String, Number],
      default: () => defProps.loadingIcon.size
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: () => defProps.loadingIcon.textSize
    },
    // 文字内容
    text: {
      type: [String, Number],
      default: () => defProps.loadingIcon.text
    },
    // 动画模式
    timingFunction: {
      type: String,
      default: () => defProps.loadingIcon.timingFunction
    },
    // 动画执行周期时间
    duration: {
      type: [String, Number],
      default: () => defProps.loadingIcon.duration
    },
    // mode=circle时的暗边颜色
    inactiveColor: {
      type: String,
      default: () => defProps.loadingIcon.inactiveColor
    }
  }
});
function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
  const startRGB = hexToRgb(startColor, false);
  const startR = startRGB[0];
  const startG = startRGB[1];
  const startB = startRGB[2];
  const endRGB = hexToRgb(endColor, false);
  const endR = endRGB[0];
  const endG = endRGB[1];
  const endB = endRGB[2];
  const sR = (endR - startR) / step;
  const sG = (endG - startG) / step;
  const sB = (endB - startB) / step;
  const colorArr = [];
  for (let i2 = 0; i2 < step; i2++) {
    let hex2 = rgbToHex(`rgb(${Math.round(sR * i2 + startR)},${Math.round(sG * i2 + startG)},${Math.round(sB * i2 + startB)})`);
    if (i2 === 0)
      hex2 = rgbToHex(startColor);
    if (i2 === step - 1)
      hex2 = rgbToHex(endColor);
    colorArr.push(hex2);
  }
  return colorArr;
}
function hexToRgb(sColor, str = true) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = String(sColor).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i2 = 1; i2 < 4; i2 += 1) {
        sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
      }
      sColor = sColorNew;
    }
    const sColorChange = [];
    for (let i2 = 1; i2 < 7; i2 += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i2, i2 + 2)}`));
    }
    if (!str) {
      return sColorChange;
    }
    return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
  }
  if (/^(rgb|RGB)/.test(sColor)) {
    const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map((val) => Number(val));
  }
  return sColor;
}
function rgbToHex(rgb) {
  const _this = rgb;
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (let i2 = 0; i2 < aColor.length; i2++) {
      let hex2 = Number(aColor[i2]).toString(16);
      hex2 = String(hex2).length == 1 ? `${0}${hex2}` : hex2;
      if (hex2 === "0") {
        hex2 += hex2;
      }
      strHex += hex2;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  }
  if (reg.test(_this)) {
    const aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    }
    if (aNum.length === 3) {
      let numHex = "#";
      for (let i2 = 0; i2 < aNum.length; i2 += 1) {
        numHex += aNum[i2] + aNum[i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}
const props$4 = defineMixin({
  props: {
    bgColor: {
      type: String,
      default: () => defProps.statusBar.bgColor
    }
  }
});
const props$3 = defineMixin({
  props: {}
});
const props$2 = defineMixin({
  props: {
    // 是否展示组件
    show: {
      type: Boolean,
      default: () => defProps.transition.show
    },
    // 使用的动画模式
    mode: {
      type: String,
      default: () => defProps.transition.mode
    },
    // 动画的执行时间，单位ms
    duration: {
      type: [String, Number],
      default: () => defProps.transition.duration
    },
    // 使用的动画过渡函数
    timingFunction: {
      type: String,
      default: () => defProps.transition.timingFunction
    }
  }
});
const getClassNames = (name) => ({
  enter: `u-${name}-enter u-${name}-enter-active`,
  "enter-to": `u-${name}-enter-to u-${name}-enter-active`,
  leave: `u-${name}-leave u-${name}-leave-active`,
  "leave-to": `u-${name}-leave-to u-${name}-leave-active`
});
const transition = {
  methods: {
    // 组件被点击发出事件
    clickHandler() {
      this.$emit("click");
    },
    // vue版本的组件进场处理
    async vueEnter() {
      const classNames = getClassNames(this.mode);
      this.status = "enter";
      this.$emit("beforeEnter");
      this.inited = true;
      this.display = true;
      this.classes = classNames.enter;
      await nextTick$1();
      {
        await sleep(20);
        this.$emit("enter");
        this.transitionEnded = false;
        this.$emit("afterEnter");
        this.classes = classNames["enter-to"];
      }
    },
    // 动画离场处理
    async vueLeave() {
      if (!this.display)
        return;
      const classNames = getClassNames(this.mode);
      this.status = "leave";
      this.$emit("beforeLeave");
      this.classes = classNames.leave;
      await nextTick$1();
      {
        this.transitionEnded = false;
        this.$emit("leave");
        setTimeout(this.onTransitionEnd, this.duration);
        this.classes = classNames["leave-to"];
      }
    },
    // 完成过渡后触发
    onTransitionEnd() {
      if (this.transitionEnded)
        return;
      this.transitionEnded = true;
      this.$emit(this.status === "leave" ? "afterLeave" : "afterEnter");
      if (!this.show && this.display) {
        this.display = false;
        this.inited = false;
      }
    }
  }
};
const props$1 = defineMixin({
  props: {
    // 是否显示圆点
    isDot: {
      type: Boolean,
      default: () => defProps.badge.isDot
    },
    // 显示的内容
    value: {
      type: [Number, String],
      default: () => defProps.badge.value
    },
    // 显示的内容
    modelValue: {
      type: [Number, String],
      default: () => defProps.badge.modelValue
    },
    // 是否显示
    show: {
      type: Boolean,
      default: () => defProps.badge.show
    },
    // 最大值，超过最大值会显示 '{max}+'
    max: {
      type: [Number, String],
      default: () => defProps.badge.max
    },
    // 主题类型，error|warning|success|primary
    type: {
      type: String,
      default: () => defProps.badge.type
    },
    // 当数值为 0 时，是否展示 Badge
    showZero: {
      type: Boolean,
      default: () => defProps.badge.showZero
    },
    // 背景颜色，优先级比type高，如设置，type参数会失效
    bgColor: {
      type: [String, null],
      default: () => defProps.badge.bgColor
    },
    // 字体颜色
    color: {
      type: [String, null],
      default: () => defProps.badge.color
    },
    // 徽标形状，circle-四角均为圆角，horn-左下角为直角
    shape: {
      type: String,
      default: () => defProps.badge.shape
    },
    // 设置数字的显示方式，overflow|ellipsis|limit
    // overflow会根据max字段判断，超出显示`${max}+`
    // ellipsis会根据max判断，超出显示`${max}...`
    // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
    numberType: {
      type: String,
      default: () => defProps.badge.numberType
    },
    // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
    offset: {
      type: Array,
      default: () => defProps.badge.offset
    },
    // 是否反转背景和字体颜色
    inverted: {
      type: Boolean,
      default: () => defProps.badge.inverted
    },
    // 是否绝对定位
    absolute: {
      type: Boolean,
      default: () => defProps.badge.absolute
    }
  }
});
const props = defineMixin({
  props: {
    color: {
      type: String,
      default: () => defProps.line.color
    },
    // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
    length: {
      type: [String, Number],
      default: () => defProps.line.length
    },
    // 线条方向，col-竖向，row-横向
    direction: {
      type: String,
      default: () => defProps.line.direction
    },
    // 是否显示细边框
    hairline: {
      type: Boolean,
      default: () => defProps.line.hairline
    },
    // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
    margin: {
      type: [String, Number],
      default: () => defProps.line.margin
    },
    // 是否虚线，true-虚线，false-实线
    dashed: {
      type: Boolean,
      default: () => defProps.line.dashed
    }
  }
});
exports.Schema = Schema;
exports.Ws = Ws;
exports._export_sfc = _export_sfc;
exports.addStyle = addStyle;
exports.addUnit = addUnit;
exports.buttonMixin = buttonMixin;
exports.chooseFile = chooseFile;
exports.color = color;
exports.colorGradient = colorGradient;
exports.computed = computed;
exports.config = config;
exports.createSSRApp = createSSRApp;
exports.dayjs = dayjs;
exports.deepClone = deepClone;
exports.deepMerge = deepMerge$1;
exports.defProps = defProps;
exports.e = e$1;
exports.error = error;
exports.f = f$1;
exports.formValidate = formValidate;
exports.getProperty = getProperty;
exports.getPx = getPx;
exports.icons = icons;
exports.index = index;
exports.initVueI18n = initVueI18n;
exports.mixin = mixin;
exports.mixinUpload = mixinUpload;
exports.mpMixin = mpMixin;
exports.n = n$1;
exports.nextTick$1 = nextTick$1;
exports.o = o$1;
exports.onLoad = onLoad;
exports.onMounted = onMounted;
exports.onUnload = onUnload;
exports.openType = openType;
exports.os = os$1;
exports.p = p$1;
exports.props = props$i;
exports.props$1 = props$h;
exports.props$10 = props$8;
exports.props$11 = props$7;
exports.props$12 = props$6;
exports.props$13 = props$5;
exports.props$14 = props$4;
exports.props$15 = props$3;
exports.props$16 = props$2;
exports.props$17 = props$1;
exports.props$18 = props;
exports.props$2 = props$g;
exports.props$3 = props$f;
exports.props$4 = props$e;
exports.props$5 = props$d;
exports.props$6 = props$c;
exports.props$7 = props$b;
exports.props$8 = props$a;
exports.props$9 = props$9;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s$1;
exports.setProperty = setProperty;
exports.sleep = sleep;
exports.sr = sr;
exports.sys = sys;
exports.t = t$1;
exports.test = test;
exports.throttle = throttle;
exports.toast = toast;
exports.transition = transition;
exports.unref = unref;
exports.wx$1 = wx$1;
