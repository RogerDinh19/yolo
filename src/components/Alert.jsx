import React, {useEffect} from 'react';
import PropTypes from "prop-types"
import ScrollReveal from 'scrollreveal';


function Alert (props) {
    useEffect(() => {
        ScrollReveal().reveal('.alert', { delay: 200, origin: 'right',duration: 1000,distance: '60px' });
    }, []);


  return (
    <div className={`alert alert-${props.type}`} role="alert">
      {props.message}
    </div>
  );
};


Alert.protoTypes = {
    type: PropTypes.string,
    message: PropTypes.string
}

export default Alert;
