// ES Moudule 模块引入方式
// import Header from './header.js';
// import Sidebar from './sidebar.js';
// import Content from './content.js';

// CommonJS
const Header = require('./header.js');
const Sidebar = require('./sidebar.js');
const Content = require('./content.js');

new Header();
new Sidebar();
new Content();