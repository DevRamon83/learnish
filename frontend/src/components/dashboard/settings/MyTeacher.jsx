import SettingsCommonTitle from "../../../ui/settings/SettingsCommonTitle";
import useRetrievePersonalSettings from "../../../hooks/useRetrievePersonalSettings";
import useTeacherPic from "../../../hooks/useTeacherPic";

export default function MyTeacher({ props, studentProps }) {
  const { strings, classes } = props;
  const { myTeacher, setMyTeacher } = studentProps;

  const retrieveConfig = {
    data: { retrieve: "teacher" },
    setter: setMyTeacher,
    key: "teacher",
    strings,
  };
  useRetrievePersonalSettings(retrieveConfig);

  const url = useTeacherPic(myTeacher);

  const title = !myTeacher?.username
    ? strings.change.teacher
    : `${strings.yourTeacher} ${myTeacher?.username}`;

  return (
    <>
      <SettingsCommonTitle classes={classes} string={title} src={url} />
    </>
  );
}
