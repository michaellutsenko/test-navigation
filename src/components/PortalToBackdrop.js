import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

// This function returns the portal root element from the DOM
const portalRoot = () => document.getElementById('portal-root');
// This element is the actual portal which will have the navigation block
const portalElement = document.createElement('div');

const PortalToBackdrop = ({children}) => {
  // The effect hook helps keeping the DOM clean of leftovers
  useEffect(() => {
    // Append the portal to the root (backdrop) on mount
    portalRoot().appendChild(portalElement);
    return () => {
      // Remove the portal from the root (backdrop) on unmount
      portalRoot().removeChild(portalElement);
    }
  })

  return ReactDOM.createPortal(children, portalElement);
}

export default PortalToBackdrop