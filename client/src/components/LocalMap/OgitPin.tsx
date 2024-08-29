import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { CoordsType } from ".";
import MarkerElement from "./MarkerElement";
import { useOgitMap } from "../../hooks/useOgitMap";

export type OgitPinProps = {
  pinId: string;
  position: CoordsType;
  imgUrl: string;
};

function OgitPin({ pinId, position, imgUrl }: OgitPinProps) {
  const { ogitState, focusPin } = useOgitMap();
  const handleFocusPin = (e: google.maps.MapMouseEvent) => {
    console.log(e);
    console.log(pinId);
    focusPin(pinId);
  };
  console.log(ogitState);
  return (
    <AdvancedMarker
      className="ogit-pin-container"
      position={{ lng: position[0], lat: position[1] }}
      onClick={handleFocusPin}
    >
      <MarkerElement imgUrl={imgUrl} />
    </AdvancedMarker>
  );
}

export default OgitPin;
