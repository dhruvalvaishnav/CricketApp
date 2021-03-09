import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listCricketersDetails,
  updateCricketer,
} from "../actions/cricketerActions";
import { CRICKETER_UPDATE_RESET } from "../constants/cricketerConstansts";

const CricketerEditScreen = ({ match, history }) => {
  const cricketerId = match.params.id;

  const [name, setName] = useState("");
  const [Born, setBorn] = useState("");
  const [image, setImage] = useState("");
  const [Team, setTeam] = useState("");
  const [Age, setAge] = useState("");
  const [Role, setRole] = useState("");
  const [Batting, setBatting] = useState("");
  const [Bowling, setBowling] = useState("");
  const [ODI_100_50, setODI_100_50] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const cricketerDetails = useSelector((state) => state.cricketerDetails);
  const { loading, error, cricketers } = cricketerDetails;

  const cricketerUpdate = useSelector((state) => state.cricketerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = cricketerUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CRICKETER_UPDATE_RESET });
      history.push("/admin/cricketerlist");
    } else {
      if (!cricketers.name || cricketers._id !== cricketerId) {
        dispatch(listCricketersDetails(cricketerId));
      } else {
        setName(cricketers.name);
        setBorn(cricketers.Born);
        setImage(cricketers.image);
        setTeam(cricketers.Team);
        setAge(cricketers.Age);
        setRole(cricketers.Role);
        setBatting(cricketers.Batting);
        setBowling(cricketers.Bowling);
        setODI_100_50(cricketers.ODI_100_50);
      }
    }
  }, [dispatch, history, cricketerId, cricketers, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCricketer({
        _id: cricketerId,
        name,
        Born,
        image,
        Team,
        Age,
        Role,
        Batting,
        Bowling,
        ODI_100_50,
      })
    );
  };

  return (
    <>
      <Link to="/admin/cricketerlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Cricketer</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="Born">
              <Form.Label>Born</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Born"
                value={Born}
                onChange={(e) => setBorn(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>

              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="Team">
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Team"
                value={Team}
                onChange={(e) => setTeam(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="Age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Age"
                value={Age}
                onChange={(e) => setAge(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="Role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Role"
                value={Role}
                onChange={(e) => setRole(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="Batting">
              <Form.Label>Batting</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Batting Role"
                value={Batting}
                onChange={(e) => setBatting(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="Bowling">
              <Form.Label>Bowling</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Bowling Role"
                value={Bowling}
                onChange={(e) => setBowling(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="ODI_100_50">
              <Form.Label>ODI_100_50</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ODIs - 100/50"
                value={ODI_100_50}
                onChange={(e) => setODI_100_50(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CricketerEditScreen;
