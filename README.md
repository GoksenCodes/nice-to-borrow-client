# NICE TO BORROW CLIENT

Nice to borrow is an application that allows users to search for a book by its title, by language and by the distance and send a borrow request to the book owner. You don’t have to wait to travel to your hometown or wait for a visitor anymore to enjoy the books in your language.


## Table of contents:

- **[App demo](#app-demo)**
- **[Goals-for-this-project](#goals-for-this-project)**
- **[Technologies used](#technologies-used)**
- **[User stories](#user-stories)**
- **[Wireframe](#wireframe)**
- **[Data Model](#data-model)**
- **[Git workflow](#git-workflow)**
- **[Server-repo](#server-repo)**

### App demo:
![](src/images/demo/1-landing-page.png)
![](src/images/demo/2-search-by-language.png)
![](src/images/demo/3-search-by-distance.png)
![](src/images/demo/5-search-by-title.png)
![](src/images/demo/6-book-detail.png)
![](src/images/demo/8-borrow-request-success.png)
![](src/images/demo/10-get-details-from-google.png)
![](src/images/demo/11-add-a-book-success.png)

### Goals for this project
The goal of this project is to build a full-stack app by using technologies I've learned during full-stack web developer bootcamp and using new technologies and libraries that I learned by reading documentation and watching tutorial videos.

The app is still a work in progress with a clear [backlog](https://trello.com/b/gGyFYFId/nice-to-borrow).

Practice full-stack development
Apply what we learned in the bootcamp
Practice learning new technology independently
Showcase approach of development by using wireframes and user stories.
Practice disciplined git usage.
Open up the platform to my friends.

### Technologies used:

#### FRONT END: 
* [React](https://github.com/GoksenCodes/nice-to-borrow-client/blob/development/src/pages/AddABook/index.js)
* [Redux](https://github.com/GoksenCodes/nice-to-borrow-client/tree/development/src/store)
* [CSS](https://github.com/GoksenCodes/nice-to-borrow-client/blob/development/src/index.css)
* [Bootstrap](https://github.com/GoksenCodes/nice-to-borrow-client/blob/development/src/components/Book/index.js)
* [Geolocation](https://github.com/GoksenCodes/nice-to-borrow-client/blob/development/src/components/SearchBox/index.js)
 
#### BACK END: 
 
* [Express on Node.js](https://github.com/GoksenCodes/nice-to-borrow-server/blob/development/routers/auth.js)
* [REST API](https://github.com/GoksenCodes/nice-to-borrow-server/blob/development/routers/book.js)
* [Sequelize](https://github.com/GoksenCodes/nice-to-borrow-server/tree/development/models) 
* [PostGIS](https://github.com/GoksenCodes/nice-to-borrow-server/blob/development/routers/book.js)
* PostgreSQL
 
### User Stories
* As a user, I want to search the book by its title
* As a user, I want to search the available books by language
* As a user, I want to search for the available books around me
* As a user, I want to search a book by filtering my search by title, language and distance.
* As a user, I want to see details of the book I’m interested in borrowing
* As a user, I want to see if the book I’m interested in is currently available.
* As a user, I want to send a borrow request to the book owner of the book I want to borrow.
* As a user, I want to add a book to be borrowed to the platform
* As a user, I want to get the author, image and description of the book from another book platform while I’m adding the book.
 
For a more detailed overview of the project backlog and sprint backlogs please check [trello board of the project](https://trello.com/b/gGyFYFId/nice-to-borrow)

This mvp is still a work in progress. Some features still need to be implemented and revised. If you have any suggestions, please let me know [here](https://www.linkedin.com/in/goksen-gorgulu/)
 
### Wireframe
 
![](src/images/wireframes/1.png)
![](src/images/wireframes/2.png)
![](src/images/wireframes/3.png)
![](src/images/wireframes/4.png)
![](src/images/wireframes/5.png)

### Data Model
![](src/images/datamodel/data-model.png)
 
### Git workflow
In this project, I practice:
* [Good commit messages](https://github.com/GoksenCodes/nice-to-borrow-client/commits/display-books)
* [Working with separate branches](https://github.com/GoksenCodes/nice-to-borrow-client/branches/yours)
* [Sending pull requests with messages](https://github.com/GoksenCodes/nice-to-borrow-client/pull/6)
* [Reviewing the pull request and requesting changes](https://github.com/GoksenCodes/nice-to-borrow-client/pull/2)
 
### Server Repo
The server of this project is built with Express on Node.js connected to Postgres database.

[Click here to view server repo](https://github.com/GoksenCodes/nice-to-borrow-server)
 

