# AddictedToRiotGames


# Milestone 2



# API Representation

![image](https://user-images.githubusercontent.com/74626828/164325528-ab8c8907-a27f-464f-b7ee-b2fc36a4dc8e.png)


Users are created with a username, first and last names, email, and password at Sign up.

Login calls the user API and ensures that the user exists, and if so sends it to the website's feed.

Feed calls the pictures API and gets all pictures stored in the database and displays it to the user.

Users can also direct to their profile, which calls the user API which returns personal information, as well as the picture API to retrieve pictures uplaoded by the user


# Client Interfaces
Create:
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/24284833/164344988-a5bdd56b-7199-445c-bbe9-b39d2cf5da11.png">
By clicking the sign up button after filling in the information, a user will be created as our system will send a createuser call to the database.

Read: 
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/24284833/164344401-c3a70619-7c2c-444f-95cf-faf1c3179507.png">
After signing in, our system does a read call to the user database and fetches the user that has been requested.

Update: 
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/24284833/164344797-e74bd131-91a3-4384-b1a0-5ae2672a0b51.png">
On the feed page of the website, we have an upload button that will allows users to update their feed by uploading their own photos/fit. Our system does an update call to the user database and adds another photo to the user account.

Delete:
<img width="1439" alt="image" src="./images/DeleteFunction.png">
On the profile page, there is a button that will allow the users to delete their account. Our system will make an api call to the user database and delete the users from there.

# Heroku Application
https://stark-savannah-02215.herokuapp.com/


