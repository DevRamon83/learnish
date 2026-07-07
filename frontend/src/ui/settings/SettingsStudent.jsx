import MyTeacher from "../../components/dashboard/settings/MyTeacher";
import TeachersList from "../../components/dashboard/settings/TeachersList";

export default function SettingsStudent({ props, studentProps }) {
  const { strings, toggle, card } = props;

  return (
    <>
      {card === "MyTeacher" && (
        <>
          <MyTeacher props={props} studentProps={studentProps} />

          {toggle && <TeachersList props={props} studentProps={studentProps} />}
        </>
      )}
    </>
  );
}
