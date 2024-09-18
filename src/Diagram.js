import React, { useState } from "react";
import "./Diagram.css"; // Import the CSS file for styling
import {
  FaDatabase,
  FaLaptopCode,
  FaServer,
  FaArrowsAltH,
  FaExpandAlt,
} from "react-icons/fa"; //ייבוא של אייקונים
import backgroundImage from "./Image/DataImage.jpg"; // עדכן את הנתיב בהתאם למיקום התמונה

const Diagram = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxClick = (box) => {
    //אם הקונטיינר שנלחץ הוא כבר ה-selectedBox, הפונקציה תגדיר את ה-state ל-null, אחרת היא תגדיר אותו לקונטיינר שנלחץ.
    setSelectedBox(selectedBox === box ? null : box);
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
      }}
    >
      <div className="mongobox" onClick={() => handleBoxClick("MongoDB")}>
        MongoDB
        <div>
          <br />
        </div>
        <FaDatabase className="icon" />
        {selectedBox === "MongoDB" && ( //אם ה-selectedBox הוא “MongoDB”, מציג את ה-div עם המידע הנוסף.
          <div className="info">
            <p>
              בחלק הזה בעצם יצרתי את הדאטה בייס שלי שהוא מכיל את כל הנתונים של
              כל קובץ שאעלה לאתר
            </p>
          </div>
        )}
      </div>
      <div className="arrow">
        <FaExpandAlt />
      </div>
      <div className="horizontal-container">
        <div className="box" onClick={() => handleBoxClick("Backend")}>
          Backend
          <div>
            <br />
          </div>
          <FaServer className="icon" />
          {selectedBox === "Backend" && (
            <div className="info">
              <p>
                בחלק הזה מימשתי את הבאקנד, שהמטרה שלו היא לעבד את המידע, לתקשר
                מול הדאטה בייס
              </p>
            </div>
          )}
        </div>
        <div className="arrow">
          <FaArrowsAltH />
        </div>
        <div className="box" onClick={() => handleBoxClick("Frontend")}>
          Frontend
          <div>
            <br />
          </div>
          <FaLaptopCode className="icon" />
          {selectedBox === "Frontend" && (
            <div className="info">
              <p>
                בחלק זה של הפרויקט יצרתי אתר:
                <br /> באתר זה יצרתי כפתור שבלחיצה עליו ניתן להעלות קבצים ואז הם
                יוצגו כטבלה באתר. <br /> בנוסף, ישנם פילטרים לסינון המידע ולהקלת
                חיפוש מידע ספציפי.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagram;
