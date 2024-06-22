import React, { useState } from 'react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => {
      const skills = prevState.additionalSkills;
      if (checked) {
        return { ...prevState, additionalSkills: [...skills, value] };
      } else {
        return { ...prevState, additionalSkills: skills.filter(skill => skill !== value) };
      }
    });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required!!!';

    if (!formData.email) {
      newErrors.email = 'Email is required!!!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid!!!';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required!!!';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be a valid number!!!';
    }

    if (!formData.position) newErrors.position = 'Position is required!!!';
    
    if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience) {
      newErrors.relevantExperience = 'Relevant Experience is required!!!';
    } else if (formData.relevantExperience && formData.relevantExperience <= 0) {
      newErrors.relevantExperience = 'Experience must be greater than 0!!!';
    }

    if (formData.position === 'Designer' && !formData.portfolioUrl) {
      newErrors.portfolioUrl = 'Portfolio URL is required!!!';
    } else if (formData.portfolioUrl && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioUrl)) {
      newErrors.portfolioUrl = 'Portfolio URL format is invalid!!!';
    }

    if (formData.position === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required!!!';
    } else if (formData.position === 'Manager' && !/^\d+$/.test(formData.managementExperience)) {
      newErrors.managementExperience = 'It must be a valid number!!!';
    }

    if (formData.additionalSkills.length === 0) {
      newErrors.additionalSkills = 'At least one skill must be selected!!!';
    }

    if (!formData.interviewTime) {
      newErrors.interviewTime = 'Preferred Interview Time is required!!!';
    }

    setErrors(newErrors);
    console.log(Object.keys(newErrors).length);
    console.log(Object.values(newErrors));
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
      console.log(submittedData);
    }
  };

  return (
    <div className='form'>
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.fullName && <span className='error'>{errors.fullName}</span>}
          <label>Full Name:</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} />
        </div>
        
        <div>
          {errors.email && <span className='error'>{errors.email}</span>}
          <label className='email'>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        
        <div>
          {errors.phoneNumber && <span className='error'>{errors.phoneNumber}</span>}
          <label>Phone Number:</label>
          <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        
        <div>
          {errors.position && <span className='error'>{errors.position}</span>}
          <label>Applying for Position:</label>
          <select className='options' name="position" value={formData.position} onChange={handleChange}>
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div>
            {errors.relevantExperience && <span className='error'>{errors.relevantExperience}</span>}
            <label>Relevant Experience (years):</label>
            <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
          </div>
        )}

        {formData.position === 'Designer' && (
          <div>
            {errors.portfolioUrl && <span className='error'>{errors.portfolioUrl}</span>}
            <label>Portfolio URL:</label>
            <input name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
          </div>
        )}

        {formData.position === 'Manager' && (
          <div>
            {errors.managementExperience && <span className='error'>{errors.managementExperience}</span>}
            <label>Management Experience:</label>
            <input name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
          </div>
        )}

        <div>
          <label>Additional Skills:</label>
          <div>
            {errors.additionalSkills && <span className='error'>{errors.additionalSkills}</span>}
            <label>
              <input type="checkbox" name="additionalSkills" value="JavaScript" onChange={handleChange} />
              JavaScript
            </label>
            <label>
              <input type="checkbox" name="additionalSkills" value="CSS" onChange={handleChange} />
              CSS
            </label>
            <label>
              <input type="checkbox" name="additionalSkills" value="Python" onChange={handleChange} />
              Python
            </label>
          </div>
        </div>

        <div className='date'>
          {errors.interviewTime && <span className='error'>{errors.interviewTime}</span>}
          <label>Preferred Interview Time:</label>
          <input type="datetime-local" name="interviewTime" value={formData.interviewTime} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className='datashow'>
          <h2>Form Submitted</h2>
          <p>Full Name: {submittedData.fullName}</p>
          <p>Email: {submittedData.email}</p>
          <p>Phone Number: {submittedData.phoneNumber}</p>
          <p>position: {submittedData.position}</p>
          {submittedData.position === 'Designer' || submittedData.position === 'Developer' ?<p>Relevant Experience: {submittedData.relevantExperience}</p>:""}
          {submittedData.position === 'Designer' ? <p>PortfolioUrl: {submittedData.portfolioUrl}</p>: ""}
          {submittedData.position === 'Manager' ? <p>Management Experience : {submittedData.managementExperience}</p>: "" }
          <p>Additional Skills:{submittedData.additionalSkills}</p>
          <p>Interview time: {submittedData.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
