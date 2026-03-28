import { errorGenerator } from "../components/forms/signupErrorHandler";

export default function FormInput({ Element, data, lang }) {
  const error = errorGenerator(data.returns);

  return (
    <div style={{ display: "flex" }}>
      {<Element dataField={data} i18n={lang} />}
      {error && <div>{error}</div>}
    </div>
  );
}
