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
 `````
 
  ````javascript
  /logout
 
     Request body - {}

     Response Body -{

      "data": {},
      "statusCode": 200,
      "success": "User Logged Out"
     }

`````
 ````javascript

/update-password 

method - post

       Request body - {

               "olderPassword":"saket@123",
               "newPassword":"anish@123"
     }

      Response Body   {

               "statusCode": 200,
               "success": "SuccessFully Changed Password"
    }
````

````javascript
/update-detail

method - post

       Request body - {
              "fullName":"Saket kumar",
               "email":"saket123@gmail.com"
       }

      Response Body   {

               "statusCode": 200,
               "success": "SuccessFully Changed Password"
    }
````
````javascript
/update-avatar

method - post

       Request  body - {
             avatar: fileName
       }

      Response Body  {
              "statusCode": 200,
              "success": "Uploaded avatar"
}
````
````javascript
/update-coverimage

method - post

       Request  body - {
             coverImage: fileName
       }

      Response Body {
               "statusCode": 200,
               "success": "Uploaded coverImage"
       }
````

````javascript
/get-channel/:username

method - post

       Request  body - {
             coverImage: fileName
       }
       request params - username: home

      Response Body {

            "data": {
            "_id": "659e9ea5e59cdbb8c5c201e5",
             "username": "home",
             "email": "anishkumar@gmail.com",
             "fullName": "Anish Kumar",
             "coverImage": "http://res.cloudinary.com/ddory4nqe/image/upload/v1704952941/q49w6oet91muf1j0sihr.jpg",
             "avatar": "http://res.cloudinary.com/ddory4nqe/image/upload/v1704951449/cnebpsiqhml8ztkqg9av.png",
            "subscribeTo": [],
            "isSubScribed": false
    },
    "statusCode": 200,
    "success": "User Channel Fetched Successfully"
}
````
````javascript
/watch-history

method - get

       Request  body - {}

      Response Body {
               "data": [],
               "statusCode": 200,
               "success": "watch History is fetched successfully"
           }
````
common routes 
  
````javascript

// getCommentByVideoID

/comments/:videoId

method - get

       Request  body - {}
       Request Params - videoId: any video Id
       Response Body {
                "data": [
        {
               "_id": "65c493e85ffa49ab2517558f",
               "content": "hello new bro",
               "owner": [
                {
                    "_id": "659e9ea5e59cdbb8c5c201e5",
                    "email": "anishkumar@gmail.com",
                    "fullName": "Anish Kumar",
                    "avatar": "http://res.cloudinary.com/ddory4nqe/image/upload/v1704951449/cnebpsiqhml8ztkqg9av.png"
                }
            ]
        }
             "statusCode": 201,
             "success": "fetched video comment successfully"]
           }
````

````javascript

// addCommentToVideo

/comments/:videoId

method - post

       Request  body - {
                "content": "hello saket"
        } 
       Request Params - videoId: any video Id
       Response Body {
               "data": {
               "content": "hello saket",
               "video": "65c341418df27fsdfsdfsdfsdfs",
               "owner": "sdfjhsdfsdbfhwerwerwerbndj",
               "_id": "872348dsuf344jfdvybbyb",
               "createdAt": "2024-08-27T17:54:36.524Z",
               "updatedAt": "2024-08-27T17:54:36.524Z",
    },
    "statusCode": 200,
    "success": "Comment Successfully created"
           }
````

````javascript

// updateCommentToVideo

/comments/:commentId

method - patch

       Request  body - {
                "content":"hello world"
          }
       Request Params - commentId: any comment Id
       Response Body {
               "data": {
               "content": "hello world",
               "owner": "6694e6f90890fd13f72f061d",
               "createdAt": "2024-08-27T17:54:36.524Z",
               "updatedAt": "2024-08-27T17:59:32.798Z",
    },
       "statusCode": 201,
       "success": "Updated Comment"
           }
````


````javascript

// deleteCommentFromVideo

/comments/:commentId

method - delete

       Request  body - {}
       Request Params - commentId: any comment Id
       Response Body {
                "data": {},
                "statusCode": 201,
                "success": "Successfully deleted comment"
           }
````

````javascript

// getAllVideoList

/comments/:commentId

method - delete

       Request  body - {}
       Request Params - commentId: any comment Id
       Response Body {
                "data": {},
                "statusCode": 201,
                "success": "Successfully deleted comment"
           }
````

videos

````javascript

// getAllVideo

/videos

method - get

       Request  body - {}
       Request Params - 
       Response Body {
    "data": [],
    "statusCode": 201,
    "success": "videos fetched successfully"
}
````
````javascript

// upload video

/videos

method - get

       Request  body - {
        title :"",
        description:"",
        thumbnail:"",
        videoFile:"",
       }
       Request Params - 
       Response Body {
    "data": {
        title :"",
        description:"",
        thumbnail:"",
        videoFile:"",
        owner:""
    },
    "statusCode": 201,
    "success": " Successfully Created Video"
}
````
````javascript

// VideoById
/videos/:videoId

method - get

       Request  body - {}
       Request Params - videoId
       Response Body {
        "data": {
        "_id": "fkgdjfngjkndf",
        "videoFile": "http://res.cloudinary.com/ddory4nqe/video/upload/v1707375002/pyx4yyghdnrn6sjnfoan.mkv",
        "thumbnail": "http://res.cloudinary.com/ddory4nqe/image/upload/v1707375004/kr6s2c4jkzpo9hwpujj0.jpg",
        "title": "Gamer",
        "description": "hnbvgfdfxxzs",
        "duration": 370.3,
        "view": 0,
        "isPublished": true,
        "owner": "659e9ea5e59cdbb8c5c201e5",
        "createdAt": "2024-02-08T06:50:05.687Z",
        "updatedAt": "2024-02-08T06:50:05.687Z",
        "__v": 0
    },
    "statusCode": 201,
    "success": "Video fetch Successfully"
}
````javascript

// deletVideo
/videos/:videoId

method - delete

       Request  body - {}
       Request Params - videoId
       Response Body - {
        "statusCode": 200,
    "success": "Successfully deleted"}

````
````javascript

// toggleTheVideoPublished

/videos/toggle/publish/:videoId

method - patch

       Request  body - {}
       Request Params - videoId
       Response Body - {
        "data": {
        "_id": "dfgndmfng",
        "videoFile": "http://res.cloudinary.com/ddory4nqe/video/upload/v1707295037/xclp9gr3d1sg8hbrxwsc.mkv",
        "thumbnail": "http://res.cloudinary.com/ddory4nqe/image/upload/v1707295040/pms68iprdvlxqfm8pl1u.jpg",
        "title": "pureWork",
        "description": "shdfbshdfbsdfbshdfbhsdfb",
        "duration": 370.3,
        "view": 0,
        "isPublished": false,
        "owner": "dfmngdmfngdjf",
        "createdAt": "2024-02-07T08:37:21.279Z",
        "updatedAt": "2024-08-27T19:01:16.755Z",
        "__v": 0
    },
    "statusCode": 200,
    "success": "updated published status"}
````

playlist 

````javascript

// getAllPaylist

/playlists/user/:userId

method - get

       Request  body - {}
       Request Params - userId
       Response Body - {
          "data": [
        {
            "_id": "dfgndmfg",
            "name": "song",
            "description": "Hello budy",
            "video": [
                {
                    "_id": "dfkgndfjgn",
                    "videoFile": "http://res.cloudinary.com/ddory4nqe/video/upload/v1707295037/xclp9gr3d1sg8hbrxwsc.mkv",
                    "thumbnail": "http://res.cloudinary.com/ddory4nqe/image/upload/v1707295040/pms68iprdvlxqfm8pl1u.jpg",
                    "title": "pureWork",
                    "description": "shdfbshdfbsdfbshdfbhsdfb",
                    "duration": 370.3,
                    "view": 0,
                    "isPublished": false,
                    "owner": "dfmngdjfgndfjgn",
                    "createdAt": "2024-02-07T08:37:21.279Z",
                    "updatedAt": "2024-08-27T19:01:16.755Z",
                    "__v": 0
                }
            ],
            "updatedAt": "2024-02-20T07:33:27.032Z"
        }
    ],
    "statusCode": 200,
    "success": "Fetched playlist  successfully"}

````

````javascript

// createPlaylist

/playlists

method - post

       Request  body - {
    "name":"song",
    "description":"Hello budy"
}
       Request Params - 
       Response Body - {
         
    "data": {
        "name": "song",
        "description": "Hello budy",
        "video": [],
        "owner": "sdjfknsdjkfns",
        "_id": "jfkgdfjkgdfjkghd",
        "createdAt": "2024-08-28T09:00:16.748Z",
        "updatedAt": "2024-08-28T09:00:16.748Z",
        "__v": 0
    },
    "statusCode": 200,
    "success": "Successfully Created Playlist"
    }

````

````javascript

// getPlaylistById

/playlists/:playlistId

method - post

       Request  body - {}
       Request Params - playlistId
       Response Body - {
         
    "data": [
        {
            "_id": "dfkjgdnbfjgb",
            "name": "food",
            "description": "Hello budy",
            "video": [],
            "owner": {
                "email": "saket123@gmail.com",
                "fullName": "Saket kumar"
            },
        }
    ],
    "statusCode": 200,
    "success": "Successfully Fetched Playlists"
    }

````

````javascript

// addVideoToPlaylist

/playlists/add/:videoId/:playlistId

method - patch

       Request  body - {}
       Request Params - playlistId  , videoId
       Response Body - {
         
   "data": {
        "_id": "66ceeed31beae9959705b3e1",
        "name": "food",
        "description": "Hello budy",
        "video": [
            "sdgkjdhfjkgdhfgjfgh"
        ],
        "owner": "ksdjbdkjfgdhfghkj",
      
    }}

````

````javascript

// deletePlaylist

/playlists/:playlistId

method - delete

       Request  body - {}
       Request Params - playlistId  
       Response Body -    {
         "data": {},
        "statusCode": 200,
        "success": "Successfully deleted"}

````

````javascript

// removeVideoFromPlaylist

/playlists/remove/:videoId/:playlistId

method - delete

       Request  body - {}
       Request Params - playlistId  , videoId
       Response Body - {
      "statusCode": 200,
      "success": "Successfully removes video from playlist"}

````

````javascript

// updatePlaylist

/playlists/:playlistId

method - patch

       Request  body - {
          "name": "New Food",
          "description": "best song",
       }
       Request Params - playlistId  
       Response Body - {
      "data": {
        "_id": "66ceeed31beae9959705b3e1",
        "name": "New Food",
        "description": "best song",
        "video": [],
        "owner": "6694e6f90890fd13f72f061d",
    },
    "statusCode": 200,
    "success": "Successfully deleted"}

````

Subscriptions routes


````javascript

// deleteCommentFromVideo

/subscriptions/:subscriberId

method - get

       Request  body - {}
       Request Params - subscriberId: any subscriber Id
       Response Body {
               
    "data": [
        {
            "subscriber": {
                "_id": "659e9ea5e59cdbb8c5c201e5",
                "username": "home",
                "fullName": "Anish Kumar",
                "avatar": "http://res.cloudinary.com/ddory4nqe/image/upload/v1704951449/cnebpsiqhml8ztkqg9av.png",
                "subscribedToSubscriber": false,
                "subscribersCount": 1
            }
        }
    ],
    "statusCode": 200,
    "success": "fetched channel list user"
           }
````


````javascript

// getSubscribedChannels

/subscriptions/:subscriberId

method - get

       Request  body - {}
       Request Params - subscriberId: any subscriber Id
       Response Body {
               
    "data": [
        {
            "subscriber": {
                "_id": "659e9ea5e59cdbb8c5c201e5",
                "username": "home",
                "fullName": "Anish Kumar",
                "avatar": "http://res.cloudinary.com/ddory4nqe/image/upload/v1704951449/cnebpsiqhml8ztkqg9av.png",
                "subscribedToSubscriber": false,
                "subscribersCount": 1
            }
        }
    ],
    "statusCode": 200,
    "success": "fetched channel list user"
           }
````
````javascript

// getUserChannelSubscribers

/subscriptions/:channelId

method - get

       Request  body - {}
       Request Params - channelId: any channel Id
       Response Body {
               
  "data": [
        {
            "subscriber": {
                "_id": "659e9ea5e59cdbb8c5c201e5",
                "username": "home",
                "fullName": "Anish Kumar",
                "avatar": "http://res.cloudinary.com/ddory4nqe/image/upload/v1704951449/cnebpsiqhml8ztkqg9av.png",
                "subscribedToSubscriber": false,
                "subscribersCount": 1
            }
        }
    ],
    "statusCode": 200,
    "success": "fetched channel list user"
           }
````
````javascript

// toggleSubscription

/subscriptions/:channelId

method - post

       Request  body - {}
       Request Params - channelId: any channel Id
       Response Body {
               

    "data": {
        "subscribed": true
    },
    "statusCode": 200,
    "success": "Subscribed user"
           }
````

tweets routes

````javascript

// getAllTweet

/tweets

method - get

       Request  body - {}
       Request Params - 
       Response Body     "data": [
        {
            "_id": "fgdnfgdn",
            "owner": [
                {
                    "_id": "dfgjkdfgjdnf",
                    "email": "saket123@gmail.com",
                    "fullName": "Saket kumar",
                    "avatar": "http://res.cloudinary.com/ddory4nqe/image/upload/v1724779520/hpwn4dn1umeugqf0sblb.jpg"
                }
            ],
            "content": "hello welcome to dark world",
            "createdAt": "2024-08-27T12:29:03.500Z",
            "updatedAt": "2024-08-27T12:29:03.500Z",
            "likeDetails": []
        }
    ],
    "statusCode": 200,
    "success": "Fetch all tweets"
````
````javascript

// createTweet

/tweets/tweet

method - post

       Request  body - {
                "content":"hello welcome to dark world"
      }
       Request Params - 
       Response Body   - {
         "data": {
        "owner": "sdfsdf2f061d",
        "content": "hello welcome to dark world",
        "_id": "fgdfgdfgd",
    },
    "statusCode": 200,
    "success": "tweet successfully created" }
````
````javascript

// update Tweets

tweets/:tweetId

method - patch

       Request  body - {
                "content":"hello welcome to dark world"
      }
       Request Params - tweetId : any tweet id
       Response Body   - {
        
    "data": {
        "_id": "jhkhjkhj",
        "owner": "ghjghjghjghjghj",
        "content": "new health",
       
    },
    "statusCode": 201,
    "success": "Updated tweet successfully" }
````
````javascript

// delete Tweet

tweets/:tweetId

method - patch

       Request  body - {}
       Request Params - tweetId : any tweet id
       Response Body   - {
        
                "data": {},
               "statusCode": 200,
             "success": "deleted tweet successfully"
              }
````
likes the video , comment , tweet

````javascript

// get all likes video list

/likes/videos

method - get

       Request  body - {}
       Request Params - 
       Response Body   - {
         "data": [
        {
            "_id": "dfgdfgdfgd",
            "video": {
                "_id": "fgjdnfgjn",
                "videoFile": "http://res.cloudinary.com/ddory4nqe/video/upload/v1707295037/xclp9gr3d1sg8hbrxwsc.mkv",
                "thumbnail": "http://res.cloudinary.com/ddory4nqe/image/upload/v1707295040/pms68iprdvlxqfm8pl1u.jpg",
                "title": "pureWork",
                "description": "shdfbshdfbsdfbshdfbhsdfb",
                "duration": 370.3,
                "view": 0,
                "isPublished": false,
                "owner": {
                    "_id": "dfgdfgdfgdf",
                    "username": "home",
                    "email": "anishkumar@gmail.com",
                    "fullName": "Anish Kumar",
                    "avatar": "http://res.cloudinary.com/ddory4nqe/image/upload/v1704951449/cnebpsiqhml8ztkqg9av.png"
                },
            }
        }
    ],
    "statusCode": 200,
    "success": "fetched liked video"
              }
````
````javascript

// toggleVideoLikes

/likes/toggle/v/:videoId


method - post

       Request  body - {}
       Request Params - videoId : any video id
       Response Body   - {
           "statusCode": 200,
    "success": {
        "isLiked": false
    }
              }
````
````javascript

// toggleCommentLike
/likes/toggle/c/:commentId


method - post

       Request  body - {}
       Request Params - commentId : any comment id
       Response Body   - {
         
    "statusCode": 200,
    "success": {
        "isLiked": false
    }"isLiked": false
    }
              
````
````javascript

// toggleTweetLikes
/likes/toggle/t/:tweetId


method - post

       Request  body - {}
       Request Params - tweetId : any tweet id
       Response Body   - {
         
    "statusCode": 200,
    "success": {
        "isLiked": false
    }
    }
              
````