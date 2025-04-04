
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

   * cleared
   4. This is getting complex and more complex to keep track of 
   I' ll try fixing routes for user and profile page components with followee component
   In followee component try reducing code duplicate : 

* Mar 23
1. fetch follow and following in redux for user accordingly dispatch in followee component
2. follow and unfollow button state dynamically

3. Got even more complicated,
I was thinking of fetch the uid of followers and followings for current account holder in 
redux social state but only storing uid is not advantageous cause i need to fetch those user info
using uid again anyway

so reconsidering this ig i will fetch the user objects themselves instead of uid and use pagination to
dynamically fetch them or mayb just use local state instead of using react.

* mar 24 
1. aah more bugs 
2. first fix the state for followers and followings 
3. then pagination
4. then follow and unfollow button

* Mar 25
1. completed almost all for followers and following feature
Mainly implemented context for other user's followers and following state

What's left are

2. Load more button implementation for pagination

* not cleared
3. has More status implementation for pagination
4. proper style followers and following page

* cleared
5. add functionality to follow and unfollow button
