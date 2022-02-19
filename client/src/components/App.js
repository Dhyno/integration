import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

import PrivateRoute from '../route/PrivateRoute';

import { BrowserRouter as Router, Route, Routes, Link }from 'react-router-dom';
import { Header, Landing, DetailProduct,UserChart, AdminData, AddProductAdmin,AddTopingAdmin, UserProfile } from '../containerExport/forApp'
import { ProductContextProvider } from '../context/productContext';

function App() {
  return (
    <ProductContextProvider>
      <Router>
        <Header />
        <Routes>
            <Route path="/" element={ <Landing /> }></Route>
            <Route path="/" element={ <PrivateRoute /> } >
              <Route path="/user" element={ <UserProfile /> }></Route>
              <Route path="/userchart" element={ <UserChart /> }></Route>
              <Route path="/admindata" element={ <AdminData /> }></Route>
              <Route path="/addproduct" element={ <AddProductAdmin /> }></Route>
              <Route path="/addtopping" element={ <AddTopingAdmin /> }></Route>
              <Route path="/detailproduct/:id" element={ <DetailProduct /> }></Route>
            </Route>
        </Routes>
      </Router>
    </ProductContextProvider>
  );
}

export default App;
