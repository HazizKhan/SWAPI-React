import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Get } from "../../helpers/http";
import { Grid } from "@mui/material";

const Character = ({ characterUrl, character }) => {
  const [characterData, setCharacterData] = useState(null);

  const fetchData = useCallback(async () => {
    const data = await (await Get(characterUrl, { fullUrl: true })).json();
    setCharacterData(data);
  }, [characterUrl]);

  useEffect(() => {
    try {
      if (characterUrl) {
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  }, [characterUrl, fetchData]);

  const char = useMemo(() => {
    return character || characterData;
  }, [characterData, character]);
  return (
    char && (
      <Grid item xs={2} sm={4} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {char.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {char.gender}
            </Typography>
            <Typography variant="body2">Height: {char.height}</Typography>
            <Typography variant="body2">
              Hair color: {char.hair_color}
            </Typography>
            <Typography variant="body2">mass: {char.mass}</Typography>
            <Typography variant="body2">
              Skin color: {char.skin_color}
            </Typography>
            <Typography variant="body2">Eye Color: {char.eye_color}</Typography>
            <Typography variant="body2">
              Birth year: {char.birth_year}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  );
};

export default Character;
