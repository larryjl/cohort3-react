import {Account, AccountController} from './accounts_class.js';

test('account methods', () => {
  const account = new Account('checkingAccount', 25, 1);
  expect(account.name).toBe('checkingAccount');
  expect(account.bal).toBe(25);

  account.deposit(10);
  expect(account.bal).toBe(35);
  account.deposit();
  expect(account.bal).toBe(35);

  account.withdraw(30);
  expect(account.bal).toBe(5);
  account.withdraw();
  expect(account.bal).toBe(5);

  expect(account.balance()).toBe(5);
});

test('controller add, remove', () => {
  const controller = new AccountController('controller');

  // test add
  controller.add('checking', 25);
  expect(controller.accounts[0].name).toBe('checking');
  expect(controller.accounts[0].bal).toBe(25);
  // test add no value
  controller.add('savings');
  expect(controller.accounts[1].name).toBe('savings');
  expect(controller.accounts[1].bal).toBe(0);

  // test remove
  controller.remove('checking');
  expect(controller.accounts.length).toBe(1);
  // test remove non-existing account
  try {
    controller.remove('not an account');
  } catch (error) {
    expect(error).toBeTruthy();
  };
});

// test total, highest, lowest
test('controller total, highest, lowest', () => {
  const controller = new AccountController('controller');
  controller.accounts = [
    {name: 'checking',
      bal: 1},
    {name: 'savings',
      bal: 2},
    {name: 'investment',
      bal: 3},
  ];

  // test total
  expect(controller.total()).toBe(6);
  // test highest
  expect(controller.highest()).toEqual({name: 'investment', bal: 3});
  // test lowest
  expect(controller.lowest()).toEqual({name: 'checking', bal: 1});
});

// test total, highest, lowest errors with no accounts
test('controller total, highest, lowest', () => {
  const controller = new AccountController('controller');
  controller.accounts = [];

  // test total
  try{
    controller.total()
  } catch (error) {
    expect(error).toBeTruthy();
  };
  // test highest
  try {
    controller.highest()
  } catch (error) {
    expect(error).toBeTruthy();
  }
  // test lowest
  try {
    controller.lowest()
  } catch (error) {
    expect(error).toBeTruthy();
  }
});