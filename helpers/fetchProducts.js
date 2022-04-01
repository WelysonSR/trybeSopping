const fetchProducts = async (taip) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${taip}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
