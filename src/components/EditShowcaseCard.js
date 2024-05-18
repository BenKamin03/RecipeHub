import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Session from "../middleware/Session";

const EditShowcaseCard = ({ showcase, recipe, setSelectionIndex, selectionIndex, isSelecting, setIsSelecting, index, setShowcase, isEmpty }) => {
    const [visible, setVisible] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    const recipeData = Session.getRecipeFromID(recipe);

    const handleRemove = (e) => {
        console.log(showcase)

        setShowcase(prevState => {
            const newState = [...prevState];
            newState[index] = null;
            return newState;
        });

        if (selectionIndex == index) {
            setIsSelecting(false)
            setSelectionIndex(-1)
        }
        console.log(showcase)
    }

    const changeRecipe = (e) => {
        if (selectionIndex == index) {
            setIsSelecting(!isSelecting)
            setSelectionIndex(-1)
        } else {
            setIsSelecting(true);
            setSelectionIndex(index);
        }
    }

    return (
        <div
            className={`hover:scale-110 hover:z-10 transition rounded-lg ease-in-out border-2 p-2 bg-white ${selectionIndex === index ? "drop-shadow-[0_0px_10px_rgba(255,0,0,1)]" : ""}`}
            onMouseOver={(e) => setVisible(true)}
            onMouseLeave={(e) => setVisible(false)}>

            {!isEmpty ?
                <div>
                    <div>
                        <div className={"h-64 relative w-full bg-gray-500 rounded-md mr-4 bg-no-repeat bg-center bg-cover"}>

                            <img
                                src={recipeData.img}
                                className="h-full w-full rounded-md mr-4 object-center object-cover bg-black"
                                alt={recipeData.name}
                            />
                            <div
                                className={
                                    "h-full absolute top-0 left-0 w-full flex items-center justify-center bg-black rounded-md transition ease-in-out " +
                                    (visible ? "bg-opacity-50 backdrop-blur-lg" : "bg-opacity-0")
                                }>
                                {visible && (
                                    <div className="h-full w-full cursor-pointer"
                                        onClick={changeRecipe}>
                                        <div className="flex flex-col justify-center items-center h-full">
                                            <p className="text-center text-white mx-4 line-clamp-1 font-bold">{recipeData.name}</p>
                                            <p className="text-white line-clamp-5 mx-2 text-center">{recipeData.description}</p>
                                            {recipeData.tags != null && <p className="text-center text-white opacity-50 mx-4 line-clamp-1 font-light text-sm">
                                                {recipeData.tags.map((tag, index) => (
                                                    <label className="mr-2" key={index}>#{tag}</label>
                                                ))}
                                            </p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-center line-clamp-1 mx-4">{recipeData.name}</p>
                    </div>
                    <button
                        onClick={handleRemove}
                        className="w-full mt-4 bg-red-500 text-white rounded-md py-1 hover:bg-red-300 transition-all ease-in-out">
                        <FontAwesomeIcon className="" icon={faTimes} />
                    </button>
                </div> :
                <div
                    className="w-full h-full"
                    onClick={changeRecipe}>
                    <div className={"h-64 relative w-full bg-neutral-900 text-white rounded-md mr-4 bg-no-repeat bg-center bg-cover flex justify-center items-center text-3xl"}>
                        <FontAwesomeIcon className="" icon={faPlus} />
                    </div>
                </div>}
        </div>
    );
};

export default EditShowcaseCard;
