import React from 'react';


const Dropdown = ({ list, addItem }) => {


    return (
        <div id="dropdown" className="absolute shadow top-100  z-40 w-[90%] lef-0 rounded max-h-select overflow-auto h-[320px]">
            <div className="flex flex-col w-full">
                {list.map((item, key) => {
                    return <div key={key}
                        className="cursor-pointer w-full rounded-t border-b bg-neutral"
                        onClick={() => addItem(item)}>
                        <div className="flex w-full items-center p-2 pl-2 border-transparent relative bg-neutral" >
                            <div className="w-full items-center flex">
                                <   div className="mx-2 leading-6  ">
                                    {item}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>);

};

export default Dropdown;