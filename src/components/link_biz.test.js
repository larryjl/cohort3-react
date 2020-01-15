import {
  linkNode, 
  linkList, 
  linkListDummy, 
  linkListDouble,
  functions
} from './link_biz';

describe('linkList', () => {
  const data = [
    {subject: 'a', amount: 0},
    {subject: 'b', amount: 1},
    {subject: 'c', amount: 2}
  ];
  test('show', () => {
    const node = new linkNode({subject: 'a', amount: 0}, null);
    expect(node.show()).toBe('amount: 0, subject: a');
  });

  test('naive list', () => {
    const list = {
      node0: new linkNode({subject: 'a', amount: 0}),
      node1: new linkNode({subject: 'b', amount: 1}),
      node2: new linkNode({subject: 'c', amount: 2}),
    };
    list.head = list.node0;
    list.node0.forwardNode = list.node1;
    list.node1.forwardNode = list.node2;
    
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);
  });

test('single line nested list', () => {
    const list = {
        head: new linkNode({subject: 'a', amount: 0}, 
        new linkNode({subject: 'b', amount: 1}, 
        new linkNode({subject: 'c', amount: 2}, null)))
    };
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);
  });

  test('generic iterated list', () => {
    const n = data.length;
    let list = {head: null};
    let node = null;
    for (let i=n-1; i>=0; i--) {
      node = new linkNode(data[i], node);
    };
    list.head = node;
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);
    expect(list.head.forwardNode.forwardNode.forwardNode).toBe(null);
  });

  test('list as class, add to start', () => {
    const list = new linkList(data)
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);
    expect(list.tail.amount).toBe(2);

    list.head = list.linkAdd(list.head, {subject: 'd', amount: 3});
    expect(list.head.amount).toBe(3);
    expect(list.head.forwardNode.amount).toBe(0);
  });

  test('list as class, add to end', () => {
    const list = new linkList(data)
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);

    list.linkTail({subject: 'd', amount: 3});
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.forwardNode.forwardNode.amount).toBe(3);
    expect(list.tail.amount).toBe(3);
  });

  test('list using dummy', () => {
    const list = new linkListDummy(data)
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);
    expect(list.head.forwardNode.forwardNode.forwardNode).toBe(undefined);
    expect(list.tail.amount).toBe(2);
    expect(list.tail.forwardNode).toBe(undefined);

    list.head = list.linkAdd(list.head, {subject: 'd', amount: 3});
    expect(list.head.amount).toBe(3);
    expect(list.head.forwardNode.amount).toBe(0);
  });
});

describe('linkList Dummy', () => {
  const data = [
    {subject: 'a', amount: 0},
    {subject: 'b', amount: 1},
    {subject: 'c', amount: 2},
    {subject: 'd', amount: 3},
  ];
  test('first', () => {
    const list = new linkListDummy(data);
    const result = list.first();
    expect(result.amount).toBe(0);
  });
  test('last', () => {
    const list = new linkListDummy(data);
    const result = list.last();
    expect(result.amount).toBe(3);
  });
  test('next', () => {
    const list = new linkListDummy(data);
    let node = list.head.forwardNode;
    const result = list.next(node);
    expect(result.amount).toBe(2);
  });
  test('previous', () => {
    const list = new linkListDummy(data);
    let node = list.head.forwardNode.forwardNode;
    const result = list.previous(node);
    expect(result.amount).toBe(1);
  });
  test('insert', () => {
    const info = {subject: 'z', amount: 99};
    const list = new linkListDummy(data);
    let node = list.head;
    const result = list.insert(node, info);
    expect(list.head.amount).toBe(0);
    expect(result.amount).toBe(99);
    expect(list.head.forwardNode.amount).toBe(99);
    expect(result.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.amount).toBe(1);
  });
  test('delete', () => {
    const list = new linkListDummy(data);
    let node = list.head.forwardNode;
    const result = list.delete(node);
    expect(result.amount).toBe(2);
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(2);
  });
});

describe('doubly linked list', () => {
  const data = [
    {subject: 'a', amount: 0},
    {subject: 'b', amount: 1},
    {subject: 'c', amount: 2},
    {subject: 'd', amount: 3},
  ];
  test('create', () => {
    const list = new linkListDouble(data);
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(1);
    expect(list.head.prevNode).toBe(undefined);
    expect(list.head.forwardNode.forwardNode.amount).toBe(2);
    expect(list.head.forwardNode.prevNode.amount).toBe(0);
    expect(list.tail.amount).toBe(3);
    expect(list.tail.forwardNode).toBe(undefined);
    expect(list.tail.prevNode.amount).toBe(2);
  });
  test('add to start', () => {
    const list = new linkListDouble(data);
    list.head = list.add(list.head, {subject: 'e', amount: 4});
    expect(list.head.amount).toBe(4);
    expect(list.head.forwardNode.amount).toBe(0);
    expect(list.head.forwardNode.prevNode.amount).toBe(4);
  });
  test('insert after', () => {
    const list = new linkListDouble(data);
    list.insert(list.head, {subject: 'e', amount: 4});
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(4);
    expect(list.head.forwardNode.forwardNode.amount).toBe(1);
    expect(list.head.forwardNode.forwardNode.prevNode.amount).toBe(4);
  });
  test('previous for doubly linked', () => {
    const list = new linkListDouble(data);
    let node = list.head.forwardNode.forwardNode;
    expect(list.head.forwardNode.prevNode.amount).toBe(0);
    expect(node.prevNode.amount).toBe(1);
    const result = list.previous(node);
    expect(result.amount).toBe(1);
  });
  test('delete', () => {
    const list = new linkListDouble(data);
    let node = list.head.forwardNode;
    const result = list.delete(node);
    expect(result.amount).toBe(2);
    expect(list.head.amount).toBe(0);
    expect(list.head.forwardNode.amount).toBe(2);
  });
});

describe('aggregate functions', () => {

  const data = [
    {subject: 'a', amount: 0},
    {subject: 'b', amount: 1},
    {subject: 'c', amount: 2},
  ];
  test('print list', () => {
    console.log = jest.fn();
    const list = new linkListDouble(data)
    list.printList();
    expect(console.log.mock.calls.length).toBe(3);
    expect(console.log.mock.calls).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2]
    ]);
  });
  test('show list', () => {
    const list = new linkListDouble(data)
    expect(list.showList()).toBe(
      'amount: 0, subject: a; amount: 1, subject: b; amount: 2, subject: c');
  });
  test('array list', () => {
    const list = new linkListDouble(data);
    expect(list.arrayList()).toEqual([
      {amount: 0, subject: 'a'}, 
      {amount: 1, subject: 'b'}, 
      {amount: 2, subject: 'c'}
    ]);
  });
  test('total', () => {
    const list = new linkListDouble(data);
    const result = list.total('amount');
    expect(result).toBe(3);
  });
  test('length', () => {
    const list = new linkListDouble(data);
    const result = list.length();
    expect(result).toBe(3);
  });
});

test('clone object with prototype', () => {
  const node = new linkNode({subject: 'a', amount: 0}, null);
  expect(node.show()).toBe('amount: 0, subject: a');

  let nodeClone = functions.clonePrototype(node);
  expect(nodeClone.show()).toBe('amount: 0, subject: a');
});