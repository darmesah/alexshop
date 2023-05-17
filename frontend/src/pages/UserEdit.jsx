import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import Message from "../components/UIElements/Message";
import Loader from "../components/UIElements/Loader";
import FormContainer from "../components/UIElements/FormContainer";

import { getUserAction, updateUserAction } from "../store/admin-actions";

const UserEditPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { isLoading, errorMsg } = useSelector((state) => state.ui);
  const { user, updateSuccess, forceRefresh } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getUserAction(id));
    setIsAdmin(user.isAdmin);
  }, [dispatch, id, user.isAdmin, forceRefresh]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAction(id, { name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <Message variant="danger">{errorMsg}</Message>
      ) : (
        <FormContainer>
          <h1>Edit User</h1>
          {updateSuccess && (
            <Message variant="success">{updateSuccess}</Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group className="pb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                defaultValue={user.name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditPage;
