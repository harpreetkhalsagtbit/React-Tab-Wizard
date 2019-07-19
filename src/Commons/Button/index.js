import React from "react";
import './index.css'

const Button = ({className, ...props}) => {
    return <button className={className} type="button" {...props}>{props.children}</button>
}
export default Button;
