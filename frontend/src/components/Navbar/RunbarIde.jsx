import React from 'react'
import Timer from '../Timer/Timer'


const RunbarIde = ({run} ) => {
  
    return (
        <div className="navbar bg-[#020a07]">
            <div className="flex-1">
                <div className="btn btn-ghost normal-case text-xl">Online Ide</div>
            </div>
            <div className="flex-none ">
                <ul className="menu menu-horizontal px-1">

                    <li>
                        <Timer />
                    </li>
                    <li><button onClick={run} className='btn btn-secondary bg-secondary text-gray-200'>Run</button></li>
                    <li className='ml-4'><select className="select bg-base-100 w-[150px] ">
                        <option>Java</option>
                        <option>C++</option>
                    </select>
                    </li>

                  
                    {/* <li tabIndex={0}>
                        <a>
                            Parent
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        </a>
                        <ul className="p-2 bg-base-100">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a>Item 3</a></li> */}
                </ul>
            </div>
        </div>
    )
}

export default RunbarIde