 ### Server Api
 
  #### Routes
  Common Route - /api/v1/users
 `````javascript
   /register 

   Request body - 
           {
               fullName : "Anish Kumar",
               email: "kumarsaket601@gmail.com",
               username: "saket11",
               password: "saket456",
               avatar : "upload your image"
               coverImage: "upload your image" (optional)
           }

   Response Body - {
          status code - 200 
             {
                 fullName : "Anish Kumar",
                 email: "kumarsaket601@gmail.com",
                 username: "saket11",
                 avatar : "upload your image"
                 coverImage: "upload your image" (optional)
                 accessToken:" encropoted",
              }
          , 
          "Succesfully Created user"
   }

   ```````
  
  ````javascript
  /login
 
     Request body - 
           {
               email: "kumarsaket601@gmail.com",
               username: "saket11",
               password: "saket456"
           }

 Response Body - {

          status code - 200 ,
          
             user:{
                 fullName : "Anish Kumar",
                 email: "kumarsaket601@gmail.com",
                 username: "saket11",
                 avatar : "upload your image"
                 coverImage: "upload your image" (optional)
                 accessToken:" encropoted",
                 refereshToken:"encropted"
              }
          , 
          "Successfully LoggedIn"
   }



   
