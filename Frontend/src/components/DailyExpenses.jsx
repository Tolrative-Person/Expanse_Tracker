import React, { useEffect, useState } from 'react';
import { expenseAPI } from '../services/expenseAPI';

export default function DailyExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'Food',
    });

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const data = await expenseAPI.getAllExpenses();
            setExpenses(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch expenses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const updatedExpense = await expenseAPI.updateExpense(editingId, formData);
                setExpenses(expenses.map(exp => exp._id === editingId ? updatedExpense : exp));
                setEditingId(null);
            } else {
                const newExpense = await expenseAPI.createExpense(formData);
                setExpenses([newExpense, ...expenses]);
            }
            setFormData({ description: '', amount: '', category: 'Food' });
            setShowForm(false);
        } catch (err) {
            setError('Failed to save expense');
            console.error(err);
        }
    };

    const handleEdit = (expense) => {
        setFormData({
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
        });
        setEditingId(expense._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this expense?')) {
            try {
                await expenseAPI.deleteExpense(id);
                setExpenses(expenses.filter(exp => exp._id !== id));
            } catch (err) {
                setError('Failed to delete expense');
                console.error(err);
            }
        }
    };

    // const handleCancel = () => {
    //     setFormData({ description: '', amount: '', category: 'Food' });
    //     setEditingId(null);
    //     setShowForm(false);
    // };

    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div className="daily-expenses">
            <div className="expenses-header">
                <h2>Daily Expenses</h2>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="btn-add"
                >
                    {showForm ? 'Cancel' : '+ Add Expense'}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <form onSubmit={handleSubmit} className="expense-form">
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter description"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            placeholder="Enter amount"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option>Food</option>
                            <option>Transport</option>
                            <option>Entertainment</option>
                            <option>Shopping</option>
                            <option>Bills</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-submit">
                        {editingId ? 'Update' : 'Add'} Expense
                    </button>
                </form>
            )}

            <div className="expenses-summary">
                <h3>Total Expenses: ₹{totalAmount.toFixed(2)}</h3>
            </div>

            {loading ? (
                <p>Loading expenses...</p>
            ) : expenses.length === 0 ? (
                <p>No expenses yet. Add one to get started!</p>
            ) : (
                <div className="expenses-list">
                    {expenses.map(expense => (
                        <div key={expense._id} className="expense-item">
                            <div className="expense-details">
                                <h4>{expense.description}</h4>
                                <p>Category: {expense.category}</p>
                                <p className="expense-date">
                                    {new Date(expense.date).toLocaleDateString()}
                                </p>
                                <p className="expense-time">
                                    {new Date(expense.date).toLocaleTimeString()}
                                </p>
                            </div>
                            <div className="expense-amount">
                                <span className="amount">₹{expense.amount.toFixed(2)}</span>
                            </div>
                            <div className="expense-actions">
                                <button 
                                    onClick={() => handleEdit(expense)}
                                    className="btn-edit"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(expense._id)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


