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

// Mui custom link so we can link to their github page
const ListItemLink = (props: any) => {
  return <ListItem button component="a" {...props} />;
};

/**
 * Returns the details for a single repository which can be expanded.
 *
 * @param name - The name of the repo
 * @param stargazerCount - The number of stars on the github repo
 * @param url - The link to the repository
 * @param watchers - The number of watchers on github repo
 */
const RepositoryDetails = ({
  name,
  stargazerCount,
  url,
  watchers,
}: Pick<
  Repository,
  "name" | "stargazerCount" | "watchers" | "url"
>): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem aria-label={`${name} repository`} button onClick={handleClick}>
        <ListItemIcon>
          <GitHubIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            href={`${url}/stargazers`}
            button
            className={classes.nested}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText
              aria-label={`${stargazerCount} users starred this repository`}
              primary={`${stargazerCount} Star${stargazerCount > 1 ? "s" : ""}`}
            />
          </ListItemLink>
          <ListItemLink
            href={`${url}/watchers`}
            button
            className={classes.nested}
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText
              aria-label={`${watchers.totalCount} users watched this repository`}
              primary={`${watchers.totalCount} Watcher${
                watchers.totalCount > 1 ? "s" : ""
              }`}
            />
          </ListItemLink>
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
