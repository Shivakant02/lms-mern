import User from "../models/user.model.js";
import AppError from "../utils/appError.js"


const cookieOptions = {
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true
}

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
const login = async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    const user = await User.findOne({
        email
    }).select('+password');

    if (!user || !user.comparePassword(password)) { //TODO: comparePassword
        return next(new AppError('Email or password does not match', 400));
    }

    const token = await user.generateJWTToken();

    user.password = undefined;
    res.cookie('token', token, cookieOptions);
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user
    });
}

//**logout method to logout the website**
const logout = () => {
    res.cookie('token', null, {
        secure: true, 
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });

}

//profile method to get the profile details
const getProfile = async (req,res) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true, 
        message: 'User details',
        user
    });


}

export  {
    register,
    login,
    logout,
    getProfile,
}