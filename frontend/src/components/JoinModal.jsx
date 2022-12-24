import React, { useState } from 'react'
import Multiselect from './Multiselect'
const JoinModal = () => {
    const [min, setmin] = useState(0)
    function setValue() {

        if (min < 105) {
            setmin(min + 15);
        }
    }

    function decValue() {
        if (min > 15) {
            setmin(min - 15);
        }
    }


    return (
        <div className='mr-2 '>{/* The button to open modal */}
            <label htmlFor="my-modal-6" className="btn btn-sm ">Create Room</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create The Room</h3>
                    <div className="form-control w-full">
                        <p>Select The Companies</p>
                        <Multiselect />
                    </div>
                    <div >
                        <p>Select the Topics</p>
                        <Multiselect />
                    </div>
                    <div >
                        <p>Select the Difficulty</p>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Easy</span>
                                <input type="checkbox"  className="checkbox checkbox-info" />
                            </label>
                            <label className="cursor-pointer label">
                                <span className="label-text">Medium</span>
                                <input type="checkbox"  className="checkbox checkbox-info" />
                            </label><label className="cursor-pointer label">
                                <span className="label-text">Hard</span>
                                <input type="checkbox"  className="checkbox checkbox-info" />
                            </label>
                        </div>
                    </div>


                    <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-2 ">
                        <p>Select the time</p>
                        <div className="flex gap-1">
                            <span className="countdown font-mono text-2xl">
                                <span style={{ "--value": (min < 0) ? 0 : (min > 99) ? 99 : min }}></span>
                            </span>
                            min
                        </div>

                    </div>

                    <div >

                        <div className='flex w-full m-auto'>
                            <button onClick={decValue} className="ml-2 text-xl font-bold btn-lg bg-slate-800 rounded-lg">
                                -
                            </button>
                            <button onClick={setValue} className="ml-1 text-xl font-bold btn-lg bg-slate-800 rounded-lg">
                                +
                            </button>

                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn">Create!</label>
                    </div>
                </div>
            </div></div>
    )
}

export default JoinModal