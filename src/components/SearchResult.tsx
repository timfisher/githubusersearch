import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { Maybe } from "graphql/jsutils/Maybe";
import { Repository } from "../generated/graphql";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { RepositoryList } from ".";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      marginTop: 15,
      marginBottom: 5,
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

interface SearchResultProps {
  avatarUrl: string;
  name: Maybe<string> | undefined;
  login: string;
  repositories: Maybe<Maybe<Repository>[]> | undefined;
}

const SearchResult = ({
  avatarUrl,
  name,
  login,
  repositories,
}: SearchResultProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardHeader title={login} subheader={name ?? login} />
        <CardMedia
          className={classes.media}
          image={avatarUrl}
          title={`${login} avatar`}
          style={{ backgroundSize: "contain" }}
        />
        <CardActions disableSpacing>
          <CardContent onClick={handleExpandClick}>
            <Typography align="right" variant="body1" color="textPrimary">
              Show Repositories
            </Typography>
          </CardContent>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show repositories"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <RepositoryList
              repositories={repositories as Repository[]}
              login={login}
            />
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default SearchResult;
