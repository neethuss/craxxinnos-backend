import User from "../Models/userModel.js";
import { comparePassword, hashPassword } from "../Utils/passwordUtils.js";

export const postSignup = async (req, res) => {
  try {
    const { mobileNumber, email, password } = req.body;
    console.log(mobileNumber, email, password);

    const existingUser = await User.findOne({ $or:[{email}, {mobileNumber}] });
    if (existingUser) {
      return res.status(400).send({ Message: "User already exists with this email" });
    } else {
      const hashedPassword = await hashPassword(password);
      const newUser = new User({ mobileNumber, email, password: hashedPassword });
      await newUser.save();
      return res.status(201).send(newUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Message: "Internal Server Error" });
  }
};



export const getUser = async (req, res) => {
  try {
    const email = req.params.email

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send({  Message: "User not found" });

    }
    console.log(user, 'final user')

    return res.status(200).send({user, Message:'User fetched succesfully'})

  } catch (error) {
    console.log(error);
    return res.status(500).send({ Message: "Internal Server Error" });
  }
}


export const updateUser = async (req, res) => {
  const email= req.params.email
  console.log(email, 'emdk')
  try {
    const {  title, fullName, dob, currentAddress, livedDuration, aboutYou, employmentStatus, additionalSavings } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Construct update object dynamically
    const updateFields = {};
    if (title) updateFields.title = title;
    if (fullName) updateFields.fullName = fullName;
    if (dob) updateFields.dob = dob;
    if (currentAddress) updateFields.currentAddress = currentAddress;
    if (livedDuration) updateFields.livedDuration = livedDuration;
    if (aboutYou) updateFields.aboutYou = aboutYou;
    if (employmentStatus) updateFields.employmentStatus = employmentStatus;
    if (additionalSavings) updateFields.additionalSavings = additionalSavings;
    

    // Perform partial update
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateFields }, 
      { new: true} 
    );

    return res.status(200).json({ message: "User updated successfully"  });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Message: 'An error occurred while updating the blog.' });
  }
};
