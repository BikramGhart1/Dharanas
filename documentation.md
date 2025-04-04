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

## Logic for follow and unfollow button's state and text
First of all when we visit a user's profile we get to see their details and a button which could be
follow or unfollow accordingly, to decide if the button should be follow or unfollow,

1. I could have search for the user's id in following state in redux state
but the problem is im using pagination and what if all the users are not fetched yet
this would cause the match id be false and show that we are not following the user

2. So to avoid this problem, I decided to send a get request which takes the user's id 
and checks if it exists in database and returns a boolean value.
if isFollowing is true then put button's text as 'unfollow' else 'follow' 

* This appraoch is not really practical or efficient cause we would be sending the request each time 
user page is visited
I'll be using this approach for a while 

