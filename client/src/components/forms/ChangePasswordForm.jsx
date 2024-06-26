import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "@/components/constants/Icons";
import { Separator } from "@radix-ui/react-separator";
import SpinLoader from "@/components/loaders/SpinLoader";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const [formState, setFormState] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [inputTypeCurrentPassword, setInputTypeCurrentPassword] =
    useState("password");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [inputTypeNewPassword, setInputTypeNewPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] =
    useState("password");

  const queryClient = useQueryClient();

  const handleInputStateChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword(true);
    setInputTypeCurrentPassword("text");
    setTimeout(() => {
      setShowCurrentPassword(false);
      setInputTypeCurrentPassword("password");
    }, 2000);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(true);
    setInputTypeNewPassword("text");
    setTimeout(() => {
      setShowNewPassword(false);
      setInputTypeNewPassword("password");
    }, 2000);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(true);
    setInputTypeConfirmPassword("text");
    setTimeout(() => {
      setShowConfirmPassword(false);
      setInputTypeConfirmPassword("password");
    }, 2000);
  };

  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formState.newpassword.length !== formState.confirmpassword.length) {
      return toast.error("Both password didn't matched.");
    }
    if (
      formState.newpassword.length < 8 &&
      formState.newpassword.length > 17 &&
      formState.confirmpassword.length < 8 &&
      formState.confirmpassword.length > 17 &&
      formState.confirmpassword != formState.newpassword
    ) {
      return toast.error(
        "Passwords must be greater than 8 characters and less than 17 characters."
      );
    }
    if (
      formState.newpassword.length >= 8 &&
      formState.newpassword.length <= 17 &&
      formState.confirmpassword.length >= 8 &&
      formState.confirmpassword.length <= 17 &&
      formState.confirmpassword == formState.newpassword
    ) {
      ChangePasswordMutation({
        currentPassword: formState.currentpassword,
        newPassword: formState.newpassword,
      });
    }
  };

  const { mutate: ChangePasswordMutation, isPending } = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      try {
        const response = await fetch("/api/auth/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: authenticatedUser.email,
            currentPassword,
            newPassword,
          }),
        });
        const data = await response.json();
        if (data.status == "error") {
          return toast.error(data.message);
        }

        if (data.status == "success") {
          queryClient.invalidateQueries({
            queryKey: ["authorisedCurrentUser"],
          });
          setFormState({
            currentpassword: "",
            newpassword: "",
            confirmpassword: "",
          });
          toast.success(data.message);
        }
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <form
      className="w-full flex flex-col items-center"
      onSubmit={handleFormSubmit}
    >
      <div className="w-[80%]">
        <label className="mb-1 block mt-2 w-full">
          <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
            Current Password
          </span>
          <div className="relative">
            <input
              className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              inputMode="password"
              type={inputTypeCurrentPassword}
              name="currentpassword"
              autoComplete="current-password"
              onChange={handleInputStateChange}
              value={formState.currentpassword}
              placeholder="********"
              required
            />
            <button
              type="button"
              className={`absolute inset-y-0 right-0 items-center text-slate-500 dark:text-slate-300 px-2 ${
                formState.currentpassword.length > 1 ? "flex" : "hidden"
              }`}
              onClick={handleToggleCurrentPassword}
            >
              {showCurrentPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </label>
        <ForgotPasswordModal targetEmail={authenticatedUser.email} />
      </div>

      <Separator className="my-2 w-[80%] bg-slate-600/20 h-[0.25px] dark:bg-gray-500" />

      <label className="mb-1 block mt-2 w-[80%]">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
          New Password
        </span>
        <div className="relative">
          <input
            className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
            inputMode="password"
            type={inputTypeNewPassword}
            name="newpassword"
            autoComplete="current-password"
            onChange={handleInputStateChange}
            value={formState.newpassword}
            placeholder="********"
            required
          />
          <button
            type="button"
            className={`absolute inset-y-0 right-0 items-center text-slate-500 px-2 ${
              formState.newpassword.length > 1 ? "flex" : "hidden"
            }`}
            onClick={handleToggleNewPassword}
          >
            {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </label>
      <label className="mb-1 block mt-2 w-[80%]">
        <span className="lg:mb-1 block lg:text-sm text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300">
          Confirm Password
        </span>
        <div className="relative">
          <input
            className="mt-1 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
            inputMode="password"
            type={inputTypeConfirmPassword}
            name="confirmpassword"
            autoComplete="current-password"
            onChange={handleInputStateChange}
            value={formState.confirmpassword}
            placeholder="********"
            required
          />
          <button
            type="button"
            className={`absolute inset-y-0 right-0 items-center text-slate-500 px-2 ${
              formState.confirmpassword.length > 1 ? "flex" : "hidden"
            }`}
            onClick={handleToggleConfirmPassword}
          >
            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </label>

      <Button
        className="w-fit ml-auto mt-4 h-9 font-bold bg-[#09090b] dark:bg-white"
        disabled={isPending}
      >
        {isPending ? <SpinLoader /> : "Update password"}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
