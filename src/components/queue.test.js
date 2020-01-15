import {
  Queue, 
  ReverseEnqueueStack, 
  ReverseDequeueStack,
  RecursiveStack
} from './queue.js';

describe('queue constructor', () => {
  it('constructor size 1', () => {
    const queue = new Queue(1);
    expect(queue).toEqual({
      arr: [undefined], 
      capacity: 1, 
      front: 0, 
      rear: -1, 
      count: 0
    });
  });
  it('constructor size 3', () => {
    const queue = new Queue(3);
    expect(queue).toEqual({
      arr: [undefined, undefined, undefined], 
      capacity: 3, 
      front: 0, 
      rear: -1, 
      count: 0
    });
  });
  it('constructor size 0', () => {
    const queue = new Queue(0);
    expect(queue).toEqual({
      arr: [], 
      capacity: 0, 
      front: 0, 
      rear: -1, 
      count: 0
    });
  });
  it('constructor no size', () => {
    const queue = new Queue();
    expect(queue).toEqual({
      arr: [undefined], 
      capacity: undefined, 
      front: 0, 
      rear: -1, 
      count: 0
    });
  });
});
describe('queue methods', () => {
  it('enqueue', () => {
    const queue = new Queue(2);
    expect(queue.enqueue(1)).toBe(1);
    expect(queue.enqueue(2)).toBe(2);
    expect(queue.arr).toEqual([1, 2]);
    try {
      queue.enqueue(3);
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(queue.arr).toEqual([1, 2]);
  });
  it('dequeue', () => {
    const queue = new Queue(3);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.arr).toEqual([undefined, 2, 3]);
    expect(queue.dequeue()).toBe(2);
    expect(queue.arr).toEqual([undefined, undefined, 3]);
    expect(queue.dequeue()).toBe(3);
    expect(queue.arr).toEqual([undefined, undefined, undefined]);
    try {
      queue.dequeue();
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(queue.arr).toEqual([undefined, undefined, undefined]);

  });
  it('isEmpty', () => {
    const queue = new Queue(3);
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);

  });
  it('isFull', () => {
    const queue = new Queue(2);
    expect(queue.isFull()).toBe(false);
    queue.enqueue(1);
    expect(queue.isFull()).toBe(false);
    queue.enqueue(2);
    expect(queue.isFull()).toBe(true);

  });
  it('peek', () => {
    const queue = new Queue(2);
    expect(queue.peek()).toBe(undefined);
    try {
      queue.dequeue();
    } catch (error) {
    }
    expect(queue.peek()).toBe(undefined);
    queue.enqueue(1);
    expect(queue.peek()).toBe(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
    try {
      queue.enqueue(3);
    } catch (error) {
    }
    expect(queue.peek()).toBe(1);
    queue.dequeue();
    expect(queue.peek()).toBe(2);
    queue.dequeue();
    expect(queue.peek()).toBe(undefined);
  });
  it('size', () => {
    const queue = new Queue(2);
    expect(queue.size()).toBe(0);
    try {
      queue.dequeue();
    } catch (error) {
    };
    expect(queue.size()).toBe(0);
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
    try {
      queue.enqueue(3);
    } catch (error) {
    };
    expect(queue.size()).toBe(2);
    queue.dequeue();
    expect(queue.size()).toBe(1);
  });
});

describe('reverse queue built on stack', () => {
  it('enqueue', () => {
    const queue = new ReverseEnqueueStack(2);
    expect(queue.enqueue(1)).toBe(1);
    expect(queue.enqueue(2)).toBe(2);
    expect(queue.arr).toEqual([1, 2]);
    try {
      queue.enqueue(3);
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(queue.arr).toEqual([1, 2]);
  });
  it('dequeue', () => {
    const queue = new ReverseEnqueueStack(3);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.arr).toEqual([2, 3, undefined]);
    expect(queue.size()).toBe(2);

    expect(queue.enqueue(4)).toBe(3);
    expect(queue.arr).toEqual([2, 3, 4]);
    expect(queue.size()).toBe(3);

    expect(queue.dequeue()).toBe(2);
    expect(queue.arr).toEqual([3, 4, undefined]);
    expect(queue.size()).toBe(2);

    expect(queue.dequeue()).toBe(3);
    expect(queue.arr).toEqual([4, undefined, undefined]);
    expect(queue.size()).toBe(1);

    expect(queue.dequeue()).toBe(4);
    expect(queue.arr).toEqual([undefined, undefined, undefined]);
    expect(queue.size()).toBe(0);
    try {
      queue.dequeue();
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(queue.arr).toEqual([undefined, undefined, undefined]);
  });
});

describe('reverse dequeue built on stack', () => {
  it('enqueue', () => {
    const queue = new ReverseDequeueStack(2);
    expect(queue.enqueue(1)).toBe(1);
    expect(queue.enqueue(2)).toBe(2);
    expect(queue.size()).toBe(2);
    expect(queue.arr).toEqual([1, 2]);
    try {
      queue.enqueue(3);
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(queue.size()).toBe(2);
    expect(queue.arr).toEqual([1, 2]);
  });
  it('dequeue', () => {
    const queue = new ReverseDequeueStack(3);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.arr).toEqual([2, 3, undefined]);
    expect(queue.size()).toBe(2);

    expect(queue.enqueue(4)).toBe(3);
    expect(queue.arr).toEqual([2, 3, 4]);
    expect(queue.size()).toBe(3);

    expect(queue.dequeue()).toBe(2);
    expect(queue.arr).toEqual([3, 4, undefined]);
    expect(queue.size()).toBe(2);

    expect(queue.dequeue()).toBe(3);
    expect(queue.arr).toEqual([4, undefined, undefined]);
    expect(queue.size()).toBe(1);

    expect(queue.dequeue()).toBe(4);
    expect(queue.arr).toEqual([undefined, undefined, undefined]);
    expect(queue.size()).toBe(0);
    try {
      queue.dequeue();
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(queue.arr).toEqual([undefined, undefined, undefined]);
  });
});

describe('recursive queue built on stack', () => {
  it('enqueue', () => {
    const queue = new RecursiveStack(2);
    expect(queue.enqueue(1)).toBe(1);
    expect(queue.enqueue(2)).toBe(2);
    expect(queue.size()).toBe(2);
    expect(queue.arr).toEqual([1, 2]);
    try {
      queue.enqueue(3);
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(queue.size()).toBe(2);
    expect(queue.arr).toEqual([1, 2]);
  });
  it('dequeue', () => {
    const queue = new RecursiveStack(3);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.arr).toEqual([2, 3, undefined]);
    expect(queue.size()).toBe(2);

    expect(queue.enqueue(4)).toBe(3);
    expect(queue.arr).toEqual([2, 3, 4]);
    expect(queue.size()).toBe(3);

    expect(queue.dequeue()).toBe(2);
    expect(queue.arr).toEqual([3, 4, undefined]);
    expect(queue.size()).toBe(2);

    expect(queue.dequeue()).toBe(3);
    expect(queue.arr).toEqual([4, undefined, undefined]);
    expect(queue.size()).toBe(1);

    expect(queue.dequeue()).toBe(4);
    expect(queue.arr).toEqual([undefined, undefined, undefined]);
    expect(queue.size()).toBe(0);
    try {
      queue.dequeue();
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(queue.arr).toEqual([undefined, undefined, undefined]);
  });
  it('no cap', () => {
    const queue = new RecursiveStack();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.arr).toEqual([2, 3, undefined]);
    expect(queue.size()).toBe(2);

    expect(queue.enqueue(4)).toBe(3);
    expect(queue.arr).toEqual([2, 3, 4]);
    expect(queue.size()).toBe(3);

    expect(queue.dequeue()).toBe(2);
    expect(queue.arr).toEqual([3, 4, undefined]);
    expect(queue.size()).toBe(2);

    expect(queue.dequeue()).toBe(3);
    expect(queue.arr).toEqual([4, undefined, undefined]);
    expect(queue.size()).toBe(1);

    expect(queue.dequeue()).toBe(4);
    expect(queue.arr).toEqual([undefined, undefined, undefined]);
    expect(queue.size()).toBe(0);
    try {
      queue.dequeue();
    } catch (error) {
      expect(error).toBeTruthy();
    };
    expect(queue.arr).toEqual([undefined, undefined, undefined]);
  });
});