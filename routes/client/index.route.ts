import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRouter } from "./favorite-song.route";
import { searchRoutes } from "./search.route";

const clientRoutes = (app: Express): void => {
  app.use(`/topics`, topicRoutes);

  app.use(`/songs`, songRoutes);

  app.use(`/favorite-song`, favoriteSongRouter);

  app.use(`/search`, searchRoutes);
};

export default clientRoutes;