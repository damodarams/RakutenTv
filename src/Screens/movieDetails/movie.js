import React, {useEffect, useReducer} from "react"
import {useSelector} from "react-redux"
import {getContentDetail} from "../../manager/networkManager"
import {useHistory} from "react-router-dom"
import DirectorsAndActors from "../../components/directorsAndActors_list/directorsAndActors_list"
import $ from "jquery"
import {trackEvent} from '../../manager/analyticsManager'

import Year from "../../assets/year.png"
import Time from "../../assets/time.png"
import Flag from "../../assets/flag.png"
import Original from "../../assets/original.png"
import Subtitles from "../../assets/subtitles.png"
import MovieClipart from "../../assets/movie-clipart.png"
import StarMoviedb from "../../assets/star_movie.png"
import Genres from "../../assets/genres.png"
import TwitterLogo from "../../assets/twitter2.svg"
import pininterestLogo from "../../assets/pininteresT.svg"
import FacebookLogo from "../../assets/facebook.png"

import "./movie.css"

const movie = () => {
  const history = useHistory()
  const movieID = useSelector((state) => state.movies_Red.MID)
  const [movieDetails, setMovieDetails] = useReducer((state, newState) => ({...state, ...newState}), {
    image: "",
    title: "",
    description: "",
    scoreImdb: "",
    scoreTheMovieDb: "",
    originalTitle: "",
    year: "",
    duration: "",
    country: [],
    audio: [],
    subtitles: [],
    directors: [],
    actors: [],
    genres: [],
  })

  const playContent = () => {
    history.push("/player")
  }

  useEffect(() => {
    $(".loader-wrapper").show()
    // get data from the third party api
    let url = ""
    if (Object.keys(movieID).length === 0) {
      url =
        "https://thingproxy.freeboard.io/fetch/https://gizmo.rakuten.tv/v3/movies/" +
        localStorage.movieID +
        "?classification_id=5&device_identifier=web&locale=es&market_code=es"
    } else {
      url =
        "https://thingproxy.freeboard.io/fetch/https://gizmo.rakuten.tv/v3/movies/" +
        movieID +
        "?classification_id=5&device_identifier=web&locale=es&market_code=es"
    }
    getContentDetail(url).then((response) => {
      // initialize local state
      const photo = JSON.stringify(response.data.data.images.snapshot)
      const title = JSON.stringify(response.data.data.title)
      const description = JSON.stringify(response.data.data.plot)
      const original_Title = JSON.stringify(response.data.data.original_title)
      const year = JSON.stringify(response.data.data.year)
      const duration = JSON.stringify(response.data.data.duration)
      JSON.stringify(
        response.data.data.genres.map((item) => {
          movieDetails.genres.push({
            icon: item.additional_images.icon,
            name: item.name,
          })
        })
      )
      JSON.stringify(
        response.data.data.directors.map((item) => {
          movieDetails.directors.push({
            name: item.name,
            image: item.photo,
          })
        })
      )
      JSON.stringify(
        response.data.data.actors.map((item) => {
          movieDetails.actors.push({
            name: item.name,
            image: item.photo,
          })
        })
      )
      JSON.stringify(
        response.data.data.view_options.private.streams[0].subtitle_languages.map((item) => {
          movieDetails.subtitles.push(item.name)
        })
      )
      JSON.stringify(
        response.data.data.view_options.private.streams[0].audio_languages.map((item) => {
          movieDetails.audio.push(item.name)
        })
      )
      JSON.stringify(
        response.data.data.countries.map((item) => {
          movieDetails.country.push(item.name)
        })
      )
      JSON.stringify(
        response.data.data.scores.map((item) => {
          if (item.site.name === "IMDb") {
            setMovieDetails({
              scoreImdb: item.score,
            })
          } else {
            setMovieDetails({
              scoreTheMovieDb: item.score,
            })
          }
        })
      )
      setMovieDetails({
        image: JSON.parse(photo),
        title: JSON.parse(title),
        description: JSON.parse(description),
        originalTitle: JSON.parse(original_Title),
        year: JSON.parse(year),
        duration: JSON.parse(duration),
      })
      $(".loader-wrapper").hide()
      trackEvent("Screen View", {
        PageName: "MovieDetails Page",
        "Movie title": response.data.data.title,
        "Original Title":response.data.data.original_title,
        type: response.data.data.type,
        id: response.data.data.id,
      })
    })
    .catch((er)=> {
        history.push("/error")
    })
  }, [])

  return (
    <>
      <div className="container_movie">
        <img src={movieDetails.image} alt="" width="100%" height="600px" />
      </div>
      <div className="intro">
        <h2 className="score_text">
          <img
            className="image-imdb"
            src="https://images-0.wuaki.tv/system/images/1/original/imdb-1594119387.png"
            alt="imdb"
            width="2.5%"
            height="2.5%"
          />
          {"  " + movieDetails.scoreImdb}
        </h2>
        <h1 className="text_title">{movieDetails.title}</h1>
        <div
          className="trailer_Button"
          onClick={() => {
            playContent()
          }}
        >
          WATCH TRAILER
        </div>
      </div>

      <div className="text_container">
        <div className="text_inner">
          <div className="details">
            <p className="box_text details_text">
              <img src={Time} width="18px" height="16px" alt="time" />
              {movieDetails.duration + " min"}
            </p>
            <p className="box_text details_text">
              <img src={Year} width="18px" height="16px" alt="time" />
              {movieDetails.year}
            </p>
            <p className="box_text details_text">
              <img src={Flag} width="18px" height="16px" alt="time" />
              {movieDetails.country.map((item) => {
                return item
              })}
            </p>
            <p className="box_text details_text">
              <img src={Original} width="18px" height="16px" alt="time" />
              {movieDetails.originalTitle}
            </p>
          </div>
          <div className="details">
            <p className="box_text">{movieDetails.description}</p>
          </div>
          <p className="lang_title">
            <img src={Subtitles} width="20px" height="20px" alt="time" /> Languages ​​and subtitles
          </p>
          <table>
            <thead>
              <tr>
                <th align="left">
                  <p className="lang_title_table">Audio</p>
                </th>
                <th align="left">
                  <p className="lang_title_table">Subtitles</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {movieDetails.audio.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <p className="audio_subtitles">{item}</p>
                    </td>
                    <td className="audio_subtitles">
                      {" " +
                        movieDetails.subtitles.map((item, i) => {
                          return item
                        })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="DA_div">
            <p className="DA_title">
              <img src={MovieClipart} width="16px" height="15px" alt="time" /> Directors and casting
            </p>
            <DirectorsAndActors id="DA_id" directors={movieDetails.directors} actors={movieDetails.actors} />
          </div>
          <div className="detail_content_block--float">
            <p className="detail_content_block_title">
              <img src={StarMoviedb} width="20px" height="20px" alt="time" /> Note
            </p>
            <div className="roundscore">
              <div className="roundscore_circle_layer">
                <div className="roundscore_content">
                  <div className="roundscore_content_score">
                    <p>{movieDetails.scoreTheMovieDb}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail_content_block--float">
            <p className="detail_content_block_title">
              <img src={Genres} width="20px" height="20px" alt="time" /> Genres
            </p>
            {movieDetails.genres.map((item, i) => {
              return (
                <div className="genreicon" key={i}>
                  <img className="genreicon_round" src={item.icon} width="10%" alt="time" />
                  <p className="genreicon_name">{item.name}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="social-tab">
          <div
            className="social-item firstItem"
            onClick={() =>
              window.open(
                "https://twitter.com/intent/tweet?source=sharethiscom&text=Hyena%20Road%20@rakutentv_uk%20https://rakuten.tv/uk/movies/hyena-road",
                "_blank",
                "width=300,height=400"
              )
            }
          >
            <div className="social-logo">
              <img src={TwitterLogo} className="social-logo-img" />
            </div>
            <div className="social-name">Twitter </div>
          </div>
          <div className="social-item">
            <div
              className="social-logo"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%253A%252F%252Frakuten.tv%252Fuk%252Fmovies%252Fhyena-road&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB",
                  "_blank",
                  "width=300,height=400"
                )
              }
            >
              <img src={FacebookLogo} className="social-logo-img" />
            </div>
            <div className="social-name">Facebook </div>
          </div>
          <div
            className="social-item"
            onClick={() =>
              window.open(
                "https://www.pinterest.com/pin/create/button/?url=https://rakuten.tv/uk/movies/hyena-road&media=https://images-3.wuaki.tv/system/artworks/31680/master/hyena-road-1558443280.jpeg&description=Three%20men,%20three%20different%20paths,%20caught%20in%20conflict%20but%20brought%20together%20to%20save%20lives.%20A%20highly%20skilled%20sniper%20who%20can%27t%20think%20of%20his%20targets%20as%20human;%20an%20intelligence%20officer%20who%20has%20never%20killed%20while%20on%20duty;%20and%20a%20legendary%20Afghan%20warrior%20who%20left%20war%20behind%20but%20gets%20pulled%20back%20to%20battle",
                "_blank",
                "width=300,height=400"
              )
            }
          >
            <div className="social-logo">
              <img src={pininterestLogo} className="social-logo-img" />
            </div>
            <div className="social-name">Pinterest </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default movie
