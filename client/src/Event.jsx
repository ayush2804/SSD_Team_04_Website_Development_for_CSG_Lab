// Import necessary modules
import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

const App = () => {
  // State for form input
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
   
  });

  // State for existing students data
  const [event, setevent] = useState([]);

//   Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    
    });
  };

  

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique ID using uuid
    // const generatedId = uuidv4();

    try {
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  name: formData.name, desc: formData.description  }),
      });

      if (response.ok) {
        console.log('event added successfully');
        // Optionally, you can reset the form or perform other actions after successful submission
        setFormData({ name: '', description: '',  });
        fetcheventdata(); // Fetch updated student data
      } else {
        console.error('Error adding event1');
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Function to fetch existing students data
  const fetcheventdata = async () => {
    try {
      const response = await fetch('http://localhost:3000/events');
      if (response.ok) {
        const data = await response.json();
        setevent(data.data);
      } else {
        console.error('Error fetching event data');
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  // Fetch existing students data on component mount
  useEffect(() => {
    fetcheventdata();
  }, []);


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Arial, sans-serif' }}>
      {/* Form Section */}
      <div style={{ flex: '1', background: '#f4f4f4', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Event</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ margin: '10px', fontSize: '14px', width: '100%' }}>
            event name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              required
            />
          </label>

          <label style={{ margin: '10px', fontSize: '14px', width: '100%' }}>
            description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              required
            />
          </label>

          <button type="submit" style={{ padding: '10px', fontSize: '14px', cursor: 'pointer' }}>
            Add event
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div style={{ flex: '1', background: '#e6f7ff', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Existing Events</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {/* <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>ID</th> */}
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>description</th>
            </tr>
          </thead>
          <tbody>
            {event.map((event) => (
              <tr key={event._id} style={{ textAlign: 'center' }}>
                {/* <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{student.id}</td> */}
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{event.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{event.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
};

export default App;
