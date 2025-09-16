# Lab 1 - Login & Register App

**Name:** Ekjot Kaur  
**Course:** Advanced Web Applications  
**Lab:** 1

### Features
- User registration with form validation
- Login with error handling
- "Remember Me" checkbox
- Styled with Bootstrap, gradients, icons
- MongoDB + Express backend integration

### Reflections
I encountered difficulties while working on this project, particularly with the login section.  The registration page was functioning OK, however it kept failing when I attempted to log in using the same credentials.  I was unsure about how to correctly connect the backend, frontend, and MongoDB because I don't have much experience with the entire MERN authentication process.  I looked through a number of internet guides and documents to resolve this.  I examined the typical login and authentication setups for MERN apps, with a focus on Express routes, bcrypt, and MongoDB.  I then revised and modified the code to fit the configuration of my own project.  Before the login eventually functioned, the majority of the time was spent testing and resolving issues.

### Notes on Styling
I utilized simple Unicode symbols and emojis, such ✅ (success), ❌ (error), 🚫 (not allowed), etc., to display status signals, such as success or error.
These are simply standard text characters that function on the majority of computers; they are not borrowed from any other library.
I simply used them to improve the clarity and usability of messages for debugging.

In order to make the webpage appear cleaner and more contemporary, I also employed a few fonts.  
This was primarily done for presentational reasons, making sure that the register and login pages not only functioned but also looked good.  
I imported React icons and framer motion for this purpose.




### For Test 1 part 2

 Discussion Board - Test 1 Part 2

This project was created as part of **Test 1 - Part 2** for my Web Development course.  
The objective was to reuse the Discussion Board code and add **Like/Dislike functionality**.

## This is how you can access my "board" webpage
1.Connect to: http://localhost:5173/register (it is necessary)
2. After that, fill out the Registration form (without this, you cannot approach)
3.	Fill out the Login page : http://localhost:5173/login
4.	Then you will see our Discussion board:  http://localhost:5173/board 
     -- where you will see your (username) (that you entered during "registeration") with welcome and as well as whenever you click on like or dislike  radio button.

##  Features
- Signup and Login with MongoDB
- Discussion Board with sample posts
- Each post has:
  - 👍 Like button (+1)
  - 👎 Dislike button (-1)
  - Count displayed between Like/Dislike
  - User feedback (e.g., "Ekjot liked this 👍")
- Responsive UI with Bootstrap
- Animations using Framer Motion

I also used **YouTube tutorials** for education and direction in order to gain a better understanding of how to handle MongoDB, style the components, and integrate React with backend APIs.  Beside this , if i encounter some errors like "extra bracket () or semicolon;" it was automatically suggested by vscode to correct the mistake. 
