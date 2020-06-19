import React from "react";
import classnames from "classnames";

import styles from "./Navigation.module.css";
import routes from "../../routes";

// This is the navigation block. Nothing fancy here
const Navigation = ({ currentRoute, onNavigate }) => {
  return (

    <div
      className={styles.container}
      // As it's inside a portal, all events will be propagated
      // to the parent component. We don't want that behaviour
      onClick={(event) => event.stopPropagation()}
    >
      {/* Hi Viktor! */}
      <div className={styles.username}>Viktor</div>

      <ul>
        {routes.map((route, index) => (
          <li
            key={index}
            // Add the "active" class if the route is active
            className={classnames({ active: route.id === currentRoute })}
            onClick={() => onNavigate(route.id)}
          >
            {route.name}
          </li>
        ))}
      </ul>

      {/* There's no specified behaviour for pressing "Sign out", so I'm emulating
      signing out with a little alert */}
      <a href="#" onClick={() => alert("Goodbye!")}>
        Sign Out
      </a>
    </div>
  );
};

export default Navigation;
