import styles from './ProductMenu.module.css'
import ProductList from './product-list/ProductList'
import { useEffect, useState } from 'react'
import { getAllCategories } from '../../../services/ProductManagementService'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

export default function ProductMenu ({ handleProductSelection }) {

  const [categories, setCategories] = useState([])
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)

  useEffect(() => {
    getAllCategories().subscribe(categories => {
      setCategories(categories)
    })
  }, [])

  const categoriesTabs = createCategoriesTabs(categories)
  const categoriesTabsPanels = createCategoriesTabsPanels(selectedCategoryIndex,
    categories, handleProductSelection)

  return (
    <div id={styles.product_menu_wrapper}>
      <div id={styles.category_list_container}>
        <div id={styles.toolbar_container}>
          <TextField variant="outlined" size="small" InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            ),
          }} label="Search"/>
        </div>
        <Tabs indicatorColor="primary" textColor="primary" variant="scrollable"
              scrollButtons="on" value={selectedCategoryIndex}
              onChange={(event, index) => handleCategoryChange(index)}>
          {categoriesTabs}
        </Tabs>
      </div>
      <div id={styles.product_list_container}>
        {categoriesTabsPanels}
      </div>
    </div>
  )

  function handleCategoryChange (categoryIndex) {
    setSelectedCategoryIndex(categoryIndex)
  }
}

function createCategoriesTabs (categories) {
  if (!categories) {
    return
  }
  return categories.map(
    category => <Tab key={category.id} label={category.name}/>)
}

function createCategoriesTabsPanels (
  selectedCategoryIndex, categories, handleProductSelection) {
  if (!categories) {
    return
  }
  return categories.map((category, index) => {
    return (
      <div key={category.id} role="tabpanel"
           hidden={selectedCategoryIndex !== index} className={styles.tabpanel}>
        <ProductList selectedCategoryId={categories[selectedCategoryIndex].id}
                     handleProductSelection={handleProductSelection}/>
      </div>
    )
  })
}
