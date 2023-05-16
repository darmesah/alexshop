import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes } from "react-icons/fa";

import Message from "../components/UIElements/Message";
import Loader from "../components/UIElements/Loader";

import { fetchUserData, updateUserDataAction } from "../store/user-actions";
import { getUserOrdersAction } from "../store/order-action";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user.user);
  const userOrders = useSelector((state) => state.order.userOrders);
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, changeMsg } = useSelector((state) => state.ui);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { replace: true });
      return;
    }

    dispatch(fetchUserData());
    dispatch(getUserOrdersAction());

    setName(user.name);
    setEmail(user.email);
  }, [dispatch, navigate, user.email, user.name, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email);
    dispatch(updateUserDataAction(name, email, password));
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {changeMsg && <Message variant="success">{changeMsg}</Message>}
        {isLoading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="pb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="pb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="pb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {userOrders.loading ? (
          <Loader />
        ) : userOrders.error ? (
          <Message variant="danger">{userOrders.error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userOrders.orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
