import User from "../models/user.model.js";
import AppError from "../utils/appError.js"

//************Register method to register** 
const register = async (req,res) => {
    const { fullName, email, password } = req.body
    
    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        return next(new AppError('email exists ', 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            Public_id: email,
            secure_url: 'https://res.cloudinary.com/dj7k9b6ho/image/upload/v1634269934/avatars/default_avatar.png'
        }
    });

    if (!User) {
        return next('User registration failed , try again', 400);
    }

    //TODO: upload user picture

    await user.save();
    //TODO:set jwt token cookie
    user.password = undefined;
    res.status(200).json({
        success: true,
        Message: 'User registered successfully',
        user
        
    })
}

//***Login method to login the website***** 
const login = () => {
    
}

//**logout method to logout the website**
const logout = () => {
    
}

//profime method to get the profile details
const getProfile = () => {
    
}

export  {
    register,
    login,
    logout,
    getProfile,
}