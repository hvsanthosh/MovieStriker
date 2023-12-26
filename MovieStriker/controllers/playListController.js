import playListModel from "../models/playListModel.js";

const playListController = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    if (!email) {
      return res.send({ error: "Email id is required" });
    }
    if (!movieId) {
      return res.send({ error: "Movie id is required" });
    }
    // save
    const playlist = await new playListModel({
      email,
      movieId,
    }).save();
    res.status(201).send({
      success: true,
      message: "movie saved to Playlist",
      playlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while saving",
      error,
    });
  }
};
export default playListController;
