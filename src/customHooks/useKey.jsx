import { useEffect } from "react";

export const useKey = (key = "", callback = () => {}) => {
  useEffect(function() {
    function handlePressedKey(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback()
      }
    }

    document.addEventListener('keydown', handlePressedKey);

    return function() {
      document.removeEventListener('keydown', handlePressedKey);
    }
  }, [callback, key])
}
