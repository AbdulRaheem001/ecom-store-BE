

const Store = require("../Module/store_Module");

const getStore= async (req,res)=>{
  console.log("Welcon to Admin")
  try {
  const storeData = await Store.find(); // Retrieve all products from the database
  
    res.json(storeData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
}
const updateStatus = async (req, res) => {
  const { _id } = req.body;
console.log(_id);
  try {
    // Find the store by ID and update its status
    const updatedStore = await Store.findByIdAndUpdate(
      _id,
      { Status: true }, // Change this to the new status value
      { new: true } // This option returns the updated document
    );

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Store status updated successfully" });
  } catch (error) {
    console.error("Error updating store status:", error);
    res.status(500).json({ message: "An error occurred while updating store status" });
  }
};

module.exports= {getStore,updateStatus}
