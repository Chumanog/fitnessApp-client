import React from 'react';
import { Button } from 'react-bootstrap';

const WorkoutCard = ({ workout, editWorkout, deleteWorkout }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{workout.title}</h5>
          <p className="card-text">{workout.description}</p>
          <p className="card-text">
            <strong>Duration:</strong> {workout.duration} minutes
          </p>
          {/* Edit and Delete Buttons */}
          <Button
            variant="primary"
            className="mr-2"
            onClick={() => editWorkout(workout)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteWorkout(workout._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;