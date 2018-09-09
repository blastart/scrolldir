var scrollDir = new ScrollDir();

QUnit.test( "Is scrolldir there?", function(assert) {
  scrollDir.setOptions({off: true});
  assert.equal(document.querySelector('[data-scrolldir]').getAttribute('data-scrolldir'), 'off', 'there should not be scrolldir');
});
