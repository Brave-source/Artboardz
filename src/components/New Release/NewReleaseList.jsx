import NewReleaseItem from "./NewReleaseItem";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const NewReleaseList = ({ releases }) => {
  const [collections, setCollections] = useState([]);
  const store = useSelector(state => state);

  useEffect(() => {
    if (store) {
      setCollections(store.collection.collections.filter((item) => item.newRelease == "1"));
    }

  }, [store]);

  return (
    <Box sx={{justifyContent: 'center', w:'100vw', }}>
      {releases.map((release) => {  
        return (
          <Box key={release.id}>
          <NewReleaseItem
            id={release.id}
            image={release.image}
            art={release.source}
            location={release.location}
            artist={release.author}
            links={release.links}
            title={release.title}
          />
          </Box>
        );
      })}
    </Box>
  );
};

export default NewReleaseList;
