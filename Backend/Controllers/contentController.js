// createContentController.js
const ContentModel = require("../models/Content");
const ExpertModel = require("../models/Expert");
const AdminModel = require("../models/Admin");

const createContent = async (req, res) => {
  try {
    
    const { Picture, Subject, Description } = req.body;
    // const userId = '66121a84db43129f871a51ff';
    
    
    const userId = req.params.id;
    // Fetch user details to determine userType and createdByName
    const user = await ExpertModel.findById(userId); // Try to find the user in the ExpertModel
    let userType, createdByName;

   
    if (user) {
      userType = "ExpertModel";
      createdByName = user.Name;
     } else {
      const adminUser = await AdminModel.findById(userId); // Try to find the user in the AdminModel
      if (!adminUser) {
        return res.status(404).json({ error: "User not found" });
      }

      userType = "AdminModel";
      createdByName = "Admin";
    }

    console.log(userType)

    const newContent = new ContentModel({
      Picture,
      Subject,
      Description,
      createdBy: {
        userId: userId, // Include the userId here
        userType: userType,
        createdByName: createdByName
      }
      
    });

    await newContent.save();

    res.json({ message: "Content created successfully", content: newContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadPictureToContent = async (req, res) => {
  try {
    const { Picture } = req.body;
    const userId = req.params.id; // Assuming the user ID is available in req.user

    // Create a new content entry with the provided picture and user ID
    const newContent = new ContentModel({ Picture: Picture, createdBy: {
      userId: userId
    }});
    const savedContent = await newContent.save();

    res.json({ message: "Picture uploaded successfully", content: savedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const { Picture, Subject, Description } = req.body;

    const content = await ContentModel.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // // Assuming you have authentication middleware to check user role
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Unauthorized to update content' });
    // }

    // Update content fields
    content.Picture = Picture;
    content.Subject = Subject;
    content.Description = Description;

    await content.save();

    res.json({ message: "Content updated successfully", content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// deleteContentController.js
const deleteContent = async (req, res) => {
  try {
    const contentId = req.params.id;

    const content = await ContentModel.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // // Assuming you have authentication middleware to check user role
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Unauthorized to delete content' });
    // }

    await ContentModel.findByIdAndDelete(contentId);

    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllContent = async (req, res) => {
  try {
    const allContent = await ContentModel.find();
    res.json({ content: allContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createContent, updateContent, deleteContent, getAllContent, uploadPictureToContent };
