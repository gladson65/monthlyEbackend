import expenseModel from "../Models/expense.model.js";
import userModel from "../Models/users.model.js";


// function for store expenses
export function storeExpense(req, res) {

    const { spendOn, money, email } = req.body;

    // key validation
    if (!spendOn) return res.status(400).json({message: "spendOn key is missing"});
    if (!money) return res.status(400).json({message: "money key is missing"});
    if (!email) return res.status(400).json({message: "email key is missing"});

    // field validation
    if (spendOn.length < 1) return res.status(400).json({message: "Kindly input one item in spendOn"})
    let testEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!testEmail) return res.status(400).json({message: "Invalid Email Format"});

    // check the user is exist or not
    userModel.findOne({email: email}).then((user)=> {
        if (!user) return res.status(400).json({message: "User is not registered"});

        // preparing data to store inside expenseModel
        const newExpense = new expenseModel({
            spendOn,
            money,
            email
        })

        // save newExpense into the database
        newExpense.save().then((data)=> {
            if (!data) {
                return res.status(400).json({message: "request failed. Try again!"});
            }

            return res.status(201).json({key: "success", message: "your expense created successfully"});
        
        }).catch((error)=> {
            return res.status(500).json({message: error.message});
        })
    
    })

}


// function for getting expense data
export function getExpense(req, res) {

    const { email } = req.body;

    // email key validation
    if (!email) return res.status(400).json({message: "Email key is missing"});

    // field validation
    let isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!isValidEmail) return res.status(400).json({message: "Invalid Email Format"});

    // check the user is exist or not
    userModel.findOne({email: email}).then((user)=> {
        // if user is not registered
        if (!user) return res.status(400).json({message: "User is not registered"});

         // find in expenseModel
        expenseModel.find({email: email}).then((expenses)=> {
            if(!expenses) {
                return res.status(404).json({message: "No expense found"});
            }

            return res.status(200).json({expenses: expenses});
        
        }).catch((error)=> {
            return res.status(500).json({error: error.message});
        })
    })

   
}