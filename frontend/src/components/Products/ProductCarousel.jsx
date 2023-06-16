import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import { useEffect } from "react";
import Loader from "../UIElements/Loader";
import Message from "../UIElements/Message";

import { fetchTopProductsAction } from "../../store/product-actions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { topProducts } = useSelector((state) => state.product);
  const { isLoading, errorMsg } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchTopProductsAction());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : errorMsg ? (
    <Message variant="danger">{errorMsg}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {!topProducts
        ? ""
        : topProducts.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/${product.image}`}
                  alt={product.name}
                  fluid
                />
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
    </Carousel>
  );
};

export default ProductCarousel;
