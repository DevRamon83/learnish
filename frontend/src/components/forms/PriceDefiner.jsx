import { NumberInput, useRamonForm } from "ramon-form-sdude";
import { classes } from "../../constants/components/forms";
import FormInput from "./FormInput";
import { useRef, useState } from "react";
import fetchUpdateContract from "../../api/handlers/fetchUpdateContract";
import contractConfigBuilder from "../../forms/configs/teacherContract";

export default function PriceDefiner({
  status,
  title,
  strings,
  lang,
  setStatus,
  next,
  packs,
  caller,
}) {
  const formRef = useRef(null);
  const objConfig = contractConfigBuilder(strings, packs);

  const { fields } = useRamonForm(objConfig);
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = { [status]: Object.fromEntries(formData) };

    for (let datum in data[status]) {
      data[status][datum] = Number(data[status][datum]);
    }

    const update = await fetchUpdateContract(data);

    if (update.error) {
      return;
    }

    setStatus(next);
  };

  const jump = () => {
    setStatus(next);
  };

  return (
    <>
      {status !== "finish" && (
        <>
          <h1>{title}</h1>
          <form
            ref={formRef}
            className={classes.priceDefiner}
            onSubmit={submitHandler}
          >
            {packs.map((element) => (
              <FormInput
                key={`key_${element}`}
                Element={NumberInput}
                data={fields[element]}
                lang={lang}
              />
            ))}
            <button className={classes.btn.send}>{strings.send}</button>
            {status !== "subscription" && (
              <button className={classes.btn.send} onClick={jump}>
                {caller ? strings.close : strings.jump}
              </button>
            )}
          </form>
        </>
      )}
    </>
  );
}
