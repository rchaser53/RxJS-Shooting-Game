const expect = require('chai').expect;
const {
	getRandomNumber,
	getRandomBoolean,
	firstFilter,
	decisions,
	filterByKeyCode
} = require('../../src/util/util');

const {
	isShotAtActorLeft,
	isShotAtActorTop,
	checkOutOrIn
} = decisions;


describe('test', () => {
  it('return number from min to max', () => {
	const ret = getRandomNumber(10,20);
	expect(10 <= ret && ret <= 20).to.equal(true);
  });

  it('return boolean', () => {
	const ret = getRandomNumber(10,20);
	expect(typeof getRandomBoolean()).to.equal("boolean");
  });

  it('return true', () => {
    expect(firstFilter({keyCode:32})).to.equal(true);
    expect(firstFilter({keyCode:37})).to.equal(true);
    expect(firstFilter({keyCode:40})).to.equal(true);
  });

  it('return function', () => {
    expect(typeof filterByKeyCode([1,2])).to.equal("function");
  });

  it('function returned from filterByKeyCode return true', () => {
	const tempFunc = filterByKeyCode([1,2]);
	expect(tempFunc({keyCode:2})).to.equal(true);
  });

  it('return true when actorWidth is 10 and barWidth is 10', () => {
	expect(isShotAtActorLeft(15,25)).to.equal(true);
  });

  it('return false when actorWidth is 10 and barWidth is 10', () => {
	expect(isShotAtActorLeft(15,26)).to.equal(false);
  });

  it('return true when actorHeight is 3', () => {
	expect(isShotAtActorTop(12,10)).to.equal(true);
  });

  it('return false when actorHeight is 3', () => {
	expect(isShotAtActorTop(13,10)).to.equal(false);
  });

  it('return false when actorHeight is 3', () => {
	expect(checkOutOrIn(14,10)).to.equal(true);
  });

  it('return false', () => {
	expect(checkOutOrIn(-1,10)).to.equal(false);
  });

  it('return false', () => {
	expect(checkOutOrIn(22,100)).to.equal(false);
  });
});