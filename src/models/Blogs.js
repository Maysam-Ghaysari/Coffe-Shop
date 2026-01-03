const mongoose = require("mongoose");
const schema = new mongoose.Schema(

    {
      title: {
    type: String,
    required: true,
  },
  mainTitle:{
  type: String,
    required: true,

  },
   excerpt:{
  type: String,
    required: true,

  },
     content:{
  type: String,
    required: true,

  },
   date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
    image: {
      type: String,
      default: "",
    },
   author: {
            type: String,
      required: true,
    },
      slug: { type: String }, 

    },
      {
    timestamps: true,
      }
  
)
schema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "-")
  .replace(/[^\w-]+/g, "")
  .replace(/--+/g, "-")
  .replace(/^-+|-+$/g, "");
  }
  next();

});
  schema.index({ slug: 1 },{ unique: true });


  const model = mongoose.models.Blogs || mongoose.model("Blogs", schema);
export default model;
  