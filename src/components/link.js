import React, {useState, useEffect} from 'react';
import {
  // linkNode, 
  // linkList, 
  // linkListDummy, 
  linkListDouble,
  // functions
} from './link_biz';
import styles from './link.module.css';

let data = [{}];
data = [
  {ingredient: 'bottom bread', calories: 100, style: {color:'goldenrod'}},
  {ingredient: 'chicken', calories: 187, style: {color:'black'}},
  {ingredient: 'bacon', calories: 108, style: {color:'brown'}},
  {ingredient: 'lettuce', calories: 5, style: {color:'greenyellow'}},
  {ingredient: 'tomato', calories: 8, style: {color:'red'}},
  {ingredient: 'mayonnaise', calories: 94, style: {color:'white'}},
  {ingredient: 'top bread', calories: 100, style: {color:'goldenrod'}}
];
const list = new linkListDouble(data);

function Link(props) {

  const keys = (data)
    ? Object.keys(data[0])
    : ['subject', 'amount']
  ;
  const [position, setPosition] = useState(
    (data)
      ? {node: list.head, show: list.head.show(), name: list.head[keys[0]]}
      : {node: {}, show: '', name: ''}
  );
  const [array, setArray] = useState(
    (data)
      ? list.arrayList()
      : []
  );
  const [summary, setSummary] = useState(
    (data)
      ? {showList: list.showList(), total: list.total(keys[1])}
      : {showList: '', total: 0}
  );
  const [inputInfo, setInputInfo] = useState({
    [keys[0]]: '', [keys[1]]: ''
  });
  useEffect(() => {
    // side effect
    return function cleanup() {
      // cleanup
    };
  });

  const functionsObj = {
    first: {f: list.first, p: []},
    last: {f: list.last, p: []},
    next: {f: list.next, p: [position.node]},
    previous: {f: list.previous, p: [position.node]},
    insert: {f: list.insert, p: [position.node, inputInfo]},
    delete: {f: list.delete, p: [position.node]},
  };

  const handleClick = (e) => {

    let fun = {};
    try {
      fun = functionsObj[e.target.name];
      const node = fun.f(...fun.p);
      setPosition({node: node, show: node.show(), name: node[keys[0]]});
      setArray(list.arrayList());
      setSummary({showList: list.showList(), total: list.total(keys[1])});
    } catch (error) {
      console.log(error);
    };
  };
  let buttons = [];
  for (let k in functionsObj) {
    buttons.push(
      <button
        key = {k}
        name = {k}
        onClick = {(e) => {handleClick(e)}}
      >
        {k}
      </button>
    );
  };
  const handleInputChange = (e) => {
    const target = e.target;
    setInputInfo(state => ({...state, [target.name]: target.value}));
  };
  const input = (type, name) => {
    return (
      <div>
        <span>
          new {name}: 
        </span>
        <input
          type={type}
          // value={inputInfo[name]}
          name={name}
          onChange={(e) => handleInputChange(e)}
          onBlur={(e) => handleInputChange(e)}
        ></input>
      </div>
    );
  }
  return (
    <main id="idMainLink">
      <h2>Linked List</h2>
      <div id={styles.container}>
        <DisplayList
          keys = {keys}
          info = {array}
          selected = {position.name}
        />
        <div>
          <p>
            Total: {`${summary.total} ${keys[1]}`}
          </p>
          <p>
            Selected {position.show}
          </p>
          <div>
            {buttons}
          </div>
          <div>
            {input('text', keys[0])}
            {input('number', keys[1])}
          </div>
        </div>
      </div>
    </main>
  );
};

function DisplayList(props) {
  const {keys, info, selected} = props;
  const subject = keys[0];
  let display = info.map((v,i) =>
    (<p 
      key={i+v[subject]} 
      className={[
        styles.item,  
        (v[subject]===selected)
          ? styles.selected
          : ''
      ].join(' ')}
      style={v.style}
    >
      {v[subject]}
    </p>)
  ).reverse();
  return (
    <div>
      {display}
    </div>
  );
};

export default Link;