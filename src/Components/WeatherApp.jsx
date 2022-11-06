import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { faSearch , faCloud, faCloudSun  , faCloudRain} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "./WeatherApp.css" ;
import { useState , useEffect } from 'react';
import AddErrorModal from './AddErrorModal';;
export default function WeatherApp() {
  var utc = Date().slice(0,16);
  const [Weather , setWeather] = useState({});
  const [locationValue , setLocationValue] = useState("");
  const [search , setSearch] = useState("tetouan");
  const [showError , setShowError] = useState(false)
  const [msgError , setMsgError] = useState("");
  useEffect(() => {
    if(search !== "") {
        const getData = async () => {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=e60a468550d117a6966441c21e09cd24`)
            return res.data
        }
        getData().then((data) => setWeather(data)) ;
    }
  } , [search])
  function onChangeLocationByInput (e) {
    setLocationValue(e.target.value)
  }
  function OnSearch() {
    if(locationValue ==="") {
        setShowError(true)
        setMsgError("Location is empty !! make sure you have enter a correct location")
    }
    else setSearch(locationValue)
  }
  function onChangeLocationByTopSearch (e) {
    setSearch(e.target.value)
  }
  function getWeatherStatus() {
    if(Weather.weather) {
        if(Weather.weather[0].main ==="Clouds") {
            return faCloud 
        }
        else if(Weather.weather[0].main ==="Clear") {
            return faCloudSun
        }
        else if(Weather.weather[0].main ==="Rain") {
            return faCloudRain
        }
    }
    return faCloudSun
  }
  return (
    <Container fluid>
        <AddErrorModal
          show={showError}
          handleClose={() => {
            setShowError(false);
          }}
          msg={msgError}
        />
          <Row>
            <Col className="part1 h-100  d-flex justify-content-between flex-column" sm={8}>
                <header className=' fw-bold ms-3 mt-5'>The weather</header>
                <main className="">
                            <Row className="w-75 fw-bold  pb-5 align-items-center">
                                <Col sm className="degré">
                                    {Weather.main ? Weather.main.temp.toFixed(): ""}°F
                                </Col>
                                <Col sm>
                                    <h1>{Weather.name}</h1>
                                    <h6>{utc}</h6>
                                </Col>
                                <Col sm>
                                    <span style={{color : "white" , fontSize:"20px"}}> 
                                        <FontAwesomeIcon icon={getWeatherStatus()}></FontAwesomeIcon>
                                        </span>
                                    <p> {Weather.weather ? Weather.weather[0].description: ""}</p>
                                </Col>
                            </Row>
                </main>
            </Col>
            <Col className="part2 ps-3 pt-3" sm>
                    <Row>
                        <Col className="w-100 d-flex justify-content-between align-items-center">
                            <input type="text" placeholder='Search Location' className='SearchInput' onChange={onChangeLocationByInput} />
                            <Button className="fs-6 rounded-3 text-center" variant='warning' onClick={OnSearch}><FontAwesomeIcon icon={faSearch} className="fs-6"></FontAwesomeIcon></Button>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col>
                        <Row className='ps-2 mt-4  fw-bold '>
                                <Col>
                                    <div>Top Search : </div>
                                </Col>
                            </Row>
                            <Row className=' ps-3 mt-4 fs-6'>
                                <Col>
                                    <button className='topSearchBtn' onClick={onChangeLocationByTopSearch} value="london">London</button>
                                </Col>
                            </Row>
                            <Row className=' ps-3 mt-4 fs-6'>
                                <Col>
                                    <button className='topSearchBtn' onClick={onChangeLocationByTopSearch} value="paris">Paris</button>
                                </Col>
                            </Row>
                            <Row className='  ps-3 mt-4 fs-6'>
                                <Col>
                                    <button className='topSearchBtn' onClick={onChangeLocationByTopSearch} value="casa">Casablanca</button>
                                </Col>
                            </Row>
                            <Row className=' ps-3 mt-4  fs-6'>
                                <Col>
                                    <button className='topSearchBtn' onClick={onChangeLocationByTopSearch} value="madrid">Madrid</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className='hr'></div>
                    <Row>
                        <Col>
                            <Row className='ps-2 mt-2 mb-3 fw-bold '>
                                <Col>
                                    <div>Weather Details : </div>
                                </Col>
                            </Row>
                            <Row className='ps-3  fs-6'>
                                <Col className="p-3 d-flex justify-content-between align-items-align ">
                                    <p>temp</p>
                                    <span>{Weather.main ? Weather.main.temp.toFixed(): ""}°F</span>
                                </Col>
                            </Row>
                            <Row className='ps-3  fs-6'>
                                <Col className="p-3 d-flex justify-content-between align-items-align ">
                                    <p>Humidity</p>
                                    <span>{Weather.main ?Weather.main.humidity.toFixed() : ""}%</span>
                                </Col>
                            </Row>
                            <Row className='ps-3  fs-6'>
                                <Col className="p-3 d-flex justify-content-between align-items-align ">
                                    <p>Wind Speed</p>
                                    <span>
                                    {Weather.wind ?Weather.wind.speed.toFixed() : ""}MPH
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
            </Col>
          </Row>
      </Container>
  )
}
