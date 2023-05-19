import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import Message from "../components/UIElements/Message";
import Loader from "../components/UIElements/Loader";
import FormContainer from "../components/UIElements/FormContainer";

import { fetchProduct } from "../store/product-actions";
import { updateProductAction } from "../store/admin-actions";
import { adminActions } from "../store/admin-slice";

const ProductEditPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const { product } = useSelector((state) => state.product);
  const { isLoading, errorMsg } = useSelector((state) => state.ui);
  const { forceRefresh, deleteSuccess } = useSelector((state) => state.admin);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(adminActions.setSuccess(""));
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch, deleteSuccess]);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id, forceRefresh]);

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("image", image[0]);
    form.append("brand", brand);
    form.append("category", category);
    form.append("countInStock", countInStock);
    form.append("description", description);

    dispatch(updateProductAction(id, form));
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <Message variant="danger">{errorMsg}</Message>
      ) : (
        <FormContainer>
          <h1>Edit Product</h1>
          {deleteSuccess && (
            <Message variant="success">{deleteSuccess}</Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group className="pb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                defaultValue={product.name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                defaultValue={product.price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter image url"
                onChange={(e) => setImage(e.target.files)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                defaultValue={product.brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3" controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter count in stock"
                defaultValue={product.countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                defaultValue={product.category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                defaultValue={product.description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductEditPage;
