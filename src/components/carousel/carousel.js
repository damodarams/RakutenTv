import React, {useCallback} from "react"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import $ from "jquery"

import Right from "../../assets/right.png"
import Left from "../../assets/left.png"

import "./carousel.css"

const carousel = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  let selected = undefined
  // const dispatch = useDispatch()
  // the animation for the horizontal carousel
  const scroll = useCallback(
    (direction) => {
      let far = ($(".card_carousel").width() / 0.99) * direction
      let pos = $(".card_carousel").scrollLeft() + far
      $(".card_carousel").animate({scrollLeft: pos}, 1000)
    },
    [] // Tells React to memoize regardless of arguments
  )
  // store the id of the movie to redux store on click in one movie
  const setMovieRequest = (id) => {
    const setMovie = () => ({type: "MOVIEID", obj: id})
    dispatch(setMovie())
    localStorage.setItem("movieID", id)
    history.push("/movie")
  }

  if (props) {
    let data = Array.from(props.images)
    // shuffle the images of the data array
    const shuffled = data.sort(() => 0.5 - Math.random())
    // get the first five elements of shuffled array
    selected = shuffled.slice(0, 5)
  }

  return (
    <>
      <div className="main_carousel">
        <a
          className="prev_carousel"
          onClick={() => {
            scroll(-0.99)
          }}
        >
          <img className="left-carousel" src={Left} alt="left arrow" width="30" height="50" />
        </a>
        <section className="card_carousel">
          {props ? (
            selected.map((item, i) => {
              return (
                <div className="card_carousel--content" key={i}>
                  <div className="title_carousel_div">
                    <p className="title_carousel">{item.title}</p>
                  </div>
                  <div className="play-trailer" onClick={() => history.push("/player")}>
                    {" "}
                    WATCH TRAILER{" "}
                  </div>
                  <p className="short-info">
                    {"Duration: " + item.duration + " min | Rating:" + item.rating.average + "/" + item.rating.scale}
                  </p>
                  <img
                    className="Carousel-img"
                    onClick={() => {
                      setMovieRequest(item.id)
                    }}
                    src={item.images.snapshot}
                  />
                </div>
              )
            })
          ) : (
            <div></div>
          )}
        </section>
        <a
          className="next_carousel"
          onClick={() => {
            scroll(0.99)
          }}
        >
          <img src={Right} alt="right arrow" width="30" height="50" />
        </a>
      </div>
    </>
  )
}

export default carousel
