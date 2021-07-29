import styles from './Keypad.module.css'
import { useState } from 'react'

export default function Keypad () {

  const [selectedKey, setSelectedKey] = useState('Qty')
  const [isMouseDown, setIsMouseDown] = useState(false)

  const functionKeys = ['Qty', 'Disc', 'Price'];
  const keypad = createKeypad()

  return (
    <ul id={styles.keypad_wrapper}>
      {keypad}
    </ul>
  )

  function createKeypad () {

    return [
      '1', '2', '3', 'Qty', '4', '5', '6', 'Disc', '7', '8', '9',
      'Price', '+/-', '0', '.', 'Del'].map(key => {
      return (
        <li
          className={`${styles.key} ${['Qty', 'Disc', 'Price', 'Del'].findIndex(
            (k) => k === key) >= 0 ? styles.action_key : ''} ${selectedKey
          === key ? styles.selected_key : ''}`} key={key}
          onMouseDown={event => handleMouseDown(event, key)}
          onMouseUp={event => handleMouseUp(event, key)} onMouseEnter={event => handleMouseEnter(event, key)} onMouseLeave={event => handleMouseLeave(event, key)}>{key}</li>
      )
    })
  }

  function handleMouseDown (event, key) {
    setIsMouseDown(true)
    if (functionKeys.findIndex(k => k === key) >= 0) {
      return
    }
    event.target.style.backgroundColor = '#E9E9EA'
  }

  function handleMouseUp (event, key) {
    setIsMouseDown(false)
    if (functionKeys.findIndex(k => k === key) >= 0) {
      setSelectedKey(key)
      return
    }
    event.target.style.backgroundColor = '#F5F5F7'
  }

  function handleMouseEnter(event, key) {
    if (functionKeys.findIndex(k => k === key) >= 0) {
      return
    }
    if (isMouseDown) {
      event.target.style.backgroundColor = '#E9E9EA'
    }
  }

  function handleMouseLeave(event, key) {
    if (functionKeys.findIndex(k => k === key) >= 0) {
      return
    }
    if (isMouseDown) {
      event.target.style.backgroundColor = '#F5F5F7'
    }
  }
}
