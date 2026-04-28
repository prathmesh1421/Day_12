import { useState } from "react";

function MultiFieldForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    skills: [],
    country: ""
  });

  // 🔹 Handle all inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Checkbox (multiple values)
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted ✅");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>

        <h2>Multi Field Form</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        {/* Gender */}
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
            /> Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
            /> Female
          </label>
        </div>

        {/* Skills */}
        <div>
          <label>
            <input
              type="checkbox"
              value="React"
              onChange={handleChange}
            /> React
          </label>

          <label>
            <input
              type="checkbox"
              value="Java"
              onChange={handleChange}
            /> Java
          </label>

          <label>
            <input
              type="checkbox"
              value="Spring"
              onChange={handleChange}
            /> Spring
          </label>
        </div>

        {/* Country */}
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>

        <button type="submit" style={styles.button}>
          Submit
        </button>

      </form>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
  },
  form: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default MultiFieldForm;
