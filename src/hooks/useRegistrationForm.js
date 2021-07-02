import { useState } from "react";
import { useAuthenticationForm } from "./useAuthenticationForm";
import apiClient from "services/apiClient";

export const useRegistrationForm = ({ user, setUser }) => {
  const { form, errors, setErrors, handleOnInputChange } = useAuthenticationForm({ user })

  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match" }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.registerUser({
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
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

  return { form, errors, isLoading, handleOnInputChange, handleOnSubmit };
};
