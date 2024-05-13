import { useEffect, useState } from "react";
import { DatasetService } from "../../services/DatasetService";

const Statistics =  function () {
    console.log("Rendering MapPage");
    const [imagesCount, setImagesCount] = useState(0);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        const response = await DatasetService.getImagesCount();
        setImagesCount(response.data.count);
       
      };
    return (
        <div>
            Images count:{imagesCount}
        </div>
    )
}
export default Statistics;