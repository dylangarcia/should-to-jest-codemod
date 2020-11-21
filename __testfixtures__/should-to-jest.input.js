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
