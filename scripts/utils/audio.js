const onTouch = new Audio('../../resources/onTouch.mp3');
const onReset = new Audio('../../resources/welcome.mp3');

export function playOnTouch(){
  onTouch.play();
}

export function playOnReset(){
  onReset.play();
}

export function pauseResetSound(){
  onReset.pause();
}

export function pauseTouchSound(){
  onTouch.pause();
}