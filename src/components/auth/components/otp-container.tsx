import React from "react";

const OtpContainer = () => {
    return (
        <div className="grid grid-cols-6 w-full mb-[50px] gap-x-4">
            <input 
                type="text"
                placeholder="1"
                className="w-full p-6 rounded-lg text-black border h-16"
            />
            <input 
                type="text"
                placeholder="2"
                className="w-full p-6 rounded-lg text-black border h-16"
            />
            <input 
                type="text"
                placeholder="3"
                className="w-full p-6 rounded-lg text-black border h-16"
            />
            <input 
                type="text"
                placeholder="4"
                className="w-full p-6 rounded-lg text-black border h-16"
            />
            <input 
                type="text"
                placeholder="5"
                className="w-full p-6 rounded-lg text-black border h-16"
            />
            <input 
                type="text"
                placeholder="6"
                className="w-full p-6 rounded-lg text-black border h-16"
            />
        </div>
    );
}

export default OtpContainer;