import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const useBookmarked = (bookmarksState, type, id) => {
  const [bookmarked, setBookmarked] = useState({
    isBookmarked: false,
    bookmarkId: "0",
  });

  useEffect(() => {
    let isMounted = true;

    const filterBookmarks = async () => {
      await bookmarksState.filter((bookmark) => {
        switch (type) {
          case "meals":
            if (bookmark.idMeal === id && isMounted) {
              return setBookmarked({
                isBookmarked: true,
                bookmarkId: bookmark._id,
              });
            }
            break;

          case "ingredients":
            if (bookmark.idIngredient === id && isMounted) {
              return setBookmarked({
                isBookmarked: true,
                bookmarkId: bookmark._id,
              });
            }
            break;

          default:
            isMounted &&
              setBookmarked({
                isBookmarked: false,
                bookmarkId: "0",
              });
            break;
        }
      });
    };

    filterBookmarks();

    return () => (isMounted = false);
  }, []);

  return [bookmarked, setBookmarked];
};

useBookmarked.propTypes = {
  bookmarksState: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default useBookmarked;
