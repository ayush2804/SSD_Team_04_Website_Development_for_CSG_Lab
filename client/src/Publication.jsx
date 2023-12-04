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
  const [paper, setpaper] = useState([]);

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
      const response = await fetch('http://localhost:3000/papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  name: formData.name, auth: formData.auth, jurnl: formData.jurnl, year:formData.year  }),
      });

      if (response.ok) {
        console.log('paper added successfully');
        // Optionally, you can reset the form or perform other actions after successful submission
        setFormData({ name: '', auth: '',jurnl:'',year:'' , });
        fetchpaperdata(); // Fetch updated student data
      } else {
        console.error('Error adding paper1');
      }
    } catch (error) {
      console.error('Error adding paper:', error);
    }
  };

  // Function to fetch existing students data
  const fetchpaperdata = async () => {
    try {
      const response = await fetch('http://localhost:3000/papers');
      if (response.ok) {
        const data = await response.json();
        setpaper(data.data);
      } else {
        console.error('Error fetching paper data');
      }
    } catch (error) {
      console.error('Error fetching paper data:', error);
    }
  };

  // Fetch existing students data on component mount
  useEffect(() => {
    fetchpaperdata();
  }, []);


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Arial, sans-serif' }}>
      {/* Form Section */}
      <div style={{ flex: '1', background: '#f4f4f4', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add paper</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ margin: '10px', fontSize: '14px', width: '100%' }}>
          paper name:
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
            Journal:
            <input
              type="text"
              name="jurnl"
              value={formData.jurnl}
              onChange={handleChange}
              style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              required
            />
          </label>

          <label style={{ margin: '10px', fontSize: '14px', width: '100%' }}>
            year:
            <input
              type="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box' }}
              required
            />
          </label>

          <button type="submit" style={{ padding: '10px', fontSize: '14px', cursor: 'pointer' }}>
            Add paper
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div style={{ flex: '1', background: '#e6f7ff', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Existing Papers</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {/* <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>ID</th> */}
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>Author</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>Journal</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>Year</th>
            </tr>
          </thead>
          <tbody>
            {paper.map((paper) => (
              <tr key={paper._id} style={{ textAlign: 'center' }}>
                {/* <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{student.id}</td> */}
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{paper.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{paper.auth}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{paper.jurnl}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', fontSize: '14px' }}>{paper.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
};

export default App;
