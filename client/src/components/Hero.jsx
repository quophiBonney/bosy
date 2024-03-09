import React from "react";
import { Typewriter, Cursor } from "react-simple-typewriter";
import TodosCard from "./TodoCard";
const Hero = () => {
  const todo = Typewriter({
    words: ["Save", "Edit", "Delete"],
    deleteSpeed: 100,
    typeSpeed: 100,
    loop: true,
    cursorBlinking: 0,
  });
  return (
    <div className="container-fluid" style={{ zIndex: "9999" }}>
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-12 mt-5 mb-5 text-light text-center">
          <h1 className="h-1 text-light mt-5 text-uppercase">
            <span className="text-light-green">
              {todo}
              <Cursor />
            </span>
            &nbsp; Your Todos
          </h1>
          <h2 className="p">
            With <strong>BOSY</strong> you easily add, edit and delete your
            todo. You can as well print your individual todos.
          </h2>
        </div>
        <TodosCard />
      </div>
    </div>
  );
};

export default Hero;
