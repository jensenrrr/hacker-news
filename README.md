
# Nextech HackerNews App

## Goal

Angular and .NET Core application that displays new stories from the Hacker News API and allow users to search those stories.

## Initial Design

### Frontend

The frontend architecture looks fairly simple. Design is a little awkward, I'm essentially thinking of how I would do it in a React app and may be missing out on some Angular best practices.

Services:

- NewsService: In charge of managing our data, which consists of our array of hacker-news-stories:
  - loadNewStories(storiesToLoad): Calls a GET request to our backend at "api/loadNewStories?{storiesToLoad}".
    - This is mostly backend design, but the requirements seemed to indicate we should load stories incrementally as the user reaches the bottom of the page. storiesToLoad is a number showing how many stories we've loaded already, so if storiesToLoad == 20 then the backend knows to send us stories 21-40.
  - searchNewsStories(searchTerm): Calls a GET request to our backend at "api/search?{searchTerm}".

Components:

- hacker-news-card: Display information for a Hacker News Story given the appropriate data.
- search-bar: Takes in user input.
- app-component: Parent Component. Displays the search-bar at the top and a list of hacker-news-cards below it.
  - onInit -> Calls loadNewStories(0).
  - User reaches end of stories -> calls loadNewStories(storiesToLoad)

### Backend

Our backend is a simple web API that gets new Hackers News stories and caches them. Caching the stories is a requirement of the coding assessment, but it comes with benefits and drawbacks.

- Benefits: We don't have to call the hacker news api to get our news stories, which means we respond to the client faster and don't run the risk of getting rate limited by over active clients. It's also easier to incrementally serve stories to the client, since the data is static in between our calls to the hacker news api.
- Drawbacks: The user isn't getting the most up to date new stories and if our server updates the cache while the user already has stories loaded, we have the issue of possibly loading the same stories again.

Tasks?: Call "/v0/newstories" every x minutes to get the latest 500 news stories. Store them inside our .NET application as an "stories" object.

API:

- api/loadNewStories?{storiesToLoad}: returns a subset of the stories object from index {storiesToLoad} to index {storiesToLoad + x} (x is however many stories we want to return.
- api/searchNewStories?{searchTerm}: returns all stories that have a title or by attribute that contain the string {searchTerm}.

## Frontend Development

I had worked in AngularJS both in college on a team project and in Infinite Energy's customer management site, but this is the first Angular application I had made from scratch by myself.

I primarily used the [Angular Docs ](https://angular.io/docs) to learn the basics of how Angular works and what syntax I needed. Having a considerable amount of experience with React, I found that knowledge translated into Angular fairly well.

The biggest time sink I ran into was an issue with SSL when making calls to the backend. I eventually found out I can run "ng serve -ssl true" and ran into chrome telling me the application was unsafe. I tried to quickly fix that by generating an SSL and installing it on my computer, but that didn't work and I left it as is since it was working for the purposes of this assessment.

### Final Design Review

This final design largely follows my initial design, except that I was too lazy to put the search-bar in it's on component, which I would've done if I was working on a professional or permanent application.

Outside of the search-bar, however, I realized that the home component and NewsService had too much responsibility. I think that the HTTP calls should be moved into their own service and NewsService should take over handling the story data, leaving the home component with only the duty of displaying data from NewsService to the user and handling user interaction.

The other problem with the final design is that unit tests have not been added yet (other than the Angular default tests).

The next two steps in development would be to refactor the search Component, NewsService, and home component and then to add unit tests.
