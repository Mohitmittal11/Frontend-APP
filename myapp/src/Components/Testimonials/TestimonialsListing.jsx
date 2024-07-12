import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import "../../Style/testimonialsStyle/testimoniallisting.css";
import { ToastContainer, toast } from "react-toastify";
const TestimonialsListing = () => {
  const limit = 5;
  const navigate = useNavigate();
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [mutateLoader, setMutateLoader] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [allDocument, setAllDocuments] = useState();

  useEffect(() => {
    setMutateLoader(true);
    const getData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/getTestimonialsData`,
        {
          params: {
            limit: 5,
            page: activePage,
          },
        }
      );
      if (result) {
        setTestimonialsData(result.data.data);
        setAllDocuments(result.data.totalDocuments);
        setMutateLoader(false);
      }
    };

    getData();
  }, [activePage]);

  const array = [];
  let i = 1;
  while (i <= Math.ceil(allDocument / limit)) {
    array.push(i);
    i++;
  }

  const arrayLength = array.length;
  const initialArray = array.slice(0, 2);
  const lastArray = array.slice(arrayLength - 1, arrayLength);

  const handleStatusUpdate = async (idToUpdateStatus, statusValue) => {
    const result = await axios.patch(
      `${process.env.REACT_APP_URL}/updateStatusatTestimonials/${idToUpdateStatus}`,
      {
        value: statusValue,
      }
    );

    if (result) {
      toast.success("Data Updated Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async (value) => {
    const result = window.confirm("Do You Want to delete it");
    if (result) {
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/deleteTestimonialsDataatFronend/${value}`
      );

      if (response) {
        window.location.reload();
      }
    }
  };

  return (
    <div className="testimoniallisting">
      <div className="testimonial-spinner">
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
      <div className="main-listing">
        <h2>Testimonials Listing</h2>
        <div className="testiminialDatalisting">
          <table>
            <thead>
              <th>UserName </th>
              <th>Place </th>
              <th>City </th>
              <th>Status </th>
              <th>Description </th>
              <th>Actions </th>
            </thead>
            <tbody>
              {testimonialsData.map((value) => (
                <tr>
                  <td>{value.username}</td>
                  <td>{value?.address?.place}</td>
                  <td>{value?.address?.city}</td>
                  <td>
                    <select
                      className="selectStatus"
                      name="status"
                      id="status"
                      onClick={async (e) => {
                        e.preventDefault();
                        handleStatusUpdate(value._id, e.target.value);
                      }}
                    >
                      <option value={value.status}>{value.status}</option>
                      {value.status === "Active" ? (
                        <option value={"InActive"}>InActive</option>
                      ) : (
                        <option value={"Active"}>Active</option>
                      )}
                    </select>
                    <ToastContainer />
                  </td>
                  <td className="description">{value.description}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(
                          `/testimonialslisting/editTestimonials/${value._id}`
                        )
                      }
                      className="testimoniallistingbtn"
                    >
                      EDIT
                    </button>{" "}
                    <button
                      onClick={(e) => handleDelete(value._id)}
                      className="testimoniallistingbtn"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <></>
      <div className="pagination">
        <span
          onClick={() => {
            if (activePage > 1) {
              setActivePage(activePage - 1);
            }
          }}
          className="previousdata"
        >
          {"<<"}
        </span>
        {initialArray.map((value) => (
          <span
            className={`pagination ${
              activePage === value ? "testimonial_pagination" : "blue"
            }`}
            onClick={() => setActivePage(value)}
          >
            {value}
          </span>
        ))}
        <span className="testimonialsdot">. . . . . .</span>

        {lastArray.map((value) => (
          <span
            className={`pagination ${
              activePage === value ? "testimonial_pagination" : "blue"
            }`}
            onClick={() => setActivePage(value)}
          >
            {value}
          </span>
        ))}
        <span
          onClick={() => {
            if (activePage < arrayLength) {
              setActivePage(activePage + 1);
            }
          }}
          className="nextdata"
        >
          {">>"}
        </span>
      </div>
    </div>
  );
};

export default TestimonialsListing;
