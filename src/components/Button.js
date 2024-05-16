import React from "react";
import Session from "../backend/Session";

const Button = ({ name, href, mainColor, borderColor, textColor }) => {
	return (
		<div
               onClick={(e) => {
                    Session.redirectTo(e, href)
               }}
			className={`cursor-pointer bg-${mainColor} border-${borderColor} text-${textColor} border-2 flex justify-center items-center rounded-md w-full h-12 hover:border-${borderColor} hover:bg-${borderColor} hover:scale-110 transition-all ease-in-out`}>
			{name}
		</div>
	);
};

export default Button;
