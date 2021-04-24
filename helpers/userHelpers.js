    var db=require('../config/connection')
    var collection=require('../config/collections')  
    module.exports={
        dosignUp:(userData,callback)=>{
                db.get().collection(collection.user_collections).insertOne(userData).then((data)=>{
                    callback(data.ops[0] )
                })
        
        },
         doLogin:async (userData,callback)=>{
    
        var data=await db.get().collection(collection.user_collections).findOne({mail:userData.mail,pass:userData.pass})
    
            callback(data)
           
        },
        readData:async (userData,callback)=>{
    
        var data=await db.get().collection(collection.user_collections).find().project().toArray()
        
            callback(data)
               
        },
        doDelete:async (userData,callback)=>{
           var data =  await db.get().collection(collection.user_collections).deleteOne({name:userData.name,mail:userData.mail,mobile:userData.mobile})
            
            callback(data)
                   
        },
        doUpdate:async (oldData,newData,callback)=>{
            var data =  await db.get().collection(collection.user_collections).updateOne({name:oldData.name,mail:oldData.mail,mobile:oldData.mobile},{
                $set:{
                    name:newData.name,
                    mail:newData.mail,
                    mobile:newData.mobile
                }
            })
             
             callback(data)
                    
         },
         doSearch:async (userData,callback)=>{
            var data =  await db.get().collection(collection.user_collections).find({name:userData.searchData}).project().toArray()
             
             callback(data)
                    
         },

 
    

    }