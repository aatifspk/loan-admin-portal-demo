


import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import Card from "@/components/ui/Card";
import UserAvatar from "@/assets/images/all-img/user.png";
import ProfileImage from "@/assets/images/users/user-1.jpg";

import Flatpickr from "react-flatpickr";
import Select from "react-select";
import Radio from "@/components/ui/Radio";
import ViewProfile from "./viewProfile";
import axios from "axios";

import stateService from "@/services/state-service";
import cityService from "@/services/city-service";
import { setState } from "@/store/api/auth/stateSlice";
import { useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import service from "../../services/authService";

import '../../assets/scss/components/custome.css';

import { setProfile } from "@/store/api/auth/peofileSlice";
import { useNavigate } from "react-router-dom";





// option "unmarried", "married", "widow", "divorced", "other"
const maritalStatus = [
  {
    value: "unmarried",
    label: "Unmarried",
    activeClass: "ring-primary-500 border-primary-500",
  },
  {
    value: "married",
    label: "Married",
    activeClass: "ring-secondary-500 border-secondary-500",
  },
  {
    value: "widow",
    label: "Widow",
    activeClass: "ring-danger-500 border-danger-500",
  },
  {
    value: "divorced",
    label: "Divorced",
    activeClass: "ring-warning-500 border-warning-500",
  },
  {
    value: "other",
    label: "Other",
    activeClass: "ring-info-500 border-info-500",
  },
];

const gender = [
  {
    value: "male",
    label: "Male",
    activeClass: "ring-primary-500 border-primary-500",
  },
  {
    value: "female",
    label: "Female",
    activeClass: "ring-danger-500 border-danger-500",
  },
  {
    value: "other",
    label: "Other",
    activeClass: "ring-info-500 border-info-500",
  },
];



const furits = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
];

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};



const FormValidationSchema = yup.object({
  firstName: yup.string().required("This Field is Required").min(3, "Enter at least 3 characters."),
  lastName: yup.string().required("This Field is Required").min(3, "Enter at least 3 characters."),
  fatherName: yup.string().required("This Field is Required").min(3, "Enter at least 3 characters."),
  motherName: yup.string().required("This Field is Required").min(3, "Enter at least 3 characters."),
  optionalEmail: yup.string().required("This Field is Required").email("Enter a valid email."),
  emergencyPhone: yup.string().required("This Field is Required").matches(/^\d{10}$/, "Enter a 10-digit phone number."),
}).required();

const profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [profileImgErr, setProfileImgErr] = useState("");
  const [selectedProfileImg, setSelectedProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState("");
  const [removeProfileImg, setRemoveProfileImg] = useState(false);


  const [stateArray, setStateArray] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);


  const [selectedImage, setSelectedImage] = useState(null);
  const [dob, setDob] = useState(null);

  const [selectgender, setSelectGender] = useState("");
  const [selectMaritalStatus, setSelectMaritalStatus] = useState("");

  const [currentUser, setCurrentUser] = useState({});

  const { stateList } = useSelector((state) => state.states);
  const store = useSelector((state) => state);
  
  const { profileData: profile, profileExists } = useSelector((state) => state.profile);


  // console.log("store", store);



  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [fatherNameErr, setFatherNameErr] = useState("");
  const [motherNameErr, setMotherNameErr] = useState("");
  const [optionalEmailErr, setOptionalEmailErr] = useState("");
  const [emergencyPhoneErr, setEmergencyPhoneErr] = useState("");
  const [dobErr, setDobErr] = useState("");
  const [genderErr, setGenderErr] = useState("");
  const [maritalStatusErr, setMaritalStatusErr] = useState("");
  const [cityErr, setCityErr] = useState("");
  const [stateErr, setStateErr] = useState("");



  // console.log("genderErr", genderErr);

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: yupResolver(FormValidationSchema),
  });


  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedImage(file);
  //   register("imageInput", {
  //     required: "Profile image is required", // Add any validation rules if needed
  //   });
  // };

  const handleImageChange = (event) => {
    setProfileImgErr("");

    let fileSize = 0;

    let errorCount = 0;

    const file = event.target.files[0];

    if (file) {
      fileSize = file.size / 1024;

      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        setProfileImgErr("Only Images are allowed! ");

        errorCount++;
      }

      //check if filesize is not more than 1MB
      if (fileSize > 1024) {
        setProfileImgErr("Please upload a file of size less than 1MB!");

        errorCount++;
      }

      if (errorCount === 0) {
        const imageAsBase64 = URL.createObjectURL(file);

        setSelectedProfileImg(file);

        setProfileImgPreview(imageAsBase64);

        setRemoveProfileImg(false);

      }
    }
  };




  const handleGender = (e) => {
    setSelectGender(e.target.value);
  };


  const handleMaritalStatus = (e) => {
    setSelectMaritalStatus(e.target.value);
  };





  const handleStateChange = (selectedOption) => {

    setSelectedState(selectedOption);
    setSelectedCity(null)


    setCurrentUser({ ...currentUser, ["state"]: selectedOption?.value, ["city"]: null });


    if (selectedOption) {

      async function getCity() {

        const response = await cityService.getCityList(selectedOption.value);

        if (response.data.data) {

          const arrayCity = response.data.data

          const filteredCityList = arrayCity.map((item, index) => {
            console.log("item", item);
            return { value: item._id, label: item.name }
          })

          setCityList(filteredCityList)


        }


      }

      getCity()


    } else {
      // Reset city list if no state is selected
      setCityList([]);
    }

  };


  // get selected city




  function handleCityChange(city) {

    console.log("cityhhhh", city);

    setCurrentUser({ ...currentUser, ["city"]: city.label });

    setSelectedCity(city)

  }



  const onSubmit = (data) => {

    let errorCount = 0;

    if (!selectedProfileImg) {
      profileImgErr("please select profile image");
      errorCount++
    }


  };


  useEffect(() => {

    if (profile && stateList) {
      setCurrentUser(profile)
      setSelectMaritalStatus(profile?.maritalStatus)
      setSelectGender(profile?.gender);

      setProfileImgPreview(`http://localhost:8080/profile/${profile?.profileImage}`)

      if (profile?.dateOfBirth) {

        setDob(profile?.dateOfBirth)

        console.log("profile?.dateOfBirth", profile?.dateOfBirth);

      }



      const stateObject = stateList.find((item) => item.state_code == profile.state);

      if (stateObject) {
        setSelectedState({ value: stateObject.state_code, label: stateObject.name })
      }


      async function getSelectedCity(state) {

        const response = await cityService.getCityList(state);

        if (response.data.data) {

          const arrayCity = response.data.data

          const filteredCityList = arrayCity.map((item, index) => {
            return { value: item._id, label: item.name }
          })


          if (filteredCityList) {

            setCityList(filteredCityList)

            const selectedCity = filteredCityList.find((item) => item.label == profile.city);

            if (selectedCity) {

              setSelectedCity(selectedCity)

            }

          }

        }

      }

      getSelectedCity(profile.state)

    }

  }, [profile, stateList])


  useEffect(() => {

    if (stateList !== null) {
      const filterdState = stateList.map((item, index) => {
        return { value: item.state_code, label: item.name }
      });
      setStateArray(filterdState)
    }

  }, [stateList])



  useEffect(() => {

    async function getState() {
      try {
        const response = await stateService.getStateList();
        dispatch(setState(response.data.data))
      } catch (error) {
        console.log("state error", error);
      }
    }
    getState()

  }, []);


  const handleInputValidation = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setCurrentUser({ ...currentUser, [fieldName]: value });

    const validateInput = (field, minLength, errorMessage) => {
      if (value.length < minLength) {
        setError(field, {
          type: "manual",
          message: errorMessage,
        });
      } else {
        clearErrors(field);
      }
    };

    switch (fieldName) {
      case "firstName":
      case "lastName":
      case "fatherName":
      case "motherName":
        validateInput(fieldName, 3, `Enter at least 3 characters for ${fieldName}.`);
        break;
      case "optionalEmail":
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!isValidEmail) {
          setError("optionalEmail", {
            type: "manual",
            message: "Enter a valid email address.",
          });
        } else {
          clearErrors("optionalEmail");
        }
        break;
      case "emergencyPhone":
        const isValidPhoneNumber = /^\d{10}$/.test(value);
        if (!isValidPhoneNumber) {
          setError("emergencyPhone", {
            type: "manual",
            message: "Enter a valid 10-digit phone number.",
          });
        } else {
          clearErrors("emergencyPhone");
        }
        break;
      default:
        break;
    }

  };


  function handleInputChange(event) {

    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });

  }



  //validation handler
  const handleValidation = (event) => {

    const inputValue = event.target.value.trim();

    const inputFieldName = event.target.name;

    //set error message for firstName
    if (inputFieldName === "firstName") {
      if (inputValue.length < 3) {
        setFirstNameErr("Please enter atleast 3 characters!");
      } else {
        setFirstNameErr("");
      }
    }


    //set error message for lastName
    if (inputFieldName === "lastName") {
      if (inputValue.length < 3) {
        setLastNameErr("Please enter atleast 3 characters!");
      } else {
        setLastNameErr("");
      }
    }


    //set error message for fatherName
    if (inputFieldName === "fatherName") {
      if (inputValue.length < 3) {
        setFatherNameErr("Please enter atleast 3 characters!");
      } else {
        setFatherNameErr("");
      }
    }


    //set error message for motherName
    if (inputFieldName === "motherName") {
      if (inputValue.length < 3) {
        setMotherNameErr("Please enter atleast 3 characters!");
      } else {
        setMotherNameErr("");
      }
    }


    //set error message for optional email
    if (inputFieldName === "optionalEmail") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!emailRegex.test(inputValue) || inputValue.length === 0) {
        setOptionalEmailErr("Please enter a valid email address!");
      } else {
        setOptionalEmailErr("");
      }
    }

    //set error message for emergency phoneNumber
    if (inputFieldName === "emergencyPhone") {
      const phoneNumberRegex = /^\d{10}$/;

      if (!phoneNumberRegex.test(inputValue) || inputValue.length === 0) {
        setEmergencyPhoneErr("Please enter a 10 digit phone number!");
      } else {
        setEmergencyPhoneErr("");
      }
    }





  };


  function formatDateToISO(date) {
    // Extract year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format components into the desired string format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }



  // submit all data 

  async function handleSubmitData() {

    let errorCount = 0;

    const formData = new FormData();



    // firstName error
    if (
      currentUser.firstName === "" ||
      currentUser.firstName === null ||
      currentUser.firstName < 3 ||
      currentUser.firstName === undefined
    ) {
      setFirstNameErr("Please enter atleast 3 characters!");

      errorCount++;
    } else {
      formData.append("firstName", currentUser.firstName);

      setFirstNameErr("");
    }

    // lastName error
    if (
      currentUser.lastName === "" ||
      currentUser.lastName === null ||
      currentUser.lastName < 3 ||
      currentUser.lastName === undefined
    ) {
      setLastNameErr("Please enter atleast 3 characters!");

      errorCount++;
    } else {
      formData.append("lastName", currentUser.lastName);
      setLastNameErr("");
    }



    // fatherName error
    if (
      currentUser.fatherName === "" ||
      currentUser.fatherName === null ||
      currentUser.fatherName < 3 ||
      currentUser.fatherName === undefined
    ) {
      setFatherNameErr("Please enter atleast 3 characters!");

      errorCount++;
    } else {
      formData.append("fatherName", currentUser.fatherName);
      setFatherNameErr("");
    }


    // fatherName error
    if (
      currentUser.motherName === "" ||
      currentUser.motherName === null ||
      currentUser.motherName < 3 ||
      currentUser.motherName === undefined
    ) {
      setMotherNameErr("Please enter atleast 3 characters!");

      errorCount++;
    } else {
      formData.append("motherName", currentUser.motherName);
      setMotherNameErr("");
    }


    // gender error
    if (currentUser.gender === "" ||
      currentUser.gender === null ||
      currentUser.gender === undefined) {
      errorCount++
      setGenderErr("This Field Is Required.")
    }else{
      setGenderErr("");
      formData.append("gender", currentUser.gender);
    }

    // marital status error
    if (currentUser.maritalStatus === "" ||
      currentUser.maritalStatus === null ||
      currentUser.maritalStatus === undefined) {
      errorCount++
      setMaritalStatusErr("This Field Is Required.")
    }else{
      setMaritalStatusErr("");
      formData.append("maritalStatus", currentUser.maritalStatus);
    }


    // DOB error
    if (currentUser.dateOfBirth === "" ||
      currentUser.dateOfBirth === null ||
      currentUser.dateOfBirth === undefined) {
      errorCount++
      setDobErr("Choose Date Of Birth")
    } else {
      formData.append("dateOfBirth", currentUser.dateOfBirth);
      setDobErr("")
    }



    // city error
    if (currentUser.city === "" ||
      currentUser.city === null ||
      currentUser.city === undefined) {
      errorCount++
      setCityErr("Please Select City")
    } else {
      formData.append("city", currentUser?.city);
      setCityErr("")
    }

    // state error
    if (currentUser.state === "" ||
      currentUser.state === null ||
      currentUser.state === undefined) {
      errorCount++
      setStateErr("Please Select State")
    } else {
      formData.append("state", currentUser.state);
      setStateErr("")
    }


    // optional email error

    if (currentUser.optionalEmail === "" ||
      currentUser.optionalEmail === null ||
      currentUser.optionalEmail === undefined) {
      errorCount++
      setOptionalEmailErr("Please enter a valid email address!");
    } else {
      formData.append("optionalEmail", currentUser.optionalEmail);
      setOptionalEmailErr("")
    }


    // emergency Phone error

    if (currentUser.emergencyPhone === "" ||
      currentUser.emergencyPhone === null ||
      currentUser.emergencyPhone === undefined ||
      currentUser.emergencyPhone.length !== 10
    ) {
      errorCount++
      setEmergencyPhoneErr("Please enter a 10 digit phone number!");
    } else {
      formData.append("emergencyPhone", currentUser.emergencyPhone);
      setEmergencyPhoneErr("")
    }


    console.log("current ", currentUser);

    if (profileImgErr !== "") {
      errorCount++;
    } else {
      if (selectedProfileImg) {
        formData.append("profileImage", selectedProfileImg)
      }
    }

    if (errorCount > 0) {

      return

    } else {
      await service.updateProfile(formData).then((res) => {
        dispatch(setProfile(res.data));
        navigate("/viewProfile")
        
      })
        .catch((error) => {
        });
    }

  }




  useEffect(() => {

    console.log("store", store);

  }, [store])



  return (

    <>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center"> {/* Updated line */}
            <label htmlFor="imageInput" className="cursor-pointer">
              <img
                src={profileImgPreview ? profileImgPreview : ProfileImage}
                alt="Default"
                className="w-16 h-16 object-cover rounded-full"
              />
            </label>
            <input
              id="imageInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <span style={{ color: "red", fontSize: "0.7em" }}>{profileImgErr}</span>
            <label htmlFor="imageInput" className="text-sm mt-2 text-gray-500 cursor-pointer">Select a profile</label> {/* New line */}
          </div>
          {/* <div className="mb-2 ">
            <label htmlFor="firstName" className="mb-1">
              First Name
            </label>
            <Textinput
              name="firstName"
              isMask={false}
              // onChange={handleInputValidation}
              placeholder="Enter First Name Here.."
              register={register}
              error={errors.firstName}
            />
          </div> */}

          <div className={`fromGroup  ${firstNameErr !== "" ? "has-error" : ""} `}>
            <label htmlFor="firstName" className="mb-1">
              First Name
            </label>
            <div className=" flex-1">
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                className={`form-control py-2`}
                value={
                  currentUser.firstName ? currentUser.firstName : ""
                }
                //  className="form-control py-2" 
                onChange={handleInputChange}
                onKeyUp={handleValidation}
              />
              <div style={{ top: "47%" }} className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                {firstNameErr !== "" && (
                  <span className="text-danger-500">
                    <Icon icon="heroicons-outline:information-circle" />
                  </span>
                )}
              </div>
            </div>
            {firstNameErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {firstNameErr}
              </div>
            )}
          </div>

          <div className={`fromGroup   ${lastNameErr !== "" ? "has-error" : ""} `}>
            <label htmlFor="lastName" className="">
              Last Name
            </label>
            <div className=" flex-1">
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name Here.."
                className="form-control py-2"
                onChange={handleInputChange}
                onKeyUp={handleValidation}
                value={
                  currentUser.lastName ? currentUser.lastName : ""
                }
              />
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2  -translate-y-1/2   space-x-1 rtl:space-x-reverse">
                {lastNameErr !== "" && (
                  <span className="text-danger-500">
                    <Icon icon="heroicons-outline:information-circle" />
                  </span>
                )}
              </div>
            </div>
            {lastNameErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {lastNameErr}
              </div>
            )}

            {/* <Textinput
              name="lastName"
              type="text"
              placeholder="Enter Last Name Here.."
              register={register}
              error={errors.lastName}
            /> */}
          </div>

          <div className={`fromGroup   ${fatherNameErr !== "" ? "has-error" : ""} `}>
            <label htmlFor="fatherName" className="mb-1">
              Father Name
            </label>
            <div className=" flex-1">
              <input
                type="text"
                name="fatherName"
                placeholder="Enter Father's Name Here.."
                className="form-control py-2"
                onChange={handleInputChange}
                onKeyUp={handleValidation}
                value={
                  currentUser.fatherName ? currentUser.fatherName : ""
                }
              />
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2  -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                {fatherNameErr !== "" && (
                  <span className="text-danger-500">
                    <Icon icon="heroicons-outline:information-circle" />
                  </span>
                )}
              </div>
            </div>
            {fatherNameErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {fatherNameErr}
              </div>
            )}

            {/* <Textinput
              name="fatherName"
              type="text"
              placeholder="Enter Father's Name Here.."
              register={register}
              error={errors.fatherName}

            /> */}
          </div>

          <div className={`fromGroup   ${motherNameErr !== "" ? "has-error" : ""} `}>
            <label htmlFor="motherName" className="mb-1">
              Mother Name
            </label>
            <div className=" flex-1">
              <input
                type="text"
                name="motherName"
                placeholder="Enter Mother's Name Here.."
                className="form-control py-2"
                onChange={handleInputChange}
                onKeyUp={handleValidation}
                value={
                  currentUser.motherName ? currentUser.motherName : ""
                }
              />
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2   -translate-y-1/2   space-x-1 rtl:space-x-reverse">
                {motherNameErr !== "" && (
                  <span className="text-danger-500">
                    <Icon icon="heroicons-outline:information-circle" />
                  </span>
                )}
              </div>
            </div>
            {motherNameErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {motherNameErr}
              </div>
            )}
            {/* <Textinput
              name="motherName"
              type="text"
              placeholder="Enter Mother's Name Here.."
              register={register}
              error={errors.motherName}
            // defaultValue={}

            /> */}
          </div>

          <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
            <label htmlFor="maritalStatus" className={`${genderErr !== "" ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
              Gender :
            </label>
            {/* {genderErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {genderErr}
              </div>
            )} */}
            {gender.map((gender, index) => (
              <Radio key={index}
                label={gender.label}
                name="gender"
                value={gender.value}
                checked={selectgender === gender.value}
                onChange={(e) => {
                  handleGender(e);
                  handleInputChange(e);
                }}
                activeClass={gender.activeClass}
              />
            ))}




          </div>

          <div className={`fromGroup   ${dobErr !== "" ? "has-error" : ""} `}>
            <label className="" htmlFor="hf-picker">
              Date Of Birth
            </label>
            <Flatpickr
              // value="1998-01-12"
              value={dob ? dob : ""}
              id="hf-picker"
              className="form-control py-2 "
              onChange={(date) => {
                setCurrentUser({ ...currentUser, ["dateOfBirth"]: formatDateToISO(date[0]) })
                setDobErr("")
              }}
              onOpen={() => {

                if (!currentUser.dateOfBirth) {
                  setDobErr("This Field Is Required.")   

                }
              }}
              options={{
                altInput: true,
                altFormat: "F j, Y",
                dateFormat: "Y-m-d",
              }}
            />
            <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2   -translate-y-1/2   space-x-1 rtl:space-x-reverse">
              {dobErr !== "" && (
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              )}
            </div>
            {dobErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {dobErr}
              </div>
            )}
          </div>

          <div className="flex flex-wrap space-xy-5">
            <label htmlFor="maritalStatus" className={`${genderErr !== "" ? "radioErrStyle" : ""}`}>
              Marital Status :
            </label>
            {maritalStatus.map((color, index) => (
              <Radio key={index}
                label={color.label}
                name="maritalStatus"
                value={color.value}
                checked={selectMaritalStatus === color.value}
                onChange={(e) => {
                  handleInputChange(e);
                  handleMaritalStatus(e);
                }}
                activeClass={color.activeClass}
              />
            ))}
          </div>

          <div className={`fromGroup   ${optionalEmailErr !== "" ? "has-error" : ""} `}>
            <label htmlFor="optionalEmail" className="mb-1">
              Optional Email
            </label>
            <div className=" flex-1">
              <input
                type="text"
                name="optionalEmail"
                placeholder="Enter Optional Email Here.."
                className="form-control py-2"
                onChange={handleInputChange}
                onKeyUp={handleValidation}
                value={
                  currentUser.optionalEmail ? currentUser.optionalEmail : ""
                }
              />
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2  -translate-y-1/2    space-x-1 rtl:space-x-reverse">
                {optionalEmailErr !== "" && (
                  <span className="text-danger-500">
                    <Icon icon="heroicons-outline:information-circle" />
                  </span>
                )}
              </div>
            </div>
            {optionalEmailErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {optionalEmailErr}
              </div>
            )}
            {/* <Textinput
              name="optionalEmail"
              type="text"
              placeholder="Enter Optional Email Here.."
              register={register}
              error={errors.optionalEmail}

            /> */}
          </div>

          <div className={`fromGroup   ${emergencyPhoneErr !== "" ? "has-error" : ""} `}>
            <label htmlFor="emergencyPhone" className="mb-1">
              Emergency Phone
            </label>
            <div className=" flex-1">
              <input
                type="text"
                name="emergencyPhone"
                placeholder="Enter Emergency Phone Here.."
                className="form-control py-2"
                onChange={handleInputChange}
                value={
                  currentUser.emergencyPhone ? currentUser.emergencyPhone : ""
                }
              />
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2   -translate-y-1/2   space-x-1 rtl:space-x-reverse">
                {emergencyPhoneErr !== "" && (
                  <span className="text-danger-500">
                    <Icon icon="heroicons-outline:information-circle" />
                  </span>
                )}
              </div>
            </div>
            {emergencyPhoneErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {emergencyPhoneErr}
              </div>
            )}
            {/* <Textinput
              name="emergencyPhone"
              type="text"
              placeholder="Enter Emergency Phone Here.."
              register={register}
              error={errors.emergencyPhone}

            /> */}
          </div>

          <div className={`fromGroup   ${stateErr !== "" ? "has-error" : ""} `}>
            <label htmlFor="state" className="mb-1">
              State
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              name="state"
              // value={currentUser.state}
              value={selectedState ? selectedState : ""}
              options={stateArray}
              styles={styles}
              id="state"
              onChange={handleStateChange}
            />
            {stateErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {stateErr}
              </div>
            )}
          </div>

          <div className={`fromGroup   ${cityErr !== "" ? "has-error" : ""} `}>
            <label htmlFor="city" className="mb-1">
              City
            </label>
            <Select
              className="react-select"
              classNamePrefix="select"
              value={selectedCity ? selectedCity : ""}
              options={cityList}
              styles={styles}
              id="city"
              onChange={handleCityChange}
            />
            {cityErr !== "" && (
              <div
                className={` mt-2 text-danger-500 block text-sm `}
              >
                {cityErr}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 col-span-1">
            <div className="ltr:text-right rtl:text-left">
              <button className="btn btn-dark text-center" onClick={handleSubmitData} >
                {`${profileExists ? "Update" : "Submit"}`}
              </button>
            </div>
          </div>
        </form>


      </Card>
      {/* <ViewProfile /> */}
    </>


  );
};

export default profile;
