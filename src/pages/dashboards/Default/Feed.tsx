import React from "react";

import { Badge, Button, Card } from "react-bootstrap";

import avatar1 from "../../../assets/img/avatars/avatar.jpg";

const Feed = () => (
  <Card className="flex-fill w-100">
    <Card.Header>
      <Badge bg="info" className="float-end">
        Today
      </Badge>
      <Card.Title className="mb-0">Daily feed</Card.Title>
    </Card.Header>
    <Card.Body>
      <div className="d-flex">
        <img
          src={avatar1}
          width="36"
          height="36"
          className="rounded-circle me-2"
          alt="Ashley Briggs"
        />
        <div className="flex-grow-1">
          <small className="float-end text-navy">5m ago</small>
          <strong>Ashley Briggs</strong> started following{" "}
          <strong>Stacie Hall</strong>
          <br />
          <small className="text-muted">Today 7:51 pm</small>
          <br />
        </div>
      </div>

      <hr />
      <div className="d-flex">
        <img
          src={avatar1}
          width="36"
          height="36"
          className="rounded-circle me-2"
          alt="Chris Wood"
        />
        <div className="flex-grow-1">
          <small className="float-end text-navy">30m ago</small>
          <strong>Chris Wood</strong> posted something on{" "}
          <strong>Stacie Hall</strong>'s timeline
          <br />
          <small className="text-muted">Today 7:21 pm</small>
          <div className="border text-sm text-muted p-2 mt-1">
            Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
            quam semper libero, sit amet adipiscing...
          </div>
        </div>
      </div>

      <hr />

      <hr />
      <div className="d-grid">
        <Button variant="primary">Load more</Button>
      </div>
    </Card.Body>
  </Card>
);

export default Feed;
