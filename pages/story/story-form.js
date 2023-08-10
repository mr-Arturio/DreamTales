import React, { useState } from "react";
import DropdownMenu from "@/src/components/dropdown/dropdown-menu";
import RangeSlider from "@/src/components/range-slider/range-slider";
import Checkbox from "@/src/components/checkbox/checkbox";

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
    <div onSubmit={onSubmit}>
      <h2>Main Character</h2>

      <div className="relative my-6">
        <input
          id="childName"
          type="text"
          name="name"
          placeholder="Enter Name"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />
        <label
          htmlFor="childName"
          className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Child's Name
        </label>
      </div>
      <br />
      <br />
      <DropdownMenu
        id="gender"
        buttonLabel={"Child's Gender"}
        navigationItems={pickGender}
        setFunction={setGender}
      />
      <br />
    
      <br />
      <br />
      <br />
      <br />

      <RangeSlider
        label="Age"
        sliderValue={age}
        min={1}
        max={10}
        step={1}
        setSliderValue={setAge}
      />
      <br />

      <br />
      <DropdownMenu
        id="storyStyle"
        buttonLabel={"Pick the Story Style"}
        navigationItems={pickStyle}
        setFunction={setStoryStyle}
      />
      <br />
      <br />
      <DropdownMenu
        id="storyTopic"
        buttonLabel={"Pick Educational Topic"}
        navigationItems={pickTopic}
        setFunction={setStoryTopic}
      />
      <br />
      <br />
      <DropdownMenu
        id="language"
        buttonLabel={"Language"}
        navigationItems={pickLanguage}
        setFunction={setLanguage}
      />
      <br />
      <br />
      <br />

      <button
        className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded shadow-md focus-visible:outline-none justify-self-center whitespace-nowrap bg-emerald-50 text-emerald-500 shadow-emerald-100 hover:bg-emerald-100 hover:text-emerald-600 hover:shadow-md hover:shadow-emerald-100 focus:bg-emerald-200 focus:text-emerald-700 focus:shadow-md focus:shadow-emerald-100 disabled:cursor-not-allowed disabled:border-emerald-100 disabled:bg-emerald-100 disabled:shadow-none"
        onClick={handleButtonClick}
      >
        <span>Add Secondary Hero</span>
      </button>
      <br />
      <br />
      {isDropdownOpen && (
        <div>
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
              class="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <label
              for="id-01"
              class="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Name
            </label>
          </div>
        </div>
      )}

      <br />
      <br />
      <br />

      <br />
      <br />

      <RangeSlider
        label="Time"
        sliderValue={time}
        min={1}
        max={10}
        step={1}
        setSliderValue={setTime}
      />
      <br />
<Checkbox />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <input type="submit" value="Generate Story" /> */}
      {/* <!-- Component: Large primary basic button --> */}
      <button
        type="button"
        onClick={onSubmit}
        className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
      >
        <span>Generate the Story</span>
      </button>
      {/* <!-- End Large primary basic button --> */}
    </div>
  );
};

export default StoryForm;
