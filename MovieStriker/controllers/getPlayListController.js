import playListModel from "../models/playListModel.js";

const getPlayListController = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    if (!email) {
      return res.send({ error: "Email id is required" });
    }
    if (!movieId) {
      return res.send({ error: "Movie id is required" });
    }
    //   get playlist
    const playlist = await playListModel.find({ email: email });
    if (playlist) {
      return res.status(200).send({
        success: true,
        message: "playlist available",
        playlist,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while retriving playlist",
      error,
    });
  }
};

export default getPlayListController;
