import React, { useState } from "react";
import classnames from "classnames";

import PortalToBackdrop from "../PortalToBackdrop";
import Navigation from "../Navigation/Navigation";

import styles from "./MainView.module.css";
import routes from "../../routes";

const MainView = () => {
  // Using state hook to define whether the navigation panel is shown
  const [showNavigationPanel, setShowNavigationPanel] = useState(false);

  // Using state hook to define whether the navigation block is shown
  // on the navigation panel. This is for a visually smooth transition
  const [showNavigationBlock, setShowNavigationBlock] = useState(false);

  // Using state hook to emulate navigation between routes
  const [currentRoute, setCurrentRoute] = useState("start");
  const route = routes.find((x) => x.id === currentRoute);

  // This function is to keep things DRY
  const onNavigationOpen = () => {
    // Render the navigation block (this will result in a complete lifecycle for navigation)
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
