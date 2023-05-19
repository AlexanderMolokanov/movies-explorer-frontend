import { useState, useCallback } from "react";

const useFormWithValidation = () => {
  const [inputValues, setInputValues] = useState({});
  const [error, setErr] = useState({});
  const [isValid, setIsFormValiid] = useState(false);

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

  const resetForm = useCallback(
    (newValue = {}, newErro = {}, newIsFormValiid = false) => {
      setInputValues(newValue);
      setErr(newErro);
      setIsFormValiid(newIsFormValiid);
    },
    [setInputValues, setErr, setIsFormValiid]
  );

  return {
    error,
    inputValues,
    todoChange,
    isValid,
    resetForm,
  };
};

export default useFormWithValidation;
