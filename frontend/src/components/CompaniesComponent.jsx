import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { STATUSES } from "../store/companiesSlice";

const CompaniesComponent = () => {
  const { data: company, status } = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className="p-2 mt-5 grid grid-cols-4 gap-4 overflow-x-hidden overflow-y-auto max-h-[70%] ">
      {company[0]
        ? company[0].Companies.map((company, index) => (
            <div
              key={index}
              className=" text-sm hover:bg-slate-500 rounded-lg px-2 py-1 font-semibold  w-auto"
            >
              {company}
            </div>
          ))
        : null
      }
    </div>
  );
};

export default CompaniesComponent;
