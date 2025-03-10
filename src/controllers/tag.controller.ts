import { Request, Response } from "express";
import { Tag } from "../models/tag.model";

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({
      data: tags,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    console.log(user);
    
    const { name, color } = req.body;
    const tag = await Tag.create({ name, color, user: user.id });
    res.status(201).json({
      data: tag,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    const tag = await Tag.findByIdAndUpdate(id, { name, color }, { new: true });
    res.status(200).json({
      data: tag,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);
    res.status(200).json({
      data: tag,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
