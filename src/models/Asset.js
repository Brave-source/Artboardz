import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    units: {
        type: [String],
        default: []
    },
    policyIds: {
        type: [String],
        default: []
    }
}, {timestamps: true});

export default mongoose.models.Asset || mongoose.model("Asset", AssetSchema);