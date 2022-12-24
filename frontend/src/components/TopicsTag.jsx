import React from "react";
import { useSelector } from "react-redux";
import { STATUSES } from "../store/topicsSlice";

const TopicsTag = () => {
  const { data: topic, status } = useSelector((state) => state.topics);
  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }
  return (
    <div className="p-2 mt-5 grid grid-cols-4 gap-4 overflow-x-hidden overflow-y-auto max-h-[80%] ">
      {topic[0]
        ? topic[0].Topics.map((topic, index) => (
            <div
              key={index}
              className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold  w-auto"
            >
              {topic}
            </div>
          ))
        : null}
    </div>
  );
};

export default TopicsTag;
