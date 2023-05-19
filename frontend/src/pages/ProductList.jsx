import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import Message from "../components/UIElements/Message";
import Loader from "../components/UIElements/Loader";

import { fetchProducts } from "../store/product-actions";
import {
  createProductAction,
  deleteProductAction,
} from "../store/admin-actions";
import { adminActions } from "../store/admin-slice";
import Paginate from "../components/Header/Paginate";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pageNumber } = useParams() || 1;

  const { products, pages, page } = useSelector((state) => state.product);
  const { deleteSuccess, forceRefresh, createdProduct } = useSelector(
    (state) => state.admin
  );
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { isLoading, errorMsg } = useSelector((state) => state.ui);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(adminActions.setSuccess(""));
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch, deleteSuccess]);

  useEffect(() => {
    if (!userInfo || userInfo.isAdmin !== true) {
      navigate("/", { replace: true });
    }

    if (createdProduct) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(fetchProducts("", pageNumber));
    }
  }, [dispatch, navigate, userInfo, forceRefresh, createdProduct, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProductAction(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProductAction());
  };

  return (
    <>
      <Row className="aligh-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right" style={{ textAlign: "right" }}>
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {deleteSuccess && <Message variant="success">{deleteSuccess}</Message>}
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <Message variant="danger">{errorMsg}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListPage;
