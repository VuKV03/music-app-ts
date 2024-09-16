"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const singer_route_1 = require("./singer.route");
const favorite_song_route_1 = require("./favorite-song.route");
const search_route_1 = require("./search.route");
const clientRoutes = (app) => {
    app.use(`/topics`, topic_route_1.topicRoutes);
    app.use(`/songs`, song_route_1.songRoutes);
    app.use(`/singers`, singer_route_1.singerRoutes);
    app.use(`/favorite-song`, favorite_song_route_1.favoriteSongRouter);
    app.use(`/search`, search_route_1.searchRoutes);
};
exports.default = clientRoutes;
