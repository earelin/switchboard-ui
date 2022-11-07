import BoxTitle from "../components/BoxTitle";

import SwitchBoardImage from "../img/switchboard.jpg";

export default function Welcome() {
  return (
    <>
      <BoxTitle>Welcome to Switchboard</BoxTitle>
      <img src={SwitchBoardImage} alt="Switchboard image" />
    </>
  );
}
