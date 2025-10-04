import './App.css'
import Header from './pages/header'
import RadioPage from "./pages/RadiosPage"
import { SearchProvider } from "./pages/SearchProvider"
function App() {
  return (
    <>
      <SearchProvider>
      <Header />
      <div className='RadioPage'>
        <RadioPage />
      </div>
      </SearchProvider>
    </>
  )
}

export default App
