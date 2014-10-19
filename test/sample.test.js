var assert = require('assert');

describe("a test", function(){
  var foo = false;
 
  beforeEach(function(done){
 
    setTimeout(function(){
      foo = true;
      done();
    }, 50);
 
  });
 
  it("should pass", function(){
    assert.equal(foo, true);
  });
 
});
