const getElementsHTML = () => {
  const MAX_HEIGHT_WRAPPER = document.querySelector('.main');
  const createStyleBar = document.createElement('span');
  const createContainerStyleBar = document.createElement('div');
  return [MAX_HEIGHT_WRAPPER, createStyleBar, createContainerStyleBar];
}

const createIncrementStyleBar = (contextStyleBar, containerStyleBar) => {
  const styles = [
    `height: 4px;
    background-color: #2dc25c;
    position: fixed;
    top: 0px;
    left: 0px;
    transition: all 0.5s ease-out 0s;
    width: 0;`,
  ];
  contextStyleBar.style = styles;
  document.body.appendChild(containerStyleBar);
  containerStyleBar.appendChild(contextStyleBar);
  return contextStyleBar;
}

const updateContextHeightStyleBar = (styleBarElement, MAX_HEIGHT_WRAPPER) => {
  const MAX_HEIGHT_CONTEXT = MAX_HEIGHT_WRAPPER.offsetHeight;
  const getPositionYOffScroll = window.pageYOffset;
  const updateStyleBarElementWidth = Math.ceil((getPositionYOffScroll * 110) / MAX_HEIGHT_CONTEXT);
  window.localStorage.setItem('widthStyleBar', updateStyleBarElementWidth);
  if (updateStyleBarElementWidth === 100)
    return;
  return styleBarElement.style.width = `${updateStyleBarElementWidth}%`;
}

const [MAX_HEIGHT_WRAPPER, createStyleBar, containerStyleBar] = getElementsHTML();

const styleBarElement = createIncrementStyleBar(createStyleBar, containerStyleBar)

const handleListnerEvent = () =>
  document.addEventListener('scroll', () => updateContextHeightStyleBar(styleBarElement, MAX_HEIGHT_WRAPPER));
  const getLocalStorageWidth = () => window.localStorage.getItem('widthStyleBar');
  const animationStatusBar = (current, hasWidthStyleBar, interval) => {
    styleBarElement.style.width = `${current}%`;
    if (current === Number(hasWidthStyleBar)) {
      clearInterval(interval);
    }
}

const initStatusBar = () => {
  const hasWidthStyleBar = getLocalStorageWidth();
  let current = 0;
  if (hasWidthStyleBar) {
    const interval = setInterval(() => animationStatusBar(current++, hasWidthStyleBar, interval), 0.1);
    return handleListnerEvent();
  }
  return handleListnerEvent();
}

initStatusBar();
