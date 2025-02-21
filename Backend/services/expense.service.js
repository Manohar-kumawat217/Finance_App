import expenseModel from "../models/expense.model.js";

export const createExpense = async ({
  userId,
  title,
  amount,
  category,
  date,
}) => {
  if (!userId || !title || !amount || !category) {
    throw new Error("All fields are required");
  }

  const expense = await expenseModel.create({
    userId,
    title,
    amount,
    category,
    date,
  });

  return expense;
};
export const singleExpense = async ({ expenseId, userId }) => {
  try {
    if (!expenseId || !userId) {
      throw new Error("id's are required");
    }
    const expense = await expenseModel.findOne({ _id: expenseId, userId });

    return expense;
  } catch (error) {
    console.log("Error while fetching expense", error);
  }
};
export const allExpenses = async ({
  userId,
  category,
  startDate,
  endDate,
  sort,
  page,
  limit,
}) => {
  if (!userId) {
    throw new Error("User id is required");
  }

  // create a filter object
  let filter = { userId };

  // if category is provided, filter by category
  if (category) {
    filter.category = category;
  }
  //if startDate and endDate are provided, filter by date range
  if (startDate && endDate) {
    filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  //Default sorting latest first
  let sortQuery = { date: -1 };

  // custom sorting if provided
  if (sort) {
    sortQuery = {};
    const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith("-") ? -1 : 1;
    sortQuery[sortField] = sortOrder;
    //objectName[fieldName] = value
  }

  //convert page and limits to numbers  and apply pagination
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  //fetch expenses with filters, sorting and pagination
  const expenses = await expenseModel
    .find(filter)
    .sort(sortQuery)
    .skip(skip)
    .limit(limitNumber);

  return expenses;
};

export const updateExpense = async ({
  title,
  amount,
  category,
  date,
  userId,
  expenseId,
}) => {
  if (!title || !amount || !category || !userId || !expenseId) {
    throw new Error("All fields are required including id also");
  }

  const expense = await expenseModel.findById(expenseId);
  if (!expense) {
    throw new Error("Expense not found");
  }

  if (expense.userId.toString() !== userId) {
    throw new Error("Not Authorized");
  }

  const updatedExpense = await expenseModel.findOneAndUpdate(
    { _id: expenseId, userId },
    {
      title,
      amount,
      category,
      date,
    },
    { new: true }
  );
  return updatedExpense;
};

export const deleteExpense = async ({ expenseId, userId }) => {
  //applying check for id present or not
  if (!expenseId || !userId) {
    throw new Error("Id's are required");
  }
  // search for expense in db
  const expense = await expenseModel.findById(expenseId);
  if (!expense) {
    throw new Error("Expense not found");
  }
  // check for userId which is present in expense : Authenticated user only
  if (expense.userId.toString() !== userId) {
    throw new Error("Not authorized");
  }
  const deletedExpense = await expenseModel.findByIdAndDelete(expenseId);
  return deletedExpense;
};
