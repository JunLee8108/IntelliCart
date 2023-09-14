import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";

interface FadeProps {
  children: ReactNode;
  // ... any other prop types ...
}

// function Fade({ children, ...props }: FadeProps) {
//   return (
//     <CSSTransition {...props} timeout={1000} classNames="fade">
//       {children}
//     </CSSTransition>
//   );
// }

function Fade({ children, ...props }: FadeProps) {
  return (
    <CSSTransition
      {...props}
      timeout={1000}
      classNames="fade"
      exit={false} // Disable exit transition
    >
      {children}
    </CSSTransition>
  );
}

export default Fade;
