import { useEffect } from 'react';

export const useOutsideClick = (ignoreRef, callback = f=> f, parentRef?: any) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ignoreRef?.current.contains(event.target)) {
        return;
      }
      parentRef ||= (window as any).mainViewRef;
      if (parentRef?.current?.contains(event.target)) {
        callback(event);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [parentRef, ignoreRef]);
};


export const useMouseOutside = (ignoreRef, callback = f=> f, parentRef?: any) => {
  useEffect(() => {
    function handleMouseOutside(event) {
      if (ignoreRef?.current.contains(event.target)) {
        return;
      }
      parentRef ||= (window as any).mainViewRef;
      if (parentRef?.current?.contains(event.target)) {
        callback(event);
      }
    }

    // Bind the event listener
    document.addEventListener('mouseout', handleMouseOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseout', handleMouseOutside);
    };
  }, [parentRef, ignoreRef]);
};
//
// export const useOutsideClick = (ref, callback = f=> f) => {
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (!ref.current?.contains(event.target)) {
//         callback(event)
//       }
//     }
//
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);
// }
