import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/bannerpage.css";
import axios from "axios";
// import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Bannerpage = () => {
  const navigate = useNavigate();
  const [formdata, setformData] = useState({
    title: "",
    position: null,
    status: "",
    image: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  // const [error, setError] = useState(true);
  const [titleerror, settitleError] = useState("");
  const [positionError, setpositionError] = useState("");

  const [statuserror, setStatusError] = useState();

  const handleChange = (e) => {
    const fileData = e.target.value;
    console.log("File Data is ", fileData);
    if (fileData) {
      setImage(fileData);
      document.getElementById("removeImageData").style.display = "inline";
    }
    const imageValue = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(imageValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formdata?.title) {
      settitleError("*Please Fill Title Field");
      return false;
    }
    if (!formdata?.position) {
      setpositionError("*Please Fill Position");
      return false;
    }

    if (positionError || titleerror) {
      return false;
    }
   

    const statusValue = document.querySelector(
      "input[type=radio][name=status]:checked"
    )?.value;

    if (!statusValue) {
      setStatusError("Please Choose one Option");
      return false;
    }
    formdata.status = statusValue;
    formdata.image = imageUrl;

    console.log(formdata);

    if (formdata?.title && formdata?.position) {
      toast.success("form submitted successfully", {
        position: "top-center",
      });
      document.getElementById("loadingid").style.display = "block";
    }

    const response = await axios.post("https://ro-kart-slg1.onrender.com/insertData", {
      data: formdata,
    });
    if (response.status === 200) {
      navigate("/listing");
    }
  };

  const handleImage = (e) => {
    e.preventDefault();
    if (image) {
      document.getElementById("imageid").value = "";
      document.getElementById("removeImageData").style.display = "none";
    }
  };

  return (
    <div className="main-container">
      <p id="loadingid">Loading...</p>
      <h2>Banner Page</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="title">
            <input
              className="inputfield"
              type="text"
              name="title"
              id="title_id"
              placeholder="Enter title"
              onKeyDown={(event) => {
                if (event.code === "Space") {
                  event.preventDefault();
                }
              }}
              onChange={(e) => {
                const regex = /^[a-zA-Z][a-zA-Z0-9]*$/g;
                const isTrue = regex.test(e.target.value);
                setformData({ ...formdata, title: e.target.value });
                if (!e.target.value) {
                  settitleError("*Please Fill Title");
                } else if (!isTrue) {
                  settitleError(
                    "*Numeric at First Place and Special Number is not allowed"
                  );
                } else {
                  settitleError(null);
                }
              }}
            />
            {titleerror && <p className="para">{titleerror}</p>}
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
              onChange={(e) => {
                const regex = /[^0-9]/g;
                const isTrue = regex.test(e.target.value);
                setformData({
                  ...formdata,
                  position: e.target.value,
                });
                if (!e.target.value) {
                  setpositionError("*Please Fill Position");
                } else if (isTrue) {
                  setpositionError("Please Fill only Numbers");
                } else {
                  setpositionError(null);
                }
              }}
            />
            {positionError && <p className="para">{positionError}</p>}
          </div>

          <div className="main-status">
            <label for="checkStatus">Select Status</label>

            <div className="status">
              <input
                onChange={(e) => {
                  if (e.target.value) {
                    console.log(e.target.value);
                    setStatusError(null);
                  }
                }}
                type="radio"
                id="active"
                value={"Active"}
                name="status"
              />
              <label for="active">Active</label>
            </div>

            <div className="status">
              <input
                onChange={(e) => {
                  if (e.target.value) {
                    console.log(e.target.value);
                    setStatusError(null);
                  }
                }}
                type="radio"
                id="inactive"
                value={"InActive"}
                name="status"
              />
              <label for="inactive">inActive</label>
            </div>
            {statuserror && <p className="para">{statuserror}</p>}
          </div>

          <div className="imageUpload">
            <label for="imageid">Upload Image</label>
            <input
              onChange={handleChange}
              type="file"
              id="imageid"
              name="image"
              accept="image/*"
              required
            />
            <span
              onClick={handleImage}
              id="removeImageData"
              className="removeImage"
            >
              X
            </span>
          </div>

          <button className="submitBtn">SUBMIT</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Bannerpage;
