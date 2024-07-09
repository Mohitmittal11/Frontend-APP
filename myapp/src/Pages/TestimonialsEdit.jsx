import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/testimonialedit.css";

import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const TestimonialsEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const [editableData, setEditableData] = useState();
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    async function getData() {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/getTestimonialsDataatID/${params.id}`
      );
      if (result) {
        setEditableData(result.data.data);
        for (const [key, value] of Object.entries(result.data.data)) {
          setValue(key, value);
          if (key === "address") {
            setValue("place", value?.place);
            setValue("city", value?.city);
          }
        }
      }
    }
    getData();
  }, [setValue]);

  const onFormSubmit = async () => {
    setActiveButton(true);

    if (editableData) {
      console.log("Editable Data is ", editableData);
    }
    const result = await axios.patch(
      `${process.env.REACT_APP_URL}/updateTestimonialsatSpecificId/${params.id}`,
      {
        bodyData: editableData,
      }
    );

    if (result.status === 200) {
      toast.success("Data Updated Successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/testimonialslisting");
      }, 3000);
    }
  };

  return (
    <div className="main-testimonialscontainer">
      <h2>Testimonials_Edit</h2>
      <div className="main-testimonials-form-container">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <label htmlFor="username">Enter UserName</label>
          <input
            {...register("username", {
              required: "*Username is Required",
              onChange: (e) => {
                setEditableData({ ...editableData, username: e.target.value });
              },
              pattern: {
                value: /^[A-Za-z\s]+$/g,
                message: "*Please Enter only Characters",
              },
            })}
            onKeyDown={(e) => {
              if (e.code === "Space" && e.target.value === "") {
                e.preventDefault();
              }
            }}
            className="textInput"
            type="text"
            id="username"
            name="username"
          />
          <p>{errors?.username && errors?.username?.message}</p>
          <label htmlFor="place"> Enter Place</label>
          <input
            {...register("place", {
              required: "*Place is Required",
              onChange: (e) => {
                setEditableData({
                  ...editableData,
                  address: { ...editableData?.address, place: e.target.value },
                });
              },
              pattern: {
                value: /^[A-Za-z\s]+$/g,
                message: "*Please Enter only Characters",
              },
            })}
            onKeyDown={(e) => {
              if (e.code === "Space" && e.target.value === "") {
                e.preventDefault();
              }
            }}
            className="textInput"
            type="text"
            id="place"
            name="place"
          />
          <p> {errors?.place && errors?.place?.message}</p>
          <label htmlFor="address.city">Enter City</label>
          <input
            {...register("city", {
              required: "*City is Required",
              onChange: (e) => {
                setEditableData({
                  ...editableData,
                  address: { ...editableData.address, city: e.target.value },
                });
              },
              pattern: {
                value: /^[A-Za-z\s]+$/g,
                message: "*Please Enter only Characters",
              },
            })}
            onKeyDown={(e) => {
              if (e.code === "Space" && e.target.value === "") {
                e.preventDefault();
              }
            }}
            className="textInput"
            type="text"
            id="city"
            name="city"
          />
          <p> {errors?.city && errors?.city?.message}</p>

          <label htmlFor="descrition">Description</label>
          <textarea
            {...register("description", {
              required: "*Description is Required",
              onChange: (e) => {
                setEditableData({
                  ...editableData,
                  description: e.target.value,
                });
              },
              pattern: {
                value: /^[A-Za-z\s]+$/g,
                message: "*Please Enter only Characters",
              },
            })}
            onKeyDown={(e) => {
              if (e.code === "Space" && e.target.value === "") {
                e.preventDefault();
              }
            }}
            id="description"
            name="description"
            rows={5}
          />
          <p>{errors?.description?.message}</p>
          <div className="MainStatus">
            <label>Choose Status</label>
            <div className="testimonialsstatus">
              <input
                {...register("status", {
                  required: "*Please Choose One Option",
                  onChange: (e) => {
                    setEditableData({
                      ...editableData,
                      status: e.target.value,
                    });
                  },
                })}
                type="radio"
                name="status"
                id="status"
                value={"Active"}
                checked={editableData?.status === "Active"}
              />

              <label htmlFor="status">Active</label>
              <></>
            </div>
            <div className="testimonialsstatus">
              <input
                {...register("status", {
                  required: "*Please Choose One Option",
                  onChange: (e) => {
                    setEditableData({
                      ...editableData,
                      status: e.target.value,
                    });
                  },
                })}
                type="radio"
                name="status"
                id="status"
                value={"InActive"}
                checked={editableData?.status === "InActive"}
              />
              <label htmlFor="status">InActive</label>
            </div>
            <p>{errors?.status?.message}</p>
          </div>
          <button className="testimonialssubmit">
            {!activeButton ? "SUBMIT" : "LOADING..."}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default TestimonialsEdit;
