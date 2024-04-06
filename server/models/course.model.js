import { Model, Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type:String
    },
    description: {
        type:String
    },
    catagory: {
        type:String,
    },
    thumbnail: {
        public_id: {
            type:String
        },
        secure_url: {
            type:String
        }
    },
    lectures: [{
        title: String,
        description: String,
        lecture: {
             public_id: {
            type:String
        },
        secure_url: {
            type:String
        }
            
        }
    }],
    numberOfLectures: {
        type: String,
        
    }
}, {
    timestamps:true
})

const Course = new Model('Course', courseSchema);

export default Course;