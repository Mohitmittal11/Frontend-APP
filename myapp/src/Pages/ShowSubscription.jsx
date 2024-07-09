import { React, useEffect, useState } from "react";
import axios from "axios";
import "../Style/showsubscription.css";
const ShowSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalDocument, setTotalDocument] = useState();

  const limit = 6;

  useEffect(() => {
    async function getData() {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/getCompleteSubscriptionData`,
        {
          params: {
            limit: limit,
            pageNumber: activePage,
          },
        }
      );
      if (result) {
        setSubscriptionData(result.data.data);
        setTotalDocument(result.data.totalDocument);
      }
    }
    getData();
  }, [activePage]);

  const array = [];
  let i = 1;
  while (i <= Math.ceil(totalDocument / limit)) {
    array.push(i);
    i++;
  }
  const arrayLength = array.length;
  const initialArray = array.slice(0, 2);
  const lastArray = array.slice(arrayLength - 1, arrayLength);

  return (
    <div>
      <div className="subscription-container">
        <h2>Show SubScription</h2>
        <div className="imageGrid">
          {subscriptionData.map((value) => (
            <div className="main-image-data">
              <div className="imageData">
                <img id="imageshow" src={value.image} alt="subscriptionData" />
              </div>
              <p className="mrp"> Worth Rs {value.mrp}</p>
              <div className="info-container">
                <h2 className="subscription_type">
                  Rs. {value.discount}/{value.subscription_type}
                </h2>
                {value.refundable === "Yes" ? (
                  <p className="refundabledata">(100% Refundable)</p>
                ) : (
                  <p className="refundabledata">(No Refundable)</p>
                )}

                {value.facilities.map((data) => (
                  <p className="facilitiedData">{data}</p>
                ))}
                <div className="underlined-container"></div>
                <p className="subscribe">Subscribe Now</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={"paginatedlist"}>
        <span
          onClick={() => {
            if (activePage > 1) {
              setActivePage(activePage - 1);
            }
          }}
          className="previousShow"
        >
          {"<<"}
        </span>
        {initialArray?.map((value, index) => (
          <span
          key={index}
            className={`paginate_list ${
              activePage === value ? "activenavigation " : "nonActivenavigation"
            } `}
            onClick={() => setActivePage(value)}
          >
            {value}
          </span>
        ))}
        <span className="dotshowSubscription">. . . . . . </span>
        {lastArray?.map((value, index) => (
          <span
          key={index}
            className={`paginate_list ${
              activePage === value ? "activenavigation " : "nonActivenavigation"
            } `}
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
          className="lastArray"
        >
          {">>"}
        </span>
      </div>
    </div>
  );
};

export default ShowSubscription;
