import { classes } from "../../constants/components/exercises";

export default function LarRow({ dialogue, volume, audioSrc, character }) {
  const charSuffix = character === "Brian" ? "-brian" : "-emma";
  return (
    <div className={`${classes.base}larRow${charSuffix}`}>
      <audio muted={volume} autoPlay src={audioSrc} />

      {character === "Brian" && (
        <img
          className={`${classes.base}character${charSuffix}`}
          src={`/${character}.jpg`}
        />
      )}

      <p>{dialogue}</p>

      {character === "Emma" && (
        <img
          className={`${classes.base}character${charSuffix}`}
          src={`/${character}.jpg`}
        />
      )}
    </div>
  );
}
