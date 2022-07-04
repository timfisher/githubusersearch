import {
  Button,
  createStyles,
  List,
  ListSubheader,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  PageInfo,
  Repository,
  SearchUserRepositoriesQuery,
} from "../generated/graphql";
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
  fetchMore: any;
  repositories: SearchUserRepositoriesQuery | undefined;
}

const fetchLastOnClick =
  (
    fetchMore: any,
    pageInfo: { __typename?: "PageInfo" } & Pick<
      PageInfo,
      "startCursor" | "endCursor" | "hasPreviousPage" | "hasNextPage"
    >
  ) =>
  () => {
    fetchMore({
      variables: {
        cursor: pageInfo.startCursor,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });
  };

const fetchMoreOnClick =
  (
    fetchMore: any,
    pageInfo: { __typename?: "PageInfo" } & Pick<
      PageInfo,
      "startCursor" | "endCursor" | "hasPreviousPage" | "hasNextPage"
    >
  ) =>
  () => {
    fetchMore({
      variables: {
        cursor: pageInfo.endCursor,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });
  };

/**
 * Returns a list of individual repository details in a list that can be expanded.
 *
 * @param repositories - An array of repositories to be mapped to individual dropdowns with information.
 */
const RepositoryList = ({ fetchMore, repositories }: RepositoryListProps) => {
  const pageInfo = repositories?.repositoryOwner?.repositories.pageInfo;
  const repositoryNodes =
    (repositories?.repositoryOwner?.repositories?.nodes?.filter(
      Boolean
    ) as Repository[]) ?? [];
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
      {repositoryNodes.length > 0 && pageInfo?.hasPreviousPage && (
        <Button
          variant="contained"
          style={{ marginRight: "6px" }}
          color="primary"
          onClick={fetchLastOnClick(fetchMore, pageInfo)}
        >
          Load previous 10
        </Button>
      )}
      {repositoryNodes.length > 0 && pageInfo?.hasNextPage && (
        <Button
          variant="contained"
          color="primary"
          onClick={fetchMoreOnClick(fetchMore, pageInfo)}
        >
          Load next 10
        </Button>
      )}
      {repositoryNodes.length > 0 ? (
        repositoryNodes.map(
          ({ name, stargazerCount, url, watchers }: Repository) => (
            <RepositoryDetails
              key={url}
              url={url}
              name={name}
              stargazerCount={stargazerCount}
              watchers={watchers}
            />
          )
        )
      ) : (
        <NoRepositories />
      )}
    </List>
  );
};

export default RepositoryList;
