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
  const [proj, setproj] = useState([]);

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
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  name: formData.name, auth: formData.auth, dept: formData.dept, grant:formData.grant  }),
      });

      if (response.ok) {
        console.log('proj added successfully');
        // Optionally, you can reset the form or perform other actions after successful submission
        setFormData({ name: '', auth: '',dept:'',grant:'' , });
        fetchprojdata(); // Fetch updated student data
      } else {
        console.error('Error adding proj1');
      }
    } catch (error) {
      console.error('Error adding proj:', error);
    }
  };

  // Function to fetch existing students data
  const fetchprojdata = async () => {
    try {
      const response = await fetch('http://localhost:3000/projects');
      if (response.ok) {
        const data = await response.json();
        setproj(data.data);
      } else {
        console.error('Error fetching proj data');
      }
    } catch (error) {
      console.error('Error fetching proj data:', error);
    }
  };

  // Fetch existing students data on component mount
  useEffect(() => {
    fetchprojdata();
  }, []);


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Arial, sans-serif' }}>
      {/* Form Section */}
      <div style={{ flex: '1', background: '#f4f4f4', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Project</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ margin: '10px', fontSize: '14px', width: '100%' }}>
            Project name:
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
            Author:
            <input
              type="text"
              name="auth"
              value={formData.auth}
              onChange={handleChange}
              style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              required
            />
          </label>

          <label style={{ margin: '10px', fontSize: '14px', width: '100%' }}>
            Department:
            <input
              type="text"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              required
            />
          </label>

          <label style={{ margin: '10px', fontSize: '14px', width: '100%' }}>
            Grant:
            <input
              type="number"
              name="grant"
              value={formData.grant}
              onChange={handleChange}
              style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              required
            />
          </label>

          <button type="submit" style={{ padding: '10px', fontSize: '14px', cursor: 'pointer' }}>
            Add Project
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div style={{ flex: '1', background: '#e6f7ff', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Existing Projects</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {/* <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>ID</th> */}
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>Author</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>Department</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>Grant</th>
            </tr>
          </thead>
          <tbody>
            {proj.map((proj) => (
              <tr key={proj._id} style={{ textAlign: 'center' }}>
                {/* <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{student.id}</td> */}
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{proj.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{proj.auth}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{proj.dept}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{proj.grant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
};

export default App;
