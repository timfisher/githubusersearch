import { Maybe, Repository } from "../generated/graphql";
import RepositoryDetails from "./RepositoryDetails";

interface RepositoryListProps {
  repositories: Maybe<Maybe<Repository>[]> | undefined;
}

const RepositoryList = ({ repositories }: RepositoryListProps): JSX.Element => (
  <ul>
    {repositories?.map((repository) => (
      <RepositoryDetails repository={repository} />
    ))}
  </ul>
);

export default RepositoryList;
