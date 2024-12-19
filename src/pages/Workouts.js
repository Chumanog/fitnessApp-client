import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkoutCards from '../components/WorkoutCards'; 
import { Button } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
  });

  useEffect(() => {
    // Fetch workouts from the backend
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('https://fitnessapp-api-ln8u.onrender.com/workouts');
        setWorkouts(response.data);
      } catch (error) {
        console.error('Failed to fetch workouts', error);
      }
    };

    fetchWorkouts();
  }, []);

  // Handle the edit workout action
  const editWorkout = (workout) => {
    setSelectedWorkout(workout);
    setFormData({
      title: workout.title,
      description: workout.description,
      duration: workout.duration,
    });
    setShowModal(true);
  };

  // Handle the delete workout action
  const deleteWorkout = async (id) => {
    try {
      await axios.delete(`https://fitnessapp-api-ln8u.onrender.com/workouts/${id}`);
      setWorkouts(workouts.filter(workout => workout.id !== id)); // Remove from state
    } catch (error) {
      console.error('Failed to delete workout', error);
    }
  };

  // Handle form input changes for editing
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle workout update
  const handleUpdate = async () => {
    const { title, description, duration } = formData;
    try {
      const updatedWorkout = await axios.put(`https://fitnessapp-api-ln8u.onrender.com/workouts/${selectedWorkout.id}`, {
        title,
        description,
        duration,
      });
      setWorkouts(workouts.map(workout => (workout.id === selectedWorkout.id ? updatedWorkout.data : workout)));
      setShowModal(false);
      setSelectedWorkout(null);
    } catch (error) {
      console.error('Failed to update workout', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.map(workout => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            editWorkout={editWorkout}
            deleteWorkout={deleteWorkout}
          />
        ))}
      </div>

      {/* Modal for editing a workout */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Workout</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleFormChange}
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <Button
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleUpdate}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;