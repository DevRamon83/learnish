import { useLocation } from "react-router-dom";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";
import { useState } from "react";
import { useEffect } from "react";
import Table from "../ui/Table";
import LessonMenu from "../components/dashboard/LessonMenu";
import { useUnlockedLessons } from "../hooks/useUnlockedLessons";
import LessonLocked from "../ui/LessonLocked";
import { classes } from "../constants/pages/lessons";

export default function Lesson() {
  const { pathname } = useLocation();
  const lessonID = pathname.replace("/user/lesson/", "").replaceAll("-", "_");
  const { strings } = useLang(i18nAddresses.englishLessons);
  const lessonObj = strings.get(lessonID);
  const markup = lessonObj.markup;
  const table = lessonObj.table;

  const { userLessons, setUserLessons } = useUnlockedLessons();

  return (
    <>
      {userLessons && (
        <>
          {userLessons.includes(lessonObj.index) ? (
            <div className={classes.main}>
              <h1>{lessonObj.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: markup }} />
              {table && <Table data={table} />}
              <LessonMenu strings={strings} lessonID={lessonID} />
            </div>
          ) : (
            <LessonLocked />
          )}
        </>
      )}
    </>
  );
}
