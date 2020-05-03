import IMG from './img.png';

function createImg(params) {
  var img = new Image();
  img.src = IMG;
  img.classList.add('img');

  var root = document.getElementById('root');
  root.append(img);
}

export default createImg;
