import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },  
    profilePicture:{
        type: String,
        default: 
        'https://imgs.search.brave.com/l6KlMRmsGgJoxTyOOsg7GV55wujc5NhvTR_9Z021GjM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg3/ODA1MTU2L3ZlY3Rv/ci9wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_Yj0xJnM9/NjEyeDYxMiZ3PTAm/az0yMCZjPVNnbE1m/TGhWdEhySmVpMng5/YXozRndxaW42aWNw/RkRfMmxnRDBlcVpW/WkE9',
    }, 
    },{timestamps: true}
);

const User = mongoose.model('User',userSchema);

export default User;