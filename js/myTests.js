QUnit.test('deviceOrientation', function( assert ){
  assert.deepEqual(deviceOrientation.getValues(), [['alpha', 0], ['beta', 0], ['gamma', 0]], "deviceOrientation.getValues(): returns after init -> [['alpha', 0], ['beta', 0], ['gamma', 0]]");
  deviceOrientation.setValues(1,2,3);
  assert.deepEqual(deviceOrientation.getValues(), [['alpha', 1], ['beta', 2], ['gamma', 3]], "deviceOrientation.getValues(): returns after setValues(1,2,3) -> [['alpha', 1], ['beta', 2], ['gamma', 3]]");
});
