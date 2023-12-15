const mongoose = require("mongoose");
const nutriSchema = new mongoose.Schema(
    {
        nutridata: {
          type: [String],
          required: [true, "Data is required"],
    },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );
    
module.exports = mongoose.model("nutrientry", nutriSchema);
    