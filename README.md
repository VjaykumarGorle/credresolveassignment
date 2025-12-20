Expense Sharing Application
About the Project
This project is a simple expense sharing application built using the MERN stack.
The idea of the project is inspired by applications like Splitwise, where people can share expenses, track who owes whom, and finally settle the dues.
The main goal of this project was not just to build a UI, but to properly design the backend logic for expense splitting, balance tracking, balance simplification, and settlement.
________________________________________
What Problem This Project Solves
When people go on trips or live together, expenses are usually paid by one person and shared among others.
Manually tracking these expenses becomes confusing over time.
This application helps in:
•	Recording shared expenses
•	Splitting expenses in different ways
•	Tracking pending balances
•	Reducing unnecessary transactions
•	Settling dues easily
________________________________________
Technologies Used
Frontend
•	React
•	Axios
•	CSS
Backend
•	Node.js
•	Express.js
•	MongoDB
•	Mongoose
________________________________________
How the Application Works (Step by Step)
Step 1: Creating Users
The first step is creating users.
Each user has a name and email. These users represent people who will share expenses.
Users are stored in the database and reused across expenses.
________________________________________
Step 2: Creating Groups
Groups are created to represent a common context such as a trip or event.
Even though the UI is simple, the backend supports grouping users and expenses logically.
________________________________________
Step 3: Adding Expenses
An expense can be added by specifying:
•	Who paid the expense
•	Total expense amount
•	Users involved in the expense
•	Type of split
Each expense updates the balances automatically.
________________________________________
Step 4: Expense Split Types
The application supports three types of splits:
Equal Split
The total amount is divided equally among the users.
Exact Amount Split
Each user pays a fixed amount. Validation ensures that the sum of all amounts equals the total expense.
Percentage Split
The expense is divided based on percentages. Validation ensures that percentages add up to 100.
These split types cover most real-world use cases.
________________________________________
Step 5: Balance Tracking
Instead of recalculating balances from all expenses every time, the system stores balances directly.
For each expense, the system records:
•	Who owes money
•	Who should receive money
•	How much is owed
This makes balance queries fast and simple.
________________________________________
Step 6: Balance Simplification
To avoid unnecessary transactions, balance simplification is implemented.
For example:
•	If A owes B and B owes C
•	The system simplifies it so A owes C directly
This reduces confusion and minimizes the number of transactions required.
________________________________________
Step 7: Real-Time Updates
Whenever a new expense is added, the balances are updated immediately on the UI without refreshing the page.
This is handled using React state management.
________________________________________
Step 8: Settling Dues
The application allows users to settle balances.
•	Partial settlement reduces the balance
•	Full settlement removes the balance entry completely
This completes the expense flow from creation to closure.
________________________________________
Database Design
The application uses the following collections:
•	Users
•	Groups
•	Expenses
•	Balances
The balances collection stores net balances, which helps in fast retrieval and simplification.
________________________________________
API Endpoints Used
•	POST /users – Create a user
•	POST /groups – Create a group
•	POST /expenses – Add an expense
•	GET /balances – Get simplified balances
•	POST /balances/settle – Settle dues
________________________________________
How to Run the Project
Backend
1.	Navigate to the backend folder
2.	Install dependencies
3.	Start the server
npm install
node server.js
Frontend
1.	Navigate to the frontend folder
2.	Install dependencies
3.	Start the React application
npm install
npm start
Make sure MongoDB service is running before starting the backend.
________________________________________
Assignment Requirement Status
•	Create groups – Completed
•	Add shared expenses – Completed
•	Equal split – Completed
•	Exact split – Completed
•	Percentage split – Completed
•	Track balances – Completed
•	Balance simplification – Completed
•	Settle dues – Completed
________________________________________
Conclusion
This project successfully implements all the required features of an expense sharing application.
It focuses on correct backend logic, clean balance handling, and a simple but usable frontend.
The application can be further improved by adding authentication, better group management, and deployment, but the current implementation fully satisfies the assignment requirements.

