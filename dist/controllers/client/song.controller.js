"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenPatch = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopic;
    const topic = yield topic_model_1.default.findOne({
        slug: slugTopic,
        deleted: false,
        status: "active",
    }).select("title");
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        deleted: false,
        status: "active",
    }).select("avatar title singerId like slug");
    for (const item of songs) {
        const singer = yield singer_model_1.default.findOne({
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
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slugSong,
        status: "active",
        deleted: false,
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false,
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false,
    }).select("title");
    const favoriteSong = yield favorite_song_model_1.default.findOne({
        songId: song.id
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic,
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false,
    });
    const updateLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({
        _id: idSong,
    }, {
        like: updateLike,
    });
    res.json({
        code: 200,
        message: "Thành công!",
        like: updateLike,
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    if (typeFavorite == "favorite") {
        const favoriteSong = new favorite_song_model_1.default({
            userId: "",
            songId: idSong
        });
        yield favoriteSong.save();
    }
    else {
        yield favorite_song_model_1.default.deleteOne({
            userId: "",
            songId: idSong
        });
    }
    res.json({
        code: 200,
        message: typeFavorite == "favorite" ? "Đã thêm vào yêu thích" : "Đã xóa yêu thích"
    });
});
exports.favorite = favorite;
const listenPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: songId,
    });
    const listenUpdate = song.listen + 1;
    yield song_model_1.default.updateOne({
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
});
exports.listenPatch = listenPatch;
