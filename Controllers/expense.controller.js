import expenseModel from "../Models/expense.model.js";


// function for store expenses
export function storeExpense(req, res) {

    const { spendOn, money } = req.body;

    // key validation
    if (!spendOn) return res.status(400).json({message: "spendOn key is missing"});
    if (!money) return res.status(400).json({message: "money key is missing"});

    // field validation
    if (spendOn.length < 1) return res.sttaus(400).json({message: "Kindly input one item in spendOn"})

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