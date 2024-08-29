import axios from "axios";
import { google_maps_api_key } from "../../constants";
import { useEffect, useState } from "react";
import CloseButton from "../CloseButton";
import { useOgitMap } from "../../hooks/useOgitMap";

type OgitPostDetailsProps = {
  details: OgitPost;
};

function OgitPostDetails({ details }: OgitPostDetailsProps) {
  const { caption, imgUrl, poster, location } = details;
  const { focusPin } = useOgitMap();

  const [cityName, setCityName] = useState("Somewhere");

  const getCityname = async (lng: number, lat: number) => {
    try {
      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            latlng: `${lat},${lng}`,
            key: google_maps_api_key as string,
          },
        })
        .then((res) => {
          const results = res.data.results;
          if (results.length > 0) {
            const cityComponent = results[0].address_components.find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (component: any) => component.types.includes("locality")
            );
            setCityName(cityComponent ? cityComponent.long_name : "");
          }
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("");
    }
  };

  const handleCloseFocusedPin = () => focusPin();

  useEffect(() => {
    const [lng, lat] = location.coordinates;
    getCityname(lng, lat);
  }, []);

  return (
    <div className="focused-ogit">
      <div className="close-btn-row">
        <CloseButton onClick={handleCloseFocusedPin} />
      </div>
      <img src={imgUrl} alt={caption || poster.username + "'s post"} />
      <div className="ogit-post-info">
        <span className="ogit-poster-username">@{poster.username}</span>
        {caption && <span className="ogit-post-caption">{caption}</span>}
        <span>&#9829; {cityName}</span>
      </div>
    </div>
  );
}

export default OgitPostDetails;
