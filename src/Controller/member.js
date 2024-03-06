import { supabase } from "../../config.js";

const GetAllMemberController = async(req,res)=>{
    try {

        const {data,errors} = await supabase.from("kahlova_member").select("*")

        if (errors) {
            throw errors
            
        }


        res.status(200).send({msg : "success mengambil data member ",data : data});
        
    } catch (error) {
        res.status(500).send({msg:"internal server error",err : error});
    }
}


const GetMemberController = async(req, res) => {
    try {

        const memberid = req.params.member_id
        const {data,error} = await supabase.from("kahlova_member").select("*").eq('id',memberid)

        if (error) {
            throw error
            
        }


        res.status(200).send({msg : "berhasil mengambil member", data : data})
        
    } catch (error) {

        res.status(500).send({msg : "gagal mengambil member"})
        
    }

}



export {GetAllMemberController,GetMemberController}