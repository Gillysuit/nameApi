import React, { useState } from "react";

const App = () => {
  const [fullName, setFullName] = useState("");

  const handleClick = async () => {
    const response = await fetch("http://localhost:3000/firstName");
    const json = await response.json();
    let firstNameID = json[0];
    let firstName = json[1];

    const midName = await fetch("http://localhost:3000/middleName", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: firstNameID
      })
    });

    const secResponse = await midName.json();

    const lastName = await fetch("http://localhost:3000/lastName", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        middleName: secResponse
      })
    });

    const lastResponse = await lastName.json();
    await setFullName(`${firstName} ${secResponse} ${lastResponse}`);
  };

  return (
    <div>
      <h1>{`Let me name your baby!`}</h1>
      <button className={"fetchButton"} onClick={() => handleClick()}>
        Get Name
      </button>
      <h3 className={"fullName"}>{fullName}</h3>
    </div>
  );
};

export default App;
