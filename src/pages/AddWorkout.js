import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddWorkout = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://fitnessapp-api-ln8u.onrender.com/workouts', {
        title,
        description,
        duration,
      });
      Swal.fire('Success', 'Workout added successfully!', 'success');
      setTitle('');
      setDescription('');
      setDuration('');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to add workout', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Workout</h2>
      <form onSubmit={handleAddWorkout}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration (minutes)
          </label>
          <input
            type="number"
            className="form-control"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default AddWorkout;