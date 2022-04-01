const cartItems = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const saveLocalStorage = () => {
  const ol = document.querySelector(cartItems);
  saveCartItems(ol.innerHTML);
};

const displayPrice = (value) => {
  const prices = document.querySelector('.total-price');
  prices.innerHTML = value;
};

const totalPrice = () => {
  const liList = Array.from(document.querySelectorAll('.cart__item')); // Array.from() cria uma nova instância de um Array permitindo utilizar as HOFs
  const total = liList.reduce((acc, li) => {
    const price = parseFloat(li.innerText.split('PRICE: $')[1]);
    return acc + price;
  }, 0);
  displayPrice(total.toFixed(2));
};

function cartItemClickListener(event) {
  const element = event.target;
  if (element.className === 'item__image') {
    element.parentElement.remove();
  } else {
    element.remove();
  }
  saveLocalStorage();
  totalPrice();
}

function createCartItemElement({ title, price, thumbnail }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  li.appendChild(createProductImageElement(thumbnail));
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const itemsList = document.querySelector(cartItems);
const collectItem = async (id) => {
  if (id) {
    const data = await fetchItem(id);
    itemsList.appendChild(createCartItemElement(data));
  }
  totalPrice();
};

const includingEvent = async (event) => {
  const element = getSkuFromProductItem(event.target.parentElement);
  await collectItem(element);
  saveLocalStorage();
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const addBtn = () => {
  const btns = document.querySelectorAll('.item__add');
  btns.forEach((btn) => {
    btn.addEventListener('click', includingEvent);
  });
};

function createProductItemElement({ id, title, thumbnail, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const toCharge = (trueFalse) => {
  if (trueFalse) {
    const container = document.querySelector('.items');
    const cards = document.querySelector('.cart');
    const span = document.createElement('span');
    span.innerText = 'carregando...';
    span.className = 'loading';
    cards.appendChild(span);
    container.appendChild(span);
  } else {
    const span = document.querySelector('.loading');
    span.remove();
  }
};

const productsList = async (search) => {
  toCharge(true);
  const items = document.querySelector('.items');
  const data = await fetchProducts(search);
  toCharge(false);
  const products = data.results;
  products.forEach((product) => {
    items.appendChild(createProductItemElement(product));
  });
};

const newsearch = async (input) => {
  const items = document.querySelector('.items');
  items.innerHTML = '';
  await productsList(input);
  addBtn();
};

const btnSearch = () => {
  const btn = document.getElementById('button-addon2');
  btn.addEventListener('click', () => {
    const input = document.querySelector('.form-control').value;
    if (!input) {
      alert('Insira um valor para efetuar a pesquisa!')
    } else {
      newsearch(input);
    }
  });
};

const cleanOl = document.querySelectorAll('.empty-cart');
cleanOl[0].addEventListener('click', () => {
  itemsList.innerHTML = '';
  localStorage.removeItem('cartItems');
  totalPrice();
});

const removeLi = () => {
  const liList = document.querySelectorAll('.cart__item');
  liList.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
};

const recreateList = () => {
  const list = getSavedCartItems();
  const ol = document.querySelector(cartItems);
  try {
    ol.innerHTML = list;
    totalPrice();
  } catch (err) {
    console.log(err);
  }
};

const cartList = () => {
  const cart = document.querySelector('.cart');
  if (cart.style.display === 'none') {
    cart.style.display = 'flex';
  } else {
    cart.style.display = 'none';
  }
};

const affection = () => {
  if (window.innerWidth <= 1200) {
    const cart = document.querySelector('.material-icons');
    cart.addEventListener('click', () => {
      cartList();
    });
  } else {
    cartList();
  }
};

window.onload = async () => {
  await productsList();
  await collectItem();
  affection();
  cartList();
  addBtn();
  btnSearch();
  recreateList();
  removeLi();
};

// elementoRef.insertAdjacentElement('beforebegin', elementoDesejado) 