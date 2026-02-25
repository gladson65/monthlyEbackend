import expenseModel from "../Models/expense.model.js";
import userModel from "../Models/users.model.js";


// function for store expenses
export function storeExpense(req, res) {

    const { spendOn, money, email, userID } = req.body;

    // key validation
    if (!spendOn) return res.status(400).json({message: "spendOn key is missing"});
    if (!money) return res.status(400).json({message: "money key is missing"});
    if (!email) return res.status(400).json({message: "email key is missing"});
    if (!userID) return res.status(400).json({message: "userID is missing"});

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
            email,
            userID
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

    const { userID } = req.params;
    // const { email } = req.body;

    // userID key validation
    if (!userID) return res.status(400).json({message: "userID is missing"});
     // email key validation
    // if (!email) return res.status(400).json({message: "email is missing"});

    // field validation
    // let isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // if(!isValidEmail) return res.status(400).json({message: "Invalid Email Format"});

    // check the user is exist or not
    // userModel.findOne({email: email}).then((user)=> {
    //     // if user is not registered
    //     if (!user) return res.status(400).json({message: "User is not registered"});

    //     // find in expenseModel
    //     expenseModel.find({userID: userID}).then((expenses)=> {
    //         if(!expenses) {
    //             return res.status(404).json({message: "No expense found"});
    //         }

    //         return res.status(200).json({expenses: expenses.length === 0 ? 'No Expense found': expenses});
        
    //     }).catch((error)=> {
    //         return res.status(500).json({error: error.message});
    //     })
    // })

    // find in expenseModel
    expenseModel.find({userID: userID}).then((expenses)=> {
        // if it is not in the expense Model
        if(!expenses) {
            return res.status(404).json({message: "No expense found"});
        }

        return res.status(200).json({expenses: expenses.length === 0 ? 'No Expense found': expenses});
    
    }).catch((error)=> {
        return res.status(500).json({error: error.message});
    })

   
}