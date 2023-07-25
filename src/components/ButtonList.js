import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "Cooking",
  "News",
  "Valentine",
  "Motivation",
  "Music",
"movies"

];

const ButtonList = () => {
  return (
    <div className="flex px-2">
      {list.map((btn,index) => {
     
        return <Button name={btn}  key={index}/>;
      })}
    </div>
  );
};

export default ButtonList;
