(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ScrollDir = global.ScrollDir || {}, global.ScrollDir.auto = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var ScrollDir =
  /*#__PURE__*/
  function () {
    function ScrollDir(_o) {
      var _this = this;

      _classCallCheck(this, ScrollDir);

      var that = this;
      this.setOptions(_o);

      this.onScroll = function () {
        return void _this.tick();
      };

      this.handler = function handler(event) {
        that._lastScrollTs = event.timeStamp;
        return that.el_win.requestAnimationFrame(that.onScroll);
      };

      this.init();
      this.initialized = true;
    }

    _createClass(ScrollDir, [{
      key: "setOptions",
      value: function setOptions(_o) {
        if (this.el && this.ops.attribute !== false) {
          this.el.removeAttribute(this.ops.attribute);
        }

        this.ops = _objectSpread({
          off: false,
          dir: 'down',
          el: 'html',
          win: 'window',
          onChange: function onChange() {},
          attribute: 'data-scrolldir',
          _historyLength: 32,
          // Ticks to keep in history.
          _historyMaxAge: 512,
          // History data time-to-live (ms).
          _thresholdPixels: 64
        }, this.ops || {}, _o);
        this.enabled = false;
        this.dir = this.ops.dir === 'down' ? 'down' : 'up';
        this.el_body = document.body;
        this.el = this.ops.el === 'html' ? document.documentElement : this.getElem(this.ops.el);
        this.el_win = this.ops.win === 'window' ? window : this.getElem(this.ops.win);
        this._last = {
          dir: null,
          enabled: null
        };
        this._history = Array(this.ops._historyLength);
        this._pivot = this.el_win.scrollY || this.el_win.pageYOffset; // "high-water mark"

        this._lastScrollTs = 0; // last scroll event

        this._pivotTime = 0;

        if (this.initialized) {
          this.init();
        }
      }
    }, {
      key: "change",
      value: function change() {
        if (typeof this.ops.onChange === 'function') {
          this.ops.onChange(this.dir, this.enabled, this.ops.attribute);
        }
      }
    }, {
      key: "init",
      value: function init() {
        void (this.ops.off ? this.disable() : this.enable());
      }
    }, {
      key: "getElem",
      value: function getElem(el) {
        return el && el.nodeType === 1 ? el : typeof el === 'string' ? document.querySelector(el) : null;
      }
    }, {
      key: "update",
      value: function update(force) {
        if (force || this.enabled !== this._last.enabled || this.dir !== this._last.dir) {
          this._last.dir = this.dir;
          this._last.enabled = this.enabled;

          if (this.ops.attribute !== false) {
            this.el.setAttribute(this.ops.attribute, this.enabled ? this.dir : 'off');
          }
        }

        this.change();
      }
    }, {
      key: "enable",
      value: function enable() {
        if (!this.enabled) {
          this.el_win.addEventListener('scroll', this.handler);
        }

        this.enabled = true;
        this.update();
      }
    }, {
      key: "disable",
      value: function disable() {
        if (this.enabled) {
          this.el_win.addEventListener('scroll', this.handler);
        }

        this.enabled = false;
        this.update();
      }
    }, {
      key: "tick",
      value: function tick() {
        var y = this.el_win.scrollY || this.el_win.pageYOffset;
        var t = this._lastScrollTs;
        var furthest = this.dir === 'down' ? Math.max : Math.min; // Apply bounds to handle rubber banding

        var yMax = this.el_body.scrollHeight - this.el_win.innerHeight;
        y = Math.max(0, y);
        y = Math.min(yMax, y); // Update history

        this._history.unshift({
          y: y,
          t: t
        });

        this._history.pop(); // Are we continuing in the same direction?


        if (y === furthest(this._pivot, y)) {
          // Update "high-water mark" for current direction
          this._pivotTime = t;
          this._pivot = y;
          return;
        } // else we have backed off high-water mark
        // Apply max age to find current reference point


        var cutoffTime = t - this.ops._historyMaxAge;

        if (cutoffTime > this._pivotTime) {
          this._pivot = y;

          for (var i = 0; i < this.ops._historyLength; i += 1) {
            if (!this._history[i] || this._history[i].t < cutoffTime) {
              break;
            }

            this._pivot = furthest(this._pivot, this._history[i].y);
          }
        } // Have we exceeded threshold?


        if (Math.abs(y - this._pivot) > this.ops._thresholdPixels) {
          this._pivot = y;
          this._pivotTime = t;
          this.dir = this.dir === 'down' ? 'up' : 'down';
          this.update();
        }
      }
    }]);

    return ScrollDir;
  }();

  var scrolldir_auto = new ScrollDir();

  return scrolldir_auto;

})));
