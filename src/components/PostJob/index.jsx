import React, { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  };

  const handleImg = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    getBase64(file).then((base64) => {
      setLogo(base64);
    });
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();

    const jobPost = {
      company,
      position,
      salary,
      experience,
      role,
      location,
      logo,
    };

    if (!company || !position || !experience || !salary) {
      window.alert("Please fill all required fields");
      return;
    }

    let savedItem = [];

    if (localStorage.getItem("item")) {
      savedItem = JSON.parse(localStorage.getItem("item"));
    }

    localStorage.setItem(
      "item",
      JSON.stringify([...savedItem, { jobPost }])
    );

    window.alert("Job Posted Successfully 🚀");

    navigate("/Jobs");
  };

  return (
    <div>
      <Navbar />

      <div className="job-background">
        <div className="title">
          <h2>Hire Top Talent</h2>
        </div>
      </div>

      <div className="container">
        <header className="header">
          <h1 className="post-job">Create Job Listing</h1>
        </header>

        <form>
          <div className="form-group">
            <label>Company Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter company name"
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Job Location</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter job location"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Company Logo</label>

            <input
              type="file"
              onChange={handleImg}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Position</label>

            <select
              className="form-control"
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option disabled selected value>
                Choose position
              </option>

              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>UI/UX Designer</option>
              <option>DevOps Engineer</option>
              <option>Data Analyst</option>
            </select>
          </div>

          <div className="form-group">
            <label>Job Role</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter specific role"
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div
            className="form-group"
            onChange={(e) => setExperience(e.target.value)}
          >
            <label>Experience Required</label>

            <label>
              <input
                name="experience"
                value="0-1 Year"
                type="radio"
                className="input-radio"
              />
              Fresher / 0-1 Year
            </label>

            <label>
              <input
                name="experience"
                value="2-3 Years"
                type="radio"
                className="input-radio"
              />
              2-3 Years
            </label>

            <label>
              <input
                name="experience"
                value="4-5 Years"
                type="radio"
                className="input-radio"
              />
              4-5 Years
            </label>

            <label>
              <input
                name="experience"
                value="5+ Years"
                type="radio"
                className="input-radio"
              />
              5+ Years
            </label>
          </div>

          <div className="form-group">
            <label>Salary Range</label>

            <select
              className="form-control"
              onChange={(e) => setSalary(e.target.value)}
              required
            >
              <option disabled selected value>
                Select salary range
              </option>

              <option value="0-15K">0 - 15K</option>
              <option value="15-30K">15K - 30K</option>
              <option value="30K-50K">30K - 50K</option>
              <option value="50K-80K">50K - 80K</option>
              <option value="80K+">80K+</option>
            </select>
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmitButton}
            >
              Publish Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;