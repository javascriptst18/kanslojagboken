// Function for animating height of elements
function ToggleExpand(element, open, callback) {
  if (open) {
    element.style.height = `${Array.prototype.reduce.call(
      element.childNodes,
      (p, c) => p + (c.offsetHeight || 0),
      0
    )}px`;
    window.getComputedStyle(element).getPropertyValue('height');
    element.style.height = '0px';
  } else {
    element.style.height = `${Array.prototype.reduce.call(
      element.childNodes,
      (p, c) => p + (c.offsetHeight || 0),
      0
    )}px`;
  }
  callback(element);
}

export default ToggleExpand;
