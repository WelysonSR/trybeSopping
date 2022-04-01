const fetchItem = async (itemID) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${itemID}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
