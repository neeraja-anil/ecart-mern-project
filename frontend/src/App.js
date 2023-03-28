import React from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'


import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'


function App() {
  return (
    <div className='App'>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route exact path='/products/:id' element={<ProductScreen />} />
            <Route exact path='/cart/:id?' element={<CartScreen />} />
          </Routes>

        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default App
