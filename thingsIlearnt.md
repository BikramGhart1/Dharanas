# multer image handling
Frontend part
1. First of all in frontend we define a form that has enctype: 'multipart/form-data' 
This allows the handling of files too
2. Inside that form we include inputs with file type and other required inputs
3. Then we create formData objects where we append the input values before submitting through the POST request
> const formData = new FormData();

> formData.append('name':'value');

Backend Part
4. Now there will be route to handle the request
   in that route 
   > app.POST('/route',upload.single('filename'),controller);

   1. first we define authentication ofc (if needed)
   2. Then a middleware that will say where to upload the file coming from the frontend
   (This is where multer comes in)
   > upload.single('filename') // This filename should be same as the name of the file type input in frontend form ig? mostly true
   
   What really goes inside here:
      1. We import multer 
      > const multer = require('multer');
      
      2. using diskStorage method provided by multer we define in which directory we store file and with what filename
      > const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'path'); //null is error and path is the directory for eg uploads in my case
        },
        filename: function(req,file,cb){
            cb(null,'filename'); //filename can be modified
        }
      })

      3. we create an instance upload with the configured storage above in step 2 that we used as middleware in the route above
      which handles how many files can we handle, for e.g. .single() will accept a single file and .array() will accept 
      multiple files 
      > const upload=multer({storage})
    


   3. Then last could be controller middleware that handles the request
   (Here we get the image url from the loaction where image was saved using multer and save this url in database)
   > (req,res,next){
          // query to save this url in database
   }

   # TL;DR for multer
   1. Fronted form sends file 
   2. multer's upload instance (middleware) gets invoked and stores the file in configured directory
   3. controller middleware gets invoked after second step and getting image url we store this url in database

# additional:
While serving static file and sending the image's url we must include server's url too for e.g. 'http://localhost:3000/imageURL" 


# Using fs and path to manipulate files
Alright It is Mar 13 2025 today and Whole day I spent working on a simple feature and now I have PTSD on this thing

So what I was doing, When we upload a profile picture it must go somewhere right? For that initially I had created a directory called uploads and all the pfp images were being dumped there through the multer now as users grow we can't keep all their pfp in single directories so I planned to create sub directories for each user based on their uid.

I used 

> fs.mkdirSync('dirname') 

to create the directory

At first I was thinking where is directory I just made in my VS code? I even doubted if I need to run as admin to get write access and create dir but after a very long time i realized I had created uploads directoy inside controllers directory I know such a silly mistake but this too made our image url incorrect and images weren't displaying in frontend 

And I added another feature that is to delete previous pfp so that in my uploads dir images dont keep increasing unnecessarily. 

> fs.unlinkSync('filenameWithPath')

So main challenge was to configure correct path and handling the files

* note : So I learnt that static folder are used to serve the files in frontend as if they are the local files (kinda)
To be more accurate We can access the directory that is located in backend from frontend 

Use express for this

> app.use('/dirname',express.static('path'));

* These Things should have been written in backend repo but ig its okay

# Authentication and Protected Route
1. User logins with email and password 
2. we compare the hashed password with entered password
3. If correct provide token as response 
4. Token will be stored in localsotrage with certain expiry time
5. Whenever trying to access protected routes include token for requests
6. Create a middleware to authenticate the token 
7. put that middleware before the controller middleware to make protected routes

# issues

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
