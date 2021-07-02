import { useState } from "react";
import { useAuthenticationForm } from "./useAuthenticationForm";
import apiClient from "services/apiClient";

export const useLoginForm = ({ user, setUser }) => {
  const {form, errors, setErrors, handleOnInputChange } = useAuthenticationForm({ user })

  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.loginUser({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }
    if (data?.user) {
      setUser(data.user);
      apiClient.setToken(data.token);
    }

    setIsLoading(false);
  };

  return {
    form,
    errors,
    isLoading,
    handleOnInputChange,
    handleOnSubmit,
  };
};
