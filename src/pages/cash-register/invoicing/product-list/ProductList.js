import styles from './ProductList.module.css'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import { useEffect, useRef, useState } from 'react'

export default function ProductList ({ selectedProducts, total }) {

  const productListEndRef = useRef()
  const [selectedProduct, setSelectedProduct] = useState()

  useEffect(() => {
    scrollToBottomOfProductList()
  }, [selectedProducts])

  let emptyMessage = createEmptyMessage()
  let selectedProductsElements = createSelectedProductsElements()
  let totalEle = createTotal()

  return (
    <div id={styles.product_list_wrapper}>
      {emptyMessage}
      {selectedProductsElements}
      {totalEle}
      <div ref={productListEndRef}></div>
    </div>
  )

  function createSelectedProductsElements () {
    if (!selectedProducts) {
      return
    }

    let classNames = styles.product
    console.log(selectedProduct)
    if (selectedProduct) {
      classNames += ' ' + styles.selected_product
    }

    return selectedProducts.map(product => {
      return (
        <div className={selectedProduct && product.id === selectedProduct.id
          ? classNames
          : styles.product} key={product.id}
             onClick={() => handleProductSelection(product)}>
          <div className={styles.name_price_wrapper}>
            <div>{product.name}</div>
            <div>{product.total}</div>
          </div>
          <div className={styles.qty_rate_wrapper}>
            {product.quantity} Plate @ NPR. {product.price}
          </div>
        </div>
      )
    })
  }

  function scrollToBottomOfProductList () {
    if (!productListEndRef) {
      return
    }
    productListEndRef.current?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
      alignToTop: false,
    })
  }

  function handleProductSelection (product) {
    setSelectedProduct(product)
  }

  function createEmptyMessage () {
    if (!(!selectedProducts || selectedProducts.length == 0)) {
      return
    }
    return (
      <div id={styles.message_container}>
        <ShoppingCartOutlinedIcon fontSize={'inherit'} color={'disabled'}/>
        <span disabled>You cart is empty.</span>
      </div>
    )
  }

  function createTotal () {
    if (!selectedProducts || selectedProducts.length == 0) {
      return
    }
    return (
      <div id={styles.total_wrapper}>
        <div id={styles.total}>Total: NPR. {total}</div>
      </div>
    )
  }
}
