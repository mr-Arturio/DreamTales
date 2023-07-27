import React from "react";

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
  loading
}) => {
  return (
    <form onSubmit={onSubmit}>
    <label for="childName">Child's Name:</label>
    <input
      id="childName"
      type="text"
      name="name"
      placeholder="Enter Name"
      value={childName}
      onChange={(e) => setChildName(e.target.value)}
    />
    <br />

    <label htmlFor="age">Child's Age:</label>
    <select
      id="age"
      value={age}
      onChange={(e) => setAge(e.target.value)}
      required
    >
      <option value="" disabled>Select Age</option>
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
      <option value="" disabled>Select Gender</option>
      <option value="boy">Boy</option>
      <option value="girl">Girl</option>
      <option value="other">Other</option>
    </select>
    <br />

    <label htmlFor="parent1Name">First Parent's Name:</label>
    <input
      type="text"
      id="parent1Name"
      value={parent1Name}
      onChange={(e) => setParent1Name(e.target.value)}
      required
    />
    <br />

    <label htmlFor="parent2Name">Second Parent's Name:</label>
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
    <br />

    <input type="submit" value="Generate Story" />
  </form>
  );
};

export default StoryForm;