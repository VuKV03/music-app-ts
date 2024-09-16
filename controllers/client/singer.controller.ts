import { Request, Response } from "express";
import Singer from "../../models/singer.model";

// [GET] /singer/
export const topics = async (req: Request, res: Response) => {
  const singers = await Singer.find({
    deleted: false
  });

  res.render("client/pages/singers/index", {
    pageTitle: "Danh sách ca sĩ",
    singers: singers
  });
}

