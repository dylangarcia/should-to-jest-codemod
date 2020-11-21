expect(something.nested).toMatch(/foo/i);
expect(foo).toBeDefined();
expect(foo).not.toBe(expect.anything());
expect(foo(bar)[0]).toMatch(/bar/);
expect(err.problems[0]).toMatch(/oopsies/i);
expect(err.toString()).not.toMatch(/first/);
expect(foo('bar')).toMatch(/baz/);
expect(foo(bar('baz'))).toMatch(/baz/);
expect(foo.bar.baz).toEqual('testeroni');
Promise.reject().catch(err => expect(err.message).toMatch(/cannot complete operation/i));
Promise.reject().catch((err) => {
  expect(err.message).toMatch(/cannot complete operation/i);
});
expect([1, 2]).toHaveLength(2);
expect(foo(bar)).toBe(true);
expect(foo.bar).toEqual(1);
expect(foo).toEqual(1);
expect(foo).toEqual(1);
expect(foo).toEqual(1);
// preserve-comments
expect(foo).toEqual(1);
expect(foo).toEqual({});
// preserve-floating-comments
somethingThatDoesntMatch();
expect(foo.length).toBeGreaterThan(5);
expect(foo).toBe(true);
expect((foo === bar)).toBe(true);
