import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/listing.css";
const Listing = () => {
  const navigate = useNavigate();

  const limit = 5;
  const [bannerDataArray, setBannerDataArray] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState();
  // const [liststatus, setListStatus] = useState("");

  useEffect(() => {
    async function getData() {
      await axios({
        method: "get",
        url: "https://ro-kart-slg1.onrender.com/getData",
        params: { limit: limit, page: activePage },
      })
        .then((value) => {
          setBannerDataArray(value.data.record);
          setTotal(value.data.totalDocument);
        })
        .catch((err) => console.log(err));
    }

    getData();
  }, [activePage]);

  const paginateArray = [];
  let i = 1;
  while (i <= Math.ceil(total / limit)) {
    paginateArray.push(i);
    i++;
  }

  const handleDelete = async (deletedataId, e) => {
    e.preventDefault();
    console.log("Delete")
    if (deletedataId) {
      const result = window.confirm("Do You Want to Delete");
      if (result) {
        await axios
          .delete(`https://ro-kart-slg1.onrender.com/deletebannerData/${deletedataId}`)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        window.location.reload();
      } else {
        console.log("Does not Want to Delete");
      }
    }
  };

  const handleStatusUpdate = async (UpdateId, statusValue) => {

      await axios
      .patch(
        `https://ro-kart-slg1.onrender.com/updateStatus/${UpdateId}`,
        {
          statusData: statusValue ,
        }
      )
      .then((data) => console.log("Data is ", data))
      .catch((err) => console.log(err));

  };

  return (
    <div className="maincontainer">
      <h2>Banner Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Position</th>
            <th>Status</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bannerDataArray.map((value) => (
            <tr>
              <td>{value.title}</td>
              <td>{value.position}</td>
              <td>
                <select
                  onClick={async (e) => {
                    e.preventDefault();
                    console.log("Value Id", value._id);
                    handleStatusUpdate(value._id, e.target.value);
               
                  }}
                  name="status"
                  id="status"
                >
                  <option value={value.status}>{value.status}</option>
                  {value.status === "Active" ? (
                    <option value="InActive">InActive</option>
                  ) : (
                    <option value="Active">Active </option>
                  )}
                </select>
              </td>
              <td>
                <img alt="RO_Kart" src={value.image}></img>
              </td>
              <td className="manageButton">
                <button
                  onClick={() => navigate(`/listing/editdata/${value._id}`)}
                  className="changeBtn"
                >
                  EDIT
                </button>
                <button
                  onClick={(e) => {
                    handleDelete(value._id, e);
                  }}
                  className="changeBtn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {paginateArray.map((value) => (
          <p
            onClick={(e) => {
              e.preventDefault();
              setActivePage(value);
            }}
          >
            {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Listing;
