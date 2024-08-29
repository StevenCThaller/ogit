import { useEffect, useState } from "react";
import { Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { toast } from "react-toastify";
import OgitPin from "./OgitPin";
import { calculateRadiusFromMapBoundaries } from "../../utils/geo.utils";
import { handleGetMyPins } from "../../services/api.services";
import { useAuth } from "../../hooks/useAuth";
import { useOgitMap } from "../../hooks/useOgitMap";
import OgitPostDetails from "../OgitPostDetails";

type LocalMapStateType = {
  isLoading: boolean;
  shouldDisplayMap: boolean;
  location: CoordsType;
};

export type CoordsType = [number, number];

const initialState: LocalMapStateType = {
  isLoading: true,
  shouldDisplayMap: false,
  location: [0, 0],
};

function LocalMap() {
  const [state, setState] = useState<LocalMapStateType>(initialState);
  const {
    ogitState: { pins },
    loadPins,
  } = useOgitMap();
  const {
    auth: { user },
  } = useAuth();
  const {
    ogitState: { focusedPin },
  } = useOgitMap();

  const handleSetCoordinates = ([lng, lat]: CoordsType) => {
    setState((currState) => ({
      ...currState,
      isLoading: false,
      shouldDisplayMap: true,
      location: [lng, lat],
    }));
  };

  const handleCameraChange = async (ev: MapCameraChangedEvent) => {
    // console.log("Camera changed:", ev.detail);
    const { north, south, east, west } = ev.detail.bounds;
    const mapRadiusInMeters = calculateRadiusFromMapBoundaries(
      north,
      south,
      east,
      west
    );

    const { lng, lat } = ev.detail.center;
    handleGetMyPins(lng, lat, mapRadiusInMeters, user._id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => loadPins(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onSuccess(position: any) {
      const { latitude: lat, longitude: lng } = position.coords;
      handleSetCoordinates([lng, lat]);
    }

    function onError() {
      toast.error("Please turn on location services.");
    }
  }, []);

  if (!state.shouldDisplayMap)
    return (
      <div className="error-modal">
        <h3>You must allow location services</h3>
        <p>
          OGIT does not work without location services allowed. Please allow
          them on this site in order to use OGIT.
        </p>
      </div>
    );

  const position = state.shouldDisplayMap
    ? state.location
    : [151.2308138, -33.860664];

  return (
    <div className="placeholder-glow">
      {state.shouldDisplayMap && (
        <Map
          className={`local-map${state.isLoading ? " placeholder" : ""}`}
          defaultZoom={13}
          defaultCenter={{ lat: position[1], lng: position[0] }}
          onCameraChanged={handleCameraChange}
          mapId="ogit-local-map"
          disableDefaultUI={true}
          clickableIcons={false}
          keyboardShortcuts={false}
          colorScheme={"DARK"}
          // I know there's an error on this, but it works. Once out of beta it should be supported.
          renderingType={"RASTER"}
        >
          {pins.map((pin: OgitPost) => (
            <OgitPin
              key={pin._id}
              pinId={pin._id as string}
              position={pin.location.coordinates}
              imgUrl={pin.imgUrl}
            />
          ))}
          {focusedPin && <OgitPostDetails details={focusedPin} />}
        </Map>
      )}
    </div>
  );
}

export default LocalMap;
