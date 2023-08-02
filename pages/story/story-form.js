import React from "react";
import DropdownStory from "@/src/components/dropdown/dropdown-story-style";

const StoryForm = ({
  childName,
  setChildName,
  age,
  setAge,
  gender,
  setGender,
  parent1Name,
  setParent1Name,
  parent2Name,
  setParent2Name,
  friendName,
  setFriendName,
  favoriteToy,
  setFavoriteToy,
  location,
  setLocation,
  onSubmit,
  loading,
}) => {
  return (
    <form onSubmit={onSubmit}>
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

      <label htmlFor="age">Child's Age:</label>
      <select
        id="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      >
        <option value="" disabled>
          Select Age
        </option>
        <option value="1-2">1-2</option>
        <option value="3-5">3-5</option>
        <option value="6-8">6-8</option>
        <option value="9-12">9-12</option>
      </select>
      <br />

      <label htmlFor="gender">Child's Gender:</label>
      <select
        id="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="" disabled>
          Select Gender
        </option>
        <option value="boy">Boy</option>
        <option value="girl">Girl</option>
        <option value="other">Other</option>
      </select>
      <br />

      {/* need to setDropdown */}
      <DropdownStory />
      <br />
{/* 
      <label htmlFor="parent1Name">First Parent's Name:</label>
      <input
        type="text"
        id="parent1Name"
        value={parent1Name}
        onChange={(e) => setParent1Name(e.target.value)}
        required
      />
      <br /> */}

      {/* <!-- Component: Base secondary elevated button --> */}
<button className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded shadow-md focus-visible:outline-none justify-self-center whitespace-nowrap bg-emerald-50 text-emerald-500 shadow-emerald-100 hover:bg-emerald-100 hover:text-emerald-600 hover:shadow-md hover:shadow-emerald-100 focus:bg-emerald-200 focus:text-emerald-700 focus:shadow-md focus:shadow-emerald-100 disabled:cursor-not-allowed disabled:border-emerald-100 disabled:bg-emerald-100 disabled:shadow-none">
  <span>Add Secondary Hero</span>
</button>
{/* End Base secondary elevated button  */}
<br/>

      {/* <label htmlFor="parent2Name">Second Parent's Name:</label>
      <input
        type="text"
        id="parent2Name"
        value={parent2Name}
        onChange={(e) => setParent2Name(e.target.value)}
        required
      />
      <br />

      <label htmlFor="friendName">Friend's Name:</label>
      <input
        type="text"
        id="friendName"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        required
      />
      <br />

      <label htmlFor="favoriteToy">Child's Favorite Toy:</label>
      <input
        type="text"
        id="favoriteToy"
        value={favoriteToy}
        onChange={(e) => setFavoriteToy(e.target.value)}
        required
      />
      <br />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <br /> */}

      {/* <input type="submit" value="Generate Story" /> */}
      {/* <!-- Component: Large primary basic button --> */}
<button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
  <span>Generate the Story</span>
</button>
{/* <!-- End Large primary basic button --> */}
    </form>
  );
};

export default StoryForm;
