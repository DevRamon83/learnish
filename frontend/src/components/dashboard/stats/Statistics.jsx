import { useSelector } from "react-redux";
import Legend from "../../../ui/stats/Legend";
import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import {
  getLineChartData,
  getStackedData,
} from "../../../helpers/stats/getRawData";
import { findLabelsY } from "../../../helpers/stats/finders";
import StackedBarContainer from "../../../ui/stats/StackedBarContainer";
import LineChartContainer from "../../../ui/stats/LineChartContainer";

export default function Statistics() {
  const { average, data } = useSelector((state) => state.stats);
  const { strings } = useLang(i18nAddresses.stats);
  const [currentStat, setCurrentStat] = useState("spell");
  const [period, setPeriod] = useState("semiAnnually");
  const [labelY, setLabelY] = useState(null);
  const errorKeys = Object.keys(average.errorTypes);

  const { totalMistakes, rawAverage } = getStackedData(average, errorKeys);

  const schema = useMemo(() => {
    const now = Date.now();
    return getLineChartData(data, now);
  }, [data]);

  const currentRawData = schema ? schema[currentStat][period] : null;

  useEffect(() => {
    if (!currentRawData) return;
    findLabelsY(currentRawData, setLabelY);
  }, [currentRawData]);

  const handleStatChange = (newStat) => {
    setCurrentStat(newStat);
    setPeriod("semiAnnually");
  };

  return (
    <>
      <Legend
        errorKeys={errorKeys}
        rawData={average.errorTypes}
        currentStat={currentStat}
        setCurrentStat={handleStatChange}
        strings={strings}
      />
      <StackedBarContainer
        totalMistakes={totalMistakes}
        rawAverage={rawAverage}
        averageWord={average.words}
        strings={strings.texts}
      />
      <LineChartContainer
        currentRawData={currentRawData}
        setPeriod={setPeriod}
        labelY={labelY}
        currentStat={currentStat}
        period={period}
        strings={strings}
      />
    </>
  );
}
