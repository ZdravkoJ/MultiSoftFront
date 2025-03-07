import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Button,
  Table,
  Badge,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import avatar1 from "../../assets/img/avatars/avatar.jpg";

import { Plus } from "lucide-react";

interface Task {
  id: number;
  name: string;
  assignedToName: string;
  assignedToAvatar: string;
  dueDate: string;
  priority: string;
  priorityVariant: string;
}

const todoTasks: Task[] = [
  {
    id: 1,
    name: "Improve email marketing strategy",
    assignedToName: "Ashley Briggs",
    assignedToAvatar: avatar1,
    dueDate: "August 1, 2023",
    priority: "Medium",
    priorityVariant: "warning",
  },
];

const inProgressTasks: Task[] = [
  {
    id: 1,
    name: "Implement new analytics tracking",
    assignedToName: "Carl Jenkins",
    assignedToAvatar: avatar1,
    dueDate: "July 1, 2023",
    priority: "Low",
    priorityVariant: "success",
  },
];

const completedTasks: Task[] = [
  {
    id: 1,
    name: "Optimize website performance",
    assignedToName: "Bertha Martin",
    assignedToAvatar: avatar1,
    dueDate: "June 15, 2023",
    priority: "Low",
    priorityVariant: "success",
  },
];

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable = ({ tasks }: TaskTableProps) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th className="align-middle w-25px">
            <div className="form-check fs-4">
              <input
                className="form-check-input tasks-check-all"
                type="checkbox"
                id="tasks-check-all"
              />
              <label
                className="form-check-label"
                htmlFor="tasks-check-all"
              ></label>
            </div>
          </th>
          <th className="align-middle w-50">Name</th>
          <th className="align-middle d-none d-xl-table-cell">Assigned To</th>
          <th className="align-middle d-none d-xxl-table-cell">Due Date</th>
          <th className="align-middle">Priority</th>
          <th className="align-middle text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>
              <div className="form-check fs-4">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label"></label>
              </div>
            </td>
            <td>
              <strong>{task.name}</strong>
            </td>
            <td className="d-none d-xl-table-cell">
              <img
                src={task.assignedToAvatar}
                className="rounded-circle me-1"
                alt={task.assignedToName}
                width="32"
                height="32"
              />{" "}
              {task.assignedToName}
            </td>
            <td className="d-none d-xxl-table-cell">{task.dueDate}</td>
            <td>
              <Badge bg="" className={`badge-subtle-${task.priorityVariant}`}>
                {task.priority}
              </Badge>
            </td>
            <td className="text-end">
              {" "}
              <Button variant="light">View</Button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

interface TaskBoardProps {
  title: string;
  tasks: Task[];
}

const TaskBoard = ({ title, tasks }: TaskBoardProps) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={6}>
            <Card.Title>{title}</Card.Title>
          </Col>
          <Col xs={6}>
            <div className="text-sm-end">
              <Button
                variant="primary"
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
              >
                <Plus /> New Task
              </Button>
            </div>
          </Col>
        </Row>
        <TaskTable tasks={tasks} />
      </Card.Body>
    </Card>
  );
};

const TasksList = () => {
  return (
    <React.Fragment>
      <Helmet title="Task List" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Task List</h1>

        <TaskBoard title="Upcoming" tasks={todoTasks} />
        <TaskBoard title="In Progress" tasks={inProgressTasks} />
        <TaskBoard title="Completed" tasks={completedTasks} />
      </Container>
    </React.Fragment>
  );
};

export default TasksList;
