should(something.nested).match(/foo/i);
should.exist(foo);
should.not.exist(foo);
foo(bar)[0].should.match(/bar/);
err.problems[0].should.match(/oopsies/i);
err.toString().should.not.match(/first/);
foo('bar').should.match(/baz/);
foo(bar('baz')).should.match(/baz/);
foo.bar.baz.should.eql('testeroni');
Promise.reject().catch((err) => should(err.message).match(/cannot complete operation/i));
Promise.reject().catch((err) => {
  should(err.message).match(/cannot complete operation/i);
});
should([1, 2]).have.length(2);
should(foo(bar));
should(foo.bar).be.eql(1);
should(foo).eql(1);
should(foo).be.equal(1);
should(foo).equal(1);
// preserve-comments
should(foo).equal(1);
foo.should.be.eql({});
// preserve-floating-comments
somethingThatDoesntMatch();
foo.length.should.be.above(5);
foo.should.be.true;
(foo === bar).should.be.true;
should.throws(function() {
	throw new Error('kaboom');
}, /kaboom/i);
things.map(thing => isThing(thing).should.be.eql(true));
foo["bar"].length.should.be.equal(1);
foo.fields.should.containEql(bar.id);
