import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import ReadProducts from './pages/ReadProducts';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <>
      <AddProduct />
      <ReadProducts />
    </>
  );
}

export default App;
