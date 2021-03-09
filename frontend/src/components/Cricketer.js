import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../index.css";

const Cricketer = ({ cricketer }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/cricketer/${cricketer._id}`}>
        <Card.Img src={cricketer.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/cricketer/${cricketer._id}`}>
          <Card.Title as="h2">
            <strong className="name">{cricketer.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h6">Born : {cricketer.Born}</Card.Text>
        <Card.Text as="h6">Age : {cricketer.Age}</Card.Text>
        <Card.Text as="h6">Team : {cricketer.Team}</Card.Text>
        <Card.Text as="h6">Role : {cricketer.Role}</Card.Text>
        <Card.Text as="h6">Batting : {cricketer.Batting}</Card.Text>
        <Card.Text as="h6">Bowling : {cricketer.Bowling}</Card.Text>
        <Card.Text as="h6">ODI 100/50 : {cricketer.ODI_100_50}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cricketer;
