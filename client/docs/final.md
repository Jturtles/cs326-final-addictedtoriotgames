
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
- Users can also cycle through different posts by clicking on the arrow button present on the side of the page.
### Upload
![image](https://user-images.githubusercontent.com/74626828/167264760-94cb80ad-6bcd-4446-bb20-bf94c54571d2.png)
 - Also contains a navigation bar which allows users to reach profile, feed, delete, and signout pages.
 - Users can upload their pictures (.jpg, .jpeg, .png) of their fits along withdescription describing them.
### Delete
![image](https://user-images.githubusercontent.com/74626828/167264775-059bd3e0-5e2c-4921-819e-6276b7cf71fa.png)
- Contains a navigation bar which allows users to to reach profile, feed, upload, and signout pagess.
- Holds a large red delete button which deletes the user's account and redirects the no-longer existing user to the login page.


## APIs
- 

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
- Image Location
- Description 
- Posting User Account Username
- Date of Upload

## URL Routes/Mappings

- /user/delete - Deletes User from User Collection
- /post/all - Gets all posts from Post Collection
- /upload - Uploads picture and picture information into User's Pictures Element and Post Collection
- /login (GET) - Directs user to feed page.
- /login (POST) - Authenticates the User logging in
- /logout - Logs user out of the website
- /getUser - Retrieves tuple about the user from User collection
- /signUp (GET) - Directs user to SignUp Page
- /signUp (POST) - Creates user
- /feed - Redirects to Feed page
- /profile - Redirects to Profile page
- /uploadpfp - Uploads a profile picture

## Authentication/Authorization

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

