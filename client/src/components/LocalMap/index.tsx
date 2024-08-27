import { useEffect, useState } from "react";
import { Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { toast } from "react-toastify";
import OgitPin from "./OgitPin";

type LocalMapStateType = {
  isLoading: boolean;
  shouldDisplayMap: boolean;
  location: CoordsType;
};

export type CoordsType = {
  lat: number;
  lng: number;
};

const initialState: LocalMapStateType = {
  isLoading: true,
  shouldDisplayMap: false,
  location: { lat: 0, lng: 0 },
};

function LocalMap() {
  const [state, setState] = useState<LocalMapStateType>(initialState);

  const handleSetCoordinates = ({ lat, lng }: CoordsType) => {
    setState((currState) => ({
      ...currState,
      isLoading: false,
      shouldDisplayMap: true,
      location: { lat, lng },
    }));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onSuccess(position: any) {
      const { latitude: lat, longitude: lng } = position.coords;
      handleSetCoordinates({ lat, lng });
    }

    function onError() {
      toast.error("Please turn on location services.");
    }
  }, []);

  const position = state.shouldDisplayMap
    ? state.location
    : { lat: -33.860664, lng: 151.2308138 };

  return (
    <div className="placeholder-glow">
      {state.shouldDisplayMap && (
        <Map
          className={`local-map${state.isLoading ? " placeholder" : ""}`}
          defaultZoom={13}
          defaultCenter={position}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log("camera changed:", ev.detail.center)
          }
          mapId="ogit-local-map"
          disableDefaultUI={true}
        >
          <OgitPin
            position={position}
            title="Home"
            imgUrl="https://media.equityapartments.com/images/q_auto/f_auto/fl_lossy/2584-126/harbor-steps-apartments-exterior"
          />
        </Map>
      )}
    </div>
  );
}

export default LocalMap;
