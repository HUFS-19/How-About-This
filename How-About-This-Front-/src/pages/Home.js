import ProductList from '../components/ProductList';

const Home = () => {
  // console.log(process.env.REACT_APP_HOST);
  return (
    <div>
      {/* <h1>{process.env.REACT_APP_HOST}</h1> */}
      <ProductList />
    </div>
  );
};

export default Home;
