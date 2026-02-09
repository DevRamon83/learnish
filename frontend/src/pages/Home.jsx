import { useSelector } from "react-redux";
import { getSharedAsset } from "../utils/getSharedAsset";

export default function Home() {
  const language = useSelector((state) => state.settings.language);
  const strings = getSharedAsset("language", language);

  return (
    <>
      <div>{strings?.pages.homepage.welcome}</div>
    </>
  );
}
