import { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import axios from "axios"
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

export default function Search() {
    const [searchResult, setSearchResult] = useState([])
    const [filter, setFilter] = useState([])
    const [key,setKey] = useState("")
    const [rating, setRating] = useState(0)
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!key.trim()) {
                    setSearchResult([]);
                    return;
                }
                const searchRes = await axios.get("http://localhost:5000/api/v1/books", { params: { key: key } });
                console.log(searchRes);
                const searchResultData = searchRes.data.data;
                setSearchResult(searchResultData);
                
                if (rating) {
                    const ratingRes = await axios.get("http://localhost:5000/ratings", { params: { num: rating } });
                    console.log(ratingRes);
                    const filterData = ratingRes.data.data;
                    setFilter(filterData);
    
                    // Perform intersection of searchResult and filter
                    const intersectedData = intersection(searchResultData, filterData);
                    setSearchResult(intersectedData);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, [key, rating]);
    
        

        /*console.log(filter)
        console.log(searchResult)
        const gt = searchResult.filter(element => filter.includes(element))
        console.log(gt)*/
        // To Do: only have the ones that are in both filter and searchresult be displayed
    return (
        <form>
            <div className="search-wrapper">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Searching"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <button className="search-btn"><BsSearch /></button>
                    <input
                        type="number"
                        className="form-control"
                        placeholder={"Enter rating"}
                        value={rating}
                        onChange={(c) => setRating(c.target.value)}
                    />
                </div>
                {searchResult && searchResult.length > 0 && (
                    <div className="search-result">
                        {searchResult.map(shop => (
                            <div className="result-item" key={shop._id}>
                                <div className="book-info">
                                    <p className="name">{shop.name}</p>
                                    <p>{shop.location.address}</p>
                                </div>
                            </div>    
                        ))}
                    </div>
                )}
            </div>
        </form>
    )
}