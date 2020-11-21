const matchers = {
  'should().match();': (actual, expected) =>
    `expect(${actual}).toMatch(${expected});`,
  'should().have.length();': (actual, expected) =>
    `expect(${actual}).toHaveLength(${expected});`,
  'should.not.exist();': (actual, expected) =>
    `expect(${expected}).not.toBe(expect.anything());`,
  'should.exist();': (actual, expected) => `expect(${expected}).toBeDefined();`,
  'actual.should.not.match();': (actual, expected) =>
    `expect(${actual}).not.toMatch(${expected});`,
  'actual.should.match();': (actual, expected) =>
    `expect(${actual}).toMatch(${expected});`,
  'actual.should.eql();': (actual, expected) =>
    `expect(${actual}).toEqual(${expected});`,
};

module.exports = matchers;