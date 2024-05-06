import React from "react";

const Button = ({ name, href, mainColor, borderColor, textColor }) => {
	return (
		<div
               onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = href;
               }}
			className={`bg-${mainColor} border-${borderColor} text-${textColor} border-2 flex justify-center items-center rounded-md w-64 h-12 hover:bg-${borderColor} hover:bg-${borderColor} hover:scale-110 transition-all ease-in-out`}>
			{name}
		</div>
	);
};

export default Button;
