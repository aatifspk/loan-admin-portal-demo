// import React from 'react'

// function viewProfile() {
//   return (
//     <div>viewProfile</div>
//   )
// }

// export default viewProfile

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/scale-subtle.css";
import "tippy.js/animations/perspective-extreme.css";
import "tippy.js/animations/perspective-subtle.css";
import "tippy.js/animations/perspective.css";
import "tippy.js/animations/scale-extreme.css";
import "tippy.js/animations/scale-subtle.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away-extreme.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward-extreme.css";
import "tippy.js/animations/shift-toward-subtle.css";
import "tippy.js/animations/shift-toward.css";


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import Tooltip from "@/components/ui/Tooltip";

// import BasicArea from "../chart/appex-chart/BasicArea";

// import images
import ProfileImage from "@/assets/images/users/user-1.jpg";
import { useSelector } from "react-redux";

const ViewProfile = () => {

  const navigate = useNavigate();
  const { profileData: profile, profileExists } = useSelector((state) => state.profile);
  const [currentUser, setCurrentUser] = useState({});
  const [profileImgPreview, setProfileImgPreview] = useState("");



  console.log("profile", profile);


  useEffect(() => {

    if (profile) {
      setCurrentUser(profile)
      setProfileImgPreview(`http://localhost:8080/profile/${profile?.profileImage}`)
    }

  }, [profile])

  function naviagteHandler(e) {
    e.preventDefault()
    console.log("yeeeees");
    navigate("/profile");
    console.log("nooo");

  }


  const tippy =   {
    className :"btn btn-dark",
  placement : "top",
  arrow : true,
  theme : "dark",
  animation : "shift-away",
  trigger : "mouseenter focus",
  interactive : false,
  allowHTML : false,
  maxWidth : 300,
  duration : 200,
  }




  return (
    <div>
      <div className="space-y-5 profile-page">
        <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
          <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                  <img
                    src={profileImgPreview}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                  <Link
                    to="#"
                    className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                  >

                    <div className="custom-tippy">
                      <Tippy
                        content={"Edit Profile"}
                        placement={tippy.placement}
                        arrow={tippy.arrow}
                        theme={tippy.theme}
                        animation={tippy.animation}
                        trigger={tippy.trigger}
                        interactive={tippy.interactive}
                        allowHTML={tippy.allowHTML}
                        maxWidth={tippy.maxWidth}
                        duration={tippy.duration}
                      >
                        <button onClick={naviagteHandler} ><Icon  icon="heroicons:pencil-square" /></button>
                      </Tippy>
                    </div>
                   
                    {/* <Tooltip
                      title="Edit Profile"
                      content="Edit Profile"
                      placement="top"
                      className="btn btn-outline-dark "
                      arrow
                      animation="scale"
                      children={<button onClick={naviagteHandler}><Icon icon="heroicons:pencil-square" /></button> }
                    /> */}
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  {currentUser && currentUser?.firstName ? (currentUser.firstName + " " + currentUser.lastName) : ""}
                </div>
                <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                 {currentUser?.designation ?  currentUser?.designation : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-12 col-span-12">
            <Card title="Information">
              <ul className="list space-y-8">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:envelope" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      EMAIL
                    </div>
                    <a
                      href="mailto:someone@example.com"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {currentUser && currentUser?.optionalEmail ? (currentUser?.optionalEmail) : ""}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:phone-arrow-up-right" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      PHONE
                    </div>
                    <a
                      href="tel:0189749676767"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {currentUser && currentUser?.emergencyPhone ? (currentUser?.emergencyPhone) : ""}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:map" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      LOCATION
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50">
                      {currentUser && currentUser?.city ? (currentUser?.city + "," + currentUser?.state) : ""} {`, ${currentUser?.address ? currentUser?.address : ""}`}
                    </div>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
          {/* <div className="lg:col-span-8 col-span-12">
            <Card title="User Overview">
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
