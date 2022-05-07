
# AddictedToRiotGames
## Fit Of The Day (FOTD)
## Spring 2022

### Overview

Have you ever wanted to show off your outfit for the world to see? Fit Of The Day allows people to connect and present their personal syle daily. 
Users can create accounts and look at unique Fits influenced by trends and cultures from  all over the world. Our website Fit Of The Day also allows people to store their looks in a 'fit history', and delete any which they don't like.

## Team Members

Jason Chen

Steven Pham

Aaron Cheng

James Chen

## User Interface

### Log in 
![image](https://user-images.githubusercontent.com/74626828/167264553-6f353e1c-cf54-4933-b937-c88994a825c8.png)
- Login allows for users to either redirect themselves to Sign up and register themselves to the site, or sign themselves into the website.

### Sign up
![image](https://user-images.githubusercontent.com/74626828/167264664-add7fe83-1c98-443d-83e7-974e26ae56ad.png)
- Sign Up allows for users to create an account
### Profile
![image](https://user-images.githubusercontent.com/74626828/167264702-d59bcc90-194d-4435-930e-cf7821b55f63.png)
- Profile contains a navigation bar which allows users to reach the feed, delete, upload, signout pages.
- Displays all of the user's post history, profile picture, and personal information (name, email, etc.).
### Feed
![image](https://user-images.githubusercontent.com/74626828/167264736-120b477c-c70d-4b19-8a15-f7b4bde17e54.png)
- Feed, like Profile, contains a navigation bar which allows users to reach profile, delete, upload, and signout pages.
- Displays a single post from one of the users on the site which includes a picture of the outfit, posting user's username, date of post, and a description. 
- Users can also cycle through different posts by clicking on the arrow buttons present on the side of the page.
### Upload
![image](https://user-images.githubusercontent.com/74626828/167264760-94cb80ad-6bcd-4446-bb20-bf94c54571d2.png)
 - Also contains a navigation bar which allows users to reach profile, feed, delete, and signout pages.
 - Users can upload their pictures (.jpg, .jpeg, .png) of their fits along withdescription describing them.
### Delete
![image](https://user-images.githubusercontent.com/74626828/167264775-059bd3e0-5e2c-4921-819e-6276b7cf71fa.png)
- Contains a navigation bar which allows users to to reach profile, feed, upload, and signout pagess.
- Holds a large red delete button which deletes the user's account and redirects the no-longer existing user to the login page.


## APIs
- DeleteUser - Deletes User from User Collection
- ReadAllPosts - Gets all posts from the database.
- AddUser - Takes information submitted by new user and creates the user in the database
- FindUser - Checks if user exists in user collection.
- ValidatePassword - Authenticates User when User tries to log in
- UploadPost - Uploads a post into User collection's Picture Array (under the user's ID) as well as the Post collection
- UploadPFP - Uploads profile picture of the user to the User collection's Picture Array.
- GetUser - Gets information about User by email.

## Database

![image](https://user-images.githubusercontent.com/74626828/167241673-cfd322ec-87ce-4b2f-b954-364cdf1c7e4f.png)
#### Users
- id - Generated Unique ID to distinguish Users
- name - User generated Account Username
- pwd - User generated Account Password
- Email - User's Email which they use to sign into the website
- Pictures - Array containing all of the User's posted pictures

#### Pictures
- id - Generated Unique ID to distinguish Users
- post - Array containing the following Picture info:

- String containing image 
- Image file type
- Description 
- Posting User Account Username
- Date of Upload

## URL Routes/Mappings

- /user/delete - Calls DeleteUser API
- /post/all - Calls readallPost API
- /upload - Calls uploadPost API
- /login (GET) - Directs user to feed page.
 - /login (POST) - Calls validatePassword API
- /logout - Logs user out of the website
- /getUser - Calls GetUser API
- /signUp (GET) - Directs user to SignUp Page
- /signUp (POST) - Calls AddUser API
- /feed - Redirects to Feed page
- /profile - Redirects to Profile page
- /uploadpfp - Calls UploadPFP API

## Authentication/Authorization
 - Authentication occurs in the login page. When the user tries to sign in, we take the email and password, and we check the User collection to see if it exists and
   we check if the entered password matches the password in the collection, and allow them into the site if they do.
 - Special users permissions only allow for users to see their own posts in profile.
## Division of Labor

Jason Chen 


    - Wireframe creation of Login and Upload pages

    - Deployed website to Heroku 
    
    - Created Profile Front-End html and css
    
    - Connected Profile and added Profile Route to Databse


Steven Pham 

    - Wireframe creation of Profile page

    - Helped Setup database on MongoDB 
    
    - Created Login and Signup html and css
    
    - Connected Login and Signup 
    
    - Added both respective routes to database

James Chen 

    - Wireframe creation of feed page
    
    - Assisted in deploying app to Heroku
    
    - Planned Upload route and the required API calls it needed.
    
    - Created Upload page html and css
    
    - Added upload functionality and connected upload
    
    - Created upload route to database.  

Aaron Cheng 
    
    - Double checked and approved Wireframe designs

    - Helped Setup database on MongoDB
    
    - Created Feedpage html and css
    
    - Added Feedpage post generation functionality 
    
    - Connected and created feedpage route to database.
    
Group Efforts -

    - Designing Databases
    
    - Route Planning
    
    - Website Conceptual Design
    
    - .md file writing

Much of the programming was done in pairs, so the commit history does not reflect the division of labor accurately.
    
## Conclusion
Our project experience had a couple roadblocks, but allowed us to build upon our developer and team work skills. We faced difficulties in communicating with each other in terms of how to split the work up. It showed us that the best way was to use pair programming for code to be written in a more concise and effective manner. The design and planning process taught us all how crucial it was to have a plan of action before jumping into coding as many times we caught ourselves going back on what we decided or just being lost in general in terms of how we wanted to implement certain features. By the end of the project, we were all able learn how to set up a database, build a server to serve all frontend calls, and create cool pages that we can show off. We learned a lot from our mistakes and have all become better engineers for it.
