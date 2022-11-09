import { useFormik } from "formik";
import { View } from "react-native";
import Button from "components/Button";
import Textfield from "components/Textfield";
import * as Yup from "yup";
import useLogin from "./useLogin";


const validationSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {

  const {
    onSubmit,
    isFetching,
  } = useLogin();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  })

  const handleSubmit = () => form.handleSubmit();

  return (
    <View>
      <Textfield
        form={form}
        label="Email"
      />
      <Textfield
        form={form}
        label="Password"
      />
      <Button
        onPress={handleSubmit}
        isLoading={isFetching}
      >
        Login
      </Button>
    </View>
  );
}

export default Login;