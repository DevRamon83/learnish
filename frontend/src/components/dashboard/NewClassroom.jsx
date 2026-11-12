import { useEffect, useState } from "react";
import bundle from "shared";
import fetchNewClassroom from "../../api/handlers/fetchNewClassroom";
import BadgeSelection from "../../ui/BadgeSelection";
import { useDispatch } from "react-redux";
import { updateTeacherBadge } from "../../redux/slices/authSlice";

export default function NewClassroom({
  classes,
  strings,
  badgePanel,
  setBadgePanel,
  setNotify,
}) {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const dispatch = useDispatch();
  const [sendBtn, setSendBtn] = useState(strings.add);
  const badgeArray = bundle.constants;
  const { animals, colors } = badgeArray;

  useEffect(() => {
    if (sendBtn === strings.missingAnimal && selectedAnimal) {
      setSendBtn(strings.add);
    }

    if (sendBtn === strings.missingColor && selectedColor) {
      setSendBtn(strings.add);
    }
  }, [selectedAnimal, selectedColor]);

  const createClassroom = async () => {
    if (!selectedAnimal) return setSendBtn(strings.missingAnimal);
    if (!selectedColor) return setSendBtn(strings.missingColor);
    if (sendBtn !== strings.add) return;
    setSendBtn(false);

    const data = {
      animal: selectedAnimal,
      color: selectedColor,
    };

    const resp = await fetchNewClassroom(data);
    if (resp.error) {
      setSendBtn(strings.add);
      setNotify(resp.errorMessage);
      return;
    }
    dispatch(updateTeacherBadge(data));
    setSendBtn(strings.add);
    setBadgePanel("-close");
    setNotify(null);
  };

  const { badge } = classes;
  return (
    <div className={`${classes.newClassroom}${badgePanel}`}>
      <div className={classes.selectionContainer}>
        <div className={classes.inputContainer}>
          <h3>{strings.classroomBadge}</h3>
          {selectedAnimal && (
            <div
              className={`${badge} ${selectedColor ? `${badge}-${selectedColor}` : ""}`}
            >
              <img src={`/badges/${selectedAnimal}.svg`} />{" "}
            </div>
          )}
        </div>

        <BadgeSelection
          title={strings.animalSelect}
          setter={setSelectedAnimal}
          array={animals}
          selectName="selectAnimal"
          classes={classes}
        />
        <BadgeSelection
          title={strings.colorSelect}
          setter={setSelectedColor}
          array={colors}
          selectName="selectColor"
          classes={classes}
        />
      </div>

      <button className={classes.create} onClick={createClassroom}>
        {sendBtn}
      </button>
    </div>
  );
}
