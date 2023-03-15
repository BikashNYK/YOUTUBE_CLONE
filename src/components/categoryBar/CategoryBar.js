import React, { useState } from 'react';
import './_categorybar.scss';
import { useDispatch } from 'react-redux';
import { getVideosByCategory } from '../../actions/videos.action';
const CategoryBar = () => {
  const keyWordList = ["All",
    "Music",
    "Gaming Live",
    "React js",
    "MARVEL",
    "DC comics",
    "The Boys",
    "Scene",
    "AI",
    "Live",
    "Apple",
    "Stock Markets",
    "Computer programming",
    "Visual arts",
    "Bhajan music",
    "Deep house",
    "Recent uploaded"
  ];

  const [clickedElement, SetClicketElement] = useState("All");

  const dispatch = useDispatch();

  const handleClickKeyword = (e) => {
    // console.log("clicked",e);
    SetClicketElement(e);
    dispatch(getVideosByCategory(e));
  };
  return (
    <div className='categoriesBar'>
      {keyWordList.map((e, i) => {
        return <span onClick={() => handleClickKeyword(e)}
          key={i} className={clickedElement === e ? "active" : ""}>{e}</span>;
      })}
    </div>
  );
};

export default CategoryBar;