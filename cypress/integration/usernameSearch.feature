Feature: Username search

    As a user, I want to be able to search Github users by their username, so that I can
    see a list of matches.

    Background: User is on the search page
        Given the user is on the search page

    Scenario Outline: Searching for a username that exists
        Given the user searches for <username>
        Then the <result> is shown as a user

        Examples:
            | username | result    |
            | tim      | tim       |

    Scenario: Searching for a username that does not exist
        Given the user search returns no user results
        Given the user searches for "test"
        Then the user sees "No users found"

    Scenario: Searching for a username returns an error response
        Given the user search returns an error
        Given the user searches for random user
        Then the user sees "An error has occurred fetching the data"