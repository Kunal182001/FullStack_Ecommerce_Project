import React, { useEffect, useState } from 'react'
import Homebaner from '../../Components/Home/Homebaner'
import HomeFeature from '../../Components/Home/HomeFeature'
import Productlisting from '../../Components/Home/Productlisting'
import Newslettersection from '../../Components/Home/newslettersection'
import { fetchData } from '../../Components/Admin/api'

const Homepage = () => {
  const [catData, setcatData] = useState([]);
  //For Fetching the Category from API
  useEffect(() => {
    fetchData("/api/Category?all=true").then(res => {
      setcatData(res.Categoreylist);
    })
  }, []);

  return (
    <div className='w-full mt-5'>
      <Homebaner />
      {catData.length > 0 ? <HomeFeature catData={catData} /> :<div className='w-full flex justify-center items-center'> <div className='w-[90%] grid grid-cols-2 md:grid-cols-8 gap-4 mt-10'>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className='w-full flex flex-col items-center gap-2'>
                                    <div className="animate-pulse w-[120px] h-[120px] bg-gray-300 border-gray-200 rounded-full p-4 shadow-sm"></div>
                                    <div className="animate-pulse w-[80px] h-5 bg-gray-300 rounded mb-4"></div>
                                </div>
                            ))}
                            </div>
                        </div>}
      <Productlisting />
      <Newslettersection />
    </div>
  )
}

export default Homepage