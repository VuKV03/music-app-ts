"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const singer_route_1 = require("./singer.route");
const config_1 = require("../../config/config");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    const path = `/${config_1.systemConfig.prefixAdmin}`;
    app.use(`${path}/dashboard`, dashboard_route_1.dashboardRoutes);
    app.use(`${path}/topics`, topic_route_1.topicRoutes);
    app.use(`${path}/songs`, song_route_1.songRoutes);
    app.use(`${path}/singers`, singer_route_1.singerRoutes);
    app.use(`${path}/upload`, upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
