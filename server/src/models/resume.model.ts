import mongoose, {Schema, Document} from "mongoose";

export interface IResume extends Document{
    user:mongoose.Schema.Types.ObjectId;
    fileUrl: string;
    fileType: 'pdf' | 'doc' | 'docx';
    label: string;
}

const resumeSchema:Schema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        unique:true
    },
    fileUrl:{
        type:String,
        required: true
    },
    fileType:{
        type:String,
        enum: ['pdf', 'doc', 'docx'],
        required: true
    },
    label:{
        type:String,
        default:"Main portfolio resume"
    }
},{timestamps:true});

export default mongoose.model<IResume> ("Resume",resumeSchema);