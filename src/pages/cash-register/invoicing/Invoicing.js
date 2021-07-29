import styles from './Invoicing.module.css'
import Keypad from './../../../shared/components/keypad/Keypad'
import { useEffect, useRef, useState } from 'react'
import Button from '@material-ui/core/Button'
import Spinner from '../../../shared/components/spinner/Spinner'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'

export default function Invoicing ({ selectedProducts, total }) {

  const [selectedProduct, setSelectedProduct] = useState()
  const productListEndRef = useRef(null)

  useEffect(() => {
    scrollToBottomOfProductList()
  }, [selectedProducts])

  let selectedProductsElements = createSelectedProductsElements()

  return (
    <div id={styles.invoicing_wrapper}>
      <div id={styles.header_container}>
        <div id={styles.logo_container}>
          LOGO
        </div>
      </div>
      <div id={styles.product_list_container}>
        <div id={styles.message_container}>
          <ShoppingCartOutlinedIcon fontSize={'inherit'} color={'disabled'}/>
          <span disabled>You cart is empty.</span>
        </div>
        {selectedProductsElements}
        {selectedProductsElements && selectedProductsElements.length > 0 &&
        <div id={styles.total_wrapper}>
          <div id={styles.total}>Total: NPR. {total}</div>
        </div>
        }
        <div ref={productListEndRef}/>
      </div>
      <div id={styles.invoce_editor_wrapper}>
        <div>
          <Button variant="contained" color="primary" disableElevation
                  size={'large'}>
            <Spinner/>
          </Button>
        </div>
        <div id={styles.keypad_container}>
          <Keypad/>
        </div>
      </div>
    </div>
  )

  function createSelectedProductsElements () {
    if (!selectedProducts) {
      return
    }

    let classNames = styles.product
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

  function handleProductSelection (product) {
    setSelectedProduct(product)
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
}
