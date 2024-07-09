import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import "../Style/subscription.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Subscription = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [imageurl, setimageurl] = useState();
  const [buttonactive, setbuttonActive] = useState(false);
  const [productmrp, setMRP] = useState();
  const [percent_Discount, setPercentDiscount] = useState();
  const [dmoney, setDmoney] = useState();
  const [cprice, setCprice] = useState();
  const [currentpriceerror, setcurrentPriceerror] = useState("");

  const handleImageValue = (e) => {
    e.preventDefault();
    if (imageurl) {
      document.getElementById("roimageid").value = "";
      setimageurl(null);
      document.getElementById("removeImage").style.display = "none";
    }
  };

  const FormSubmit = async (data) => {
    let bodyRequest = { ...data, image: imageurl };
    bodyRequest = { ...bodyRequest, discount: dmoney };
    bodyRequest = { ...bodyRequest, current_price: cprice };

    if (!bodyRequest?.current_price) {
      setcurrentPriceerror("Current Price is Required");
      return false;
    }

    if (bodyRequest?.current_price) {
      setbuttonActive(true);
    }

    const result = await axios.post(
      `${process.env.REACT_APP_URL}/addsubscriptiondata`,
      {
        bodyData: bodyRequest,
      }
    );
    if (result.status === 200) {
      toast.success("Form submitted successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/subscriptionlisting");
      }, 2000);
    }
  };
  let d_money, c_price;
  useEffect(() => {
    if (productmrp > 0 && percent_Discount >= 0) {
      console.log(
        `Product MRP is ${productmrp} and % Discount is ${percent_Discount}`
      );
      d_money = (productmrp * percent_Discount) / 100;

      console.log(`Discount Money is ${d_money}`);
      setDmoney(d_money);
      c_price = productmrp - d_money;
      setCprice(c_price);
      console.log("c_price  is", c_price);

      // if (dmoney && cprice) {
      //   setcurrentPriceerror("");
      // }
    }
  }, [productmrp, percent_Discount]);

  // console.log(
  //   `Discount Money is ${dmoney} and Current Price is ${cprice}`
  // );

  return (
    <div className="main-subscription-container">
      <h1>Subscription Page</h1>
      <ToastContainer />

      <div className="formcontainer">
        <form onSubmit={handleSubmit(FormSubmit)}>
          <div className="input_image">
            <label htmlFor="roimageid">Upload Image</label>

            <input
              type="file"
              name="image"
              id="roimageid"
              accept="image/*"
              {...register("image", {
                required: "*Image is Required",
                onChange: (e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = function () {
                    document.getElementById("removeImage").style.display =
                      "block";
                    setimageurl(reader.result);
                  };
                  reader.readAsDataURL(file);
                },
              })}
            />
            <p>{errors?.image?.message}</p>
            <></>
            <span
              id="removeImage"
              className="removeImage1"
              onClick={handleImageValue}
            >
              X
            </span>

            <></>
          </div>
          <div className="membership">
            <label className="membership_time">
              Choose Preferred Subscrition-Type:
            </label>
            <div className="membership_time_Type">
              <input
                type="radio"
                id="day"
                name="subscription_type"
                value="Day"
                {...register("subscription_type", {
                  required: "*Please Choose One Option",
                })}
              />
              <label htmlFor="day">Day</label>
            </div>
            <div className="membership_time_Type">
              <input
                // onChange={handleChange}
                type="radio"
                id="month"
                name="subscription_type"
                value="Month"
                {...register("subscription_type", {
                  required: "*Please Choose One Option",
                })}
              />
              <label htmlFor="month">Month</label>
            </div>
            <div className="membership_time_Type">
              <input
                // onChange={handleChange}
                type="radio"
                id="year"
                name="subscription_type"
                value="Year"
                {...register("subscription_type", {
                  required: "*Please Choose One Option",
                })}
              />
              <label htmlFor="year">Year</label>
            </div>
            <p>{errors?.subscription_type?.message}</p>
          </div>
          <div className="membership_title">
            <label>Choose Preferred Membership-Type</label>
            <div className="membership_Type">
              <input
                // onChange={handleChange}
                type="radio"
                id="silver"
                name="membership_type"
                value="Silver"
                {...register("membership_type", {
                  required: "Please Choose One Option",
                })}
              />
              <label htmlFor="silver">Silver</label>
            </div>
            <div className="membership_Type">
              <input
                // onChange={handleChange}
                type="radio"
                id="gold"
                name="membership_type"
                value="Gold"
                {...register("membership_type", {
                  required: "Please Choose One Option",
                })}
              />
              <label htmlFor="gold">Gold</label>
            </div>
            <p>{errors?.membership_type?.message}</p>
          </div>
          <div className="facilities">
            <label>Choose Facilities</label>
            <div className="facility">
              <input
                name="facilities"
                // onChange={handleFacilityChange}
                type="checkbox"
                id="ro"
                value="RO"
                {...register("facilities", {
                  required: "Please Choose one Option",
                })}
              />
              <label htmlFor="ro">RO</label>
            </div>
            <div className="facility">
              <input
                name="facilities"
                // onChange={handleFacilityChange}
                type="checkbox"
                id="uv"
                value="UV"
                {...register("facilities", {
                  required: "Please Choose one Option",
                })}
              />
              <label htmlFor="uv">UV</label>
            </div>
            <div className="facility">
              <input
                name="facilities"
                // onChange={handleFacilityChange}
                type="checkbox"
                id="uf"
                value="UF"
                {...register("facilities", {
                  required: "Please Choose one Option",
                })}
              />
              <label htmlFor="uf">UF</label>
            </div>
            <div className="facility">
              <input
                name="facilities"
                // onChange={handleFacilityChange}
                type="checkbox"
                id="tds"
                value="TDS"
                {...register("facilities", {
                  required: "Please Choose one Option",
                })}
              />
              <label htmlFor="tds">TDS</label>
            </div>
            <div className="facility">
              <input
                name="facilities"
                // onChange={handleFacilityChange}
                type="checkbox"
                id="copper"
                value="Copper"
                {...register("facilities", {
                  required: "Please Choose one Option",
                })}
              />
              <label htmlFor="copper">Copper</label>
            </div>
            <p>{errors?.facilities?.message}</p>
          </div>
          <div className="isRefundable">
            <label>Is Refundable?</label>
            <div className="refundable">
              <input
                type="radio"
                id="yes"
                name="refundable"
                value="Yes"
                {...register("refundable", {
                  required: "*Please Choose One Option",
                })}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div className="refundable">
              <input
                type="radio"
                id="no"
                name="refundable"
                value="No"
                {...register("refundable", {
                  required: "*Please Choose One Option",
                })}
              />
              <label htmlFor="no">No</label>
            </div>
            <p>{errors?.refundable?.message}</p>
          </div>
          <div className="textInputData">
            <label htmlFor="priceId">Enter MRP</label>
            <input
              className="textData"
              type="text"
              name="mrp"
              id="priceId"
              placeholder="Enter Price"
              onKeyDown={(event) => {
                if (event.code === "Space") {
                  event.preventDefault();
                }
              }}
              {...register("mrp", {
                required: "*MRP is Required",
                pattern: {
                  value: /^[1-9]\d*$/,
                  message:
                    "*Please Enter Only Digits and First Digit Can't be Zero",
                },
                onChange: (e) => {
                  setMRP(e.target.value);
                },
              })}
            />
            <p>{errors?.mrp?.message}</p>

            <label htmlFor="percentDiscount">% Discount</label>
            <input
              className="textData"
              type="text"
              id="percentDiscount"
              name="discount_percent"
              placeholder="Enter Percent Discount"
              onKeyDown={(event) => {
                if (event.code === "Space") {
                  event.preventDefault();
                }
              }}
              {...register("discount_percent", {
                required: "*Discount Percent is Required",
                pattern: {
                  value: /^(100|[1-9]?[0-9])$/,
                  message: "Please Enter the Value between 0 to 100",
                },
                onChange: (e) => {
                  setPercentDiscount(e.target.value);
                },
              })}
            />
            <p>{errors?.discount_percent?.message}</p>

            <label htmlFor="discount">Discount Money</label>
            <input
              value={dmoney >= 0 ? dmoney : ""}
              className="textData"
              type="text"
              id="discount"
              name="discount"
              onKeyDown={(event) => {
                if (event.code === "Space") {
                  event.preventDefault();
                }
              }}
              placeholder="Discount Money"
            />
            <label htmlFor="currentPrice">Current Price</label>
            <input
              value={cprice >= 0 ? cprice : ""}
              className="textData"
              type="text"
              id="currentPrice"
              name="current_price"
              placeholder="Current Price"
              onKeyDown={(event) => {
                if (event.code === "Space") {
                  event.preventDefault();
                }
              }}
              // onChange={(e) => {
              //   if (e.target.value) {
              //     setcurrentPriceerror("");
              //   }
              // }}
            />
            <p>{currentpriceerror && currentpriceerror}</p>
          </div>
          <div className="statusInfo">
            <label>Choose Status</label>
            <div className="checkStatus">
              <input
                // onChange={handleChange}
                type="radio"
                name="status"
                id="available"
                value="Available"
                {...register("status", {
                  required: "Please Choose one Option",
                })}
              />
              <label htmlFor="available">Available</label>
            </div>
            <div className="checkStatus">
              <input
                // onChange={handleChange}
                type="radio"
                name="status"
                id="unavailable"
                value="Unavailable"
                {...register("status", {
                  required: "Please Choose one Option",
                })}
              />
              <label htmlFor="unavailable">Unavailable</label>
            </div>
            <p>{errors?.status?.message}</p>
          </div>
          <button id="subscription-btn">
            {!buttonactive ? "SUBMIT" : "Loading..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscription;
