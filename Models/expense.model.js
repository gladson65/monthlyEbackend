import mongoose from "mongoose";

const { Schema } = mongoose;

const time = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const expenseSchema = new Schema({
    spendOn: {
        type: Array,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, time)

const expenseModel = mongoose.model("expense", expenseSchema);
export default expenseModel;

