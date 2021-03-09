import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Cricketer from "../components/Cricketer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listCricketers } from "../actions/cricketerActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const cricketerList = useSelector((state) => state.cricketerList);
  const { loading, error, cricketers, page, pages } = cricketerList;

  useEffect(() => {
    dispatch(listCricketers(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1 className="pt-3 text-center">
        🏏 List of International Cricketers 📃
      </h1>

      {loading ? (
        <Loader />
      ) : (
        error && <Message variant="danger">{error}</Message>
      )}
      <>
        <Row>
          {cricketers.map((cricketer) => (
            <Col key={cricketer._id} sm={12} md={6} lg={4} xl={3}>
              <Cricketer cricketer={cricketer} />
            </Col>
          ))}
        </Row>

        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </>
    </>
  );
};

export default HomeScreen;
