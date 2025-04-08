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

## Logic for searchbar in followers and followings page
So I already have a search bar that will search the users in whole database
I put two conditions in that search logic

1. Search only in joint results of either followers or followings 

2. another condition is check if we are searching for the logged in user's or other users (not logged in users)

Lets understand the architectural structure of searchbar first

1. I have the searchbar component in navbar
It has three props: 
  1. isFullLength
     if length of searchbar is full then we are calling it in followers or followings components else
     in navbar itself

  2. type
     If type is being passed it is being called from followee component else
     if it is null then we can search any users without considering type (followers or followings).
     ```
      if (type) {
         // search in followers and followings
        } else {
         // search whole users table
        }
      ``` 

  3. uid
     This is sub condition inside type
     ```
      if (uid) {
            endpoint = `http://localhost:3000/user/search/${type}/${uid}?query=${searchText}`;
          } else {
            endpoint = `http://localhost:3000/user/search/${type}?query=${searchText}`;
          }
     ```   
     If uid is passed then search the user's following and followers whose uid is being passed else
     search logged in user's

# Issues
## I'm stumbled upon few issues and bugs
1. When im trying to get search scope i.e. (followers or followings) it just gives followers
   Main issue is how im passing the type prop in searchbar component from app.jsx (routes) and as outlet

   Once this bug is fixed almost all issues will be gone

So what i need to do is handler proper context 'type' for profile and user components to pass in searchbar component
which will eventually sent to backend

should I use same context for both profile and user page? 
and how do i manipulate the context?

What I found was that:
1. I'm passing the type prop to FollowList component they are (followers or followings)
So according to this prop we render the child component dynamically

2. Now im passing another type prop to searchbar  which will let backend know where am I searching
followers or followings but the problem is these two types are not related it seems

3. For the type prop's state management im using useContext hook, but the problem here is idk when to and 
how to update the type's state that would be when the  followers or following buttons are clicked to render
the required page i.e. (followers or following);

so my target is to keep track of this type's state (specially searchbar one).

in FollowList.jsx line 17  I corrected useState to useEffect so I'll check effects later

### What was the main issue?
1. The moment ProfilePage.jsx page opens followers and followings data are fetched by dispatching reducers
2. If followers and followings are all fetched hasMore is set to false
3. When Followee.jsx page mounts fetch followers and followings dispatches once again but
this time hasMore is false so it returns empty array replacing previous array and all the data are gone

### Solution or fix
1. Only fetch and update the followers and followings when there is new data when fetched or hasMore is true
```
               if (data.length === 0 && !state.social.followers.pagination.hasMore) {
                    state.social.followers.status = 'successful';
                    return;
                }
                ```
 Here data is the payload we receiving  after fetching
 