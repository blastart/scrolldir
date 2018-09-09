var cbDir = null
var cbEnabled = null
var QUnit = window.QUnit;
var scrollDir = new ScrollDir({
  onChange: function(dir, enabled) {
    cbDir = dir
    cbEnabled = enabled
    console.log(dir, enabled)
  }
});

QUnit.test( "hello test", function(assert) {
  assert.ok(1 == "1", "Passed!")
})

QUnit.test( "Is scroll intent there?", function(assert) {
  assert.equal(document.querySelector('[data-scrolldir]').getAttribute('data-scrolldir'), 'down', 'there should be a scroll intent')
  assert.equal(cbDir, 'down', 'callback param1 should be "down"')
})

QUnit.test( "scrollDir off", function(assert) {
  scrollDir.setOptions({off: true})
  assert.equal(document.querySelector('[data-scrolldir]').getAttribute('data-scrolldir'), 'off', 'scrolldir should read as off')
  assert.equal(cbEnabled, false, 'callback param1 should read as false')
})

QUnit.test( "scrollDir has a different attribute", function(assert) {
  scrollDir.setOptions({attribute: 'data-scroll-direction', off: false})
  assert.equal(document.querySelector('[data-scroll-direction]').getAttribute('data-scroll-direction'), 'down', 'scrolldir attribute should be scroll-direction')
  assert.equal(cbDir, 'down', 'callback param1 should be "down"')
})

QUnit.test( "scrollDir has a different attribute", function(assert) {
  scrollDir.setOptions({el: document.body, attribute: 'data-scroll-new-attribute'})
  assert.equal(document.querySelector('[data-scroll-new-attribute]').getAttribute('data-scroll-new-attribute'), 'down', 'scrolldir attribute should be on a new element')
  assert.equal(cbDir, 'down', 'callback param1 should be "down"')
})
