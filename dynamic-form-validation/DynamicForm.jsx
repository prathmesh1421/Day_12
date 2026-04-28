import { useState } from "react";

function DynamicForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Validation Rules
  const rules = {
    name: {
      required: true,
      minLength: 3
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      required: true,
      minLength: 6
    }
  };

  // 🔹 Validate single field
  const validateField = (name, value) => {
    const rule = rules[name];
    let error = "";

    if (rule.required && !value.trim()) {
      error = `${name} is required`;
    } else if (rule.minLength && value.length < rule.minLength) {
      error = `${name} must be at least ${rule.minLength} characters`;
    } else if (rule.pattern && !rule.pattern.test(value)) {
      error = `Invalid ${name}`;
    }

    return error;
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // 🔹 Validate all fields
  const validateAll = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    return newErrors;
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateAll();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("✅ Form Submitted Successfully!");
    console.log(formData);

    // reset form
    setFormData({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Dynamic Form</h2>

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
              type="text"
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
              style={styles.toggle}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            <p style={styles.error}>{errors.password}</p>
          </div>

          <button type="submit" style={styles.button}>
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2ff"
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  button: {
    padding: "10px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  toggle: {
    marginTop: "5px",
    fontSize: "12px",
    background: "none",
    border: "none",
    color: "#4f46e5",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "12px"
  }
};

export default DynamicForm;
