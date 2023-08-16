import React, { useState } from "react";
import DropdownMenu from "@/src/components/dropdown/dropdown-menu";
import RangeSlider from "@/src/components/range-slider/range-slider";
import Checkbox from "@/src/components/checkbox/checkbox";
import InputElement from "@/src/components/input-element/input";

const StoryForm = ({
  childName,
  setChildName,
  age,
  setAge,
  gender,
  setGender,
  loading,
  storyStyle,
  setStoryStyle,
  storyTopic,
  setStoryTopic,
  language,
  setLanguage,
  onSubmit,
  time,
  setTime,
  setSecondaryHero,
  secondaryHero,
  secondaryHeroName,
  setSecondaryHeroName,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown state
  };

  let pickGender = [
    {
      linkName: "Girl",
    },
    {
      linkName: "Boy",
    },
    {
      linkName: "Other",
    },
  ];

  let pickSecondaryHero = [
    {
      linkName: "Parent",
    },
    {
      linkName: "Friend",
    },
    {
      linkName: "Sibling",
    },
    {
      linkName: "Pet",
    },
    {
      linkName: "Toy",
    },
  ];
  let pickStyle = [
    {
      linkName: "Fairy Tales",
    },
    {
      linkName: "Adventure Stories",
    },
    {
      linkName: "Christmas Stories",
    },
    {
      linkName: "Prince and Princess",
    },
    {
      linkName: "Humorus Stories",
    },
    {
      linkName: "Super Hero Stories",
    },
  ];

  let pickTopic = [
    {
      linkName: "Friendship and Kindness",
    },
    {
      linkName: "Family Values",
    },
    {
      linkName: "Safety and Stranger Awarness",
    },
    {
      linkName: "Sharing and Cooperation",
    },
  ];

  let pickLanguage = [
    {
      linkName: "English",
    },
    {
      linkName: "French",
    },
    {
      linkName: "Spanish",
    },
  ];

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between ml-72 mr-72"
      >
        <div className="w-full lg:w-1/4 flex justify-center relative ">
          <input
            id="childName"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="peer relative h-10 w-full mb-10 mt-10 rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <label
            htmlFor="childName"
            className="absolute left-2 -top-2 z-[1] mb-10 mt-10 cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Your name
          </label>
        </div>

        <div className="w-full lg:w-1/4 flex justify-center">
          <DropdownMenu
            id="storyStyle"
            buttonLabel={"Pick the Story Style"}
            navigationItems={pickStyle}
            setFunction={setStoryStyle}
          />
        </div>

        <div className="w-full lg:w-1/4 flex justify-center">
          <DropdownMenu
            id="storyTopic"
            buttonLabel={"Pick Educational Topic"}
            navigationItems={pickTopic}
            setFunction={setStoryTopic}
          />
        </div>

        <div className="w-full lg:w-1/4 relative flex justify-center">
          <button
            className="inline-flex items-center justify-center mb-10 mt-10 h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded shadow-md focus-visible:outline-none justify-self-center whitespace-nowrap bg-emerald-50 text-emerald-500 shadow-emerald-100 hover:bg-emerald-100 hover:text-emerald-600 hover:shadow-md hover:shadow-emerald-100 focus:bg-emerald-200 focus:text-emerald-700 focus:shadow-md focus:shadow-emerald-100 disabled:cursor-not-allowed disabled:border-emerald-100 disabled:bg-emerald-100 disabled:shadow-none"
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              handleButtonClick();
            }}
          >
            <span>Add Secondary Hero</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-[3rem] left-0 mb-5 mt-5 w-full flex flex-col items-center">
              <DropdownMenu
                id="secondaryHero"
                buttonLabel={"Pick One"}
                navigationItems={pickSecondaryHero}
                setFunction={setSecondaryHero}
              />

              <div className="relative my-6">
                <input
                  id="secondaryHeroName"
                  type="text"
                  name="secondaryHeroName"
                  value={secondaryHeroName}
                  onChange={(e) => setSecondaryHeroName(e.target.value)}
                  className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="secondaryHeroName"
                  className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Name
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/4 flex justify-center">
          <DropdownMenu
            id="gender"
            buttonLabel={"Child's Gender"}
            navigationItems={pickGender}
            setFunction={setGender}
          />
        </div>
        <div className="w-full lg:w-1/4 flex justify-center mt-10">
          <RangeSlider
            label="Age"
            sliderValue={age}
            min={1}
            max={10}
            step={1}
            setSliderValue={setAge}
          />
        </div>

        <div className="w-full lg:w-1/4 flex justify-center mt-10">
          <RangeSlider
            label="Minutes"
            sliderValue={time}
            min={2}
            max={10}
            step={1}
            setSliderValue={setTime}
          />
        </div>

        <div className="w-full lg:w-1/4 flex justify-center"></div>

        <div className="w-full lg:w-1/4 flex justify-center">
          <DropdownMenu
            id="language"
            buttonLabel={"Language"}
            navigationItems={pickLanguage}
            setFunction={setLanguage}
          />
        </div>

        <div className="w-full lg:w-1/4 flex items-center justify-center">
          <Checkbox />
        </div>
      </form>

      <div>
        <button
          onClick={onSubmit}
          className="inline-flex items-center justify-center mb-10 mt-14 h-14 gap-2 px-8 text-lg font-medium tracking-wide text-emerald-600 transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-orange hover:bg-blue2  disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
        >
          <span>Generate the Story</span>
        </button>
      </div>
    </>
  );
};

export default StoryForm;
