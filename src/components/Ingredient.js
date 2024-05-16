import React, { useState } from 'react'

const Ingredient = ({ingredient}) => {

    const [isChecked, setIsChecked] = useState(false)

    return (
        <button onClick={(e) => setIsChecked(!isChecked)} className={`block p-2 border-2 m-2 gap-2 rounded-lg transition-all ease-in-out ${isChecked ? "bg-black border-black text-white" : ""}`}>
            {ingredient}
        </button>
    )
}

export default Ingredient