type MarkerElementProps = {
  title: string;
  imgUrl: string;
};

function MarkerElement({ title, imgUrl }: MarkerElementProps) {
  return (
    <div
      style={{
        background: `url(${imgUrl}) no-repeat center center`,
      }}
      className="ogit-pin"
    >
      <span className="pin-title">{title}</span>
    </div>
  );
}

export default MarkerElement;
