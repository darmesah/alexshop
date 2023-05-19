import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import Loader from "../components/UIElements/Loader";
import Message from "../components/UIElements/Message";
import Products from "../components/Products/Products";

import { fetchProducts } from "../store/product-actions";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Header/Paginate";
import ProductCarousel from "../components/Products/ProductCarousel";
import Meta from "../components/Meta";

const HomePage = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;

  const { products, pages, page } = useSelector((state) => state.product);
  const { isLoading, errorMsg } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      {keyword ? <h1>SEARCH RESULT(S)</h1> : <h1>Latest Products</h1>}
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <Message variant="danger">{errorMsg}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomePage;
