import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Repository } from "../generated/graphql";
import VisibilityIcon from "@material-ui/icons/Visibility";

import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import LinkIcon from "@material-ui/icons/Link";

const RepositoryDetails = ({
  name,
  stargazerCount,
  url,
  watchers,
}: Pick<
  Repository,
  "name" | "stargazerCount" | "watchers" | "url"
>): JSX.Element => {
  return (
    <NestedList
      name={name}
      stargazerCount={stargazerCount}
      watchers={watchers}
      url={url}
    />
  );
};

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

const ListItemLink = (props: any) => {
  return <ListItem button component="a" {...props} />;
};

const NestedList = ({
  name,
  stargazerCount,
  watchers,
  url,
}: Pick<Repository, "name" | "stargazerCount" | "watchers" | "url">) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <GitHubIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText
              aria-label={`${stargazerCount} users starred this repository`}
              primary={`${stargazerCount} Star${stargazerCount > 1 ? "s" : ""}`}
            />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText
              aria-label={`${watchers.totalCount} users watched this repository`}
              primary={`${watchers.totalCount} Watcher${
                watchers.totalCount > 1 ? "s" : ""
              }`}
            />
          </ListItem>
          <ListItemLink href={url} button className={classes.nested}>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText
              aria-label={`View ${name} on Github`}
              primary={`View on Github`}
            />
          </ListItemLink>
        </List>
      </Collapse>
    </>
  );
};

export default RepositoryDetails;
