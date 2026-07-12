import React, { useState } from 'react';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    phone: '',
    flatType: '3BHK',
    department: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMember = { ...formData, _id: Date.now().toString(), registrationDate: new Date().toISOString() };
    
    try {
      const res = await fetch('http://localhost:5000/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        console.log('Registration Submitted successfully to DB');
        setSubmitted(true);
      } else {
        throw new Error('Server returned an error');
      }
    } catch (err) {
      console.warn('Backend unreachable, saving to local storage as fallback for demo purposes:', err);
      // Fallback for Netlify demo without backend
      const existing = JSON.parse(localStorage.getItem('mockRegistrations') || '[]');
      localStorage.setItem('mockRegistrations', JSON.stringify([newMember, ...existing]));
      setSubmitted(true);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card fade-in">
        <div className="registration-header">
          <h2>Society Registration Form</h2>
          <p>Register your interest for the DFCCIL Housing Society</p>
        </div>
        
        {submitted ? (
          <div className="registration-success">
            <h3>Registration Successful!</h3>
            <p>Thank you, {formData.fullName}. Your registration details have been received. We will contact you at {formData.email} regarding the next steps in the allotment process.</p>
            <button className="btn-secondary" onClick={() => setSubmitted(false)}>Register Another</button>
          </div>
        ) : (
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="employeeId">DFCCIL Employee ID</label>
                <input 
                  type="text" 
                  id="employeeId" 
                  name="employeeId" 
                  value={formData.employeeId} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. EMP12345"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Official Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="name@dfcc.co.in"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Mobile Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  placeholder="+91"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select 
                  id="department" 
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Department</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                  <option value="S&T">S&T (Signal & Telecom)</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="flatType">Preferred Flat Type</label>
                <select 
                  id="flatType" 
                  name="flatType" 
                  value={formData.flatType} 
                  onChange={handleChange}
                >
                  <option value="2BHK">2 BHK Premium</option>
                  <option value="3BHK">3 BHK Luxury</option>
                  <option value="4BHK">4 BHK Penthouse</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary submit-btn">Submit Registration</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
