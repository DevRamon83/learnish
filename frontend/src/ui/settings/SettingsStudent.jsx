import { useState } from "react";
import MyTeacher from "../../components/dashboard/settings/MyTeacher";
import TeachersList from "../../components/dashboard/settings/TeachersList";

export default function SettingsStudent({ sharedProps }) {
  const { toggle, card } = sharedProps;
  const [myTeacher, setMyTeacher] = useState(null);

  return (
    <>
      {card === "MyTeacher" && (
        <>
          <MyTeacher
            sharedProps={sharedProps}
            myTeacher={myTeacher}
            setMyTeacher={setMyTeacher}
          />

          {toggle && (
            <TeachersList
              myTeacher={myTeacher}
              setMyTeacher={setMyTeacher}
              sharedProps={sharedProps}
            />
          )}
        </>
      )}
    </>
  );
}
