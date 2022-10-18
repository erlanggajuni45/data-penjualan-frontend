import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Components/header';
import FormProduct from './Pages/formProduct';
import ListTrx from './Pages/listTrx';
import ListProduct from './Pages/listProduct';
import FormTrx from './Pages/formTransaction';
import Footer from './Components/footer';
import PageNotFound from './Pages/404page';

function App() {
  return (
    <Routes>
      <Header />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: '#25316D',
            color: 'white',
          },
          success: {
            duration: 5000,
          },
          error: {
            duration: 3000,
          },
        }}
      />

      <Switch>
        <Route exact path="/">
          <ListTrx />
        </Route>
        <Route exact path="/barang">
          <ListProduct />
        </Route>
        {/* <Route exact path="/barang/list/:idProduct">
          <DetailProduct />
        </Route> */}
        <Route exact path="/barang/tambah">
          <FormProduct />
        </Route>

        <Route exact path="/barang/edit/:idProduct">
          <FormProduct />
        </Route>

        <Route exact path="/transaksi">
          <FormTrx />
        </Route>

        <Route exact path="/transaksi/edit/:idTransaksi">
          <FormTrx />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </Routes>
  );
}

export default App;
