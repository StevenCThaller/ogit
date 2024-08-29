import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Feed } from "../components";
import { ProvideOgitMap } from "../hooks/useOgitMap";

function Dashboard() {
  const { userId } = useParams();

  useEffect(() => {}, [userId]);

  return (
    <ProvideOgitMap>
      <Feed />
    </ProvideOgitMap>
  );
}

export default Dashboard;
