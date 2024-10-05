import { TextField } from '@mui/material';
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    question: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length === 0) {
      // Submit form data
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!values.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.question.trim()) {
      errors.question = 'Question is required';
    }

    return errors;
  };

  return (
    <div>

        <div>
        <h1>Contact Us</h1>
        </div>

    <div>
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <TextField
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <TextField
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <TextField
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
          {errors.question && <div className="error">{errors.question}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>6
    </div>
      
    </div>
  );
}

export default ContactForm;
