const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const multer = require("multer");

const isModerator = require("../../middleware/isModerator");
const Session = require("../../models/Session");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("image must be JPEG, JPG OR PNG"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
  fileFilter: fileFilter,
});

// @route GET api/sessions
// @desc get all sessions
// @access private
router.get("/", [isModerator], async (req, res) => {
  try {
    const sessions = await Session.find().sort({ date: -1 });
    return res.json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/sessions
// @desc create session
// @access private
const createSessionValidator = [
  check("name", "Session Name Is Required").not().isEmpty(),
  check("stage", "Stage Of the Session Is Required").not().isEmpty(),
  check("level", "Level Of the session is Required").not().isEmpty(),
  check("expiresIn", "Expire Duration is Required").not().isEmpty(),
  check("price", "Price Of the session is Required").not().isEmpty(),
  isModerator,
];
router.post("/", createSessionValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, stage, level, expiresIn, price } = req.body;
    const session = new Session({
      name,
      stage,
      level,
      expiresIn,
      price,
    });
    await session.save();
    return res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/sessions/edit/:id
// @desc edit session
// @access private
router.post("/edit/:id", createSessionValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, stage, level, expiresIn, price } = req.body;
    let session = await Session.findById(req.params.id);
    if (!session)
      return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
    session.name = name;
    session.stage = stage;
    session.level = level;
    session.expiresIn = expiresIn;
    session.price = price;
    await session.save();
    return res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/sessions/:id/add-homework
// @desc add homework
// @access private
router.post(
  "/:id/add-homework",
  [isModerator, check("name", "Name is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    const homework = {
      name,
      mcqs: [],
      tofs: [],
    };
    try {
      let session = await Session.findById(req.params.id);
      if (!session)
        return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
      session.homework = homework;
      await session.save();
      return res.json(session);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/sessions/:id/edit-homework
// @desc edit homework
// @access private
router.put(
  "/:id/edit-homework",
  [isModerator, check("name", "Name is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name } = req.body;
      let session = await Session.findById(req.params.id);
      if (!session)
        return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
      session.homework.name = name;
      await session.save();
      return res.json(session);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/sessions/:id/delete-homework
// @desc delete homework
// @access private
router.delete("/:id/delete-homework", [isModerator], async (req, res) => {
  try {
    let session = await Session.findById(req.params.id);
    if (!session)
      return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
    session.homework = {};
    await session.save();
    return res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/sessions/:id/add-quiz
// @desc add quiz
// @access private
router.post(
  "/:id/add-quiz",
  [
    isModerator,
    check("name", "Name is Required").not().isEmpty(),
    check("duration", "Duration of the quiz is Required").not().isEmpty(),
    check("maxDegree", "Max Degree of the quiz is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, duration, maxDegree } = req.body;
    const quiz = {
      name,
      duration,
      maxDegree,
      mcqs: [],
      tofs: [],
    };
    try {
      let session = await Session.findById(req.params.id);
      if (!session)
        return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
      session.quiz = quiz;
      await session.save();
      return res.json(session);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/sessions/:id/edit-quiz
// @desc edit quiz
// @access private
router.put(
  "/:id/edit-quiz",
  [
    isModerator,
    check("name", "Name is Required").not().isEmpty(),
    check("duration", "Duration of the quiz is Required").not().isEmpty(),
    check("maxDegree", "Max Degree of the quiz is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, duration, maxDegree } = req.body;
    try {
      let session = await Session.findById(req.params.id);
      if (!session)
        return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
      let updatedQuiz = session.quiz;
      updatedQuiz.name = name;
      updatedQuiz.duration = duration;
      updatedQuiz.maxDegree = maxDegree;
      session.quiz = updatedQuiz;
      await session.save();
      return res.json(session);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/sessions/:id/delete-quiz
// @desc delete quiz
// @access private
router.delete("/:id/delete-quiz", [isModerator], async (req, res) => {
  try {
    let session = await Session.findById(req.params.id);
    if (!session)
      return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
    session.quiz = {};
    await session.save();
    return res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/sessions/:id/add-requiz
// @desc add requiz
// @access private
router.post(
  "/:id/add-reQuiz",
  [
    isModerator,
    check("name", "Name is Required").not().isEmpty(),
    check("duration", "Duration of the quiz is Required").not().isEmpty(),
    check("maxDegree", "Max Degree of the quiz is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, duration, maxDegree } = req.body;
    const reQuiz = {
      name,
      duration,
      maxDegree,
      mcqs: [],
      tofs: [],
    };
    try {
      let session = await Session.findById(req.params.id);
      if (!session)
        return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
      session.reQuiz = reQuiz;
      await session.save();
      return res.json(session);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/sessions/:id/edit-requiz
// @desc edit requiz
// @access private
router.put(
  "/:id/edit-reQuiz",
  [
    isModerator,
    check("name", "Name is Required").not().isEmpty(),
    check("duration", "Duration of the quiz is Required").not().isEmpty(),
    check("maxDegree", "Max Degree of the quiz is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, duration, maxDegree } = req.body;
      let session = await Session.findById(req.params.id);
      if (!session)
        return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
      let updatedReQuiz = session.reQuiz;
      updatedReQuiz.name = name;
      updatedReQuiz.duration = duration;
      updatedReQuiz.maxDegree = maxDegree;
      session.reQuiz = updatedReQuiz;
      await session.save();
      return res.json(session);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/sessions/:id/delete-requiz
// @desc delete requiz
// @access private
router.delete("/:id/delete-reQuiz", [isModerator], async (req, res) => {
  try {
    let session = await Session.findById(req.params.id);
    if (!session)
      return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
    session.reQuiz = {};
    await session.save();
    return res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/sessions/add-image
// @desc add image
// @access private
router.post(
  "/add-image",
  [isModerator, upload.any({ maxCount: 1 })],
  async (req, res) => {
    try {
      let resArray = [];
      req.files.forEach((file) => {
        resArray.push({ fieldName: file.fieldname, path: file.path });
      });
      return res.json(resArray);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route POST api/sessions/:session_id/:type/add-mcq
//@desc add Mcq
//@access private
router.post(
  "/:session_id/:type/add-mcq",
  [
    isModerator,
    check("data.*.question", "Question is Required").not().isEmpty(),
    check("data.*.A", "Answer A is Required").not().isEmpty(),
    check("data.*.B", "Answer B is Required").not().isEmpty(),
    check("data.*.C", "Answer C is Required").not().isEmpty(),
    check("data.*.D", "Answer D is Required").not().isEmpty(),
    check(
      "data.*.correctAnswer",
      "The Correct Answer is Required and must be Valid"
    )
      .not()
      .isEmpty()
      .isIn(["A", "B", "C", "D"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { data } = req.body;
      let session = await Session.findById(req.params.session_id);
      if (!session) {
        return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
      }
      if (req.params.type === "quiz") {
        session.quiz.mcqs.push(...data);
      } else if (req.params.type === "homework") {
        session.homework.mcqs.push(...data);
      } else if (req.params.type === "reQuiz") {
        session.reQuiz.mcqs.push(...data);
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Bad Request the Type is Invalid" }] });
      }

      await session.save();
      return res.json(session);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/sessions/mcq
//@desc get Mcq
//@access private
router.get("/mcq", [isModerator], async (req, res) => {
  try {
    let mcqs = await Session.aggregate([
      {
        $project: {
          quizMcqs: {
            $concatArrays: ["$quiz.mcqs"],
          },
          homeworkMcqs: {
            $concatArrays: ["$homework.mcqs"],
          },
          reQuizMcqs: {
            $concatArrays: ["$reQuiz.mcqs"],
          },
          name: 1,
        },
      },
    ]);
    return res.json(mcqs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/sessions/:session_id/:type/add-tof
//@desc add TOF
//@access private
router.post(
  "/:session_id/:type/add-tof",
  [
    isModerator,
    check("data.*.question", "Question is Required").not().isEmpty(),
    check(
      "data.*.correctAnswer",
      "The Correct Answer is Required and must be Valid"
    )
      .not()
      .isEmpty()
      .isIn(["True", "False"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { data } = req.body;
      let session = await Session.findById(req.params.session_id);
      if (!session) {
        return res.status(400).json({ errors: [{ msg: "Session not Found" }] });
      }
      if (req.params.type === "quiz") {
        session.quiz.tofs.push(...data);
      } else if (req.params.type === "homework") {
        session.homework.tofs.push(...data);
      } else if (req.params.type === "reQuiz") {
        session.reQuiz.tofs.push(...data);
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Bad Request the Type is Invalid" }] });
      }

      await session.save();
      return res.json(session);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/sessions/tof
//@desc get Tof
//@access private
router.get("/tof", [isModerator], async (req, res) => {
  try {
    let tofs = await Session.aggregate([
      {
        $project: {
          quizTofs: {
            $concatArrays: ["$quiz.tofs"],
          },
          homeworkTofs: {
            $concatArrays: ["$homework.tofs"],
          },
          reQuizTofs: {
            $concatArrays: ["$reQuiz.tofs"],
          },
          name: 1,
        },
      },
    ]);
    return res.json(tofs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
