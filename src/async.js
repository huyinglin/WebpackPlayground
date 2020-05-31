import './async.less';

const handleClick = () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 20; i++) {
    const element = document.createElement('div');
    element.innerHTML = 'Hello Darrell';
    document.body.appendChild(element);
  }
};

export default handleClick;
