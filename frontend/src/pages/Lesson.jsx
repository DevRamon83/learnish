import { useLocation } from "react-router-dom";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";
import { useState } from "react";
import { useEffect } from "react";
import Table from "../components/Table";

export default function Lesson() {
  const { pathname } = useLocation();
  const lessonID = pathname.replace("/user/lesson/", "").replaceAll("-", "_");
  const { strings } = useLang(i18nAddresses.englishLessons);
  const lessonObj = strings[lessonID];
  const markup = lessonObj.markup;
  const table = lessonObj.table;

  return (
    <div className="lesson__main">
      <h1>{lessonObj.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      {table && <Table data={table} />}
    </div>
  );
}
