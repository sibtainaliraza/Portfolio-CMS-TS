import mongoose, {Schema, Document} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document{
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema = new Schema({
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true
    },
    password:{
        type: String,
        required: true,
        // select:false
    }
},{timestamps:true});

userSchema.pre("save", async function (this:IUser) {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12)
});

userSchema.methods.comparePassword = async function(password: string): Promise<boolean>
{
    const user = this as IUser;

    if(!user.password)
    {
        console.error("DEBUG: Password missing from database record");
        return false;
    }
        

        return await bcrypt.compare(password, user.password);
};

export default mongoose.model<IUser> ("User", userSchema);