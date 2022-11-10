import { useFormik } from "formik";
import { StyleSheet, View } from "react-native";
import Button from "components/Button";
import Textfield from "components/Textfield";
import * as Yup from "yup";
import useLogin from "./useLogin";
import { RFPercentage } from "react-native-responsive-fontsize";
import H1 from "src/components/H1";
import Text from "src/components/Text";


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
    <View
      style={styles.page}
    >
      <View
        style={styles.header}
      >
        <H1>
          Hello Again!
        </H1>
        <Text>
          Welcome back
        </Text>
      </View>
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

const styles = StyleSheet.create({
  page: {
    padding: RFPercentage(2),
    backgroundColor: "#fff",
    paddingTop: RFPercentage(10),
    flex: 1,
  },
  header: {
    marginBottom: RFPercentage(4),
    alignItems: "center"
  }
})

export default Login;