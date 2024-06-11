import category from "../data/categories";

const getCuisines = async (req, res) => {
  const { cuisine } = category;
  res.status(200).json(cuisine);
}

const getMenus = async (req, res) => {
  const { menu } = category;
  res.status(200).json(menu);
}

export default { getCuisines, getMenus };