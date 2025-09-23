import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from '../css/JoinUs.module.css';

export default function JoinUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student', // Default role
    gradeLevel: 'Freshman', // Default grade level for students
    school: '', // School for students
    currentEmployer: '', // Employer for mentors
    moreInfo: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      access_key: '30522979-edc6-4332-a439-8e80341df0f3', // Same access key
      name: formData.name,
      email: formData.email,
      role: formData.role,
      grade_level: formData.role === 'Student' ? formData.gradeLevel : undefined, // Include grade level only for students
      school: formData.role === 'Student' ? formData.school : undefined, // Include school only for students
      current_employer: formData.role === 'Mentor' ? formData.currentEmployer : undefined, // Include employer only for mentors
      more_info: formData.moreInfo,
      subject: 'ARGOS Join Request Submission: ' + formData.name,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatus('Submission successful!');
      alert('Thank you for your interest in joining our team! We have received your submission.');
    } else {
      setStatus('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <Layout title="Join Us" description="Join Argos Robotics Team 1756">
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Join Us</h1>
          <form onSubmit={handleSubmit} className={styles.joinForm}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Interested Role:
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
              </select>
            </label>
            {formData.role === 'Student' && (
              <>
                <label>
                  Grade Level:
                  <select
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleChange}
                  >
                    <option value="EightGrade">8th Grade</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                  </select>
                </label>
                <label>
                  School:
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                  />
                </label>
              </>
            )}
            {formData.role === 'Mentor' && (
              <label>
                Current Employer:
                <input
                  type="text"
                  name="currentEmployer"
                  value={formData.currentEmployer}
                  onChange={handleChange}
                  required
                />
              </label>
            )}
            <label>
              More Info (Optional):
              <textarea
                name="moreInfo"
                value={formData.moreInfo}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          {status && <p>{status}</p>}
        </div>
      </div>
    </Layout>
  );
}