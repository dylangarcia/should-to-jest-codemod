const matchers = {
  'should().match()': (actual, expected) =>
    `expect(${actual}).toMatch(${expected})`,
  'should().have.length()': (actual, expected) =>
    `expect(${actual}).toHaveLength(${expected})`,
  'should.not.exist()': (actual, expected) =>
    `expect(${expected}).not.toBe(expect.anything())`,
  'should.exist()': (actual, expected) => `expect(${expected}).toBeDefined()`,
  'actual.should.not.match()': (actual, expected) =>
    `expect(${actual}).not.toMatch(${expected})`,
  'actual.should.match()': (actual, expected) =>
    `expect(${actual}).toMatch(${expected})`,
  'actual.should.eql()': (actual, expected) =>
    `expect(${actual}).toEqual(${expected})`,
  'actual.should.be.eql()': (actual, expected) =>
    `expect(${actual}).toEqual(${expected})`,
  'should().be.eql()': (actual, expected) =>
    `expect(${actual}).toEqual(${expected})`,
  'should().eql()': (actual, expected) =>
    `expect(${actual}).toEqual(${expected})`,
  'should().be.equal()': (actual, expected) =>
    `expect(${actual}).toEqual(${expected})`,
  'actual.should.be.equal()': (actual, expected) =>
    `expect(${actual}).toEqual(${expected})`,
  'should().equal()': (actual, expected) =>
    `expect(${actual}).toEqual(${expected})`,
  'should()': (actual, expected) => `expect(${expected}).toBe(true)`,
  'actual.should.be.above()': (actual, expected) =>
    `expect(${actual}).toBeGreaterThan(${expected})`,
  'actual.should.be.true': (actual, expected) => `expect(${actual}).toBe(true)`,
  '(actual).should.be.true': (actual, expected) =>
    `expect(${actual}).toBe(true)`,
  'should.throws()': (actual, expected) =>
    `expect(${expected[0]}).toThrow(${expected[1]})`,
  'actual.should.containEql()': (actual, expected) =>
    `expect(${actual}).toContainEqual(${expected})`,
};

module.exports = matchers;
