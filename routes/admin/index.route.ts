import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { singerRoutes } from "./singer.route";
import { systemConfig } from "../../config/config";
import { uploadRoutes } from "./upload.route";

const adminRoutes = (app: Express): void => {

  const path = `/${systemConfig.prefixAdmin}`;

  app.use(`${path}/dashboard`, dashboardRoutes);

  app.use(`${path}/topics`, topicRoutes);

  app.use(`${path}/songs`, songRoutes);

  app.use(`${path}/singers`, singerRoutes);

  app.use(`${path}/upload`, uploadRoutes);

};

export default adminRoutes;