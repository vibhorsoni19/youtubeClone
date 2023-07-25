import React, { useEffect, useState } from "react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion,setSuggestion] = useState([])
  const [showSuggestions,setShowSuggestions] = useState(false)
  const searchCache  = useSelector((store)=>store.search)

  const dispatch = useDispatch();

  /**
   * searchCahce =
   * {
   * "iphone":["iphone 11","iphone 14"]
   * 
   * }
   * 
   * searchQuery = iphone
   */

  useEffect(() => {
    //api call
    //getSearchSuggestions()

    //make an api call after  every key press
    //but if the difference between 2 api calls is < 200ms
    //decline the api call
    const timer = setTimeout(() =>{
    if (searchCache[searchQuery]) {
      setSuggestion(searchCache[searchQuery]);
    }else { getSearchSuggestions()
    }
  },200);
  
    return () => {
      clearTimeout(timer);
    };

  }, [searchQuery]);

  /**
   * if i press a key - i
   * it will render the component
   * call useEffect() 
   * start a timer  -> make api call after 200 ms - timer 1
   * 
   * 
   * 
  
   * if i press p before 200 ms then it will destroy the component (useEffect returen method)
   * if i press p after 200 ms then   it will 
   * re render component render 
   * call useEffcet() -> call api
   *  start a timer  -> make api call after 200 ms - timer 2 
   */

  const getSearchSuggestions = async () => {
    console.log("API CALLL ---", searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    //console.log(json[1])
    setSuggestion(json[1])

    //update cahceh
    dispatch(cacheResults({
      [searchQuery]:json[1]
    }))
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    //main section
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      {/* 1 section image div */}
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNMwhUqb5qO8qhfkBAJAvUTP_qm404WhrVjI1FWMTvWQp201pWiWX16EhSarVQbfZILxw&usqp=CAU"
          alt="menu"
        />

        <a href="/">
          <img
            className="h-8 mx-2"
            src="https://cdn-icons-png.flaticon.com/512/6387/6387389.png"
            alt="YouTube"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-500 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus = {()=>setShowSuggestions(true)}
            onBlur = {()=>setShowSuggestions(false)}
            
          />
          <button className="border border-gray-500 px-5 py-2 bg-gray-200 rounded-r-full">
            🔍
          </button>
        </div>
      {showSuggestions&&  <div className="fixed bg-white py-2 px-5 w-[39.5rem] shadow-lg rounded-lg border border-gray-100">
          <ul>
            {suggestion.map(s=> <li key ={s} className="py-2 shadow-sm hover:bg-gray-100">🔍 {s} </li>)}
           
            
          </ul>
        </div>}
      </div>

      <div className="col-span-1">
        <img
          className="h-8 "
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user"
        />
      </div>
    </div>
  );
};

export default Head;
