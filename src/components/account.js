const Account = class {
  constructor(name, bal, id) {
    this.id = id;
    this.name = name;
    this.bal = Number(bal);
  }
  balance() {
    return this.bal;
  }
  deposit(input=0) {
    this.bal += Number(input);
  }
  withdraw(input=0) {
    input = Number(input);
    if (this.bal >= input) {
      this.bal -= input;
    } else throw Error('Insufficient funds.');
  }
};

const AccountController = class {
  constructor() {
    this.id = 1000;
    this.accounts = [];
  }
  add(accountName, bal=0) {
    if (!accountName) {
      throw Error('Invalid account name.')
    } else if (
      this.accounts.find(a => a.name === accountName)
    ) {
      throw Error('Account name already exists.')
    } else {
      const account = new Account(accountName, Number(bal), this.id);
      this.id++;
      this.accounts.push(account);
    };
  }
  remove(accountName) {
    const index = this.accounts.findIndex(a => a.name === accountName);
    if ( index > -1) {
      this.accounts.splice(index, 1);
    } else throw Error('Account name not found.');
  }
  total() {
    if (this.accounts.length > 0) {
      // const balances = this.accounts.map((v) => v.bal);
      // const total = balances.reduce((a, b) => a + b);
      const total = this.accounts.reduce((a, b) => a + b.bal, 0);
      return total;
    } else throw Error('No account data.');
  }
  highest() {
    if (this.accounts.length > 0) {
      const balances = this.accounts.map((v) => v.bal);
      const maxBalance = Math.max(...balances);
      // const maxBalance = this.accounts.reduce((a, b) => Math.max(a, b.bal), 0);
      return (this.accounts.find(
        a => a.bal === maxBalance
      ))
    } else throw Error('No account data.');
  }
  lowest() {
    if (this.accounts.length > 0) {
      const balances = this.accounts.map((v) => v.bal);
      const minBalance = Math.min(...balances)
      return (this.accounts.find(
        a => a.bal === minBalance
      ))
    } else throw Error('No account data.');
  }
  transaction(action, amount, id, name) {
    let account;
    if (id) {
      account = this.accounts.find(a => a.id === id)
    } else if (name) {
      account = this.accounts.find(a => a.name === name)
    } else throw Error('No account specified.')
    if (action==='deposit') {
      account.deposit(amount);
    } else if (action==='withdraw') {
      account.withdraw(amount);
    };
  }
}

export {Account, AccountController};