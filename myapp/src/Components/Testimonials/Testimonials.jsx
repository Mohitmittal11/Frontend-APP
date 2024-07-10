import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "../../Style/testimonialsStyle/testimonials.css";

const Testimonials = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [addressvalue, setAddressValue] = useState();
  const [activeButton, setActiveButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onhandleSubmit = async () => {
    const bodyRequest = { ...data, address: addressvalue };
    setActiveButton(true);

    const response = await axios.post(
      `${process.env.REACT_APP_URL}/addtestimonials`,
      bodyRequest
    );
    if (response.status === 200) {
      toast.success("Data Submitted Successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/testimonialslisting");
      }, 3000);
    }
  };

  return (
    <div className="main-testimonialscontainer">
      <ToastContainer />

      <h2>Testimonials Form</h2>

      <div className="main-testimonials-form-container">
        <form onSubmit={handleSubmit(onhandleSubmit)}>
          <label htmlFor="username">Enter UserName</label>
          <input
            className="textInput"
            type="text"
            id="username"
            name="username"
            onKeyDown={(e) => {
              if (e.code === "Space" && e.target.value === "") {
                e.preventDefault();
              }
            }}
            {...register("username", {
              required: "*Username is Required",
              onChange: (e) => {
                setData({ ...data, username: e.target.value });
              },
              pattern: {
                value: /^[A-Za-z\s]+$/g,
                message: "*Please Enter only Characters",
              },
            })}
          />
          <p className="testimonialerror">{errors?.username?.message}</p>

          <label htmlFor="place"> Enter Place</label>
          <input
            className="textInput"
            type="text"
            id="place"
            name="place"
            onKeyDown={(e) => {
              if (e.code === "Space" && e.target.value === "") {
                e.preventDefault();
              }
            }}
            {...register("place", {
              required: "*Place field is Required",
              onChange: (e) => {
                setAddressValue({ ...addressvalue, place: e.target.value });
              },
              pattern: {
                value: /^[A-Za-z\s]+$/g,
                message: "*Please Enter only Characters",
              },
            })}
          />
          <p className="testimonialerror">{errors?.place?.message}</p>
          <label htmlFor="city">Enter City</label>
          <input
            className="textInput"
            type="text"
            id="city"
            name="city"
            onKeyDown={(e) => {
              if (e.code === "Space" && e.target.value === "") {
                e.preventDefault();
              }
            }}
            {...register("city", {
              required: "City field is Required",
              onChange: (e) => {
                setAddressValue({ ...addressvalue, city: e.target.value });
              },
              pattern: {
                value: /^[A-Za-z\s]+$/g,
                message: "*Please Enter only Characters",
              },
            })}
          />
          <p className="testimonialerror">{errors?.city?.message}</p>

          <label htmlFor="descrition">Description</label>
          <textarea
            {...register("description", {
              required: "*Description is Required",
              onChange: (e) => {
                setData({ ...data, description: e.target.value });
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
          <p className="testimonialerror">{errors?.description?.message}</p>
          <div className="MainStatus">
            <label>Choose Status</label>
            <div className="testimonialsstatus">
              <input
                {...register("status", {
                  required: "*Please Choose One Option",
                  onChange: (e) => {
                    setData({ ...data, status: e.target.value });
                  },
                })}
                type="radio"
                name="status"
                id="status"
                value={"Active"}
              />
              <label htmlFor="status">Active</label>
            </div>
            <div className="testimonialsstatus">
              <input
                {...register("status", {
                  required: "*Please Choose One Option",
                  onChange: (e) => {
                    setData({ ...data, status: e.target.value });
                  },
                })}
                type="radio"
                name="status"
                id="status"
                value={"InActive"}
              />
              <label htmlFor="status">InActive</label>
            </div>
            <p className="testimonialerror">{errors?.status?.message}</p>
          </div>
          <button className="testimonialssubmit">
            {!activeButton ? "SUBMIT" : "LOADING..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;
