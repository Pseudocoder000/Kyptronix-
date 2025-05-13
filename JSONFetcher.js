import { useEffect, useState } from "react";

export function useJSONFetcher(url){
    const [fetchedJSON,setFetchedJSON] = useState(null);  
    useEffect(() => {
        fetch(url)
        .then((r) => r.json())
        .then((data) => setFetchedJSON(data))
    },[url]);
    return fetchedJSON;
}