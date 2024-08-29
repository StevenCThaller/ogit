import { MouseEventHandler } from "react";

type CloseButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button className="close-btn" onClick={onClick}>
      &#x2715;
    </button>
  );
}

export default CloseButton;
