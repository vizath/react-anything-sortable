/**
 * @fileOverview jQuery replacement
 * @author jasonslyvia
 */
'use strict';

export function on(el, eventName, callback) {
  if (el.addEventListener) {
    el.addEventListener(eventName, callback, false);
  }
  else if (el.attachEvent) {
    el.attachEvent('on'+eventName, (e) => {
      callback.call(el, e || window.event);
    });
  }
}

export function off(el, eventName, callback) {
  if (el.removeEventListener) {
    el.removeEventListener(eventName, callback);
  }
  else if (el.detachEvent) {
    el.detachEvent('on'+eventName, callback);
  }
}

export function isFunction(func) {
  return typeof func === 'function';
}

export function isNumeric(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

export function position(el) {
  if (!el) {
    return {
      left: 0,
      top: 0
    };
  }

  return {
    left: el.offsetLeft,
    top: el.offsetTop
  };
}

export function offset(el) {
  if (!el) {
    return {
      left: 0,
      top: 0
    };
  }

  var rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

export function width(el) {
  return el.offsetWidth;
}

export function height(el) {
  return el.offsetHeight;
}

export function outerWidthWithMargin(el) {
  var _width = el.offsetWidth;
  var style = el.currentStyle || getComputedStyle(el);

  _width += (parseInt(style.marginLeft) || 0) + (parseInt(style.marginRight) || 0);
  return _width;
}

export function outerHeightWithMargin(el) {
  var _height = el.offsetHeight;
  var style = el.currentStyle || getComputedStyle(el);

  _height += (parseInt(style.marginLeft) || 0) + (parseInt(style.marginRight) || 0);
  return _height;
}

export function closest(el, className) {
  className = className.replace(/^[\b\.]/, '');
  var reg = new RegExp('\\b'+className+'\\b');

  var finder = (el, className) => {
    if (el.className && el.className.match(reg)) {
      return el;
    }
    // matches document
    else if (el.parentNode === null) {
      return null;
    }
    else {
      return finder(el.parentNode, className);
    }
  };

  return finder(el, className);
}

export function assign (target) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

export function get(selector) {
  return document.querySelector(selector);
}
