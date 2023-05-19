import { useState, useCallback } from "react";

const useFormWithValidation = () => {
  const [error, setErr] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [isValid, setIsFormValiid] = useState(false);

  const resetForm = useCallback(
    (newValue = {}, newErro = {}, newIsFormValiid = false) => {
      setInputValues(newValue);
      setErr(newErro);
      setIsFormValiid(newIsFormValiid);
    },
    [setInputValues, setErr, setIsFormValiid]
  );

  const todoChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputValues({
      ...inputValues,
      [name]: value,
    });

    setErr({
      ...error,
      [name]: event.target.validationMessage,
    });

    setIsFormValiid(event.target.closest("#form").checkValidity());
  };

  return {
    error,
    inputValues,
    isValid,
    todoChange,
    resetForm,
  };
};

export default useFormWithValidation;
