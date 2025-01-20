import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageAthleteTable() {
  const [activeTab, setActiveTab] = useState("Security");
   const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [username, setUsername] = useState("");  // Dynamically set the username
    const [oldPassword, setOldPassword] = useState(""); // For dynamic old password (if needed)
  
    // Handle input changes for password fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "oldPassword") {
      setOldPassword(value); // This can be dynamic if needed
    }
  };

   // Handle form submission for password reset
   const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

     // Prepare data for API request
     const requestBody = {
      UserName: username, // Use dynamic username
      OldPassword: oldPassword, // Use dynamic old password if required
      NewPassword: password,
      ConfirmNewPassword: confirmPassword,
    };

    try {
      // Make API request to update the password
      const response = await axios.post(
        "https://localhost:44328/api/IdentityUser/UpdatePassword", // URL for password update
        requestBody,
        {
          headers: {
            "Content-Type": "application/json", // Set content type
          },
        }
      );
      

    

 // Check the response and handle success/failure
 if (response.data.isSuccess) {
  setSuccess("Password updated successfully!");
  setError(""); // Clear any previous errors
} else {
  setError("Error updating password: " + response.data.errorMessage);
  setSuccess(""); // Clear any previous success messages
}
} catch (err) {
console.error("Error:", err); // Log any error for debugging
setError("An error occurred. Please try again.");
setSuccess(""); // Clear any previous success messages
}
};

return (
<div style={styles.container}>
<div style={styles.contentWrapper}>
  <h2 style={styles.resetHeader}>Reset account password</h2>
  <p style={styles.instructionText}>Enter a new password for your account</p>
  <div style={styles.form}>
    {/* Input for username */}
    <label style={styles.label}>Username</label>
    <input
      type="email"
      name="username"
      value={username}
      onChange={handleInputChange}
      style={styles.input}
      placeholder="Enter your username"
    />
    {/* Input for old password */}
    <label style={styles.label}>Old Password</label>
    <input
      type="password"
      name="oldPassword"
      value={oldPassword}
      onChange={handleInputChange}
      style={styles.input}
      placeholder="Enter your old password"
    />
    {/* Input for new password */}
    <label style={styles.label}>New Password</label>
    <input
      type="password"
      name="password"
      value={password}
      onChange={handleInputChange}
      style={styles.input}
      placeholder="Enter a new password"
    />
    {/* Input for confirm new password */}
    <label style={styles.label}>Confirm New Password</label>
    <input
      type="password"
      name="confirmPassword"
      value={confirmPassword}
      onChange={handleInputChange}
      style={styles.input}
      placeholder="Confirm your new password"
    />
    <button style={styles.resetButton} onClick={handleSubmit}>Reset password</button>

    {/* Display error or success message */}
    {error && <p style={styles.errorText}>{error}</p>}
    {success && <p style={styles.successText}>{success}</p>}
  </div>
</div>
</div>
);
}

// Styling for the form (can be customized as needed)
const styles = {
container: {
padding: "40px",
backgroundColor: "#f9f9f9",
minHeight: "100vh",
fontFamily: "Arial, sans-serif",
display: "flex",
justifyContent: "flex-start",
alignItems: "flex-start",
},
contentWrapper: {
width: "50%",
padding: "20px",
},
resetHeader: {
fontSize: "32px",
fontWeight: "bold",
color: "#333",
marginBottom: "20px",
textAlign: "center",
},
instructionText: {
fontSize: "16px",
color: "#666",
marginBottom: "30px",
textAlign: "center",
},
form: {
maxWidth: "100%",
},
label: {
fontSize: "16px",
color: "#333",
marginBottom: "10px",
display: "block",
},
input: {
width: "100%",
padding: "12px",
marginBottom: "20px",
borderRadius: "5px",
border: "1px solid #ddd",
fontSize: "16px",
},
resetButton: {
backgroundColor: "#8D8963",
color: "#fff",
padding: "12px 20px",
border: "none",
borderRadius: "5px",
cursor: "pointer",
fontSize: "18px",
fontWeight: "bold",
display: "block",
width: "100%",
textAlign: "center",
},
errorText: {
color: "red",
fontSize: "14px",
marginTop: "10px",
},
successText: {
color: "green",
fontSize: "14px",
marginTop: "10px",
},
};

export default ManageAthleteTable;
