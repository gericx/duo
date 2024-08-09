import React, { MouseEventHandler } from "react"

export const Button = ({
    onButtonClick, children}
    : {
        onButtonClick: MouseEventHandler, 
        children: string | JSX.Element |React.ReactNode 
    }):JSX.Element => {
        
    return <button onClick={onButtonClick}>{children}</button>
}