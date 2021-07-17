Feature: Public Repository Search

    As a user, I want to see the public repositories owned by a Github user, so that I can research their contributions.

    Background: User is on the search page
        Given the user is on the search page

    Scenario Outline: Searching for a user that exists shows their public repositories
        Given the user searches for <username>
        Then the <repository> is shown

        Examples:
            | username  | repository |
            | timfisher | ddd        | 
            | timfisher | bitmon     |