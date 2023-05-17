import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

import Message from "../components/UIElements/Message";
import Loader from "../components/UIElements/Loader";
import { getUsersAction, removeUserAction } from "../store/admin-actions";

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const { users, deleteSuccess, forceRefresh } = useSelector(
    (state) => state.admin
  );
  const { isLoading, errorMsg } = useSelector((state) => state.ui);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin === true) {
      dispatch(getUsersAction());
    } else {
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate, userInfo, forceRefresh]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(removeUserAction(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <Message variant="danger">{errorMsg}</Message>
      ) : (
        <>
          {deleteSuccess && (
            <Message variant="success">{deleteSuccess}</Message>
          )}

          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default UserListPage;
