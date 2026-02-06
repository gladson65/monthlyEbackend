import expenseModel from "../Models/expense.model";


// function for store expenses
export function storeExpense(req, res) {

    const { spendOn, money } = req.body;

    // key validation
    if (!spendOn) return res.status(400).json({message: "spendOn key is missing"});
    if (!money) return res.status(400).json({message: "money key is missing"});

    // preparing data to store inside expenseModel
    const newExpense = new expenseModel({
        spendOn,
        money
    })

    // save newExpense into the database
    newExpense.save().then((data)=> {
         if (!data) {
            return res.status(400).json({message: "request failed. Try again!"});
        }

        return res.status(201).json({message: "your expense created successfully"});
    
    }).catch((error)=> {
        return res.status(500).json({message: error.message});
    })
}