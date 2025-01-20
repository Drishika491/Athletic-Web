import React, { useState } from "react";

function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");

  const dummyData = [
    { eventDate: "2023-01-01", eventName: "New Year Party", venue: "Venue A", participants: 50, registeredDate: "2022-12-20", amountPaid: "$100" },
    { eventDate: "2023-02-14", eventName: "Valentine's Gala", venue: "Venue B", participants: 30, registeredDate: "2023-02-01", amountPaid: "$80" },
    { eventDate: "2023-03-17", eventName: "St. Patrick's Celebration", venue: "Venue C", participants: 40, registeredDate: "2023-03-05", amountPaid: "$90" },
  ];

  const filteredData = dummyData.filter((data) =>
    data.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.transactionsContainer}>
        <div style={styles.profileHeader}>Transaction</div>
        <div style={styles.dottedLine}></div>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Event Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>🔍</button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Event Date</th>
              <th style={styles.tableHeader}>Event Name</th>
              <th style={styles.tableHeader}>Venue</th>
              <th style={styles.tableHeader}>Participants</th>
              <th style={styles.tableHeader}>Registered Date</th>
              <th style={styles.tableHeader}>Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{data.eventDate}</td>
                  <td style={styles.tableCell}>{data.eventName}</td>
                  <td style={styles.tableCell}>{data.venue}</td>
                  <td style={styles.tableCell}>{data.participants}</td>
                  <td style={styles.tableCell}>{data.registeredDate}</td>
                  <td style={styles.tableCell}>{data.amountPaid}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.noData} colSpan="6">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
  transactionsContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  profileHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FF0000",
    marginBottom: "10px",
  },
  dottedLine: {
    borderTop: "2px dashed #ccc",
    margin: "10px 0 20px",
  },
  searchContainer: {
    display: "flex",
    marginBottom: "20px",
    alignItems: "center",
    gap: "10px",
  },
  searchInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  searchButton: {
    padding: "10px",
    backgroundColor: "rgb(141, 137, 99)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    borderBottom: "2px solid #ccc",
    textAlign: "left",
    padding: "10px",
    backgroundColor: "#f4f4f4",
  },
  tableCell: {
    borderBottom: "1px solid #ccc",
    padding: "10px",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#666",
  },
};

export default Transactions;
