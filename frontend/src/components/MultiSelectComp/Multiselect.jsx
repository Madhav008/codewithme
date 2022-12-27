import React, { useState } from 'react';
import Dropdown from '../Dropdown';


const Multiselect = ({items,select,value}) => {
    // state showing if dropdown is open or closed
    const [dropdown, setDropdown] = useState(false);
    // managing dropdown items (list of dropdown items)
    // const [items, setItems] = useState([...values]);
    // contains selected items


    const toogleDropdown = () => {
        setDropdown(!dropdown)
    };
    // adds new item to multiselect 
    const addTag = (item) => {

        select(item);
        setDropdown(false);
    };

    
    // console.log(items)
    return (
        <div className="autcomplete-wrapper my-2 bg-transparent" onClick={toogleDropdown}>
            <div className="autcomplete">
                <div className="w-full flex flex-col items-center mx-auto">
                    <div className="w-full">
                        <div className="flex flex-col items-center relative">
                            <div className="w-auto ">
                                <div className="m-2 flex border border-neutral-content  rounded ">
                                    <div className="flex flex-auto flex-wrap p-3">
                                      <p>{value}</p>
                                    </div>
                                    <div className="text-gray-300 w-8 py-1 pl-2 pr-1  flex items-center border-gray-200" onClick={toogleDropdown}>
                                        <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                                <polyline points="18 15 12 9 6 15"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {dropdown ? <Dropdown list={items} addItem={addTag}></Dropdown> : null}
                    </div>
                </div>

            </div>
        </div>)
};

export default Multiselect;