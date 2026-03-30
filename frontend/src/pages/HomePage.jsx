import { useLang } from "../hooks/useLang";

export default function Home() {
  const strings = useLang("pages.homepage");

  return (
    <>
      <main>{strings?.welcome}</main>
    </>
  );
}
