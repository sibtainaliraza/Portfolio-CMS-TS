import mongoose, { Schema, Document} from "mongoose"

export interface IBlog extends Document {
    title:string;
    slug:string;
    content: string;
    tags: string [];
    author:string;
    isPublished: boolean;
}

const blogSchema: Schema = new Schema({
    title:{
        type:String,
        required:[true,"Blog title required"],
        trim: true
    },
    slug:{
        type:String,
        unique: true,
        lowercase: true
    },
    content:{
        type:String,
        reuired:[true, " Content cannot be empty"]
    },
    tags:[{
        type:String,
    }],
    author:{
        type:String,
        default: false
    }
}, {timestamps: true});

export default mongoose.model<IBlog> ("Blog", blogSchema);