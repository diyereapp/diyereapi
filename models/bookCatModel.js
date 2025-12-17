// import mongoose from "mongoose";

// const CatSchema = new mongoose.Schema(
//   {
//     catName: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Cat", CatSchema);

// models/categoryModel.js
// import mongoose from "mongoose";

// const categorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     parent: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       default: null, // null means it's a top-level category
//     },
//     image: {
//       type: String, // Store the image URL or filename
//     },
//     icon: {
//       type: String, // Emoji or icon name
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Category", categorySchema);
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // null means it's a top-level category
    },
    image: {
      type: String, // Store the image URL or filename
    },
    icon: {
      type: String, // Emoji or icon name
    },
  },
  { timestamps: true }
);

// ✅ Virtual field to get children categories
categorySchema.virtual("children", {
  ref: "Category",       // model to use
  localField: "_id",     // find categories where `parent` = this `_id`
  foreignField: "parent",
  justOne: false,         // multiple children
});

// Include virtuals when converting to JSON or Object
categorySchema.set("toJSON", { virtuals: true });
categorySchema.set("toObject", { virtuals: true });

export default mongoose.model("Category", categorySchema);
