export async function getCategories() {
  const endpointCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endpointCategories);
  const data = response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endpointCategoryAndQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(endpointCategoryAndQuery);
  const data = response.json();
  return data;
}

export async function getProductsFromQuery(query) {
  const endpointQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(endpointQuery);
  const data = response.json();
  return data;
}
