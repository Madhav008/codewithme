import React, { useEffect } from "react";
import Room from "../Room/Room";
import JoinModal from "../Modal/JoinModal";
import CompaniesComponent from "../Companies/CompaniesComponent";
import TopicsTag from "../Topics/TopicsTag";
import { useDispatch, useSelector } from "react-redux";
import { fetchrooms } from "../../store/roomSlice";

const QuestionPageRightSide = () => {

  return (
    <>
      <div className="flex justify-between w-[100%] m-auto max-w-[440px]">
        <h2>Public Rooms</h2>
        <JoinModal />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 overflow-x-hidden overflow-y-auto max-h-[220px]">
        <Room />
      </div>
      <div className="h-[20px] m-0 divider"></div>
      <div className="h-64 ">
        <div className="flex justify-between w-[100%] m-auto max-w-[440px]">
          <h2>Companies</h2>
        </div>
        <CompaniesComponent />
      </div>

      <div className="h-[20px] m-0 divider"></div>
      <div className="h-[420px] ">
        <div className="flex justify-between w-[100%] m-auto max-w-[440px]">
          <h2>Topics</h2>
        </div>
        <TopicsTag />
      </div>
    </>
  );
};

export default QuestionPageRightSide;
