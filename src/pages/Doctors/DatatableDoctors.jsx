import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { doctorColumns, userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const DatatableDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/doctor")
      .then((response) => {
        setDoctors(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios.delete("http://localhost:5000/users/" + row).then((response) => {
        setDoctors(response.data);
        setPopupshow(true);
        setPopupText(`${selectedRows.length} Doctors Deleted`);
      });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">Doctors</div>
      {selectedRows.length > 0 ? (
        <button
          onClick={() => {
            handleDeleteSelectedRows();
          }}>
          Delete Selected Rows
        </button>
      ) : null}
      {popUpShow ? (
        <div className="Popupmodal">
          <div
            className="popupInner"
            style={
              popUpShow && popUpText === "Category Added"
                ? {
                    backgroundColor: "#8AFF8A",
                    borderWidth: 1,
                    borderColor: "#007500",
                  }
                : { backgroundColor: "red", borderWidth: 1, borderColor: "red" }
            }>
            <PopupAlert popUpText={popUpText} />
          </div>
        </div>
      ) : (
        ""
      )}
      <DataGrid
        className="datagrid"
        rows={doctors}
        columns={doctorColumns}
        checkboxSelection={true}
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        getRowId={(row) => {
          return row._id;
        }}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default DatatableDoctors;
