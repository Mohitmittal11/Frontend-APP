import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import "../../Style/bannerStyle/listing.css";
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
        url: `${process.env.REACT_APP_URL}/getData`,
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

  const initailArray = paginateArray.slice(0, 2);

  const lengthofpaginateArray = paginateArray.length;

  let lastpaginateArray = paginateArray.slice(
    lengthofpaginateArray - 1,
    lengthofpaginateArray
  );

  const handleDelete = async (deletedataId, e) => {
    e.preventDefault();
    if (deletedataId) {
      const result = window.confirm("Do You Want to Delete");
      if (result) {
        await axios
          .delete(
            `${process.env.REACT_APP_URL}/deletebannerData/${deletedataId}`
          )
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        window.location.reload();
      } else {
        console.log("Does not Want to Delete");
      }
    }
  };

  const handleStatusUpdate = async (UpdateId, statusValue) => {
    console.log("Status Value to send on server is ", statusValue);
    const result = await axios.patch(
      `${process.env.REACT_APP_URL}/updateStatus/${UpdateId}`,
      {
        data: statusValue,
      }
    );
    if (result) {
      toast.success("Status Updated Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bannerPageupper">
      <div className="maincontainerofbanner">
        <h2>Banner Data Table</h2>
        <ToastContainer />

        <div className="listbanner">
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
                      className="selectStatus"
                      onClick={async (e) => {
                        e.preventDefault();
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
        </div>
      </div>
      <div className="pagination1">
        <span
          onClick={() => {
            if (activePage > 1) {
              setActivePage(activePage - 1);
            }
          }}
          className="previous"
        >
          {"<<"}
        </span>
        {initailArray.map((value) => (
          <span
            className={`pagination1 ${
              activePage === value ? "listing_pagination" : "blue"
            }`}
            onClick={() => setActivePage(value)}
          >
            {value}
          </span>
        ))}

        <span className="dot">. . . . . .</span>

        {lastpaginateArray.map((value) => (
          <span
            className={`pagination1 ${
              activePage === value ? "listing_pagination" : "blue"
            }`}
            onClick={() => setActivePage(value)}
          >
            {value}
          </span>
        ))}

        <span
          onClick={() => {
            if (activePage < lengthofpaginateArray) {
              setActivePage(activePage + 1);
            }
          }}
          className="next"
        >
          {">>"}
        </span>
      </div>
    </div>
  );
};

export default Listing;
