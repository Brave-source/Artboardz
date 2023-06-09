import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    image: {
        type: String,
        default: ""
    },
    nationality: {
        type: String, 
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
    stakeAddress: {
        type: String,
        required: true,
    },
    artboardTag: {
        type: String,
        required: false
    },
    display: {
        type: Boolean,
        default: false
    },
    assets: {
        type: [{
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            policyId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            unit: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    display: {
        type: Boolean,
         default: false
    },
    policyIds: {
        type: [String],
        default: []
    }
}, {timestamps: true});

export default mongoose.models.User || mongoose.model("User", UserSchema)