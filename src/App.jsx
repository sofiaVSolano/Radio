import './App.css'
import Header from './pages/header'
import RadioPage from "./pages/RadiosPage"
import { SearchProvider } from "./pages/SearchProvider"
import Footer from './pages/footer'
function App() {
  return (
    <>
      <SearchProvider>
        <Header />
        <div className='RadioPage'>
          <RadioPage />
        </div>
      </SearchProvider>
      < Footer />

    </>
  )
}

export default App
