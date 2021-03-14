import React, {useState, useCallback} from "react"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import $ from "jquery"

import Right from "../../assets/right.png"
import Left from "../../assets/left.png"

import "./scroll_list.css"

const scroll_list = (props) => {
  const history = useHistory()
  const [posValue, setPosValue] = useState(0)
  let data = undefined
  let enableRightArrow = true
  if (props.images) {
    if (props.images.length < 5) enableRightArrow = false
    data = Array.from(props.images)
  }

  const dispatch = useDispatch()
  // the animation for the horizontal lists
  const scroll = useCallback(
    (direction, id) => {
      let far = ($("section[id*=" + id + "]").width() / 2) * direction
      let pos = $("section[id*=" + id + "]").scrollLeft() + far
      $("section[id*=" + id + "]").animate({scrollLeft: pos}, 1000)
      setPosValue(pos)
    },
    [] // Tells React to memoize regardless of arguments.
  )
  // store the id of the movie to redux store on click in one movie
  const setMovieRequest = (id) => {
    const setMovie = () => ({type: "MOVIEID", obj: id})
    dispatch(setMovie())
    localStorage.setItem("movieID", id)
    history.push("/movie")
  }

  return (
    <>
      <div className="main">
        <a
          className={posValue > 0 ? "prev" : "prev_hidden"}
          onClick={() => {
            scroll(-1, props.id)
          }}
        >
          <img src={Left} alt="left arrow" width="30" height="50" />
        </a>
        <section className="card" id={props.id}>
          {data
            ? data.map((item, i) => {
                return (
                  <div className="tooltip" key={i}>
                    <img
                      className="card--content"
                      width="180"
                      height="250"
                      onClick={() => {
                        setMovieRequest(item.id)
                      }}
                      src={item.images.artwork}
                    />
                  </div>
                )
              })
            : []}
        </section>
        <a
          className={enableRightArrow ? "next" : "prev_hidden"}
          onClick={() => {
            scroll(1, props.id)
          }}
        >
          <img src={Right} alt="right arrow" width="30" height="50" />
        </a>
      </div>
    </>
  )
}

export default scroll_list
