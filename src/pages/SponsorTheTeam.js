import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from '../css/SponsorTheTeam.module.css';

export default function SponsorTheTeam() {
  const [sponsorType, setSponsorType] = useState('Organization');
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    sponsorshipTier: 'Gold',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      access_key: '30522979-edc6-4332-a439-8e80341df0f3',
      name: formData.name,
      sponsor_type: sponsorType,
      organization: sponsorType === 'Organization' ? formData.organization : '',
      email: formData.email,
      phone: formData.phone,
      sponsorship_tier: formData.sponsorshipTier,
      subject: 'ARGOS Sponsorship Submission: ' + formData.name,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatus('Submission successful!');
      alert('Thank you for your interest in sponsoring our team! We have received your submission, an Argos representatives will reach out to you soon.');
    } else {
      setStatus('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <Layout title="Sponsor Our Team" description="Support Argos Robotics Team 1756">
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Sponsor Our Team</h1>
          <form onSubmit={handleSubmit} className={styles.sponsorForm}>
            <label>
              Sponsor Type:
              <select name="sponsorType" value={sponsorType} onChange={(e) => setSponsorType(e.target.value)}>
                <option value="Individual">Individual</option>
                <option value="Organization">Organization</option>
              </select>
            </label>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            {sponsorType === 'Organization' && (
              <label>
                Organization:
                <input type="text" name="organization" value={formData.organization} onChange={handleChange} />
              </label>
            )}
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Phone:
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              Desired Sponsorship Tier:
              <select
                name="sponsorshipTier"
                value={formData.sponsorshipTier}
                onChange={handleChange}
                className={styles.tierDropdown}
              >
                <option value="Platinum" className={styles.platinumTier}>Platinum</option>
                <option value="Gold" className={styles.goldTier}>Gold</option>
                <option value="Silver" className={styles.silverTier}>Silver</option>
                <option value="Bronze" className={styles.bronzeTier}>Bronze</option>
                {sponsorType === 'Individual' && (
                  <option value="Copper" className={styles.copperTier}>Copper</option>
                )}
                <option value="Other" className={styles.platinumTier}>Other</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
          {status && <p>{status}</p>}
        </div>
        <div className={styles.infoContainer}>
          <h5> Help shape our community's children of today to be the bright stars of tomorrow</h5>
          <h1>Sponsorship Information</h1>
          <div className={styles.sponsorshipInfo}>
            <h3>Platinum Sponsor - $15,000+</h3>
            <ul>
              <li>Name and logo displayed on social media and sponsor display</li>
              <li>Large logo displayed on robot</li>
              <li>Visit with students on site</li>
              <li>Season recap and appreciation photo</li>
            </ul>
            <h3>Gold Sponsor - $7,500+</h3>
            <ul>
              <li>Name and logo displayed on social media and sponsor display</li>
              <li>Medium logo displayed on robot</li>
              <li>Season recap and appreciation photo</li>
            </ul>
            <h3>Silver Sponsor - $2,500+</h3>
            <ul>
              <li>Name and logo displayed on sponsor display</li>
              <li>Small logo displayed on robot</li>
              <li>Season recap and appreciation photo</li>
            </ul>
            <h3>Bronze Sponsor - $1,000+</h3>
            <ul>
              <li>Name and logo displayed on sponsor poster</li>
              <li>Season recap and appreciation photo</li>
            </ul>
            {sponsorType === 'Individual' && (
              <div>
                <h3>Copper Sponsor - $100+</h3>
                <ul>
                  <li>Name listed on the team's website</li>
                </ul>
              </div>
            )}
          </div>
        </div>
</div>
      </Layout>
  );
}