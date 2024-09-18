import React, { useState } from "react";
import Papa from "papaparse";
import styles from "./CsvTable.module.css";
import backgroundImage from "./Image/DataImage.jpg"; // עדכן את הנתיב בהתאם למיקום התמונה
import { FaFile } from "react-icons/fa";

const CsvTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({}); // Object to hold filters for each column

  // Handle file upload and parsing
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
        setFilteredData(results.data); // Initialize filteredData
        // Initialize filters for each column
        const columns = Object.keys(results.data[0] || {}); //לוקחת את האובייקט הראשון במערך results.data או אובייקט ריק אם המערך ריק.
        // ומחזירה מערך של המפתחות של אותו אובייקט.
        const initialFilters = columns.reduce((acc, column) => {
          //הפקודה הזו מייצרת אובייקט שבו כל עמודה מcolumns משויכת לערך ריק
          acc[column] = "";
          return acc;
        }, {});
        setFilters(initialFilters);
      },
    });
  };

  // Handle filter change
  const handleFilterChange = (event, column) => {
    const value = event.target.value;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [column]: value }; // הפקודה יוצרת אובייקט חדש שמשלב את כל המפתחות והערכים של prevFilters, ומעדכנת או מוסיפה מפתח עם הערך החדש שניתן
      filterData(newFilters);
      return newFilters;
    });
  };

  // Filter data based on filters
  const filterData = (filters) => {
    //הקוד מסנן את data ומחזיר את השורות שבהן כל הערכים של המפתחות בfilters תואמים (כוללים את) הערכים המתאימים בfilters.
    const filtered = data.filter((row) =>
      Object.keys(filters).every((column) =>
        row[column]
          ? row[column]
              .toString()
              .toLowerCase()
              .includes(filters[column].toLowerCase())
          : true
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
      }}
    >
      <h1 style={{ color: "white" }}>CSV Data Table!</h1>
      <h3 style={{ color: "white", textAlign: "center" }}>
        Select Csv File
        <FaFile />
      </h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <table className={styles.table}>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key}>
                  <div className={styles.filterWrapper}>
                    <input
                      type="text"
                      value={filters[key] || ""}
                      onChange={(e) => handleFilterChange(e, key)} //אשר הערך משתנה, הפונקציה handleFilterChange תעדכן את המסננים.
                      placeholder={`Search ${key}`} //טקסט עזר שמנחה את המשתמש מה לחפש בעמודה זו.
                      className={styles.filterInput} // Apply custom styling if needed
                    />
                    <div>{key}</div>
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvTable;
