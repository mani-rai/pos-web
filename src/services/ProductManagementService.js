import {ajax} from 'rxjs/ajax';

export function getAllCategoryProducts(categoryId) {

  return ajax.getJSON("mocks/products.json");
}

export function getAllCategories() {

  return ajax.getJSON("mocks/categories.json");
}
