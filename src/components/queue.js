import Stack from './stack';

const Queue = class {
  constructor(size) {
    this.arr = new Array(size);
    this.capacity = size;
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }
  enqueue(data) {
    if (!this.isFull()) {
      // this.rear = (this.rear + 1) % this.capacity;
      this.rear++;
      this.arr[this.rear] = data;
      this.count++;
      return this.size();
    } else {
      throw Error('stack is full');
    };
  }
  dequeue() {
    if (!this.isEmpty()) {
      const removed = this.arr[this.front];
      this.arr[this.front] = undefined;
      // this.front = (this.front + 1) % this.capacity;
      this.front++;
      this.count--;
      return removed;
    } else {
      throw Error('stack is empty');
    }
  }
  isEmpty() {
    return this.size() === 0;
    // return this.front === 0; 
  }
  isFull() {
    return this.size() === this.capacity;
  }
  peek() {
    if (!this.isEmpty()) {
      return this.arr[this.front];
    };
  }
  size() {
    return this.count;
  }
};

// Queue based on Stack structure, reversing in enqueue
const ReverseEnqueueStack = class extends Stack {
  constructor(size) {
    super(size);
    this.stackA = new Stack(size);
    this.stackB = new Stack(size);
  };
  enqueue(data) {
    const sa = this.stackA;
    const sb = this.stackB;
    if (!this.isFull()) {
      // move everything to stack B
      while (!sa.isEmpty()) {
        sb.push(sa.pop());
      };
      // push new item
      sa.push(data);
      // move everything back in reverse order
      while (!sb.isEmpty()) {
        sa.push(sb.pop());
      };
      // update this
      this.push(data);
      return this.size();
    } else {
      throw Error('stack is full');
    };
  }
  dequeue() {
    if (!this.isEmpty()) {
      const sa = this.stackA;
      const removed = sa.pop();
      // replace this array with reverse of stack A
      for (let i=0, j=sa.size()-1; i<sa.capacity; i++, j--) {
        this.arr[i] = (j>-1) ? sa.arr[j] : undefined;
      };
      // update this top
      this.top = sa.top;
      return removed;
    } else {
      throw Error('stack is empty');
    };
  }
};

// Queue based on Stack structure, reverse dequeue isntead of enqueue
const ReverseDequeueStack = class extends Stack {
  constructor(size) {
    super(size);
    // this.stackA = new Stack(size);
    this.stackB = new Stack(size);
  };
  enqueue(data) {
    if (!this.isFull()) {
      return this.push(data);
    } else {
      throw Error('stack is full');
    };
  }
  dequeue() {
    const sb = this.stackB;
    if (!this.isEmpty()) {
      // move everything to stack B if it hasn't already
      if (sb.size() !== this.size()) {
        this.stackB = new Stack(this.capacity);
        while (!this.isEmpty()) { 
          sb.push(this.pop());
        };
      }; 
      const removed = sb.pop();
      // replace this array with reverse of stack B
      for (let i=0, j=sb.size()-1; i<sb.capacity; i++, j--) {
        this.arr[i] = (j>-1) ? sb.arr[j] : undefined;
      };
      // update this top
      this.top = sb.top;
      return removed;
    } else {
      throw Error('stack is empty');
    };
  }
};

// Queue based on Stack structure, reverse dequeue isntead of enqueue
const RecursiveStack = class extends Stack {
  // constructor(size) {
  //   super(size);
  // };
  enqueue(data) {
    if (!this.isFull()) {
      return this.push(data);
    } else {
      throw Error('stack is full');
    };
  }
  dequeue() {
    if (!this.isEmpty()) {
      // pop an item
      const removed = this.pop();
      // when stack becomes empty, return the last popped item
      if (this.isEmpty()) {
        return removed;
      };
      // recur
      const item = this.dequeue();
      // push popped item back to rebuild stack
      this.push(removed);
      // return the result of the dequeue call
      return item;
    } else {
      throw Error('stack is empty');
    };
  }
};

export {
  Queue, 
  ReverseEnqueueStack, 
  ReverseDequeueStack, 
  RecursiveStack
};