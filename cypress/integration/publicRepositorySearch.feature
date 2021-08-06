Feature: Public Repository Search

    As a user, I want to see the public repositories owned by a Github user, so that I can research their contributions.

    Background: User is on the search page
        Given the user is on the search page

    # Can be run against production/ staging as real data
    @smoke
    Scenario Outline: Searching for a user that exists shows their public repositories
        Given the user searches for <username>
        Given the user presses the Show repositories for <username> button
        And the user presses the <repository> repository button
        Then the <repository> is shown

        Examples:
            | username  | repository |
            | benawad   | dogehouse  |

    Scenario Outline: Searching for a user that exists shows their public repositories
        Given there are mock user results
        Given the user searches for <username>
        Given the user presses the Show repositories for <username> button
        And the user presses the <repository> repository button
        Then the <repository> is shown
        Then the <repository> has <stars> stars
        Then the <repository> has <watchers> watchers

        Examples:
            | username  | repository           | stars | watchers |
            | timfisher | topQualityRepository | 9999  | 9999     |

    @smoke
    Scenario Outline: Searching for a user that exists shows no public repositories if they have none
    #     Given there is a user with no repositories
        Given the user searches for <username>
        Given the user presses the Show repositories for <username> button
        Then "No Repositories" is shown

        Examples:
            | username       |
            | timfisherzerto | 