import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// const API = "http://localhost:5000/api";
const API = import.meta.env.VITE_API_URL;

function TrainingForm() {
  const [contractors, setContractors] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [topics, setTopics] = useState([]);

  const [formData, setFormData] = useState({
    contractor: "",
    employee: "",
    topic: "",
    duration: 20,
  });

  // Load Contractors
  useEffect(() => {
    axios
      .get(`${API}/contractors`)
      .then((res) => {
        setContractors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Load Topics
  useEffect(() => {
    axios
      .get(`${API}/topics`)
      .then((res) => {
        setTopics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Load Employees
  const handleContractorChange = async (e) => {
    const contractorId = e.target.value;

    setFormData({
      ...formData,
      contractor: contractorId,
      employee: "",
    });

    try {
      const res = await axios.get(
        `${API}/employees/${contractorId}`
      );

      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/training`,
        formData
      );

      alert("Training Saved Successfully");

      console.log(res.data);

      setFormData({
        contractor: "",
        employee: "",
        topic: "",
        duration: 20,
      });

      setEmployees([]);
    } catch (err) {
      console.log(err);
      alert("Error Saving Training");
    }
  };

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0F2027,#203A43,#2C5364)",
      }}
    >
      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body p-5">

              <h2 className="text-center mb-4 text-primary">
                United Breweries Limited
              </h2>

              <form onSubmit={handleSubmit}>

                {/* Contractor */}

                <div className="mb-3">
                  <label className="form-label">
                    Contractor
                  </label>

                  <select
                    className="form-select"
                    value={formData.contractor}
                    onChange={handleContractorChange}
                    required
                  >
                    <option value="">
                      Select Contractor
                    </option>

                    {contractors.map((contractor) => (
                      <option
                        key={contractor._id}
                        value={contractor._id}
                      >
                        {contractor.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Employee */}

                <div className="mb-3">

                  <label className="form-label">
                    Employee
                  </label>

                  <select
                    className="form-select"
                    name="employee"
                    value={formData.employee}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Employee
                    </option>

                    {employees.map((emp) => (
                      <option
                        key={emp._id}
                        value={emp._id}
                      >
                        {emp.employeeId} - {emp.employeeName}
                      </option>
                    ))}
                  </select>

                </div>

                {/* Topic */}

                <div className="mb-3">

                  <label className="form-label">
                    Training Topic
                  </label>

                  <select
                    className="form-select"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Topic
                    </option>

                    {topics.map((topic) => (
                      <option
                        key={topic._id}
                        value={topic._id}
                      >
                        {topic.topicName}
                      </option>
                    ))}

                  </select>

                </div>

                {/* Duration */}

                <div className="mb-3">

                  <label className="form-label">
                    Training Duration
                  </label>

                  <input
                    className="form-control"
                    value="20 Minutes"
                    readOnly
                  />

                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                >
                  Submit Training
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default TrainingForm;