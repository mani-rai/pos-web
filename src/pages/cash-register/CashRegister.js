import styles from './CashRegister.module.css'
import Invoicing from './invoicing/Invoicing'
import ProductMenu from './product-menu/ProductMenu'
import { useState } from 'react'

export default function CashRegister () {

  const [selectedProducts, setSelectedProducts] = useState()
  const [total, setTotal] = useState(0)

  return (
    <div id={styles.cash_register_container}>
      <div id={styles.invocing_container}>
        <Invoicing selectedProducts={selectedProducts} total={total}/>
      </div>
      <div id={styles.product_menu_container}>
        <ProductMenu handleProductSelection={handleProductSelection}/>
      </div>
    </div>
  )

  function handleProductSelection (product) {
    addProduct(product)
    updateTotal(product)
  }

  function addProduct (product) {
    let products;
    if (selectedProducts) {
      products = [...selectedProducts]
    } else {
      products = []
    }

    const index = products.findIndex(
      p => p.id === product.id)
    if (index >= 0) {
      products[index].quantity += 1
      products[index].total = Math.round(selectedProducts[index].quantity * selectedProducts[index].price)
      setSelectedProducts(products)
      return
    }
    product.quantity = 1
    product.total = product.price
    products.push(product)
    setSelectedProducts(products)
  }

  function updateTotal (product) {
    setTotal((total) => total += product.price)
  }
}
