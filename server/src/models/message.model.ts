import mongoose, {Schema, Document} from "mongoose";

export interface IMessage extends Document {
    name:string;
    email:string;
    message:string;
    createdAt:Date;
}

const messageSchema: Schema = new Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "Please provide your email"],
        match:[/.+\@.+\..+/, "Please fill a valid email address"],
        lowercase:true
    },
    subject:{
        type:String,
        default:"Portfolio Inquiry"
    },
    message:{
        type:String,
        required: [true, "Message body cannot be empty"],
        minlength: [10, "Message must be at least 10 characters"]
    }
},{timestamps:true});

export default mongoose.model<IMessage> ("Message", messageSchema);