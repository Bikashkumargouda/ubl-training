// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// // const API = "http://localhost:5000/api";
// const API = import.meta.env.VITE_API_URL;

// function TrainingForm() {
//   const [contractors, setContractors] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [topics, setTopics] = useState([]);

//   const [formData, setFormData] = useState({
//     contractor: "",
//     employee: "",
//     topic: "",
//     duration: 20,
//   });

//   // Load Contractors
//   useEffect(() => {
//     axios
//       .get(`${API}/contractors`)
//       .then((res) => {
//         setContractors(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   // Load Topics
//   useEffect(() => {
//     axios
//       .get(`${API}/topics`)
//       .then((res) => {
//         setTopics(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   // Load Employees
//   const handleContractorChange = async (e) => {
//     const contractorId = e.target.value;

//     setFormData({
//       ...formData,
//       contractor: contractorId,
//       employee: "",
//     });

//     try {
//       const res = await axios.get(
//         `${API}/employees/${contractorId}`
//       );

//       setEmployees(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         `${API}/training`,
//         formData
//       );

//       alert("Training Saved Successfully");

//       console.log(res.data);

//       setFormData({
//         contractor: "",
//         employee: "",
//         topic: "",
//         duration: 20,
//       });

//       setEmployees([]);
//     } catch (err) {
//       console.log(err);
//       alert("Error Saving Training");
//     }
//   };

//   return (
//     <div
//       className="container py-5"
//       style={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(135deg,#0F2027,#203A43,#2C5364)",
//       }}
//     >
//       <div className="row justify-content-center">

//         <div className="col-lg-8">

//           <div className="card shadow-lg border-0 rounded-4">

//             <div className="card-body p-5">

//               <h2 className="text-center mb-4 text-primary">
//                 United Breweries Limited
//               </h2>

//               <form onSubmit={handleSubmit}>

//                 {/* Contractor */}

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Contractor
//                   </label>

//                   <select
//                     className="form-select"
//                     value={formData.contractor}
//                     onChange={handleContractorChange}
//                     required
//                   >
//                     <option value="">
//                       Select Contractor
//                     </option>

//                     {contractors.map((contractor) => (
//                       <option
//                         key={contractor._id}
//                         value={contractor._id}
//                       >
//                         {contractor.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Employee */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Employee
//                   </label>

//                   <select
//                     className="form-select"
//                     name="employee"
//                     value={formData.employee}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">
//                       Select Employee
//                     </option>

//                     {employees.map((emp) => (
//                       <option
//                         key={emp._id}
//                         value={emp._id}
//                       >
//                         {emp.employeeId} - {emp.employeeName}
//                       </option>
//                     ))}
//                   </select>

//                 </div>

//                 {/* Topic */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Training Topic
//                   </label>

//                   <select
//                     className="form-select"
//                     name="topic"
//                     value={formData.topic}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">
//                       Select Topic
//                     </option>

//                     {topics.map((topic) => (
//                       <option
//                         key={topic._id}
//                         value={topic._id}
//                       >
//                         {topic.topicName}
//                       </option>
//                     ))}

//                   </select>

//                 </div>

//                 {/* Duration */}

//                 <div className="mb-3">

//                   <label className="form-label">
//                     Training Duration
//                   </label>

//                   <input
//                     className="form-control"
//                     value="20 Minutes"
//                     readOnly
//                   />

//                 </div>

//                 <button
//                   className="btn btn-primary w-100"
//                   type="submit"
//                 >
//                   Submit Training
//                 </button>

//               </form>

//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// export default TrainingForm;




// =======================================================================================================
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TrainingForm.css";

import ublLogo from "../assets/ubl-logo.png";

const API = import.meta.env.VITE_API_URL;

function TrainingForm() {

  const [loading, setLoading] = useState(false);

  const [contractors, setContractors] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [topics, setTopics] = useState([]);

  const [trainerName, setTrainerName] = useState("");

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [formData, setFormData] = useState({
    contractor: "",
    employee: "",
    topic: "",
    duration: 20,
  });

  // ==========================
  // Load Data
  // ==========================

  useEffect(() => {
    loadContractors();
    loadTopics();
  }, []);

  const loadContractors = async () => {
    try {

      const res = await axios.get(`${API}/contractors`);

      setContractors(res.data.data || res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const loadTopics = async () => {
    try {

      const res = await axios.get(`${API}/topics`);

      setTopics(res.data.data || res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // ==========================
  // Contractor Change
  // ==========================

  const handleContractorChange = async (e) => {

    const contractorId = e.target.value;

    setFormData({
      ...formData,
      contractor: contractorId,
      employee: "",
    });

    setSelectedEmployees([]);

    const contractor = contractors.find(
      (item) => item._id === contractorId
    );

    if (contractor) {

      setTrainerName(contractor.trainer);

    } else {

      setTrainerName("");

    }

    try {

      const res = await axios.get(
        `${API}/employees/${contractorId}`
      );

      setEmployees(res.data.data || res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // ==========================
  // Normal Input Change
  // ==========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================
  // Add Employee
  // ==========================

  const addEmployee = () => {

    if (!formData.employee) return;

    const emp = employees.find(
      (item) => item._id === formData.employee
    );

    if (!emp) return;

    const alreadyExist = selectedEmployees.find(
      (item) => item._id === emp._id
    );

    if (alreadyExist) {

      alert("Employee already selected");

      return;

    }

    setSelectedEmployees([
      ...selectedEmployees,
      emp,
    ]);

    setFormData({
      ...formData,
      employee: "",
    });

  };

  // ==========================
  // Remove Employee
  // ==========================

  const removeEmployee = (id) => {

    setSelectedEmployees(

      selectedEmployees.filter(
        (emp) => emp._id !== id
      )

    );

  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (selectedEmployees.length === 0) {

      alert("Please select at least one employee.");

      return;

    }

    setLoading(true);

    try {

      const payload = {

        contractor: formData.contractor,

        trainer: trainerName,

        topic: formData.topic,

        duration: 20,

        employees: selectedEmployees.map((emp) => ({
          employee: emp._id,
          employeeId: emp.employeeId,
          employeeName: emp.employeeName,
          designation: emp.designation,
          gender: emp.gender,
        })),
      };

      const res = await axios.post(
        `${API}/training`,
        payload
      );

      console.log(res.data);

      alert("Training Submitted Successfully");

      setFormData({
        contractor: "",
        employee: "",
        topic: "",
        duration: 20,
      });

      setEmployees([]);
      setSelectedEmployees([]);
      setTrainerName("");

    } catch (err) {

      console.log(err);

      alert("Submission Failed");

    }

    setLoading(false);

  };
  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      }}
    >
      <div className="row justify-content-center">

        <div className="col-lg-8 col-md-10">

          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >

            <div className="card-body p-5">

              {/* Header */}

              <div className="text-center mb-4">

                <img
                  src={ublLogo}
                  alt="UBL Logo"
                  style={{
                    width: "90px",
                    marginBottom: "15px",
                  }}
                />

                <h2 className="fw-bold text-primary">
                  United Breweries Limited
                </h2>

                <p className="text-muted">
                  Contractor Training Management System
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                {/* Contractor */}

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Contractor Name
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

                {/* Trainer */}

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Trainer Name
                  </label>

                  <input
                    className="form-control"
                    value={trainerName}
                    readOnly
                  />

                </div>

                {/* Employee */}

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Participating Employee
                  </label>

                  <div className="row g-2">

                    <div className="col-md-9">

                      <select
                        className="form-select"
                        name="employee"
                        value={formData.employee}
                        onChange={handleChange}
                      >

                        <option value="">
                          Select Employee
                        </option>

                        {employees
                          .filter(
                            (emp) =>
                              !selectedEmployees.some(
                                (item) =>
                                  item._id === emp._id
                              )
                          )
                          .map((emp) => (

                            <option
                              key={emp._id}
                              value={emp._id}
                            >
                              {emp.employeeId} - {emp.employeeName}
                            </option>

                          ))}

                      </select>

                    </div>

                    <div className="col-md-3">

                      <button
                        type="button"
                        className="btn btn-success w-100"
                        onClick={addEmployee}
                      >
                        + Add
                      </button>

                    </div>

                  </div>

                </div>

                {/* Selected Employees */}

                {selectedEmployees.length > 0 && (

                  <div className="mb-4">

                    <label className="fw-bold mb-2">
                      Selected Participants
                    </label>

                    {selectedEmployees.map((emp) => (

                      <div
                        key={emp._id}
                        className="d-flex justify-content-between align-items-center bg-light border rounded p-3 mb-2"
                      >

                        <div>

                          <h6 className="mb-0">
                            {emp.employeeName}
                          </h6>

                          <small className="text-muted">
                            {emp.employeeId}
                          </small>

                        </div>

                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            removeEmployee(emp._id)
                          }
                        >
                          ✖
                        </button>

                      </div>

                    ))}

                  </div>

                )}

                {/* Topic */}

                <div className="mb-3">

                  <label className="form-label fw-bold">
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

                <div className="mb-4">

                  <label className="form-label fw-bold">
                    Training Duration
                  </label>

                  <input
                    className="form-control"
                    value="20 Minutes"
                    readOnly
                  />

                </div>

                {/* Submit */}

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 fw-bold"
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Training"}
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