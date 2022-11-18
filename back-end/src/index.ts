import api from "./server";
const PORT = 3001;
api.listen(PORT, () => console.log('Online at port ', PORT)
);