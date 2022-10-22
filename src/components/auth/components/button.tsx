import React from "react";

interface propType {
    buttonText: string
}

const Button: React.FC<propType> = ({buttonText}) => {
    return (
        <button 
            className="text-black bg-orange font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br">
                {buttonText}
        </button>
    );
}

export default Button;