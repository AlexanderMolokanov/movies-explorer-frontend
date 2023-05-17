import { useState, useCallback } from "react";

const useForm = () => {
  const [inputValues, setInputValues] = useState({});
  const [errors, setErr] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputValues({
      ...inputValues,
      [name]: value,
    });

    setErr({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setIsFormValid(event.target.closest("#form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setInputValues(newValues);
      setErr(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setInputValues, setErr, setIsFormValid]
  );

  return {
    errors,
    inputValues,
    handleChange,
    isFormValid,
    resetForm,
  };
};

export default useForm;
