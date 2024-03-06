import {Router} from "express";
import { supabase } from "../../config.js";
import { AddProjectController, GetAllProjectController, GetOneProjectController, UpdateProjectController } from "../Controller/project.js";
import { GetAllMemberController, GetMemberController } from "../Controller/member.js";

const route = Router();

//all about member

route.get('/getallmember', GetAllMemberController)

route.get('/getmember/:member_id', GetMemberController)



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

route.get('/signup_berhasil',async (req, res) => {
    // Mendapatkan URL lengkap dari request
    const fullUrl = req.protocol + '://' + req.get('host') + req.url;

    // // Menggunakan modul url untuk mem-parsing URL
    // const parsedUrl = parse(fullUrl);

    // // Mengambil bagian hash dari URL
    // const hash = parsedUrl.hash;

    // // Menggunakan modul querystring untuk mem-parsing nilai dari hash
    // const queryParams = parseQueryString(hash.slice(1)); // Menghapus karakter '#' dari hash

    // // Mendapatkan access_token
    // const accessToken = queryParams.access_token;

    // console.log('Access Token:', accessToken);

    // // Lakukan sesuatu dengan access token, misalnya, teruskan ke fungsi tertentu
    // // atau gunakan untuk otentikasi

    res.send("halo" + fullUrl);
})




//all about project
route.get('/getallproject', GetAllProjectController);

route.get('/getproject/:project_id', GetOneProjectController)

route.post('/project', AddProjectController)

route.patch('/project', UpdateProjectController)




export {route}

