# practica5_Sandra

Practica 5:

Link: https://github.com/sansabando/practica5_Sandra.git

Part Two: Integration with The Movie Database API
In the second part of this activity, a new functionality will be added that allows the application to connect with The Movie Database (TMDb) API to search for movies and work with external data. This section will help students understand how to interact with REST APIs, how to send and receive HTTP requests, and how to integrate data from external sources into their web applications. Additionally, students will learn to manage API key security and implement advanced features that enhance the user experience.



Objectives of the Second Part
API Integration: Learn how to connect with a REST API, make GET requests, and handle data in JSON format. Understand the structure of an API, including endpoints, authentication, and responses.
Functionality Expansion: Allow users to search for movies through the TMDb API and integrate them into the local database. This functionality will add a new dimension to the project, offering more complete and accurate information about movies, obtained from an external source.
Improvement of User Experience: Add a search functionality that lets users find and add movies without manually entering them. This will not only simplify the movie management process but also enrich the database with detailed and visually appealing information.


Requirements for this Part
Create a Search View: Create a search view that allows users to enter the name of a movie they want to search for in TMDb. This view should be intuitive and enable easy interaction with the application, ensuring a good user experience.
Use the TMDb API: Use the TMDb API to perform a search and display the results in the application's interface. The results should include as much information as possible, such as the title, poster, synopsis, and other relevant details.
Add Movies from TMDb to the Local Database: Provide an option for users to add movies from the TMDb search results to the local database, allowing more efficient management and reducing errors when manually adding information.


TMDb API Setup
To start working with the TMDb API, you need to obtain an API key. To do this, register on The Movie Database and request a free API key. This key will be used to authenticate requests made to the API. It’s important to keep the key secure and not expose it in public code, as this could compromise access to the API. It is recommended to store the key in a separate configuration file or use environment variables.



Getting Started with the TMDb API
Welcome to version 3 of The Movie Database (TMDb) API. Here you will find a complete list of available methods to interact with our API for movies, TV shows, actors, and images. Below are the necessary steps to start using the API:



Step 1: Select a Programming Language
The TMDb API can be used with various programming languages. Some of the most common include:

Shell
Node.js
Ruby
PHP
Python
Java
JavaScript
For this exercise, we will focus on JavaScript to integrate it directly into our web application.



Step 2: Authentication and API Key Retrieval
To use the API, you need to obtain an API key. This is done by registering on The Movie Database. After registering and creating an account, you will have access to your API key in your account settings panel.

Authentication is done via a header that contains the authorization key:

Header: Authorization
It is important to protect your API key and avoid exposing it in public source code. You can use techniques such as storing the key in a configuration file or environment variables.



Step 3: Make the First Request
Once you have the API key, you can start making requests to the TMDb API. Below is an example of how to make a request to authenticate and test the connection:

javascript
Copiar código
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
};
 
fetch('https://api.themoviedb.org/3/authentication', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
 
This example shows how to make a GET request using fetch(), which is a native JavaScript method for handling HTTP requests. The request URL points to TMDb's authentication endpoint. In the headers, the accept: 'application/json' header specifies the expected response format.

You can test this code snippet in your browser’s console or integrate it into your project to verify that your API key works correctly.





New Features to Implement


1. Movie Search View
You should create a new view called searchView(), which will allow users to enter a search term (e.g., a movie title). This view should include a text input field and a search button. Additionally, it should provide a clear and attractive interface that invites users to interact with the application. The view should also account for scenarios where no results are found, showing appropriate messages to guide the user.



2. Controller to Search for Movies
Create a new controller searchContr(query) responsible for making the request to the TMDb API. This controller should:

Take the search term entered by the user and validate it, ensuring that it is not empty or contains invalid characters.
Make a GET request to the TMDb API using the API key. It is recommended to handle possible errors in the request, such as lack of internet connection or an invalid API key.
Process the response and display the results through a new view resultsView(results). The response should be processed to extract the relevant information, and if no results are found, the user should be clearly notified.
An example of the code needed to make the search request would be:

javascript
Copiar código
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer YOUR_API_KEY'
  }
};
 
fetch('https://api.themoviedb.org/3/search/movie?query=' + query, options)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    // You can call the resultsView(response.results) function here to display the results
  })
  .catch(err => console.error(err));
This snippet performs a search for movies in TMDb using the term entered by the user. The results are processed and passed to the view for display.





3. Search Results View
Implement the resultsView(results) view, which will be responsible for displaying the results obtained from the API. Each result should include the movie title, poster (if available), release date, and an "Add" button that allows the user to add the movie to the local database. The view should be well-organized, displaying the results in a grid or list format to facilitate user navigation and selection.





4. Add Movies from the API to the Local Database
Create a new controller addFromAPIContr(movie) that allows adding a movie from the search results to the local database (localStorage). This controller should take the details of the selected movie and store them in the movie array, following the same structure as manually created movies. It is important to check if the movie already exists in the database to avoid duplicates, and if it does, notify the user with an appropriate message.





Router Update
New classes and actions should be added to the router to handle the new events:

search: Class associated with the search button in the search view. Calls the searchContr(query) controller. This event should be triggered when the user presses the search button or the Enter key in the search field.
add-from-api: Class associated with the "Add" buttons in the search results. Calls the addFromAPIContr(movie) controller. The button should be temporarily disabled while the movie is being added to prevent the user from pressing it multiple times.


Tasks for Part Two
Implement the Search View: Create a new searchView() that includes a text field and a search button. Ensure the interface is clear and user-friendly, and that the view handles cases where no valid search terms are entered.
Add the Search Functionality: Implement the searchContr(query) controller to connect with the TMDb API and retrieve results. Handle network and API errors appropriately, and provide clear messages to the user if no results are found or technical issues arise.
Display Search Results: Create the resultsView(results) to display the movies found in the API. The view should be attractive and allow easy navigation of the results, with relevant information and clear buttons to add the movies to the local database.
Add Movies to the Local Database: Implement the addFromAPIContr(movie) controller to allow users to add a movie from the results to the local database. Ensure data is validated before adding, avoid duplicates, and confirm the operation's success to the user.
Update the Router: Add the necessary new actions to the router to handle the new buttons and events, ensuring that the search and movie addition functionalities are well-integrated into the overall application flow.


This second part of the exercise will allow students to work with HTTP requests, process responses in JSON format, and learn how to effectively integrate external data. It will also provide an opportunity to handle errors and exceptions in API requests and learn how to design a more robust and complete user experience. Upon completing this part of the exercise, students will have an application with significantly expanded functionality, capable of connecting to external services to enrich the available information and improve user interaction.
