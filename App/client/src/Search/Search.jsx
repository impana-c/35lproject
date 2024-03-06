import { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
// import '../App.css'
// import '../index.css'


function intersection(arr1, arr2) {
    const result = [];
    console.log(arr1)
    console.log(arr2)
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i]._id === arr2[j]._id) {
                result.push(arr1[i])
                break;
            }
        }
    }
    return result;
}

function calculateDistance(lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const degToRad = Math.PI / 180;
    let lat1 = 34.068920 * degToRad;
    let lon1 = -118.445183 * degToRad;
    lat2 = lat2 * degToRad;
    lon2 = lon2 * degToRad;
    
    // Radius of the Earth in kilometers
    const R = 6371.0;
    
    // Compute the change in coordinates
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    
    // Apply the Haversine formula
    const a = Math.sin(dlat / 2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const distanceMiles = distance * 0.621371;
    
    return distanceMiles;
}


export default function Search() {
    const [searchResult, setSearchResult] = useState([])
    const [key,setKey] = useState("")
    const [rating, setRating] = useState(Number)
    const [numRatings, setNumRatings] = useState(Number)
    const [location, setLocation] = useState(Number)
    const [checkbox1, setCheckBox1] = useState(false)
    const [checkboxC1, setCheckBoxC1] = useState(false)
    const [checkboxC2, setCheckBoxC2] = useState(false)
    const [checkboxC3, setCheckBoxC3] = useState(false)
    const [cost, setCost] = useState(Number)
    const [bathroom, setBathrooms] = useState(false)
    const [wifi, setWifi] = useState(false)
    const [study, setStudyability] = useState(false)
    const [noise, setNoise] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let searchResultData = []
                if (!key.trim()) {
                    const all = await axios.get("http://localhost:3001/all");
                    searchResultData = all.data.data
                }
                if (key) {
                    const searchRes = await axios.get("http://localhost:3001/api/v1/name", { params: { key: key } });
                    //console.log(searchRes);
                    searchResultData = searchRes.data.data;
                }
                
                
                if (rating) {
                    const ratingRes = await axios.get("http://localhost:3001/ratings", { params: { num: rating } });
                    console.log(ratingRes);
                    const filterData = ratingRes.data.data;
                    // Perform intersection of searchResult and filter
                    searchResultData = intersection(searchResultData, filterData);
                    //setSearchResult(intersectedData);
                }
                if (numRatings) {
                    const numRatingRes = await axios.get("http://localhost:3001/numRatings", { params: { num: numRatings } });
                    console.log(numRatingRes)
                    const filterData2 = numRatingRes.data.data
                    
                    searchResultData = intersection(searchResultData, filterData2)
                }

                if (location) {
                    for (let i = 0; i < searchResultData.length; i++) {
                        const lat1 = searchResultData[i].location.coordinates[0];
                        const lon1 = searchResultData[i].location.coordinates[1];
                        const distanceFrom = calculateDistance(lat1, lon1)
                        if (distanceFrom > location) {
                            searchResultData.splice(i, 1)
                            i--;
                        }
                    }
                }
                if (cost) {
                    for (let i = 0; i < searchResultData.length; i++) {
                        const cur = searchResultData[i].cost
                        if (cur > cost) {
                            searchResultData.splice(i, 1)
                            i--;
                        }
                    }
                }
                if (bathroom) {
                    for (let i = 0; i < searchResultData.length; i++) {
                        const cur = searchResultData[i].bathrooms
                        if (cur === 'no') {
                            searchResultData.splice(i, 1)
                            i--;
                        }
                    }
                }
                if (wifi) {
                    for (let i = 0; i < searchResultData.length; i++) {
                        const cur = searchResultData[i].wifi
                        if (cur === 'no') {
                            searchResultData.splice(i, 1)
                            i--;
                        }
                    }
                }
                if (noise !== "") {
                    for (let i = 0; i < searchResultData.length; i++) {
                        const cur = searchResultData[i].noise
                        if (cur !== noise) {
                            searchResultData.splice(i, 1)
                            i--;
                        }
                    }
                }
                if (study) {
                    for (let i = 0; i < searchResultData.length; i++) {
                        const cur = searchResultData[i].studyability
                        if (cur === 'bad') {
                            searchResultData.splice(i, 1)
                            i--;
                        }
                    }
                }
                setSearchResult(searchResultData)
                
                //console.log(searchResult)
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, [key, rating, numRatings, location, checkbox1, cost, checkboxC1, checkboxC2, bathroom, noise, study, wifi]);
        /*console.log(filter)
        console.log(searchResult)
        const gt = searchResult.filter(element => filter.includes(element))
        console.log(gt)*/
        // To Do: only have the ones that are in both filter and searchresult be displayed
    
    const handleCheckboxChangeL = async (distance) => {
        setCheckBox1(!checkbox1); // Update checkbox state
        
        // Use the updated checkbox state to determine the location value
        const newLocation = checkbox1 ? 100 : distance; // Change location based on checkbox state
        
        setLocation(newLocation); // Set the location state
    }

    const handleCheckboxChangeC1 = async (cost) => {
        setCheckBoxC1(!checkboxC1); // Update checkbox state
        
        // Use the updated checkbox state to determine the location value
        const newCost = checkboxC1 ? 100 : cost; // Change location based on checkbox state
        
        setCost(newCost); // Set the location state
        console.log(cost)
    }
    
    const handleCheckboxChangeC2 = async (cost) => {
        setCheckBoxC2(!checkboxC2); // Update checkbox state
        
        // Use the updated checkbox state to determine the location value
        const newCost = checkboxC2 ? 100 : cost; // Change location based on checkbox state
        
        setCost(newCost); // Set the location state
        console.log(newCost)
    }

    const handleCheckboxChangeC3 = async (cost) => {
        setCheckBoxC3(!checkboxC3); // Update checkbox state
        
        // Use the updated checkbox state to determine the location value
        const newCost = checkboxC3 ? 100 : cost; // Change location based on checkbox state
        
        setCost(newCost); // Set the location state
        console.log(newCost)
    }

    const changeBathrooms = async () => {
        setBathrooms(!bathroom)
    }

    const changeWifi = async () => {
        setWifi(!wifi)
    }

    const changeNoise = async (level) => {
        const change = noise === level ? "" : level;
        setNoise(change)
        //console.log(noise)
    }

    const changeStudyability = async () => {
        setStudyability(!study)
    }
    return (
        <form>
            <div className="search-wrapper">
                <input
                    type="checkbox"
                    name="0.5 miles"
                    className="form-control"
                    onChange={() => handleCheckboxChangeL(0.5)}
                />
                <span>0.5 miles</span>
                <input
                    type="checkbox"
                    name="cost 1"
                    className="form-control"
                    onChange={() => handleCheckboxChangeC1(1)}
                />
                <span>$</span>
                <input
                    type="checkbox"
                    name="cost 2"
                    className="form-control"
                    onChange={() => handleCheckboxChangeC2(2)}
                />
                <span>$$</span>
                <input
                    type="checkbox"
                    name="cost 2"
                    className="form-control"
                    onChange={() => handleCheckboxChangeC3(3)}
                />
                <span>$$$</span>
                <input
                    type="checkbox"
                    name="studyability"
                    className="form-control"
                    onChange={() => changeStudyability()}
                />
                <span>Studyability</span>
                <input
                    type="checkbox"
                    name="bathrooms"
                    className="form-control"
                    onChange={() => changeBathrooms()}
                />
                <span>Bathrooms</span>
                <input
                    type="checkbox"
                    name="wifi"
                    className="form-control"
                    onChange={() => changeWifi()}
                />
                <span>Wifi</span>
                <br/>
                <strong>Noise Level:</strong>
                <input
                    type="checkbox"
                    name="noise-q"
                    className="form-control"
                    onChange={() => changeNoise('quiet')}
                />
                <span>Quiet</span>
                <input
                    type="checkbox"
                    name="noise-m"
                    className="form-control"
                    onChange={() => changeNoise('moderate')}
                />
                <span>Moderate</span>
                <input
                    type="checkbox"
                    name="noise-l"
                    className="form-control"
                    onChange={() => changeNoise('loud')}
                />
                <span>Loud</span>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Searching"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <button className="search-btn"><BsSearch /></button>
                    <li> Enter rating:
                    <input
                        type="number"
                        className="form-control"
                        placeholder={"Enter rating"}
                        value={rating}
                        onChange={(c) => setRating(c.target.value)}
                    />
                    </li>
                    <li> Enter minimum number of ratings:
                    <input
                        type="number"
                        className="form-control"
                        placeholder={"Enter minimum number of ratings"}
                        value={numRatings}
                        onChange={(d) => setNumRatings(d.target.value)}
                    />
                    </li>
                </div>
                {searchResult && searchResult.length > 0 && (
                    // <div className="search-result">
                    //     {searchResult.map(shop => (
                    //         <div className="result-item" key={shop._id}>
                    //             <div>
                    //                 {/* should try to displaty both of these on same line */}
                    //                 <p className="name">{shop.name}, </p>
                    //                 <p>{shop.location.address}</p> 
                    //             </div>
                    //         </div>    
                    //     ))}
                    // </div>
                    <div className="search-result">
                        {searchResult.map(shop => (
                            <div className="result-item" key={shop._id}>
                                {/* Wrap the result item in a Link component */}
                                <Link
                                    to="/searchresult" 
                                    onClick={() => {
                                        // Store the name in local storage before navigating
                                        localStorage.setItem('searchresult', shop.name);
                                        console.log(localStorage.getItem('searchresult'))
                                    }}
                                >
                                    <div>
                                        <p className="name">{shop.name}, {shop.location.address}</p>
                                    </div>
                                </Link>
                            </div>    
                        ))}
                    </div>
                )}
            </div>
        </form>
    )
}