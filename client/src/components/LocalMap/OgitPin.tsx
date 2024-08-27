import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { CoordsType } from ".";
import MarkerElement from "./MarkerElement";

export type OgitPinProps = {
  position: CoordsType;
  title: string;
  imgUrl: string;
};

function OgitPin({ position, title, imgUrl }: OgitPinProps) {
  return (
    <AdvancedMarker position={position}>
      <MarkerElement title={title} imgUrl={imgUrl} />
    </AdvancedMarker>
  );
}

export default OgitPin;
