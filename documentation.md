# Features / Requirements
1. User can Post, comment, like the posts
2. User can reply to comments
3. user can view posts
4. user can customize their profile (Change pfp, Edit username and details )
5. user can perform CRUD operations on Post and comments
6. User can track their activities like, likes and comments 
7. If possible I'm thinnking of adding a feature like 'like' where everyone can see what user has liked?
   (Or maybe just give user to be able to make their liked contents seen by everyone or just keep it private)

# Roadmap
1. First I will create login page
  a. User will create an account 
  b. user credentials will be sent to backend
  c. authentication and authorization will be given to user
   If user already has an account make them able to login useing email and password

2. I will create navbar and sidebar accordingly to designs   

3. I will create Home page where user will see different posts from other users

4. I will create a profile dashboard and customization of user
   a. User can upload their pfp, update name and user details
   b. User can view their activities like liked and comments and see their overall report stats
   c. also They can see their posts and no of likes and comments on them 

5. I will create a page that allows user to upload posts like text, images and videos

# Things to consider                                                                             
1. Form and user data validations
2. Responsiveness
3. Dynamic content changes
4. optimization:
   > Memoizition
   > Pagination


# today's log
# 25 Feb
1. I made login function to get token from backend when password is correct
2. But Hashing and storing the actual data from sign up in database part is still left 
3. Then protected routes implementation left to do

# I forgot to keep track of previous logs so directly today's log
# 8 March
1. Created a Layout page that will shape the navbar sidebars and main content
2. created navbar, sidebars and homepage and profile picture page
3. user can upload the profile picture image
> Next I'll implement how image's url can be sent to database and design overall user profile page


# issues

# March 18
1. Using nested routes implemented followings and followers components

* Things left to do (cleared)
2. Still issues in route indexings need to fix them
3. apply backend with the searching users
4. toggle the close and open followee window

* solved
1. when user search their own account pfp is not appeating Navbar: 29 line

2. implement follow logics

* Mar 22
1. Follow and unfollow button setup manage the state of followed or unfollowed
check if the id we just clicked followed already exists in our following list and then set buttons accordingly
2. fetch the followers and following id in redux
3. display them dynamically 
4. apply pagination 
5. also optimization

6. (Priority high) 
what i current can do:
   1. I can follow and unfollow a user
   2. I can fetch followers and followings of current user
What needs to be done:
   1. State management for fetched followers and followings
   2. state management for other user's followers and followings
   3. State management for follow and unfollow button based on followed or unfollowed in redux
   4. This is getting complex and more complex to keep track of 
   I' ll try fixing routes for user and profile page components with followee component
   In followee component try reducing code duplicate : 