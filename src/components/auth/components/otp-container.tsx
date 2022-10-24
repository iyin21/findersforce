import React from "react";

const OtpContainer = () => {
    const value = [1,2,3,4,5,6];

    const inputContainer =  value.map(num => {
        return (
            <input 
                type="text"
                key={num}
                placeholder={num.toString()}
                className="w-full p-6 rounded-lg text-black border h-16"
            />
        );
    });

    return (
        <div className="grid grid-cols-6 w-full mb-[50px] gap-x-4">
            {inputContainer}
        </div>
    );
}

export default OtpContainer;