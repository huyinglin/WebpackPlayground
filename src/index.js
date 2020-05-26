// ES Moudule 模块引入方式
// import Header from './header.js';
// import Sidebar from './sidebar.js';
// import Content from './content.js';

// CommonJS
// const Header = require('./header.js');
// const Sidebar = require('./sidebar.js');
// const Content = require('./content.js');

// new Header();
// new Sidebar();
// new Content();

import IMG from './img.png';
import './index.scss';
// import "@babel/polyfill";
// import style from './index.scss';
// import createImg from './createImg';
import React from 'react';
import ReactDom from 'react-dom';

// createImg();

// var img = new Image();
// img.src = IMG;
// img.classList.add(style.img);

var root = document.getElementById('root');
// root.append(img);
console.log(44444);

function App() {
  return (
    <div>
      hello react
    </div>
  );
}

ReactDom.render(<App/>, root);

const arr = [
  new Promise(() => {}),
  new Promise(() => {})
];

arr.map(item => {
  console.log(item);
});

// root.innerHTML = '<div class="iconfont iconEnterpriseWeChat"></div>';
