import { Grid, Typography } from "@mui/material";
import { useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import Character from "../Character";

const pathToCharArrayHash = {
  planets: "residents",
  films: "characters",
  species: "people",
  vehicles: "pilots",
  starships: "pilots",
};

const List = () => {
  const characters = useSelector((state) => {
    return state.characters.data;
  });
  const isPending = useSelector((state) => {
    return state.characters.isPending;
  });
  const isError = useSelector((state) => {
    return state.characters.isError;
  });
  useEffect(() => {
    console.log(characters);
  }, [characters]);

  const charRenderer = (result, type) => {
    if (type === "people") {
      return <Character character={result} key={result.url + type} />;
    } else {
      return (
        <Fragment key={result.url + type}>
          {result[pathToCharArrayHash[type]].map((people) => (
            <Character characterUrl={people} key={people + type} />
          ))}
        </Fragment>
      );
    }
  };
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {(isPending || isError) && (
        <Grid item xs={2} sm={4} md={4}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {isError ? "Something went wrong" : "Loading..."}
          </Typography>
        </Grid>
      )}
      {characters.map((data) => (
        <Fragment key={data.type}>
          {data.results?.map((result) => charRenderer(result, data.type))}
        </Fragment>
      ))}
    </Grid>
  );
};

export default List;
