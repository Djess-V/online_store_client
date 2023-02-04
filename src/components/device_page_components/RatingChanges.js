import React, { useContext, useEffect, useState } from "react";
import yellow_star from "../../assets/yellow-star.png";
import black_star from "../../assets/black-star.png";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { sendRating } from "../../http/ratingAPI";

const RatingChanges = observer(({ deviceRated = (f) => f }) => {
  const [rating, setRating] = useState(null);

  const { user, devices } = useContext(Context);

  const sendRate = async () => {
    if (user.loggedIn) {
      await sendRating(user.user.id, devices.selectedDevice.id, rating)
        .then((data) => console.log(data.message))
        .catch((e) => console.dir(e.response.data.message));
    }
  };

  useEffect(() => {
    if (rating) {
      sendRate();
    }
  }, [rating]);

  return (
    <div className="data-change-rating__stars">
      {[...Array(5)].map((item, i) => {
        if (!rating) {
          return (
            <img
              key={i}
              width={16}
              height={16}
              src={yellow_star}
              alt="Star"
              onClick={() => {
                deviceRated();
                setRating(i + 1);
              }}
            />
          );
        } else {
          if (rating > i) {
            return (
              <img
                key={i}
                width={16}
                height={16}
                src={yellow_star}
                alt="Star"
                onClick={() => {
                  deviceRated();
                  setRating(i + 1);
                }}
              />
            );
          } else {
            return (
              <img
                key={i}
                width={16}
                height={16}
                src={black_star}
                alt="Star"
                onClick={() => {
                  deviceRated();
                  setRating(i + 1);
                }}
              />
            );
          }
        }
      })}
    </div>
  );
});

export default RatingChanges;
