// Function for calculating the height of elements for smooth and correct animations
function ToggleExpand(element, open, callback) {
  if (open) {
    element.style.height = '0px';
  } else {
    element.style.height = `${Array.prototype.reduce.call(
      element.childNodes,
      (p, c) => p + (c.offsetHeight || 0) + 1,
      0
    )}px`;
  }
  callback(element);
}

export default ToggleExpand;
