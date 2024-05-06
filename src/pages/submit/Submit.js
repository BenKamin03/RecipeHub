import React, { useState, useRef, useEffect } from "react";

import { faPlus, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Submit = () => {
	const [file, setFile] = useState(null);
	const [isHovering, setIsHovering] = useState(false);

	const handleHover = () => {
		setIsHovering(!isHovering);
	};

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
		} else {
			setFile(null);
		}
	};

	const [inputs, setInputs] = useState([""]); // State to hold input values

	const handleAddInput = () => {
		setInputs([...inputs, ""]); // Add an empty input
	};

	const handleRemoveInput = (index) => {
		if (inputs.length > 1) {
			const newInputs = [...inputs];
			newInputs.splice(index, 1); // Remove input at index
			setInputs(newInputs);
		}
	};

	const handleInputChange = (index, event) => {
		const newInputs = [...inputs];
		newInputs[index] = event.target.value; // Update input value at index
		setInputs(newInputs);
	};

	return (
		<div className="mx-24">
			<h1 className="text-center">Submit a Recipe</h1>
			<form className="flex justify-center items-center text-center flex-col gap-2">
				<input
					type="text"
					name="RecipeName"
					className="text-center w-1/2 py-2 border-2 border-black rounded-lg"
					placeholder="Recipe Title"
				/>
				<textarea
					type="text"
					name="RecipeDescription"
					className="resize-none text-center w-1/2 pb-16 border-2 border-black rounded-lg"
					placeholder="Recipe Description"
				/>
				<div className="grid grid-cols-2 gap-0 w-1/2">
					<label htmlFor="RecipeImage" className="bg-gray-100 mr-2">
						<div className="mb-5">
							{file ? (
								<div
									className="rounded-lg bg-no-repeat bg-center bg-cover aspect-square"
									style={{
										backgroundImage: `url(${URL.createObjectURL(file)})`,
									}}>
									<div className="bg-gray-900 opacity-0 hover:opacity-50 rounded-lg aspect-square flex justify-center items-center flex-col">
										<h1 className="text-xl text-white">Upload Image</h1>
										<FontAwesomeIcon className="text-5xl" icon={faUpload} />
									</div>
								</div>
							) : (
								<div className="bg-gray-500 rounded-lg aspect-square flex justify-center items-center flex-col">
									<h1 className="text-xl">Upload Image</h1>
									<FontAwesomeIcon className="text-5xl" icon={faUpload} />
								</div>
							)}
						</div>
						<label class="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
							<span class="text-center ml-2">Upload</span>
						</label>
						<input id="RecipeImage" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
					</label>

					<div className="inline-block text-center pl-2 w-full justify-end">
						<div className="overflow-auto aspect-square mb-4">
							{inputs.map((input, index) => (
								<div key={index} className="mb-2 w-full flex items-center">
									<input
										type="text"
										value={input}
										onChange={(event) => handleInputChange(index, event)}
										className="flex-1 border rounded py-2 px-3 focus:outline-none focus:border-blue-400"
										placeholder={`Ingredient #${index + 1}`}
									/>
									{inputs.length > 1 && (
										<button
											type="button"
											onClick={() => handleRemoveInput(index)}
											className="ml-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
											style={{ width: "fit-content" }}>
											<FontAwesomeIcon icon={faTimes} />
										</button>
									)}
								</div>
							))}
						</div>
						<button
							type="button"
							onClick={handleAddInput}
							className="bg-green-500 text-white mt-1 w-full py-2 rounded hover:bg-green-600">
							<FontAwesomeIcon icon={faPlus} className="mr-2" />
							Add Ingredient
						</button>
					</div>
				</div>
				<textarea
					type="text"
					name="RecipeInstructions"
					className="resize-none text-center w-1/2 pb-48 border-2 border-black rounded-lg"
					placeholder="Recipe Instructions"
				/>
			</form>
		</div>
	);
};

export default Submit;
