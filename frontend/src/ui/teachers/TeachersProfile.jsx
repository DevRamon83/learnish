import TeacherFront from "./TeacherFront";
import TeacherPic from "./TeacherPic";
import TeacherSubscription from "./TeacherSubscription";

export default function TeachersProfile({ teacher, strings, classes }) {
  const contract = teacher.contract;
  const contractKeys = Object.keys(contract);

  return (
    <div className={classes.teacherProfile}>
      <TeacherPic teacher={teacher} classes={classes} />
      <div className={classes.teacherData}>
        <h3>{teacher.username}</h3>
        <TeacherSubscription
          teacher={teacher}
          strings={strings}
          classes={classes}
        />
        {contractKeys.map((value) => (
          <div key={`${teacher.username}_${value}`}>
            {contract[value].available && (
              <TeacherFront
                teacher={teacher}
                strings={strings}
                contract={value}
                classes={classes}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
