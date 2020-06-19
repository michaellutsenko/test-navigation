import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

// This function returns the portal root element from the DOM
const portalRoot = () => document.getElementById('portal-root');
// This element is the actual portal which will have the navigation block
const portalElement = document.createElement('div');


// The reason I decided to use a portal is essentially to keep the DOM clean
// and only render what is relevant to the user at any given moment.
// The task could've been done without portals, but it would require passing
// many props and callbacks. Portals allow for a more elegant solution
// and reduce clutter.
//
// I also love the fact that I can declare the Navigation component
// where I want to control it instead of where I want it to be in the DOM.
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