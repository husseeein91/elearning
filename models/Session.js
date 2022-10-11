const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SessionSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"],
    required: true,
  },
  stage: {
    type: String,
    enum: ["Primary", "Preparatory", "Secondary"],
    required: true,
  },
  students: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
      secondChance: {
        type: Boolean,
        default: false,
      },
      homeworkDegree: {
        type: Number,
        default: null,
      },
      quizDegree: {
        type: Number,
        default: null,
      },
      reQuizDegree: {
        type: Number,
        default: null,
      },
    },
  ],
  homework: {
    name: {
      type: String,
    },
    mcqs: [
      {
        question: {
          type: String,
          required: true,
        },
        A: {
          type: String,
          required: true,
        },
        B: {
          type: String,
          required: true,
        },
        C: {
          type: String,
          required: true,
        },
        D: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: String,
          enum: ["A", "B", "C", "D"],
          required: true,
        },
      },
    ],
    tofs: [
      {
        question: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: String,
          enum: ["True", "False"],
        },
      },
    ],
  },
  quiz: {
    name: {
      type: String,
    },
    mcqs: [
      {
        question: {
          type: String,
          required: true,
        },
        A: {
          type: String,
          required: true,
        },
        B: {
          type: String,
          required: true,
        },
        C: {
          type: String,
          required: true,
        },
        D: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: String,
          enum: ["A", "B", "C", "D"],
          required: true,
        },
      },
    ],
    tofs: [
      {
        question: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: String,
          enum: ["True", "False"],
        },
      },
    ],
    duration: {
      type: Number,
    },
    maxDegree: {
      type: Number,
    },
  },
  reQuiz: {
    name: {
      type: String,
    },
    mcqs: [
      {
        question: {
          type: String,
          required: true,
        },
        A: {
          type: String,
          required: true,
        },
        B: {
          type: String,
          required: true,
        },
        C: {
          type: String,
          required: true,
        },
        D: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: String,
          enum: ["A", "B", "C", "D"],
          required: true,
        },
      },
    ],
    tofs: [
      {
        question: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: String,
          enum: ["True", "False"],
        },
      },
    ],
    duration: {
      type: Number,
    },
    maxDegree: {
      type: Number,
    },
  },
  videos: [
    {
      name: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        default: 2,
      },
    },
  ],
  files: [
    {
      name: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
  ],
  expiresIn: {
    type: Number,
    default: 48,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Session = mongoose.model("session", SessionSchema);
