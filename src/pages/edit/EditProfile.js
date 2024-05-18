import React, { useEffect, useState } from 'react'
import Session from '../../middleware/Session';

import { faUpload, faPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecipeSelector from '../../components/RecipeSelector';
import EditShowcaseCard from '../../components/EditShowcaseCard';
import LoadingPage from '../../components/Loading';

const EditProfile = () => {

  if (!Session.isLoggedIn()) {
    Session.redirectTo(null, "/");
  }

  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("description")
  const [showcase, setShowcase] = useState([]);
  const [isSelectingShowcase, setIsSelectingShowcase] = useState(false)
  const [selectionIndex, setSelectionIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Session.getProfile(Session.getSessionData().name);

        setFile(response.img);
        setDescription(response.bio)
        setShowcase(response.showcase.map((recipe) => recipe == "null" ? null : recipe));


        console.log(response)

        setProfile(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleSelectionChange = (recipe) => {
    if (isSelectingShowcase) {
      showcase[selectionIndex] = recipe;
      setIsSelectingShowcase(false)
      setSelectionIndex(-1)
    } else {
      alert("Not Selecting")
    }
  }

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const convertToDoubleArray = (array, rowSize) => {
    const doubleArray = [];
    let tempArray = [];
    for (let i = 0; i < array.length; i++) {
      tempArray.push(array[i]);
      if (tempArray.length === rowSize || i === array.length - 1) {
        doubleArray.push(tempArray);
        tempArray = [];
      }
    }
    return doubleArray;
  };

  const handleSumbit = (e) => {
    const newProfile = profile;
    newProfile["bio"] = description;
    newProfile["img"] = file;
    newProfile["showcase"] = showcase.map((recipe) => recipe == null ? "null" : recipe);
    Session.updateProfile(newProfile);
    Session.redirectTo(e, `/profile?name=${profile.name}`)
  }

  return (
    <div className='mx-24'>
      {profile !== null ?
        <div className='grid grid-cols-4 gap-4'>
          <div className='pr-4 border-r-2 mt-6'>
            <label htmlFor="RecipeImage" className="h-min">
              <div className="mb-5 cursor-pointer mt-6 pr-2">
                {file ? (
                  <div
                    className="rounded-lg bg-no-repeat bg-center bg-cover aspect-square"
                    style={{
                      backgroundImage: `url(${file})`,
                    }}>
                    <div className="bg-neutral-900 bg-opacity-0 opacity-0 hover:bg-opacity-80 hover:opacity-100 transition-all ease-in-out rounded-full aspect-square flex justify-center items-center flex-col">
                      <h1 className="text-xl text-white">Upload Image</h1>
                      <FontAwesomeIcon className="text-5xl text-white" icon={faUpload} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-neutral-900 text-white rounded-full aspect-square flex justify-center items-center flex-col">
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
            <h1 className='text-xl font-semibold text-center'>{profile.name}</h1>
          </div>
          <div className='w-full h-min col-span-3 mb-4'>
            <div className='my-4'>
              <h1 className='text-center text-2xl mb-2'>Showcase</h1>
              <div className={`grid grid-cols-3 gap-4`}>
                {showcase.map((recipe, index) => (
                  <div key={index}>
                    {recipe == null ?
                      <EditShowcaseCard setSelectionIndex={setSelectionIndex} selectionIndex={selectionIndex} isSelecting={isSelectingShowcase} setIsSelecting={setIsSelectingShowcase} key={index} isEmpty={true} setShowcase={setShowcase} index={index} showcase={showcase} />
                      :
                      <EditShowcaseCard setSelectionIndex={setSelectionIndex} selectionIndex={selectionIndex} isSelecting={isSelectingShowcase} setIsSelecting={setIsSelectingShowcase} key={index} showcase={showcase} setShowcase={setShowcase} index={index} recipe={recipe} />
                    }
                  </div>
                ))}
              </div>
              {isSelectingShowcase &&
                <div className='mt-4 p-4 border-2 rounded-lg'>
                  <h1 className='text-center mb-4'>Your Recipes</h1>
                  {convertToDoubleArray(profile.allRecipes.map((recipe, index) => Session.getRecipeFromID(recipe)).filter(recipe => {
                    return showcase != null && !showcase.some(showcasedRecipe => showcasedRecipe != null && showcasedRecipe.id === recipe.id);
                  }), 3).map((recipes, index) => (
                    <div className={`grid grid-cols-${recipes.length} gap-4 mb-4`}>
                      {recipes.map((recipe, index) => (
                        <RecipeSelector key={index} recipe={recipe} selectRecipe={handleSelectionChange} />
                      ))}
                    </div>

                  ))}
                </div>}
            </div>
            <div className='h-min relative'>
              <h1 className='text-center text-2xl mb-2'>Bio</h1>
              <textarea
                type="text"
                name="bio"
                value={description}
                maxLength={200}
                onChange={(event) => handleInputChange(event, setDescription)}
                className="resize-none text-center w-full pb-20 border-2 border-black rounded-lg"
                placeholder="Recipe Description"
              />
              <p className='absolute bottom-4 right-4'>{description && description.length} / 200</p>
            </div>
            <button
              type="button"
              onClick={handleSumbit}
              className="text-white mt-1 w-full py-6 rounded bg-[#050708] hover:bg-[#050708]/90">
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              Update
            </button>
          </div>

        </div>
        :
        <LoadingPage />
      }
    </div>
  )
}

export default EditProfile