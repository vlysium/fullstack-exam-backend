import Cuisine, { ICuisine } from "../models/cuisine";
import Menu, { IMenu } from "../models/menu";

const getCuisines = async (req, res) => {
  try {
    const cuisines: ICuisine[] = await Cuisine.find().select("-_id name slug");
    res.status(200).json(cuisines);
  } catch (error) {
    res.status(500).json({ message: "Unexpected server error" });
  }
}

const getMenus = async (req, res) => {
  try {
    const menus: IMenu[] = await Menu.find().select("-_id name slug");
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Unexpected server error" });
  }
}

export default { getCuisines, getMenus };