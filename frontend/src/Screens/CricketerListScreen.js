import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listCricketers,
  deleteCricketer,
  createCricketer,
} from "../actions/cricketerActions";
import { CRICKETER_CREATE_RESET } from "../constants/cricketerConstansts";

const CricketerListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const cricketerList = useSelector((state) => state.cricketerList);
  const { loading, error, cricketers, page, pages } = cricketerList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cricketerDelete = useSelector((state) => state.cricketerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = cricketerDelete;

  const cricketerCreate = useSelector((state) => state.cricketerCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    cricketers: createdCricketer,
  } = cricketerCreate;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCricketer(id));
    }
  };

  const createCricketerHandler = () => {
    dispatch(createCricketer());
  };

  useEffect(() => {
    dispatch({ type: CRICKETER_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/cricketer/${createdCricketer._id}/edit`);
    } else {
      dispatch(listCricketers("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdCricketer,
    pageNumber,
  ]);

  return (
    <>
      <Row className="align-item-center">
        <Col>
          <h1>All International Cricketers</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={createCricketerHandler}>
            <i className="fas fa-plus"></i> Add cricketer
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>NAME</th>
                <th>TEAM</th>
                <th>BORN</th>
                <th>AGE</th>
                <th>ROLE</th>
                <th>BATTING</th>
                <th>BOWLING</th>
                <th>ODIs-100/50</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cricketers.map((cricketer) => (
                <tr key={cricketer._id}>
                  {/* <td> {cricketer._id}</td> */}
                  <td> {cricketer.name}</td>
                  <td>{cricketer.Team}</td>
                  <td>{cricketer.Born}</td>
                  <td>{cricketer.Age}</td>
                  <td>{cricketer.Role}</td>
                  <td>{cricketer.Batting}</td>
                  <td>{cricketer.Bowling}</td>
                  <td>{cricketer.ODI_100_50}</td>

                  <td>
                    <LinkContainer
                      to={`/admin/cricketer/${cricketer._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(cricketer._id)}>
                      <i className="fas fa-trash"></i>
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

export default CricketerListScreen;
