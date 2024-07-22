import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

import "../../Style/SubscriptionStyle/subscriptionlisting.css";
import { ToastContainer, toast } from "react-toastify";

const SubscriptionPageListing = () => {
  let limit = 5;
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [dataFound, setDataFound] = useState(true);
  const [mutateLoader, setMutateLoader] = useState(false);
  const [numberofdocument, setTotalNumberOfDocument] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setMutateLoader(true);
    async function getSubscriptionData() {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/getSubscriptionData`,
        {
          params: { activePage: activePage, limit: limit },
        }
      );
      if (result.data.statuscode === 200) {
        setSubscriptionData(result.data.data);
        setTotalNumberOfDocument(result.data.totalDocument);
        setMutateLoader(false);
      } else {
        setDataFound(false);
      }
    }
    getSubscriptionData();
  }, [activePage]);

  const handleStatusUpdate = async (id, statusValue) => {
    const result = await axios.patch(
      `${process.env.REACT_APP_URL}/updateStatusData/${id}`,
      {
        status: statusValue,
      }
    );
    if (result.status === 200) {
      toast.success("Status Updated Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleDeletefunction = async (idtoDelete, event) => {
    event.preventDefault();
    const result = window.confirm("Do You Want to Delete It");
    if (result) {
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/deletesubscriptionData/${idtoDelete}`
      );
      window.location.reload();
    }
  };

  const array = [];
  let i = 1;
  while (i <= Math.ceil(numberofdocument / limit)) {
    array.push(i);
    i++;
  }

  const lengthofArray = array.length;

  const initilArray = array.slice(0, 2);

  console.log("Initial Array Data is", initilArray);

  const lastArray = array.slice(lengthofArray - 1, lengthofArray);

  return (
    <div className="subscriptionListing">
      <div className="subscription-spinner">
        {mutateLoader && (
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#3467eb"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>
      <div className="main-container">
        <h2>Subscription Listing</h2>

        {!dataFound ? <p className="datafound">No Data Found</p> : <p></p>}
        <div className="listingContainer">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Subscription-Type</th>
                <th>Membership-Type</th>
                <th>Facilities</th>
                <th>Refundable</th>
                <th>MRP</th>
                <th>% Discount</th>
                <th>Discount Money</th>
                <th>Current Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionData?.map((value) => (
                <tr>
                  <td>
                    <img src={value.image} alt="subscriptionpic" />
                  </td>
                  <td>{value.subscription_type}</td>
                  <td>{value.membership_type}</td>
                  <td>
                    {value.facilities?.map((data) => (
                      <p className="facilitiesData">{data}</p>
                    ))}
                  </td>
                  <td>{value.refundable}</td>
                  <td>{value.mrp}</td>
                  <td>{value.discount_percent}</td>
                  <td>{value.discount}</td>
                  <td>{value.current_price}</td>
                  <td>
                    <select
                      onClick={async (e) => {
                        e.preventDefault();
                        handleStatusUpdate(value._id, e.target.value);
                      }}
                      name="status"
                      id="status"
                    >
                      <option value={value.status}>{value.status}</option>
                      {value.status === "Available" ? (
                        <option value="Unavailable">Unavailable</option>
                      ) : (
                        <option value="Available">Available </option>
                      )}
                    </select>
                    <ToastContainer />
                  </td>
                  <td>
                    <button
                      className="changebtn"
                      onClick={() =>
                        navigate(`/subscriptionlisting/editdata/${value._id}`)
                      }
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="changebtn"
                      onClick={(e) => handleDeletefunction(value._id, e)}
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

      <div className="paginationdata">
        <span
          onClick={() => {
            if (activePage > 1) {
              setActivePage(activePage - 1);
            }
          }}
          className="preSubscription"
        >
          {`<<`}
        </span>
        {initilArray?.map((value) => (
          <span
            className={`paginationdata ${
              activePage === value ? "subscriptionpagination" : "setcolor"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActivePage(value);
            }}
          >
            {value}
          </span>
        ))}

        <span className="dotSubscription">. . . . . .</span>

        {lastArray?.map((value) => (
          <span
            className={`paginationdata ${
              activePage === value ? "subscriptionpagination" : "setcolor"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActivePage(value);
            }}
          >
            {value}
          </span>
        ))}

        <span
          onClick={() => {
            if (activePage < lengthofArray) {
              setActivePage(activePage + 1);
            }
          }}
          className="nextSubscription"
        >
          {`>>`}
        </span>
      </div>
    </div>
  );
};

export default SubscriptionPageListing;
