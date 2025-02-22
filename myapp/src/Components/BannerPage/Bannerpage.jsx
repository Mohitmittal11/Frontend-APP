import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Style/bannerStyle/bannerpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Bannerpage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [imageUrl, setImageUrl] = useState("");

  const [activebutton, setActiveButton] = useState(false);

  const handleImage = (e) => {
    e.preventDefault();
    if (imageUrl) {
      document.getElementById("imageid").value = "";
      document.getElementById("removeImageData").style.display = "none";
    }
  };

  const onFormSubmit = async (data) => {
    setActiveButton(true);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("position", data.position);
    formData.append("status", data.status);

    formData.append("image", data.image[0]);

    // console.log("Form Data is", formData.get("image"));

    // let ImageURL = data.image[0];
    // console.log("File List is ", ImageURL);
    // data = { ...data, image: ImageURL };

    // if (data) {
    //   console.log("Data is ", data);
    // }

    // const form= document.querySelector('#formelement');

    // const formdata = new FormData(data);

    const response = await axios.post(
      `${process.env.REACT_APP_URL}/insertData`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      toast.success("form submitted successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/listing");
      }, 2000);
    }
  };

  return (
    <div className="main-container">
      <h2>Banner Page</h2>

      <div className="form-container">
        <form id="formelement" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="title">
            <input
              className="inputfield"
              type="text"
              name="title"
              id="title_id"
              placeholder="Enter title"
              onKeyDown={(event) => {
                if (event.code === "Space" && event.target.value === "") {
                  event.preventDefault();
                }
              }}
              {...register("title", {
                required: "Title is Required",
                pattern: {
                  value: /^[A-Za-z\s]+$/g,
                  message: "Please fill Only Characters",
                },
              })}
            />
            <p className="para">
              {" "}
              {errors?.title?.message && errors.title.message}
            </p>
          </div>
          <div className="position">
            <input
              className="inputfield"
              type="text"
              name="position"
              id="position_id"
              placeholder="Enter Position"
              onKeyDown={(event) => {
                if (event.code === "Space") {
                  event.preventDefault();
                }
              }}
              {...register("position", {
                required: "Position is Required",
                pattern: {
                  value: /^[1-9]\d*$/,
                  message:
                    "Please Enter Only Digits and First Digit Can't be Zero",
                },
                // onChange: (e) => {
                //   setData({ ...dataofForm, position: e.target.value });
                // },
              })}
            />
            <p className="para">
              {errors?.position?.message && errors.position.message}
            </p>
          </div>

          <div className="main-status">
            <label for="checkStatus">Select Status</label>

            <div className="status">
              <input
                {...register("status", {
                  required: "Please Choose one Option",
                  // onChange: (e) => {
                  //   setData({ ...dataofForm, status: e.target.value });
                  // },
                })}
                type="radio"
                id="active"
                value={"Active"}
                name="status"
              />
              <label for="active">Active</label>
            </div>

            <div className="status">
              <input
                {...register("status", {
                  required: "Please Choose one Option",
                  // onChange: (e) => {
                  //   setData({ ...dataofForm, status: e.target.value });
                  // },
                })}
                type="radio"
                id="inactive"
                value={"InActive"}
                name="status"
              />
              <label for="inactive">inActive</label>
            </div>
            <p className="para">
              {errors?.status?.message && errors.status.message}
            </p>
          </div>

          <div className="imageUpload">
            <label for="imageid">Upload Image</label>
            <input
              type="file"
              id="imageid"
              name="image"
              accept="image/*"
              {...register("image", {
                required: "Image is Required",
                onChange: (e) => {
                  setImageUrl(e.target.value);
                  document.getElementById("removeImageData").style.display =
                    "block";
                  //   setData({ ...dataofForm, image: e.target.files[0] });

                  //   // const reader = new FileReader();
                  //   // reader.onloadend = function () {
                  //   //   setImageUrl(reader.result);
                  //   //   if (reader.result) {
                  //   //     document.getElementById("removeImageData").style.display =
                  //   //       "block";
                  //   //   }
                  //   // };
                  //   // reader.readAsDataURL(imageValue);
                },
              })}
            />
            <p className="para">{errors?.image?.message}</p>
            <></>
            <span
              onClick={handleImage}
              id="removeImageData"
              className="removeImage"
            >
              X
            </span>
          </div>

          <button className="submitBtn">
            {!activebutton ? "SUBMIT" : "LOADING..."}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Bannerpage;
