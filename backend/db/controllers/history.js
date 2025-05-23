import CardModel from "../models/card";
import ListModel from "../models/list";
import { genericErrorHandler } from "../utils/errors";

// Get all lists
export const getLists = async (req, res) => {
  try {
    const lists = await ListModel.find({});   // Get all lists

    // Return only the id and name of the list
    const listsToReturn = lists.map((list) => {   // 把所有 list 轉成 json 的形式
      return {
        id: list.id,
        name: list.name,
      };
    });

    return res.status(200).json(listsToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Get a list
export const getList = async (req, res) => {    // 如果要在 function 裡面宣告 await，必須要加上 async
  try {
    const { id } = req.params;
    const lists = await ListModel.findById(id).populate("cards"); // 因為等 database 回傳資料，所以要加上 await 
    if (!lists) {
      return res.status(404).json({ error: "id is not valid" });
    }

    return res.status(200).json({
      id: lists.id,
      name: lists.name,
      cards: lists.cards,
    });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Create a list
export const createList = async (req, res) => {
  try {
    const { id } = await ListModel.create(req.body);
    return res.status(201).json({ id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Update a list
export const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Update the list
    const newList = await ListModel.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true },
    );

    // If the list is not found, return 404
    if (!newList) {
      return res.status(404).json({ error: "id is not valid" });
    }

    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Delete a list
export const deleteList = async (req, res) => {
  // Create a transaction
  const session = await ListModel.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const deletedList = await ListModel.findByIdAndDelete(id).session(session);
    if (!deletedList) {
      throw new Error("id is not valid");
    }
    await CardModel.deleteMany({ list_id: id }).session(session);
    await session.commitTransaction();
    res.status(200).send("OK");
  } catch (error) {
    await session.abortTransaction();
    genericErrorHandler(error, res);
  } finally {
    session.endSession();
  }
};
