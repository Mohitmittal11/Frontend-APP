import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/subscriptionedit.css";

const SubscriptionEdit = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [editableData, setEditableData] = useState();
  const [datafoundError, setDataFoundError] = useState();
  const [facilityData, setFacilityData] = useState([]);
  const [activeLoader, setActiveLoader] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getResultbyId() {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/getSubscriptiondataforUpdate/${id}`
      );

      if (result.data.statusCode === 200) {
        setEditableData(result.data.data);

        for (const [key, value] of Object.entries(result.data.data)) {
          console.log(`Key is ${key} and value is ${value}`);
          setValue(key, value);
        }
        setFacilityData(result.data.data.facilities);
      } else {
        setDataFoundError("No Data Found");
      }
    }

    getResultbyId();
  }, [setValue]);

  let discountmoney, currentprice;

  if (editableData?.mrp && editableData?.discount_percent >= 0) {
    discountmoney = (editableData.mrp * editableData.discount_percent) / 100;
    if (discountmoney >= 0) {
      currentprice = editableData.mrp - discountmoney;
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setEditableData({ ...editableData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleFacilityChange = (e) => {
    const { checked, value } = e.target;

    setFacilityData((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((facilities) => facilities !== value);
      }
    });
  };

  const FormDataSubmit = async (data) => {
    setActiveLoader(true);

    let bodyRequest = {
      ...editableData,
      facilities: facilityData,
    };

    if (discountmoney && currentprice) {
      bodyRequest = { ...bodyRequest, discount: discountmoney };
      bodyRequest = { ...bodyRequest, current_price: currentprice };
    }

    console.log("Body Request is ", bodyRequest);

    const response = await axios.patch(
      `${process.env.REACT_APP_URL}/updatesubscriptionData/${id}`,
      {
        data: bodyRequest,
      }
    );

    console.log("Response is ", response);

    if (response.status === 200) {
      toast.success("Data Updated Successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/subscriptionlisting");
      }, 2000);
    }
  };

  return (
    <div className="outer-container">
      <h2>Edit Subscription Data</h2>
      {datafoundError && <p>Particular Id is Wrong</p>}
      <div className="formcontainer">
        <form onSubmit={handleSubmit(FormDataSubmit)}>
          <div className="input_image">
            <label htmlFor="roimageid">Upload Image</label>
            {editableData?.image && (
              <img
                className="subscritionEdit"
                src={editableData.image}
                alt="editableData"
              />
            )}
            <input
              type="file"
              name="image"
              id="roimageid"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="membership">
            <label className="membership_time">
              Choose Preferred Subscrition-Type:
            </label>
            <div className="membership_time_Type">
              <input
                {...register("subscription_type", {
                  required: "Subscription type is required",
                  onChange: (e) =>
                    setEditableData({
                      ...editableData,
                      subscription_type: e.target.value,
                    }),
                })}
                type="radio"
                id="day"
                name="subscription_type"
                value="Day"
                checked={editableData?.subscription_type === "Day"}
              />
              <label htmlFor="day">Day</label>
            </div>
            <></>
            <div className="membership_time_Type">
              <input
                {...register("subscription_type", {
                  onChange: (e) =>
                    setEditableData({
                      ...editableData,
                      subscription_type: e.target.value,
                    }),
                })}
                type="radio"
                id="month"
                name="subscription_type"
                value="Month"
                checked={editableData?.subscription_type === "Month"}
              />
              <label htmlFor="month">Month</label>
            </div>
            <></>
            <div className="membership_time_Type">
              <input
                {...register("subscription_type", {
                  onChange: (e) =>
                    setEditableData({
                      ...editableData,
                      subscription_type: e.target.value,
                    }),
                })}
                type="radio"
                id="year"
                name="subscription_type"
                value="Year"
                checked={editableData?.subscription_type === "Year"}
              />
              <label htmlFor="year">Year</label>
            </div>
            {errors.subscription_type && (
              <p>{errors.subscription_type.message}</p>
            )}
          </div>
          <div className="membership_title">
            <label>Choose Preferred Membership-Type</label>
            <div className="membership_Type">
              <input
                {...register("membership_type", {
                  required: "Membership type is required",
                  onChange: (e) =>
                    setEditableData({
                      ...editableData,
                      membership_type: e.target.value,
                    }),
                })}
                type="radio"
                id="silver"
                name="membership_type"
                value="Silver"
                checked={editableData?.membership_type === "Silver"}
              />
              <label htmlFor="silver">Silver</label>
              <></>
            </div>
            <div className="membership_Type">
              <input
                {...register("membership_type", {
                  onChange: (e) =>
                    setEditableData({
                      ...editableData,
                      membership_type: e.target.value,
                    }),
                })}
                type="radio"
                id="gold"
                name="membership_type"
                value="Gold"
                checked={editableData?.membership_type === "Gold"}
              />
              <label htmlFor="gold">Gold</label>
            </div>
            {errors.membership_type && <p>{errors.membership_type.message}</p>}
          </div>
          <></>
          <div className="facilities">
            <label>Choose Facilities</label>
            <div className="facility">
              <input
                {...register("facilities")}
                type="checkbox"
                id="ro"
                value="RO"
                checked={facilityData.includes("RO")}
                onChange={handleFacilityChange}
              />
              <label htmlFor="ro">RO</label>
            </div>
            <div className="facility">
              <input
                {...register("facilities")}
                type="checkbox"
                id="uv"
                value="UV"
                checked={facilityData.includes("UV")}
                onChange={handleFacilityChange}
              />
              <label htmlFor="uv">UV</label>
            </div>
            <div className="facility">
              <input
                {...register("facilities")}
                type="checkbox"
                id="uf"
                value="UF"
                checked={facilityData.includes("UF")}
                onChange={handleFacilityChange}
              />
              <label htmlFor="uf">UF</label>
            </div>
            <div className="facility">
              <input
                {...register("facilities")}
                type="checkbox"
                id="tds"
                value="TDS"
                checked={facilityData.includes("TDS")}
                onChange={handleFacilityChange}
              />
              <label htmlFor="tds">TDS</label>
            </div>
            <div className="facility">
              <input
                {...register("facilities")}
                type="checkbox"
                id="copper"
                value="Copper"
                checked={facilityData.includes("Copper")}
                onChange={handleFacilityChange}
              />
              <label htmlFor="copper">Copper</label>
            </div>
          </div>
          <div className="isRefundable">
            <label>Is Refundable?</label>
            <div className="refundable">
              <input
                {...register("refundable", {
                  onChange: (e) =>
                    setEditableData({
                      ...editableData,
                      refundable: e.target.value,
                    }),
                })}
                type="radio"
                id="yes"
                name="refundable"
                value="Yes"
                checked={editableData?.refundable === "Yes"}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <></>
            <div className="refundable">
              <input
                {...register("refundable", {
                  onChange: (e) =>
                    setEditableData({
                      ...editableData,
                      refundable: e.target.value,
                    }),
                })}
                type="radio"
                id="no"
                name="refundable"
                value="No"
                checked={editableData?.refundable === "No"}
              />
              <label htmlFor="no">No</label>
            </div>
            {errors.refundable && <p>{errors.refundable.message}</p>}
          </div>
          <div className="textInputData">
            <label htmlFor="priceId">Enter MRP</label>
            <input
              className="textData"
              type="text"
              id="priceId"
              {...register("mrp", {
                required: "*MRP is Required",
                pattern: {
                  value: /^[1-9]\d*$/,
                  message:
                    "*Please Enter Only Digits and First Digit can't be Zero",
                },
                onChange: (e) =>
                  setEditableData({ ...editableData, mrp: e.target.value }),
              })}
              placeholder="Enter Price"
            />
            {errors.mrp && <p>{errors.mrp.message}</p>}
            <label htmlFor="percentDiscount">% Discount</label>
            <input
              className="textData"
              type="text"
              id="percentDiscount"
              {...register("discount_percent", {
                required: "Percent Discount is Required",
                pattern: {
                  value: /^0*(100|[1-9]?\d)$/,

                  message: "Please Enter the Value between 0 to 100",
                },
                onChange: (e) =>
                  setEditableData({
                    ...editableData,
                    discount_percent: e.target.value,
                  }),
              })}
              placeholder="Enter Percent Discount"
            />
            {errors.discount_percent && (
              <p>{errors.discount_percent.message}</p>
            )}

            <label htmlFor="discount">Discount Money</label>
            <input
              // {...register("discount")}
              className="textData"
              name="discount"
              type="text"
              id="discount"
              value={discountmoney ? discountmoney : editableData?.discount}
              placeholder="Discount Money"
            />
            <label htmlFor="currentPrice">Current Price</label>
            <input
              // {...register("current_price")}
              value={currentprice ? currentprice : editableData?.current_price}
              className="textData"
              name="current_price"
              type="text"
              id="currentPrice"
              placeholder="Current Price"
            />
          </div>
          <div className="statusInfo">
            <label>Choose Status</label>
            <div className="checkStatus">
              <input
                {...register("status", {
                  required: "Status is required",
                  onChange: (e) =>
                    setEditableData({
                      ...editableData,
                      status: e.target.value,
                    }),
                })}
                type="radio"
                id="available"
                name="status"
                value="Available"
                checked={editableData?.status === "Available"}
              />
              <label htmlFor="available">Available</label>
            </div>
            <></>
            <div className="checkStatus">
              <input
                {...register("status", {
                  onChange: (e) =>
                    setEditableData({
                      ...editableData,
                      status: e.target.value,
                    }),
                })}
                type="radio"
                id="unavailable"
                name="status"
                value="Unavailable"
                checked={editableData?.status === "Unavailable"}
              />
              <label htmlFor="unavailable">Unavailable</label>
            </div>
            {errors.status && <p>{errors.status.message}</p>}
          </div>
          <button id="subscription-btn">
            {!activeLoader ? "SUBMIT" : "Loading..."}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default SubscriptionEdit;
