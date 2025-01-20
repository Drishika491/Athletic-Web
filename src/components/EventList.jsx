import React from "react";

function EventList() {
  return (
    <div style={styles.container}>
      <div style={styles.eventListContainer}>
        <div style={styles.header}>Account Settings</div>
        <div style={styles.content}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            <div style={styles.profilePicture}></div>
            <div style={styles.editPhoto}>
              <span style={styles.editPhotoText}>Edit Photo ✏️</span>
            </div>
            <div style={styles.navLinks}>
              <a href="#security" style={styles.navLink}>
                Security
              </a>
              <a href="#transactions" style={styles.navLink}>
                Transactions
              </a>
              <a href="#event-list" style={styles.navLink}>
                Event List
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            <div style={styles.profileHeader}>Event List</div>
            <div style={styles.dottedLine}></div>

            {/* Event List Table */}
            <div style={styles.scrollableTable}>
              {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} style={styles.tableRow}>
                  <span style={styles.tableCell}>
                    {`0${index + 1}. Event Name`}
                  </span>
                  <span style={styles.tableCell}>Purpose</span>
                  <span style={styles.tableCell}>Date</span>
                </div>
              ))}
            </div>
            <button style={styles.saveButton}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f9f9f3",
    minHeight: "100vh",
  },
  eventListContainer: {
    width: "900px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "rgb(141, 137, 99)",
    textAlign: "start",
    padding: "10px 20px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
  },
  profilePicture: {
    width: "150px",
    height: "150px",
    backgroundColor: "#ccc",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  editPhoto: {
    cursor: "pointer",
    marginBottom: "20px",
  },
  editPhotoText: {
    fontSize: "14px",
    color: "#333",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    alignItems: "center",
  },
  navLink: {
    fontSize: "16px",
    color: "#000",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "bold",
    borderBottom: "1px dotted",
  },
  rightColumn: {
    width: "65%",
  },
  profileHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FF0000", // Red color for the header
    marginBottom: "10px",
  },
  dottedLine: {
    borderTop: "2px dashed #ccc",
    margin: "10px 0 20px",
  },
  scrollableTable: {
    maxHeight: "300px", // Scrollable height
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    scrollbarWidth: "thin",
    scrollbarColor: "rgb(141, 137, 99) #f9f9f3",
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ccc",
    padding: "10px 0",
  },
  tableCell: {
    fontSize: "14px",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "rgb(141, 137, 99)",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block",
    margin: "20px auto 0",
  },
};

export default EventList;
