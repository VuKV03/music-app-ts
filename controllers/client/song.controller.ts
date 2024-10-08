import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

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

  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false,
  });

  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
  }).select("title");

  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id
  })

  song["isFavoriteSong"] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic,
  });
};

// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeLike: string = req.params.typeLike;

  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });

  const updateLike: number = typeLike == "like" ? song.like + 1 : song.like - 1;

  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      like: updateLike,
    }
  );

  res.json({
    code: 200,
    message: "Thành công!",
    like: updateLike,
  });
};

// [PATCH] /songs/like/:typeLike/:idSong
export const favorite = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeFavorite: string = req.params.typeFavorite;

  if(typeFavorite == "favorite") {
    const favoriteSong = new FavoriteSong({
      userId: "",
      songId: idSong
    });
    await favoriteSong.save();
  } else {
    await FavoriteSong.deleteOne({
      userId: "",
      songId: idSong
    })
  }

  res.json({
    code: 200,
    message: typeFavorite == "favorite" ? "Đã thêm vào yêu thích" : "Đã xóa yêu thích"
  })
}

// [PATCH] /listen/:songId
export const listenPatch = async (req: Request, res: Response) => {
  const songId: string = req.params.idSong;

  const song = await Song.findOne({
    _id: songId,
    // status: "active",
    // deleted: false
  });

  const listenUpdate: number = song.listen + 1;

  await Song.updateOne({
    _id: songId,
    status: "active",
    deleted: false
  }, {
    listen: listenUpdate
  });

  res.json({
    code: 200,
    message: "Đã cập nhật số lượt nghe!",
    listen: listenUpdate
  });
};