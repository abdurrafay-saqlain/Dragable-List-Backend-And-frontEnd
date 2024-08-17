import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
  }

  function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    updatePositions();
  }

  function handleDragOver(e) {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(e.clientY);
    if (afterElement == null) {
      e.currentTarget.appendChild(dragging);
    } else {
      e.currentTarget.insertBefore(dragging, afterElement);
    }
  }

  function getDragAfterElement(y) {
    const draggableElements = [...document.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  function updatePositions() {
    const draggables = Array.from(document.querySelectorAll('.draggable'));
    draggables.forEach((div, index) => {
      const positionLabel = div.querySelector('.position');
      positionLabel.textContent = `Position: ${index + 1}`;
    });
  }

  return (
    <div className="container" onDragOver={handleDragOver}>
      {users.map((user, index) => (
        <div
          key={user.id}
          id={`div${index + 1}`}
          className="draggable"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {user.name}
          <span className="position">Position: {index + 1}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
