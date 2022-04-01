const saveCartItems = (list) => {
  // const li = document.querySelectorAll('li');
  // const items = [];
  // li.forEach((item) => {
  //   items.push({
  //     li: `${item.innerHTML}`,
  //     class: `${item.classList}`,
  //   });
  // });
  // localStorage.setItem('cartItems', JSON.stringify(items));
  localStorage.setItem('cartItems', list);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
