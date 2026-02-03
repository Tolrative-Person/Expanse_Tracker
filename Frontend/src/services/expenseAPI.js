// API service for expenses
const API_URL = import.meta.env.VITE_API_URL;

export const expenseAPI = {
  // GET all expenses
  getAllExpenses: async () => {
    try {
      const response = await fetch(`${API_URL}/expenses`);
      if (!response.ok) throw new Error('Failed to fetch expenses');
      return await response.json();
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  },

  // POST a new expense
  createExpense: async (expense) => {
    try {
      const response = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!response.ok) throw new Error('Failed to create expense');
      return await response.json();
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  },

  // GET a single expense by ID
  getExpenseById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/expenses/${id}`);
      if (!response.ok) throw new Error('Failed to fetch expense');
      return await response.json();
    } catch (error) {
      console.error('Error fetching expense:', error);
      throw error;
    }
  },

  // UPDATE an expense
  updateExpense: async (id, expense) => {
    try {
      const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!response.ok) throw new Error('Failed to update expense');
      return await response.json();
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  },

  // DELETE an expense
  deleteExpense: async (id) => {
    try {
      const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete expense');
      return await response.json();
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  },
};
