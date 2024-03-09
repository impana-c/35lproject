import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import axios from 'axios';

function Recommendation() {
    const [recommend, setRecommend] = useState([]);

    useEffect(() => {
        const getRecommendation = async () => {
            try {
              const response = await axios.get('http://localhost:3001/toprated');
              const searchResult = response.data.data
              console.log(response)
              setRecommend(searchResult);
              
            } catch (error) {
              console.error('Error fetching shop:', error);
          }
        }
    
        getRecommendation();
      }, []);

      return (
        <form>
            <div className="search-wrapper">
                {recommend && recommend.length > 0 && (
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
                        {recommend.map(shop => (
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

export default Recommendation;