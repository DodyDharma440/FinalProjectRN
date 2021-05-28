import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const useBookmarked = (bookmarksState, type, id) => {
  const [bookmarked, setBookmarked] = useState({
    isBookmarked: false,
    bookmarkId: "0",
  });

  useEffect(() => {
    bookmarksState.filter((bookmark) => {
      switch (type) {
        case "meals":
          if (bookmark.idMeal === id) {
            return setBookmarked({
              isBookmarked: true,
              bookmarkId: bookmark._id,
            });
          }
          break;

        default:
          setBookmarked({
            isBookmarked: false,
            bookmarkId: "0",
          });
          break;
      }
    });
  }, [bookmarksState]);

  return [bookmarked, setBookmarked];
};

useBookmarked.propTypes = {
  bookmarksState: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default useBookmarked;
