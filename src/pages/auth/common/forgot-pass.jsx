import React from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authLogin from "../../../services/authService";
import { json, useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";
import { setUser } from "@/store/api/auth/authSlice";
import { useDispatch } from "react-redux";


const schema = yup.object({
  otp: yup.string().required("OTP is Required"),
}).required();

const ForgotPass = () => {
  const param = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const emailArr = param.email.split("A");
      const email = emailArr[0] + "." + emailArr[1];
      const dataObject = { email: email, otp: data.otp };

      const response = await authLogin.OtpSignIn(dataObject);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("adminInfo", JSON.stringify(response.data.adminInfo)  );

      dispatch(setUser(response.data?.adminInfo))
      toast.success( response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log("error ????", error);
      toast.warning(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textinput
        name="otp"
        label="OTP"
        type="number"
        register={register}
        error={errors.otp}
        className="h-[48px]"
        placeholder="Enter OTP"
      />

      <button className="btn btn-dark block w-full text-center">
        Submit OTP
      </button>
    </form>
  );
};

export default ForgotPass;
