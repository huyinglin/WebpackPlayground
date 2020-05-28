import React from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import './index.less';
// import fun from './async.js'

var root = document.getElementById('root');

document.addEventListener('click', () => {
  import('./async.js').then(({default: func}) => {
    func();
  })
})

function App() {
  return (
    <div className="wrap">
      hello react
    </div>
  );
}

ReactDom.render(<App/>, root);

const arr = [1, 2, 45];

_.map(arr, (item => {
  console.log(item);
}));
