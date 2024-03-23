import { messageModel } from "../dao/models/db.model";


const createUser = async ( userData ) => {
  console.log(userData)
  try {
    let userExist = await messageModel.findOne({user: userData.user});
    if (userExist) {
      userExist.message.push(userData.message);
      await userExist.save();
      return userExist;
    } else {
      let userCreated = await messageModel.create(userData);
      return userCreated;
    } 

  } catch (error) {
      console.log(error);
    }
};

export default { createUser };