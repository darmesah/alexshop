import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import Loader from "../components/UIElements/Loader";
import Message from "../components/UIElements/Message";
import Products from "../components/Products/Products";

import { fetchProducts } from "../store/product-actions";

const HomePage = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const { isLoading, errorMsg } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <Message variant="danger">{errorMsg}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
