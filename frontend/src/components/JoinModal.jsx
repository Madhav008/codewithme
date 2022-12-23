import React, { useState } from 'react'

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
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Pick the company</span>
                        </label>
                        <select className="select select-bordered">
                            <option>Star Wars</option>
                            <option>Harry Potter</option>
                            <option>Lord of the Rings</option>
                            <option>Planet of the Apes</option>
                            <option>Star Trek</option>
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Pick the topic</span>
                        </label>
                        <select className="select select-bordered">
                            <option value="apple">Apple</option>
                            <option value="banana" selected>Banana</option>
                            <option value="orange" selected>Orange</option>
                            <option value="grape">Grape</option>
                        </select>
                    </div>

                    <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-2 ">
                        <p>Select the time</p>
                        <div className="flex gap-1">
                            <span className="countdown font-mono text-2xl">
                                <span style={{ "--value": (min<0)?0:(min>99)?99:min }}></span>
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