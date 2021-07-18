import {
  createStyles,
  List,
  ListSubheader,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Repository } from "../generated/graphql";
import RepositoryDetails from "./RepositoryDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

/**
 * Returns if the user has no public repositories
 */
const NoRepositories = () => (
  <Typography variant="body2" color="textSecondary" component="p">
    No Repositories
  </Typography>
);

interface RepositoryListProps {
  repositories: Repository[];
}

/**
 * Returns a list of individual repository details in a list that can be expanded.
 *
 * @param repositories - An array of repositories to be mapped to individual dropdowns with information.
 */
const RepositoryList = ({ repositories }: RepositoryListProps) => {
  const classes = useStyles();
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Repositories
        </ListSubheader>
      }
      className={classes.root}
    >
      {repositories.length > 0 ? (
        repositories.map(({ name, stargazerCount, url, watchers }) => (
          <RepositoryDetails
            key={url}
            url={url}
            name={name}
            stargazerCount={stargazerCount}
            watchers={watchers}
          />
        ))
      ) : (
        <NoRepositories />
      )}
    </List>
  );
};

export default RepositoryList;
