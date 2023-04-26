import { createContext, useContext } from "react";

import React from 'react'

export default function DarkModeProvider(props) {
    const DarkMode = createContext()
    return (
        <DarkMode.Provider value={ do}> { props.children }</DarkMode.Provider >
    )
}
