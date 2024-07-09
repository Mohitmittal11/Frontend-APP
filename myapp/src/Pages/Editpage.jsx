import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import "../Style/editpage.css";
import axios from "axios";
const Editpage = () => {
  const navigate = useNavigate();
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [editableData, setEditableData] = useState();
  const [imageValue, setImageValue] = useState();
  const [activeLoader, setActiveLoader] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/getDatas/${id}`
      );
      if (result) {
        console.log("Result", result);
        setEditableData(result.data.data);
        for (const [key, value] of Object.entries(result.data.data)) {
          setValue(key, value);
        }
      }
    }
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const imageValue1 = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setImageValue(reader.result);
      setEditableData({ ...editableData, image: reader.result });
      console.log("Reader Result is", reader.result);
    };
    reader.readAsDataURL(imageValue1);
  };

  const onFormSubmit = async () => {
    setActiveLoader(true);
    if (editableData) {
      console.log("Editable Data is", editableData);
    }
    const response = await axios.patch(
      `${process.env.REACT_APP_URL}/updateData/${id}`,
      {
        data: editableData,
      }
    );

    if (response.status === 200) {
      toast.success("Data Updated Successfully", {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/listing");
      }, 2000);
    }
  };

  return (
    <div className="maincontainer">
      <div className="form-container">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="title">
            <input
              className="inputfield"
              placeholder="Enter title"
              type="text"
              name="title"
              id="title_id"
              onKeyDown={(event) => {
                if (event.code === "Space" && event.target.value === "") {
                  event.preventDefault();
                }
              }}
              {...register("title", {
                required: "*Title is Required",
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z0-9]*$/g,
                  message: "Please Fill only Characters",
                },
                onChange: (e) => {
                  setEditableData({ ...editableData, title: e.target.value });
                },
              })}
            />
            <p>{errors?.title?.message}</p>
          </div>
          <div className="position">
            <input
              className="inputfield"
              type="text"
              name="position"
              id="position_id"
              onKeyDown={(event) => {
                if (event.code === "Space") {
                  event.preventDefault();
                }
              }}
              {...register("position", {
                required: "Position is Required",
                onChange: (e) => {
                  setEditableData({
                    ...editableData,
                    position: e.target.value,
                  });
                },
                pattern: {
                  value: /[0-9]/g,
                  message: "Please Fill only Numbers",
                },
              })}
              placeholder="Enter Position"
            />
            <p>{errors?.position?.message}</p>
          </div>

          <div className="main-status">
            <label for="checkStatus">Select Status</label>

            <div className="status">
              <input
                type="radio"
                id="active"
                value={"Active"}
                name="status"
                {...register("status", {
                  required: "Please Choose one Option",
                  onChange: (e) => {
                    setEditableData({
                      ...editableData,
                      status: e.target.value,
                    });
                  },
                })}
              />
              <label for="active">Active</label>
            </div>
            <></>
            <div className="status">
              <input
                type="radio"
                id="inactive"
                value={"InActive"}
                name="status"
                {...register("status", {
                  required: "Please Choose one Option",
                  onChange: (e) => {
                    setEditableData({
                      ...editableData,
                      status: e.target.value,
                    });
                  },
                })}
              />
              <label for="inactive">inActive</label>
            </div>
            <p>{errors?.status?.message}</p>
          </div>

          <div className="imageUpload">
            <label for="imageid">Upload Image</label>
            {editableData?.image && (
              <img src={editableData.image} alt="editableData" />
            )}
          </div>
          <></>
          <input onChange={handleImageChange} type="file" accept="image/*" />
          <div className="btn">
            <button className="editsubmitBtn">
              {!activeLoader ? "SUBMIT" : "LOADING..."}
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editpage;
