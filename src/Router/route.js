import {Router} from "express";
import { supabase } from "../../config.js";
import { AddProjectController, GetAllProjectController, GetOneProjectController, UpdateProjectController } from "../Controller/project.js";
import { GetAllMemberController, GetMemberController } from "../Controller/member.js";
import { checkAuthSession } from "../utils/userSession.js";
import multer from "multer";
import { InsertAvatarMemberController } from "../Controller/memberavatar.js";
import { UploadProjectPicture } from "../Controller/projectpicture.js";

const route = Router();
// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//all about member

route.get('/getallmember', GetAllMemberController)

route.get('/getmember/:member_id', GetMemberController)


route.post('/upload-member-avatar', checkAuthSession, upload.single('avatar'),InsertAvatarMemberController)

// route.get('/avatar/:member_id', async(req,res)=>{

//     try {


//         const{data:datamember, error:errormember} = await supabase.from("kahlova_member").select('')

//         const { data, error } = await supabase
//   .storage
//   .from('avatars')
//   .createSignedUrl('folder/avatar1.png', 60)


        
//     } catch (error) {
        
//     }
// })



route.post('/signup_member',async(req,res) =>{

    try {
        const {email,name,password,position} = req.body;

        console.log(req.body);

        const { data, error } = await supabase.auth.signUp({
         email: email,
         password: password,
         options :{
            data:{
            name : name,
            position : position}

         }

        })
        if (error) {

            throw error
        }

        res.status(201).send({ msg : "success signup", data: data })



        
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
        
    }
})

route.post('/signin_member', async (req, res) => {

    try {

        const {email,password} = req.body

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })


        if (error) {
            throw error
            
        }

        res.status(200).send({msg : "success login", data : data})
        
    } catch (error) {
        res.status(500).send({msg : error})
        
    }


})

// route.get('/signup_berhasil',async (req, res) => {

// })




//all about project
route.get('/getallproject', GetAllProjectController);

route.get('/getproject/:project_id', GetOneProjectController)

// route.post('/project',upload.array('project',5), AddProjectController)
route.post('/project',upload.array('project',5), UploadProjectPicture,AddProjectController)

route.patch('/project', UpdateProjectController)

route.delete('/project', async(req,res) => {

    try {

        const {id} = req.body

        const {data,error} = await supabase.from("kahlova_project").delete('id',id)


        if (error) {
            throw error
        }

        res.status(200).send({msg : 'Deleted successfully'})
        
    } catch (error) {

        res.status(500).send({msg :"internal server error"})
        
    }

})




export {route}

