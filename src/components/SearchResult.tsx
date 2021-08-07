import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { Maybe } from "graphql/jsutils/Maybe";
import { useSearchUserRepositoriesLazyQuery } from "../generated/graphql";
import {
  Card,
  CardActionArea,
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
}

/**
 * Returns a user result that contains the github user name and optionally their real name. 
 * 
 * The avatar is displayed as a Material UI card with a dropdown to show their repositories. 
 * 
 * The repositories can be clicked to show stars, watchers an a link to the repository.
 *
 * @param avatarUrl - A link to the github avatar.
 * @param name - Their real name.
 * @param login - Their github id.
 */
const SearchResult = ({
  avatarUrl,
  name,
  login,
}: SearchResultProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [getRepositories, { data, loading, fetchMore }] = useSearchUserRepositoriesLazyQuery({ variables: {
    login,
    first: 10,
  }})

  console.log(data)

  const handleExpandClick = () => {
    getRepositories();
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardActionArea href={`https://github.com/${login}`}>
          <CardHeader title={login} subheader={name ?? login} />
          <CardMedia
            role="img"
            className={classes.media}
            image={avatarUrl}
            title={`${login} avatar`}
            style={{ backgroundSize: "contain" }}
          />
        </CardActionArea>
        <CardActions disableSpacing>
          <CardContent onClick={handleExpandClick}>
            <Typography
              role="button"
              align="right"
              variant="body1"
              color="textPrimary"
              aria-label={`Show repositories for ${login}`}
            >
              Show Repositories
            </Typography>
          </CardContent>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label={`Show repositories for ${login} icon`}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {loading ?   
            <Typography
              role="button"
              align="right"
              variant="body1"
              color="textPrimary"
              aria-label={`Show repositories for ${login}`}
            >
              Loading Repositories
            </Typography> :
            <RepositoryList fetchMore={fetchMore} repositories={data} />}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default SearchResult;
