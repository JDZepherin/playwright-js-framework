Feature: Login as registered user and access Homepage
Scenario Outline: Logging in with valid and invalid credentials
Given I navigate to login page
When I attempt to login with username "<username>" and password "<password>"
Then I should see the login result as "<status>"

Examples:
|username|password|status|
|dhanrajzepherin007@gmail.com|qwertyui|success|
|wrnviowv|sdjsdjn|failure|
|||failure|