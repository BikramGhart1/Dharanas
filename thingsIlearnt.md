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

# Authentication and Protected Route
1. User logins with email and password 
2. we compare the hashed password with entered password
3. If correct provide token as response 
4. Token will be stored in localsotrage with certain expiry time
5. Whenever trying to access protected routes include token for requests
6. Create a middleware to authenticate the token 
7. put that middleware before the controller middleware to make protected routes