import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "@/components/constants/Icons";

import { Link } from "react-router-dom";
import { CopyrightYear } from "@/components/constants/Urls";
import { PromotionSocialLinks } from "@/components/constants/Utility";
import RegistrationForm from "@/components/forms/RegistrationForm";

const RegisterPage = () => {
  return (
    <main className="m-auto flex lg:h-[100vh] h-fit w-full flex-col items-center justify-center pl-2 pr-2">
      <div className="m-auto flex w-fit flex-col lg:flex-row justify-center lg:gap-3 lg:p-6 p-2 sm:p-10">
        <div className="lg:w-[480px] w-full flex flex-col items-center justify-center">
          <Link
            to="/"
            className="lg:text-8xl text-5xl font-black dancing-script transition-all ease-in duration-200"
          >
            <h1>SnipShare.</h1>
          </Link>
          <h2 className="lg:text-lg text-md mt-1 font-bold capitalize">
            Connect, Collaborate, Create.
          </h2>

          <Separator className="lg:w-[60%] w-full my-5 bg-slate-950/50" />

          <div className="w-full hidden lg:flex flex-col items-center justify-center text-center">
            <p className="text-xs lg:text-md font-semibold">
              At {CopyrightYear}, This project is developed by Abhishek Katkam.
              All rights reserved by SnipShare.
            </p>
            <div className="w-full flex flex-row items-center justify-center mt-2 gap-4">
              {PromotionSocialLinks.map((links) => (
                <Link
                  to={links.url}
                  key={links.id}
                  target="_blank"
                  className="w-fit"
                >
                  <Button
                    variant="outline"
                    className="lg:h-9 lg:w-9 h-8 w-8 p-2"
                  >
                    {links.name === "Linkedin" && (
                      <FaLinkedin className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Github" && (
                      <FaGithub className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Instagram" && (
                      <FaInstagram className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Twitter" && (
                      <FaXTwitter className="w-[25px] h-[25px]" />
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-[480px] w-full flex flex-col items-center justify-start lg:p-4 lg:pl-6 lg:ml-10">
          <h2 className="lg:text-3xl font-semibold text-lg">
            Create an account
          </h2>
          <RegistrationForm />

          <p className="lg:text-sm text-xs mt-3 font-semibold text-slate-600">
            Already a user?{" "}
            <Link to="/login" className="text-[#09090b] hover:underline">
              Login here.
            </Link>{" "}
          </p>

          <Separator className="lg:my-5 my-3 bg-slate-950/50" />

          <div className="w-full my-3 lg:my-0 flex flex-col lg:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              className="lg:h-12 lg:w-12 h-8 w-[90%] p-2 text-sm"
            >
              <FaGoogle className="lg:w-[25px] lg:h-[25px]" />{" "}
              <span className="lg:hidden ml-2"> Continue with Google</span>
            </Button>
            <Button
              variant="outline"
              className="lg:h-12 lg:w-12 h-8 w-[90%] p-2 text-sm"
            >
              <FaGithub className="lg:w-[25px] lg:h-[25px]" />{" "}
              <span className="lg:hidden ml-2"> Continue with Github</span>
            </Button>
          </div>

          <div className="w-full lg:hidden my-4 flex flex-col items-center justify-center text-center">
            <p className="text-xs lg:text-md font-normal">
              At {CopyrightYear}, This project is developed by Abhishek Katkam.
              All rights reserved by SnipShare.
            </p>
            <div className="w-full flex flex-row items-center justify-center mt-2 gap-4">
              {PromotionSocialLinks.map((links) => (
                <Link
                  to={links.url}
                  key={links.id}
                  target="_blank"
                  className="w-fit"
                >
                  <Button
                    variant="outline"
                    className="lg:h-9 lg:w-9 h-8 w-8 p-2"
                  >
                    {links.name === "Linkedin" && (
                      <FaLinkedin className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Github" && (
                      <FaGithub className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Instagram" && (
                      <FaInstagram className="w-[25px] h-[25px]" />
                    )}
                    {links.name === "Twitter" && (
                      <FaXTwitter className="w-[25px] h-[25px]" />
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;