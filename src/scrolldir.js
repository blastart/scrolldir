class ScrollDir {

  constructor(_o) {
    const that = this
    this.setOptions(_o)
    this.onScroll = () => void this.tick()
    this.handler = function handler(event) {
      that._lastScrollTs = event.timeStamp
      return that.el_win.requestAnimationFrame(that.onScroll)
    }

    this.init()
    this.initialized = true
  }

  setOptions(_o) {
    if (this.el && this.ops.attribute !== false) {
      this.el.removeAttribute(this.ops.attribute)
    }

    this.ops = {
      off: false,
      dir: 'down',
      el: 'html',
      win: 'window',
      onChange: function() {},
      attribute: 'data-scrolldir',
      _historyLength: 32, // Ticks to keep in history.
      _historyMaxAge: 512, // History data time-to-live (ms).
      _thresholdPixels: 64, // Ignore moves smaller than this.
      ...(this.ops || {}),
      ..._o
    }

    this.enabled = false
    this.dir = this.ops.dir === 'down' ? 'down' : 'up'
    this.el_body = document.body
    this.el = this.ops.el === 'html' ? document.documentElement : this.getElem(this.ops.el)
    this.el_win = this.ops.win === 'window' ? window : this.getElem(this.ops.win)
    this._last = {dir: null, enabled: null}
    this._history = Array(this.ops._historyLength)
    this._pivot = this.el_win.scrollY || this.el_win.pageYOffset // "high-water mark"
    this._lastScrollTs = 0 // last scroll event
    this._pivotTime = 0

    if (this.initialized) { this.init() }
  }

  change() {
    if (typeof this.ops.onChange === 'function') {
      this.ops.onChange(this.dir, this.enabled, this.ops.attribute)
    }
  }

  init() {
    void (this.ops.off ? this.disable() : this.enable())
  }

  getElem(el) {
    return el && el.nodeType === 1 ? el : (
      typeof el === 'string' ? document.querySelector(el) : null
    )
  }

  update(force) {
    if (force || this.enabled !== this._last.enabled || this.dir !== this._last.dir
    ) {
      this._last.dir = this.dir
      this._last.enabled = this.enabled
      if (this.ops.attribute !== false) {
        this.el.setAttribute(this.ops.attribute, this.enabled ? this.dir : 'off')
      }
    }
    this.change()
  }

  enable() {
    if (!this.enabled) {
      this.el_win.addEventListener('scroll', this.handler)
    }
    this.enabled = true
    this.update()
  }

  disable() {
    if (this.enabled) {
      this.el_win.addEventListener('scroll', this.handler)
    }
    this.enabled = false
    this.update()
  }

  tick() {
    let y = this.el_win.scrollY || this.el_win.pageYOffset
    const t = this._lastScrollTs
    const furthest = this.dir === 'down' ? Math.max : Math.min

    // Apply bounds to handle rubber banding
    const yMax = this.el_body.scrollHeight - this.el_win.innerHeight
    y = Math.max(0, y)
    y = Math.min(yMax, y)

    // Update history
    this._history.unshift({ y, t })
    this._history.pop()

    // Are we continuing in the same direction?
    if (y === furthest(this._pivot, y)) {
      // Update "high-water mark" for current direction
      this._pivotTime = t
      this._pivot = y
      return
    }
    // else we have backed off high-water mark

    // Apply max age to find current reference point
    const cutoffTime = t - this.ops._historyMaxAge
    if (cutoffTime > this._pivotTime) {
      this._pivot = y
      for (let i = 0; i < this.ops._historyLength; i += 1) {
        if (!this._history[i] || this._history[i].t < cutoffTime) {
          break
        }
        this._pivot = furthest(this._pivot, this._history[i].y)
      }
    }

    // Have we exceeded threshold?
    if (Math.abs(y - this._pivot) > this.ops._thresholdPixels) {
      this._pivot = y
      this._pivotTime = t
      this.dir = this.dir === 'down' ? 'up' : 'down'
      this.update()
    }
  }
}

export default ScrollDir
