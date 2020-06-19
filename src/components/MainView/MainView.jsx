import React, { useState } from "react";
import classnames from "classnames";

import PortalToBackdrop from "../PortalToBackdrop";
import Navigation from "../Navigation/Navigation";

import styles from "./MainView.module.css";
import routes from "../../routes";

// The first thing you'll notice is that I have two separate state variables
// for showing the navigation panel (main view shifted to the side) and
// rendering the navigation block INSIDE the navigation panel.
// This is basically for a smooth transition. Whenever the navigation panel
// opens, I want the navigation block to already be in there. However, that
// can cause a situation in which the block is removed from the DOM before
// the panel closes. I want the block to unmount from the DOM AFTER the panel
// is closed.
const MainView = () => {
  // Using state hook to define whether the navigation panel is shown
  const [showNavigationPanel, setShowNavigationPanel] = useState(false);

  // Using state hook to define whether the navigation block is rendered
  const [showNavigationBlock, setShowNavigationBlock] = useState(false);

  // Using state hook to emulate navigation between routes
  const [currentRoute, setCurrentRoute] = useState("start");
  const route = routes.find((x) => x.id === currentRoute);

  // This function is here to keep things DRY
  const onNavigationOpen = () => {
    // Render the navigation block
    setShowNavigationBlock(true);

    // Show the navigation panel
    setShowNavigationPanel(true);
  };

  const onNavigationClose = () => {
    // Hide the panel first, the transition takes .2 seconds
    setShowNavigationPanel(false);

    // Unmount the navigation block once it's visually hidden.
    // Note that we don't do this on opening the navigation panel
    // because we want it to appear as if the navigation block is always
    // there, while in reality we're only rendering it when the panel is open
    setTimeout(() => setShowNavigationBlock(false), 300); // .1 extra second just in case :)
  };

  return (
    // The container element will function as the "close navigation" button
    // when the navigation panel is open
    <div
      className={classnames(styles.container, {
        shifted: showNavigationPanel,
      })}
      onClick={(event) => {
        showNavigationPanel && onNavigationClose();
        event.stopPropagation();
      }}
    >
      <div className={styles.header}>
        {/* &#9776; is the Unicode hamburger icon glyph */}
        <span className={styles.burgerIcon} onClick={() => onNavigationOpen()}>
          &#9776;
        </span>

        <span className={styles.caption}>{route.name}</span>
      </div>

      {showNavigationBlock && (
        // Using the portal here. The Navigation block is rendered
        // by this component, but in the DOM it will appear inside the
        // backdrop, where it's technically supposed to be.
        <PortalToBackdrop>
          <Navigation
            currentRoute={currentRoute}
            onNavigate={(route) => {
              route && setCurrentRoute(route);
              onNavigationClose();
            }}
          />
        </PortalToBackdrop>
      )}
    </div>
  );
};

export default MainView;
