# WeatherAPI
Pulling weather data from external API and saving it in a database

Setting up the App
#Database
---------
_> Download PostgreSQL
_> In command line, navigate to project root folder
_> Create table from database.sql file
	
#Node and Express
-----------------
_> Download Node.js
_> In command line, run npm init
_> In command line, run npm install express

#Running the App
----------------
_> In command line, navigate to project 'bin' folder 'Weather_API\bin'
_> type ‘node appurl.js’
_> Should get notification in command prompt window that the server has started

App Functionality
#Index.html
-----------
_> Open a browser (preferably Chrome) and navigate to localhost:3000/
_> User should be able to search for weather data by both city and state
_> When 'Search City' button is clicked, data should display on the screen
_> User can add a comment that will be saved to the database when the ‘Save Data’ button is clicked
_> User will have the ability to save data in the database using the ‘Save Data’ button
	_> When selected, a row will be created in the database

#All.html
---------
_> User should see all data in the database on this page
_> When a user id is selected, the user should be redirected to the item page

#Item.html
----------
_> User should see data for a specific row given the passed-in ID
_> User has the ability to update the comment for that row
	_> App should display a message that the comment has been updated
_> User has the ability to delete the data for the given ID row
	_> App should display a message that the weather data has been deleted
	_> App should redirect the user back to All.html
