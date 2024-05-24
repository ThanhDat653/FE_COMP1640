import * as Yup from "yup";

// Schema cho form đăng nhập
export const loginSchema = Yup.object().shape({
   email: Yup.string().email("Invalid email").required("Enter your email"),
   password: Yup.string().required("Enter your password").min(6, ""),
});

// Schema cho form đăng ký
export const registerSchema = Yup.object().shape({
   firstName: Yup.string().required("Enter your first name"),
   lastName: Yup.string().required("Enter your last name"),
   email: Yup.string().email("Invalid email").required("Enter your email"),
   password: Yup.string()
      .required("Enter your password")
      .min(6, "Password must be at least 6 characters"),
   confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
   // agreeToTerms: Yup.boolean().required("Agree to the terms and conditions"),
});
