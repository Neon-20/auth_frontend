"use client";

import React, { useEffect, useState } from "react";
import { LOGIN_GRAPHIC, LOGO } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Modal from "../reset-password/otpModal";
import { FormButton } from "@/components/authForm/FormButton";
import { LinkText } from "@/components/authForm/LinkText";
import { LuXCircle } from "react-icons/lu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const NewPassword: React.FC = () => {
  const searchparams = useSearchParams();
  const param = searchparams && searchparams?.get("param");
  const router = useRouter();
  const [pass, setPass] = useState("");
  const [add, setAdd] = useState("");
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Alert component
  const AlertMessage = ({ message }: { message: string }) => {
    return (
      <Alert className="absolute top-6 w-60 sm:w-96 left-[50vw] translate-x-[-50%] backdrop-filter backdrop-blur-sm bg-opacity-90 bg-yellow-400">
        <AlertTitle>Notice!</AlertTitle>
        <button
          onClick={() => setAlert(false)}
          className="absolute right-2 top-2"
        >
          <LuXCircle className="w-5 h-5" />
        </button>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  };

  useEffect(() => {
    if (param !== null) setEmail(param);
    console.log(email);
  }, [param, email]);

  const handleModal = () => {
    setShow(true);
  };

  const handleForm = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLSpanElement>
  ) => {
    e.preventDefault();
    // console.log(email, pass);
    fetch("https://api.trustauthx.com/forgot/Signup", {
      method: "PUT",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: pass,
        is_pool: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.is_ok == true && data.status === 200) {
          // console.log(data.msg);
          setAdd(data.msg);
          console.log(add);
          handleModal();
        }
        if (data.detail) {
          setAlertMessage(data.detail);
          setAlert(true);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center">
      <div className="container sm:basis-3/5 flex flex-col min-h-screen">
        <div className="self-start mt-7">
          <Image width={34} height={34} src={LOGO} alt="AuthX logo" />
        </div>
        <div className="flex my-12 items-center justify-center grow sm:mr-12">
          <div className="-mt-32 w-fit max-w-lg">
            <Image
              className="mx-auto mb-8"
              width={62}
              height={62}
              src={LOGO}
              alt="AuthX logo"
            />
            <h1 className="scroll-m-20 text-4xl text-left pb-9 md:pb-11 font-semibold transition-colors first:mt-0">
              Enter a New Password
            </h1>
            <div className="login-wrapper form-wrapper">
              <form onSubmit={handleForm}>
                <div className="form-group relative">
                  <label
                    htmlFor="password"
                    className={`form-label absolute translate-x-6 translate-y-[-12px] bg-white px-2 
                    ${
                      ""
                      // errors.password && "text-red-600"
                    }
                    `}
                  >
                    Password
                  </label>
                  <input
                    // {...register("password")}
                    id="password"
                    type="password"
                    className={`form-control w-full px-8 py-3 border rounded-lg border-slate-500
                    ${
                      ""
                      // errors.password ? "border-red-600" : "border-slate-500"
                    }`}
                    placeholder="Enter Password"
                    onChange={(e) => setPass(e.target.value)}
                  />
                  {/* {errors.password && (
                    <div className="mt-2 color text-red-600">
                      <span>{errors.password?.message}</span>
                    </div>
                  )} */}
                </div>

                <div className="form-group">
                  <div className="d-grid start">
                    <FormButton>Next</FormButton>
                  </div>
                </div>

                <div className="ats-content mt-8 md:mt-11">
                  <p className="mb-0 text-xl flex items-center flex-wrap">
                    I remember my AuthX password
                    <LinkText to="/">advance to Login</LinkText>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black min-h-screen w-full sm:basis-2/5 relative flex flex-col justify-center">
        <div className="flex flex-col items-center my-10 md:mt-12">
          <h1 className="text-3xl xl:text-4xl mx-4 text-white max-w-lg tracking-widest font-light text-center">
            AuthX: Ensure Security at every level
          </h1>
          <Image
            className="mt-8 md:mt-10 xl:mt-12 w-3/5 max-h-[65vh]"
            src={LOGIN_GRAPHIC}
            alt="AuthX pre login"
            width={240}
            height={400}
          />
        </div>
        <span className="text-white w-full text-right absolute bottom-0 right-0 mb-4 xl:mb-8 mr-6">
          © 2023 TrustAuthx. All rights reserved.
        </span>
      </div>

      {alert && <AlertMessage message={alertMessage} />}
      {show && <Modal handleForm={handleForm} add={add} />}
    </div>
  );
};

export default NewPassword;
