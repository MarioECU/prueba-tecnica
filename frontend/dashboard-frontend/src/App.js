import { React, useRef, useCallback } from 'react';
import Navbar from './components/navbar/Navbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductTable from './components/products/ProductTable';
import StoreTable from './components/stores/StoreTable';

const App = () => {
  const toast = useRef(null);

  const showMsg = useCallback((msg, severity = 'error', summary = 'Error', life = 3000) => {
    toast.current.show({ severity, summary, detail: msg, life });
  }, []); 

  return (
    <BrowserRouter>
      <Navbar />
      <Toast ref={toast} />
      <Routes>
        <Route path="/" element={<Button label="Home" />} />
        <Route path="/products" element={<ProductTable showMsg={showMsg} />} />
        <Route path="/stores" element={<StoreTable showMsg={showMsg} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
