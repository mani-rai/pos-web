import styles from './Invoicing.module.css'
import Keypad from './../../../shared/components/keypad/Keypad'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Spinner from '../../../shared/components/spinner/Spinner'
import ProductList from './product-list/ProductList'

export default function Invoicing ({ selectedProducts, total }) {

  return (
    <div id={styles.invoicing_wrapper}>
      <div id={styles.header_container}>
        <div id={styles.logo_container}>
          LOGO
        </div>
      </div>
      <div id={styles.product_list_container}>
        <ProductList selectedProducts={selectedProducts} total={total}/>
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
}
