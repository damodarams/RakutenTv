import React, {useState, useCallback} from "react"
import $ from "jquery"

import Right from "../../assets/right.png"
import Left from "../../assets/left.png"

import "./directorsAndActors_list.css"

const directorsAndActors_list = (props) => {
  const [posValue, setPosValue] = useState(0)
  let data = []
  let directors = []
  let actors = []

  if (props) {
    if (props.directors) directors = Array.from(props.directors)
    if (props.actors) actors = Array.from(props.actors)
    data = directors.concat(actors)
  }

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
  return (
    <>
      <div className="main_DA">
        <a
          className={posValue > 0 ? "prev_DA" : "prev_hidden_DA"}
          onClick={() => {
            scroll(-1, props.id)
          }}
        >
          <img src={Left} className="left-arrow" alt="left arrow" width="20" height="35" />
        </a>
        <section className="card_DA" id={props.id}>
          {data ? (
            data.map((item, i) => {
              return (
                <div className="card_DA--content" key={i}>
                  <img src={item.image} width="80" height="120" />
                  <p className="card_title_DA">{item.name}</p>
                </div>
              )
            })
          ) : (
            <div></div>
          )}
        </section>
        <a
          className="next_DA"
          onClick={() => {
            scroll(1, props.id)
          }}
        >
          <img src={Right} className="right-arrow" alt="right arrow" width="20" height="35" />
        </a>
      </div>
    </>
  )
}

export default directorsAndActors_list
