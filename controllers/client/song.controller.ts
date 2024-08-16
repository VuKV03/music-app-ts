import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const slugTopic = req.params.slugTopic;

  const topic = await Topic.findOne({
    slug: slugTopic,
    deleted: false,
    status: "active",
  }).select("title");

  const songs = await Song.find({
    topicId: topic.id,
    deleted: false,
    status: "active",
  }).select("avatar title singerId like slug");

  for (const item of songs) {
    const singer = await Singer.findOne({
      _id: item.singerId,
      deleted: false,
    }).select("fullName");

    item["singer"] = singer;
  }

  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    topic: topic,
    songs: songs,
  });
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;

  console.log(slugSong);

  res.render("client/pages/songs/detail", {
    pageTitle: "Chi tiết bài hát",
  });
};
