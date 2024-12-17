import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
    technologies: {
      type: [String],
      required: true,
    },
    githubLink: {
      type: String,
    },
    liveLink: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
