import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import "../index.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listCricketersDetails } from "../actions/cricketerActions";

const CricketerScreen = ({ match }) => {
  const dispatch = useDispatch();

  const cricketerDetails = useSelector((state) => state.cricketerDetails);
  const { loading, error, cricketers } = cricketerDetails;

  useEffect(() => {
    dispatch(listCricketersDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Row>
        <Link className="btn btn-light my-3 ml-2" to="/">
          Go Back
        </Link>
      </Row>

      {loading ? (
        <Loader />
      ) : (
        error && <Message variant="danger">{error}</Message>
      )}

      <Row>
        <Col md={5}>
          <Image
            className="image"
            src={cricketers.image}
            alt={cricketers.name}
            fluid
          />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                <strong>{cricketers.name}</strong>
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>Born : {cricketers.Born}</ListGroup.Item>
            <ListGroup.Item>Age : {cricketers.Age}</ListGroup.Item>
            <ListGroup.Item>Team : {cricketers.Team}</ListGroup.Item>
            <ListGroup.Item>Role : {cricketers.Role}</ListGroup.Item>
            <ListGroup.Item>Batting : {cricketers.Batting}</ListGroup.Item>
            <ListGroup.Item>Bowling : {cricketers.Bowling}</ListGroup.Item>
            <ListGroup.Item>
              ODI 100/50 : {cricketers.ODI_100_50}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default CricketerScreen;
