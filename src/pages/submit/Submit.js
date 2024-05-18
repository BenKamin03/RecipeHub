import React, { useState } from "react";

import { faPlus, faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Session from "../../middleware/Session";

const Submit = () => {

	if (!Session.isLoggedIn()) {
		Session.redirectTo(null, "/");
	}


	const [file, setFile] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState([""]);
	const [instruction, setInstructions] = useState("");
	const [tags, setTags] = useState([]);
	const [tagsText, setTagsText] = useState("")
	const [servings, setServings] = useState(0);
	const [time, setTime] = useState();

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
		} else {
			setFile(null);
		}
	};

	const handleInputChange = (event, setter) => {
		setter(event.target.value);
	};

	const handleAddInput = () => {
		setIngredients([...ingredients, ""]); // Add an empty ingredient
	};

	const handleRemoveInput = (index) => {
		if (ingredients.length > 1) {
			const newIngredients = [...ingredients];
			newIngredients.splice(index, 1); // Remove ingredient at index
			setIngredients(newIngredients);
		}
	};

	const handleIngredientChange = (index, event) => {
		const newIngredients = [...ingredients];
		newIngredients[index] = event.target.value;
		setIngredients(newIngredients);
	};

	const handleTagsChange = (e) => {
		const currText = e.target.value;
		let newText = "";
		const localTags = currText.split(" ");
		for (let i of localTags) {
			if (i[0] != "#")
				i = `#${i}`;
			newText += i;
		}
		newText = newText.substring(0, newText.length);
		newText = newText.length > 1 ? newText : ""
		setTagsText(newText);
		setTags(newText.split("#").splice(1));
	}

	const handleSumbit = (e) => {
		if (title === "") {
			alert("Title is Empty")
		} else if (description === "") {
			alert("Description is Empty")
		} else if (servings == 0) {
			alert("Servings Can't Be 0")
		} else if (time == 0) {
			alert("Time Can't Be 0")
		} else if (ingredients.length === 1 && ingredients[0] === "") {
			alert("Ingredients are Empty")
		} else if (instruction === "") {
			alert("Instructions are Empty")
		} else if (file === null) {
			alert("No File Submitted")
		} else {
			Session.submitRecipe(e, { cookTime: time, servings: servings, file: file, tags: tags, description: description, title: title, ingredients: ingredients, instruction: instruction })
		}
	}

	return (
		<div className="mx-24 py-12">
			<h1 className="text-center font-semibold text-3xl mb-4">Submit a Recipe</h1>
			<form className="flex justify-center items-center text-center flex-col gap-2">
				<input
					type="text"
					name="RecipeName"
					value={title}
					onChange={(event) => handleInputChange(event, setTitle)}
					className="text-center w-2/3 py-2 border-2 border-black rounded-lg"
					placeholder="Recipe Title"
				/>
				<textarea
					type="text"
					name="RecipeDescription"
					value={description}
					onChange={(event) => handleInputChange(event, setDescription)}
					className="resize-none text-center w-2/3 pb-16 border-2 border-black rounded-lg"
					placeholder="Recipe Description"
				/>
				<input
					type="text"
					name="RecipeTags"
					value={tagsText}
					onChange={(event) => handleTagsChange(event)}
					className="text-center w-2/3 py-2 border-2 border-black rounded-lg"
					placeholder="#RecipeTags"
				/>
				<div className="flex flex-row w-2/3 gap-2">
					<input
						type="number"
						name="Servings"
						min={0}
						value={servings != 0 ? servings : ""}
						onChange={(event) => setServings(event.target.value)}
						className="text-center w-1/2 py-2 border-2 border-black rounded-lg"
						placeholder="Servings"
					/>
					<input
						type="number"
						name="Time"
						value={time}
						onChange={(event) => setTime(event.target.value)}
						className="text-center w-1/2 py-2 border-2 border-black rounded-lg"
						placeholder="Time to Cook (Minutes)"
					/>
				</div>
				<div className="grid grid-cols-2 gap-0 w-2/3 pt-1">
					<label htmlFor="RecipeImage" className="pr-2 border-r-2">
						<div className="mb-5 cursor-pointer">
							{file ? (
								<div
									className="rounded-lg bg-no-repeat bg-center bg-cover aspect-square"
									style={{
										backgroundImage: `url(${URL.createObjectURL(file)})`,
									}}>
									<div className="bg-neutral-900 bg-opacity-0 opacity-0 hover:bg-opacity-80 hover:opacity-100 transition-all ease-in-out rounded-lg aspect-square flex justify-center items-center flex-col">
										<h1 className="text-xl text-white">Upload Image</h1>
										<FontAwesomeIcon className="text-5xl text-white" icon={faUpload} />
									</div>
								</div>
							) : (
								<div className="bg-neutral-900 text-white rounded-lg aspect-square flex justify-center items-center flex-col">
									<h1 className="text-xl">Upload Image</h1>
									<FontAwesomeIcon className="text-5xl" icon={faUpload} />
								</div>
							)}
						</div>
						<div className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
							<span className="text-center ml-2">Upload</span>
						</div>
						<input id="RecipeImage" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
					</label>

					<div className="inline-block text-center pl-2 w-full justify-end">
						<div className="overflow-auto aspect-square mb-4">
							{ingredients.map((ingredient, index) => (
								<div key={index} className="mb-2 w-full flex items-center">
									<input
										type="text"
										value={ingredient}
										onChange={(event) => handleIngredientChange(index, event)}
										className="flex-1 border rounded py-2 px-3 focus:outline-none focus:border-blue-400"
										placeholder={`Ingredient #${index + 1}`}
									/>
									{ingredients.length > 1 && (
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
					value={instruction}
					onChange={(event) => handleInputChange(event, setInstructions)}
					className="resize-none text-center w-2/3 pb-48 border-2 border-black rounded-lg"
					placeholder="Recipe Instructions"
				/>
				<button
					type="button"
					onClick={handleSumbit}
					className="text-white mt-1 w-2/3 py-6 rounded bg-[#050708] hover:bg-[#050708]/90">
					<FontAwesomeIcon icon={faPlus} className="mr-2" />
					Submit
				</button>
			</form>
		</div>
	);
};

export default Submit;
