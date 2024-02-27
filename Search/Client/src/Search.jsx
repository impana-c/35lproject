import { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import axios from "axios"
export default function Search() {
    const [searchResult, setSearchResult] = useState([])
    const [key,setKey] = useState("")
    useEffect(() => {
        const search = async () => {
            try {
                if (!key.trim()) {
                    setSearchResult([])
                    return
                }
                const res = await axios.get("http://localhost:5000/api/v1/books", {params: {key: key}})
                console.log(res)
                setSearchResult(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        search()
    }, [key])
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