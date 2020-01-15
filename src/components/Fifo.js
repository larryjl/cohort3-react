import React, {useState, useEffect} from 'react';
// import Stack from './stack';
import {RecursiveStack} from './queue';
import fifoFunctions from './fifoFunctions';
import inputs from './inputs';
import { ReactComponent as IconUp } from '../svg/Icon_up.svg';
import { ReactComponent as IconLeft } from '../svg/Icon_left.svg';
import { ReactComponent as IconRight } from '../svg/Icon_right.svg';
import { ReactComponent as IconPlay } from '../svg/Icon_play.svg';
import styles from './Fifo.module.css';

const {Button,} = inputs;

const stack = new RecursiveStack();

function Fifo(props) {
  const [top, setTop] = useState(-1);
  const [sequence, setSequence] = useState('');
  const [position, setPosition] = useState(
    {point: [0,0], direction: [1,0]}
  );
  const functions = {
    forward: {
      f: fifoFunctions.forward, 
      p: [position.point, position.direction, 1]
    },
    turnLeft: {
      f: fifoFunctions.turnLeft, 
      p: [position.point, position.direction]
    },
    turnRight: {
      f: fifoFunctions.turnRight, 
      p: [position.point, position.direction]
    }
  };
  useEffect(() => {
    let timer;
    if (!stack.isEmpty() && sequence) {
      timer = setTimeout(() => {
        let command;
        if (sequence==='lifo') {
          command = stack.pop().cmd;
        } else if (sequence==='fifo') {
          command = stack.dequeue().cmd;
        };
        setPosition(functions[command].f(
          ...functions[command].p
        ));
        setTop(stack.top);
      }, 300);
    };
    return function cleanup() {
      clearTimeout(timer);
    };
  }, [sequence, functions]);
  function stackUpdate(p) {
    stack.push(p);
    setTop(stack.top);
  };
  let count=0;
  const callbacks = {
    forward: {
      f: stackUpdate, 
      p: [{id: count++, cmd: 'forward'}],
      i: IconUp
    },
    turnLeft: {
      f: stackUpdate, 
      p: [{id: count++, cmd: 'turnLeft'}],
      i: IconLeft
      },
    turnRight: {
      f: stackUpdate, 
      p: [{id: count++, cmd: 'turnRight'}],
      i: IconRight
    },
    fifo: {
      f: setSequence, 
      p: ['fifo'],
      i: IconPlay
    },
    lifo: {
      f: setSequence, 
      p: ['lifo'],
      i: IconPlay
    }
  };
  const buttons = (
    <div>
      {Object.keys(callbacks).map((v,i) => {
        const Icon = callbacks[v].i;
        let color;
        if (v==='fifo') {
          color = 'amber';
        } else if (v==='lifo') {
          color = 'red';
        } else {
          color = 'black'
        };
        return (
          <Button
            key={i}
            id={i}
            name={v}
            label={
              [<Icon
                key={i}
                name={v}
                alt={v + ' button'}
                tabIndex="0"
                className={[
                  styles.button,
                  styles[color]
                ].join(' ')}
              />,
              v]
            }
            callbacks={callbacks}
            setNewState={setSequence}
            newState={(v==='fifo' || v==='lifo')?v:''}
            classes={styles.button}
          />
        )
      })}
    </div>
  );
  const cardStack = stack.arr.map((v,i) => {
    if (v) {
      const cmd = v.cmd;
      const Icon = callbacks[cmd].i;
      let color;
      if (i===0) {
        color = 'amber';
      } else if (i===top) {
        color = 'red';
      } else {
        color = 'white';
      };
      return (
        <Icon
          key={i}
          name={cmd}
          alt={cmd + ' card'}
          className={[
            styles.card,
            styles[color]
          ].join(' ')}
        />
      );
    } else {
      return null;
    }
  });
  return (
    <main id="idMainLink">
      <h2>Stacks and Queues</h2>
      {buttons}
      <div id={styles.container}>
        <div id={styles.cardStack}>
          {cardStack}
        </div>
        <div>

        </div>
      </div>
    </main>
  );
};

export default Fifo;