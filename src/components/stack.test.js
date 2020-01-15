import Stack from './stack.js';

describe('stack constructor', () => {
  it('constructor size 1', () => {
    const stack = new Stack(1);
    expect(stack).toEqual({arr: [undefined], capacity: 1, top: -1});
  });
  it('constructor size 3', () => {
    const stack = new Stack(3);
    expect(stack).toEqual({arr: [undefined, undefined, undefined], capacity: 3, top: -1});
  });
  it('constructor size 0', () => {
    const stack = new Stack(0);
    expect(stack).toEqual({arr: [], capacity: 0, top: -1});
  });
  it('constructor no size', () => {
    const stack = new Stack();
    expect(stack).toEqual({arr: [undefined], capacity: undefined, top: -1});
  });
});
describe('stack methods', () => {
  it('push', () => {
    const stack = new Stack(3);
    expect(stack.push(1)).toBe(1);
    expect(stack.push(2)).toBe(2);
    expect(stack.arr).toEqual([1, 2, undefined]);
    expect(stack.push(3)).toBe(3);
    try {
      stack.push(4);
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(stack.arr).toEqual([1, 2, 3]);
  });
  it('push no capacity', () => {
    const stack = new Stack();
    expect(stack.push(1)).toBe(1);
    expect(stack.push(2)).toBe(2);
    expect(stack.arr).toEqual([1, 2]);
    expect(stack.push(3)).toBe(3);
    try {
      stack.push(4);
    } catch (error) {
      expect(error).toBeFalsy();
    };
    expect(stack.arr).toEqual([1, 2, 3, 4]);
  });
  it('pop', () => {
    const stack = new Stack(3);
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.arr).toEqual([1, undefined, undefined]);
    expect(stack.pop()).toBe(1);
    expect(stack.arr).toEqual([undefined, undefined, undefined]);
    try {
      stack.pop();
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(stack.arr).toEqual([undefined, undefined, undefined]);

  });
  it('isEmpty', () => {
    const stack = new Stack(3);
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);

  });
  it('isFull', () => {
    const stack = new Stack(2);
    expect(stack.isFull()).toBe(false);
    stack.push(1);
    expect(stack.isFull()).toBe(false);
    stack.push(2);
    expect(stack.isFull()).toBe(true);

  });
  it('peek', () => {
    const stack = new Stack(2);
    expect(stack.peek()).toBe(undefined);
    try {
      stack.pop();
    } catch (error) {
    }
    expect(stack.peek()).toBe(undefined);
    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    try {
      stack.push(3);
    } catch (error) {
    }
    expect(stack.peek()).toBe(2);
    stack.pop();
    expect(stack.peek()).toBe(1);
  });
  it('size', () => {
    const stack = new Stack(2);
    expect(stack.size()).toBe(0);
    try {
      stack.pop();
    } catch (error) {
    };
    expect(stack.size()).toBe(0);
    stack.push(1);
    expect(stack.size()).toBe(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
    try {
      stack.push(3);
    } catch (error) {
    };
    expect(stack.size()).toBe(2);
    stack.pop();
    expect(stack.size()).toBe(1);
  });
});