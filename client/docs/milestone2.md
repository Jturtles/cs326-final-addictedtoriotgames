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


Read: 
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/24284833/164344401-c3a70619-7c2c-444f-95cf-faf1c3179507.png">
After signing in, the system does a read call to the user database and fetches the user that has been requested.

Update: 

Delete:
# Heroku Application
https://stark-savannah-02215.herokuapp.com/


