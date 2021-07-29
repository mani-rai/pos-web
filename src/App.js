import './App.css'
import CashRegister from './pages/cash-register/CashRegister'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import teal from '@material-ui/core/colors/teal'

function App () {

  const theme = buildTheme()

  return (
    <ThemeProvider theme={theme}>
      <CashRegister/>
    </ThemeProvider>
  )

  function buildTheme () {
    return createTheme({
      palette: {
        primary: blue,
        secondary: teal,
      },
    })
  }
}

export default App
