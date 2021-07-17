Feature: Avatar search

    As a user, I want to see an avatar of the matches, so I can recognise anyone I may know.

    Background: User is on the search page
        Given the user is on the search page

    Scenario Outline: Searching for a user that exists shows their avatar
        Given the user searches for <username>
        Then the <username> avatar is shown

        Examples:
            | username  |
            | timfisher |