import { useEffect, useState } from 'react'
import { getAllCategoryProducts } from '../../../../services/ProductManagementService'
import styles from './ProductList.module.css'

export default function ProductList ({ selectedCategoryId, handleProductSelection }) {

  const [products, setProducts] = useState([])

  useEffect(() => {
    console.log('hello', selectedCategoryId)
    getAllCategoryProducts(selectedCategoryId).
    subscribe(products => setProducts(products))
  }, [selectedCategoryId])

  const productsElements = createProductsElements(products,
    handleProductSelection)
  return (
    <div id={styles.menu_list_wrapper}>
      {productsElements}
    </div>
  )
}

function createProductsElements (products, handleProductSelection) {

  if (!products) {
    return
  }

  return products.map((product) => {
    return (
      <div key={product.id} className={styles.product_container}
           onClick={() => handleProductSelection(product)}>
        <div className={styles.price}>
          NRS. {product.price}
        </div>
        <div className={styles.name}>
          {product.name}
        </div>
      </div>
    )
  })
}
