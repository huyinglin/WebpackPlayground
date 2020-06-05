import './async.less';

const handleClick = () => {
  const element = document.createElement('div');
  element.innerHTML = 'Hello Darrell';
  document.body.appendChild(element);
};

export default handleClick;
