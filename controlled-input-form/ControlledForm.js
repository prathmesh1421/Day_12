import { useState } from "react";

function ControlledForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert(`✅ Registered Successfully!\n\nName: ${formData.name}`);

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Register</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{errors.name}</p>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{errors.email}</p>
          </div>

          {/* Password */}
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />

            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              style={styles.toggleBtn}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            <p style={styles.error}>{errors.password}</p>
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>

        </form>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "12px",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  toggleBtn: {
    marginTop: "5px",
    fontSize: "12px",
    background: "none",
    border: "none",
    color: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px"
  }
};

export default ControlledForm;
