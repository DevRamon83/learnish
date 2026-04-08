import LineChart from "../components/charts/LineChart";
import StackedBar from "../components/charts/StackedBar";
import { useLang } from "../hooks/useLang";

export default function Home() {
  const { strings } = useLang("pages.homepage");

  return (
    <main>
      <div>
        <p>{strings.welcome}</p>
        <StackedBar />
      </div>
    </main>
  );
}
//<LineChart />

// <StackedBar />
