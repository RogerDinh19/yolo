import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";


function Helmet(props)  {
    
    document.title = 'Yolo - ' + props.title;

    // Chuyển trang scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    

    return ( 
        <div>
            {props.children}
        </div>
     );
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired
}

export default Helmet;