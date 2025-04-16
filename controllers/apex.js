//THIS IS KINDA LIKE THE MAIN CONTROLLER!!
const Posts = require("../models/post.js");
const uploadToCloudinary=require("../services/upload.js")

const post=async(req,res)=>{
    try{
        let uploadedFiles=0;
        const {section,text,isFile}=req.body;
        if(!section || !text || isFile===undefined){
            return res.status(400).json("Did not send in a certain input")
        }
        if(isFile===true || isFile==="true" || isFile==="True"){
            const files=req.files;
            if(files){
                const uploadPromises = files.map(file=>{
                    let isVideo=false
                    if(file.mimetype==="video/mp4" || file.mimetype==="video/mov" || file.mimetype==="video/webp" || file.mimetype==="video/webm"){
                        isVideo=true;
                    }

                    const fileOptions={
                        folder:isVideo?"videos":"images",
                        public_url:`${section}-${Date.now()}`,
                        resource_type:isVideo?"video":"image"
                    }

                    return uploadToCloudinary(file.buffer,fileOptions)
                })

                const result = await Promise.all(uploadPromises)
                uploadedFiles= result.map(res=> res.secure_url);
            }else{
                return res.status(400).json("You have set isFiles to true yet no files were there no idiot!")
            }
            const newPostWithFiles= await Posts.create({
                section,
                text,
                isFile:true,
                files:uploadedFiles
            })

            await newPostWithFiles.save()

            return res.status(201).json({
                posts:newPostWithFiles
            })
        }
        const newPostNoFiles= await Posts.create({
            section,
            text,
            isFile
        })
        await newPostNoFiles.save()

        res.status(201).json({
            post:newPostNoFiles
        })
    }catch(e){
        res.status(500).json("Well, well the server has an issue with you: "+ e.message)
    }
}


const likes = async(req,res)=>{
    try{
        const {id}=req.body;
        if(!id){
            return req.status(400).json("Your lacking either state or id!")
        }
        await Posts.updateOne({_id:id},{$inc:{like:1}})

        res.status(201).json("DONE")

    }catch(e){
        res.status(500).json("The server disagrees"+ e.message)
    }
}

const dislikes = async(req,res)=>{
    try{
        const {id}=req.body;
        if(!id){
            return req.status(400).json("Your lacking either state or id!")
        }
        await Posts.updateOne({_id:id},{$inc:{dislikes:1}})

        res.status(201).json("DONE")

    }catch(e){
        res.status(500).json("The server disagrees"+ e.message)
    }
}

const section =async(req,res)=>{
    try{
        const section= req.body.section.toLowerCase()
        if(!section){
            return res.status(400).json("Pleas send proper data!")
        }

        const foundSection = await Posts.find({section}).sort({created: -1 })

        res.status(200).json({
            section:foundSection
        })
    }catch(e){

    }
}

module.exports= {post,likes,dislikes,section}