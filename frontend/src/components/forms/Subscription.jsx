import { NumberInput, useRamonForm } from "ramon-form-sdude";
import { classes } from "../../constants/components/forms";
import FormInput from "./FormInput";
import { useRef, useState } from "react";
import fetchUpdateContract from "../../api/handlers/fetchUpdateContract";
import contractConfigBuilder from "../../forms/configs/teacherContract";

export default function Subscription({
  status,
  title,
  strings,
  lang,
  setStatus,
}) {
  const formRef = useRef(null);

  const inputIds = ["monthly", "semiannually", "annually"];
  const objConfig = contractConfigBuilder(strings, inputIds);

  const { fields, selects } = useRamonForm(objConfig);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = { subscription: Object.fromEntries(formData.entries()) };

    const update = await fetchUpdateContract(data);

    if (update.error) {
      return;
    }

    setStatus("tutoring");
  };

  return (
    <>
      {status !== "finish" && (
        <>
          <h1>{title}</h1>
          <form
            ref={formRef}
            className={classes.signup}
            onSubmit={submitHandler}
          >
            <FormInput
              Element={NumberInput}
              data={fields.monthly}
              lang={lang}
            />
            <FormInput
              Element={NumberInput}
              data={fields.semiannually}
              lang={lang}
            />
            <FormInput
              Element={NumberInput}
              data={fields.annually}
              lang={lang}
            />
            <button className={classes.btn.send}>{strings.send}</button>
          </form>
        </>
      )}
    </>
  );
}
