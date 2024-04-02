import React, { useEffect } from 'react';
import { router } from 'expo-router';
import {FormikProps } from "formik";
import { useSession } from '../../hooks/useSession';

export default function useSignInViewModel() {
    const { signIn, userType } = useSession();
    const formikRef = React.useRef<FormikProps<{ username: string; password: string; }>>(null);
  
    useEffect(() => {
      if (userType === "admin") {
        router.replace("/admin");
      } else if (userType === "tecnico") {
        router.replace("/tecnico");
      } else if (userType === "cliente") {
        router.replace("/cliente");
      }
    }, [userType]);
  
    const handleSubmit = async (values: { username: string; password: string; }) => {
      await signIn(values.username, values.password);
    };
  
    return { handleSubmit, formikRef };
}