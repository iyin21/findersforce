import React from "react";

interface propType {
    buttonText: string,
    submit? : boolean | false
}

const Button: React.FC<propType> = ({buttonText, submit}) => {
    return (
        <button 
            className={ !submit ? 
                "text-black bg-orange font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                :
                "text-neutral-900 bg-orange font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br opacity-70"
            } 
             
            disabled={submit}>
                {buttonText}
        </button>
    );
}

export default Button;