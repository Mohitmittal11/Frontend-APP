import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/editpage.css";
import axios from "axios";
const Editpage = () => {
  const navigate = useNavigate();

  const [editableData, setEditableData] = useState({
    title: "",
    position: null,
    status: "",
    image: "",
  });
  const [imageValue, setImageValue] = useState();
  const [titleerror, settitleError] = useState("");
  const [positionError, setpositionError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("https://ro-kart-slg1.onrender.com/getDatas/" + id)
        .then((value) =>
          setEditableData({
            ...editableData,
            title: value.data.title,
            position: value.data.position,
            status: value.data.status,
            image: value.data.image,
          })
        )
        .catch((err) => console.log(err));
    }
    fetchData();
    // console.log(editableData);
  }, []);
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setEditableData({ ...editableData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editableData?.title) {
      settitleError("*Please Fill Title");
      return false;
    }
    if (!editableData?.position) {
      setpositionError("*Please Fill Position");
      return false;
    }

    if(positionError || titleerror) {
      return false;
    }

    if (editableData?.title && editableData?.position) {
      toast.success("Data Updated Successfully", {
        position: "top-center",
      });
    }

    document.getElementById("loadingdataid").style.display = "block";

    const response = await axios.patch(
      "https://ro-kart-slg1.onrender.com/updateData/" + id,
      {
        data: editableData,
      }
    );

    if (response.status === 200) {
      navigate("/listing");
    }
  };

  return (
    <div className="main-container">
      <p id="loadingdataid">Loading...</p>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="title">
            <input
              className="inputfield"
              placeholder="Enter title"
              type="text"
              name="title"
              id="title_id"
              value={editableData.title}
              onKeyDown={(event) => {
                if (event.code === "Space") {
                  event.preventDefault();
                }
              }}
              onChange={(e) => {
                const regex = /^[a-zA-Z][a-zA-Z0-9]*$/g;
                const isTrue = regex.test(e.target.value);
                setEditableData({
                  ...editableData,
                  title: e.target.value,
                });
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
            {titleerror && <p className="errorPara">{titleerror}</p>}
          </div>
          <div className="position">
            <input
              className="inputfield"
              type="text"
              name="position"
              id="position_id"
              value={editableData.position}
              onKeyDown={(event) => {
                if (event.code === "Space") {
                  event.preventDefault();
                }
              }}
              onChange={(e) => {
                const regex = /[^0-9]/g;
                const isTrue = regex.test(e.target.value);
                setEditableData({
                  ...editableData,
                  position: e.target.value,
                });
                if (!e.target.value) {
                  setpositionError("*Please Fill Position");
                } else if (isTrue) {
                  setpositionError("*Please Fill only Numbers");
                } else {
                  setpositionError(null);
                }
              }}
              placeholder="Enter Position"
            />
            {positionError && <p className="errorPara">{positionError}</p>}
          </div>

          <div className="main-status">
            <label for="checkStatus">Select Status</label>

            <div className="status">
              <input
                type="radio"
                id="active"
                value={"Active"}
                name="status"
                checked={editableData?.status === "Active"}
                onChange={(e) => {
                  setEditableData({
                    ...editableData,
                    status: e.target.value,
                  });
                }}
              />
              <label for="active">Active</label>
            </div>

            <div className="status">
              <input
                type="radio"
                id="inactive"
                value={"InActive"}
                name="status"
                checked={editableData?.status === "InActive"}
                onChange={(e) => {
                  setEditableData({
                    ...editableData,
                    status: e.target.value,
                  });
                }}
              />
              <label for="inactive">inActive</label>
            </div>
          </div>

          <div className="imageUpload">
            <label for="imageid">Upload Image</label>
            <img
              src={editableData?.image ? editableData?.image : imageValue}
              alt="editableimage"
            />
          </div>
          <input
            onChange={(e) => {
              const imageValue1 = e.target.files[0];
              var reader = new FileReader();
              reader.onloadend = function () {
                setImageValue(reader.result);
                setEditableData({ ...editableData, image: reader.result });
                console.log("Reader Result is", reader.result);
              };
              reader.readAsDataURL(imageValue1);
            }}
            type="file"
            accept="image/*"
          />
          <div className="btn">
            <button className="editsubmitBtn">SUBMIT</button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editpage;
