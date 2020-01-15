const linkNode = class {
  constructor(info, forwardNode) {
    this.forwardNode = forwardNode;
    if (info) {
      // this.subject = info.subject;
      // this.amount = info.amount;
      for (let i in info) {
        this[i] = info[i];
      };
    };
  }
  show() {
    // return `subject: ${this.subject}, amount: ${this.amount}`;
    const clone = Object.assign({}, this);
    delete clone.prevNode;
    delete clone.forwardNode;
    let info = Object.entries(clone);
    // info.sort((a,b) => (
    //   (a[0] > b[0]) ? 1 : -1
    // ));
    let string = '';
    let i = 0;
    for (let e of info) {
      string += `${e[0]}: ${e[1]}, `;
      i++;
      if (i>1) {break;};
    };
    string = string.slice(0, -2);
    return string;
  }
};

const linkList = class {
  constructor(data) {
    const n = data.length;
    for (let i=n-1; i>=0; i--) { // start from the end
      this.head = this.linkAdd(this.head, data[i]);
      if (i===n-1) {
        this.tail = this.head;
      };
    };
  }
  // add before
  linkAdd(node, data) {
    const newNode = new linkNode(data, node);
    // previous = node;
    return newNode;
  }
  // add to end
  linkTail(data) {
    // const node = new linkNode(data, null);
    let current = this.head;
    if (!current) {
      // this.head = node;
      this.head = this.linkAdd(this.head, data);
    } else {
      while (current.forwardNode) {
        current = current.forwardNode;
      };
      // current.forwardNode = node;
      current.forwardNode = this.linkAdd(current.forwardNode, data)
    };
    this.tail = current.forwardNode;
    // return this.head;
    return current.forwardNode; 
  }
};

const linkListDummy = class {
  constructor(data) {
    const dummy = new linkNode();
    this.tail = dummy;
    for(let v of data) {
      this.tail.forwardNode = this.linkAdd(this.tail.forwardNode, v);
      this.tail = this.tail.forwardNode;
    };
    this.head = dummy.forwardNode;
  }

  linkAdd(node, data) {
    const newNode = new linkNode(data, node);
    return newNode;
  }
  // first ⇒ position to the first node
  first() {
    return this.head;
  }

  // last ⇒ position to the last node
  last() {
    return this.tail;
  }

  // next ⇒ move to the next node
  next(node) {
    if (node.forwardNode) {
      return node.forwardNode;
    } else {
      console.log('no forward node');
      return node;
    };
  }

  // previous ⇒ backup one node (how are we going to do this?)
  previous(node) {
    if (this.head === node) {
      console.log('no previous node');
      return node;
    };
    let current = this.head;
    while (current) {
      if (current.forwardNode === node) return current;
      current = current.forwardNode;
    };
  }

  // insert ⇒ inserts a new node after the current node (which node will be the current node after the insertion?)
  insert (node, info) {
    let newNode = new linkNode(info, node.forwardNode);
    node.forwardNode = newNode;
    return newNode;
  }

  // delete ⇒ delete the current node (which node will be the current node after the deletion?)
  delete (node) {
    this.previous(node).forwardNode = node.forwardNode;
    if (node.forwardNode) {
      return node.forwardNode;
    } else if (node.prevNode) {
      return node.prevNode;
    } else {
      return {};
    };
  }
};

const linkListDouble = class {
  constructor(data) {
    const n = data.length;
    for (let i = n-1; i >= 0; i--) { // start from the end
      this.head = this.add(this.head, data[i]);
      if (i===n-1) {
        this.tail = this.head;
      };
    };
    this.first = this.first.bind(this);
    this.last = this.last.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.insert = this.insert.bind(this);
    this.delete = this.delete.bind(this);
  }

  // add before when building list
  // newNode.prevNode is undefined
  add(node, data) {
    const newNode = new linkNode(data, node);
    if (node) {
      node.prevNode = newNode;
    };
    return newNode;
  }

  // insert after
  insert(node, data) { 
    const newNode = new linkNode(data, node.forwardNode);
    node.forwardNode = newNode;
    newNode.prevNode = node;
    if (newNode.forwardNode) {
      newNode.forwardNode.prevNode = newNode;
    };
    return newNode;
  }

  first () {
    return this.head;
  }

  last () {
    return this.tail;
  }

  next (node) {
    if (node.forwardNode) {
      return node.forwardNode;
    } else {
      console.log('no forward node');
      return node;
    };
  }

  // previous - using doubly linked list
  previous (node) {
    if (node.prevNode) {
      return node.prevNode;
    } else {
      console.log('no prev node');
      return node;
    };
  }

  delete (node) {
    if (node.prevNode) {
      node.prevNode.forwardNode = node.forwardNode;
    };
    if (node.forwardNode) {
      node.forwardNode.prevNode = node.prevNode;
    };
    if (node.forwardNode) {
      return node.forwardNode;
    } else if (node.prevNode) {
      return node.prevNode;
    } else {
      console.log('no more nodes');
      return {};
    };
  }
  printList() {
    let current = this.head;
    while (current) {
      console.log(current.subject, current.amount);
      current = current.forwardNode;
    };
  }
  showList() {
    let current = this.head;
    let string = '';
    while (current) {
      string += current.show() + '; ';
      current = current.forwardNode;
    };
    string = string.slice(0,-2);
    return string;
  }

  arrayList() {
    let current = this.head;
    let array = [];
    while (current) {
      const clone = Object.assign({}, current);
      delete clone.prevNode;
      delete clone.forwardNode;
      array.push(clone);
      current = current.forwardNode;
    };
    return array;
  }

  total(key) {
    let current = this.head;
    let total = 0;
    while (current) {
      total += +current[key];
      current = current.forwardNode;
    };
    return total;
  }

  length() {
    let current = this.head;
    let length = 0;
    while (current) {
      length++;
      current = current.forwardNode;
    };
    return length;
  }
};

const functions = {
  clonePrototype(obj) {
    return (
      Object.assign(
        Object.create(
            Object.getPrototypeOf(obj)
        ), obj)
    );
  },
  
  // printList(list) {
  //   let current = list.head;
  //   while (current) {
  //     console.log(current.subject, current.amount);
  //     current = current.forwardNode;
  //   };
  // },
  // showList(list) {
  //   let current = list.head;
  //   let string = '';
  //   while (current) {
  //     string += current.show() + '; ';
  //     current = current.forwardNode;
  //   };
  //   string = string.slice(0,-2);
  //   return string;
  // },
  // // We need to have a total function that will show the total of all the amounts of all the ListNodes
  // total(linkList, key) {
  //   let current = linkList.head;
  //   let total = 0;
  //   while (current) {
  //     total += current[key];
  //     current = current.forwardNode;
  //   };
  //   return total;
  // },
  // length(linkList) {
  //   let current = linkList.head;
  //   let length = 0;
  //   while (current) {
  //     length++;
  //     current = current.forwardNode;
  //   };
  //   return length;
  // }
  // 
  // // first ⇒ position to the first node
  // first: (linkList) => {
  //   return linkList.head;
  // },
  // 
  // // last ⇒ position to the last node
  // last: (linkList) => {
  //   return linkList.tail;
  // },
  // // next ⇒ move to the next node
  // next: (node) => {
  //   if (node.forwardNode) {
  //     return node.forwardNode;
  //   } else {
  //     console.log('no forward node');
  //     return node;
  //   };
  // },
  // // previous ⇒ backup one node (how are we going to do this?)
  // previous: (linkList, node) => {
  //   let current = linkList.head;
  //   while (current) {
  //     if (current.forwardNode === node) return current;
  //     current = current.forwardNode;
  //   };
  // },
  // // previous - using doubly linked list
  // previousDouble: (node) => {
  //   return node.prevNode;
  // },
  // // insert ⇒ inserts a new node after the current node (which node will be the current node after the insertion?)
  // insert: (node, info) => {
  //   let newNode = new linkNode(info, node.forwardNode);
  //   node.forwardNode = newNode;
  //   return newNode;
  // },
  // // delete ⇒ delete the current node (which node will be the current node after the deletion?)
  // delete: (list, node) => {
  //   // functions.previous(list, node).forwardNode = node.forwardNode;
  //   node.prevNode.forwardNode = node.forwardNode;
  //   node.forwardNode.prevNode = node.prevNode;
  //   console.log(node.prevNode);
  //   if (node.forwardNode) {
  //     return node.forwardNode;
  //   } else {
  //     return node.prevNode;
  //   };
  // },

};

export { 
  linkNode,
  linkList,
  linkListDummy,
  linkListDouble,
  functions
};