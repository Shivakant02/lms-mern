import User from "../models/user.model.js";
import AppError from "../utils/appError.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import sendEmail from "../utils/sendEmail.js";
// import asyncHandler from 'express-async-handler'
import crypto from 'crypto'



const cookieOptions = {
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true
}

//************Register method to register** 
const register = async (req,res,next) => {
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

    //TODO: upload user picture
    console.log('file details->',JSON.stringify(req.file));
    if (req.body) {
       try {
           const result = await cloudinary.v2.uploader.upload(req.file.path, {
               folder: 'lms',
               width: 250,
               height: 250,
               gravity: 'faces',
               crop:'fill',
           });

           if (result) {
               user.avatar.Public_id = result.public_id;
               user.avatar.secure_url = result.secure_url;

               fs.rm(`upload/${req.file.filename}`);
           }
           
       } catch (error) {
        return next(new AppError(error.message||'file not uploaded, please try again',500))
       } 
    }

    await user.save();

    //TODO:set jwt token cookie
    const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie('token', token, cookieOptions);

  

    res.status(201).json({
        success: true,
        Message: 'User registered successfully',
        user
        
    });
}

//***Login method to login the website***** 
const login =  async (req,res,next) => {
     const { email, password } = req.body;

  // Check if the data is there or not, if not throw error message
  if (!email || !password) {
    return next(new AppError('Email and Password are required', 400));
  }

  // Finding the user with the sent email
  const user = await User.findOne({ email }).select('+password');

  // If no user or sent password do not match then send generic response
  if (!(user && (await user.comparePassword(password)))) {
    return next(
      new AppError('Email or Password do not match or user does not exist', 401)
    );
  }

  // Generating a JWT token
  const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie('token', token, cookieOptions);

  // If all good send the response to the frontend
  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    user,
  });
}

//**logout method to logout the website**
const logout = (req,res) => {
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

//Forget password implimentation
const forgotPassword = async (req,res,next ) => {
    const { email } = req.body;

    if (!email) {
        return next(new AppError('Email is required'),400)
    }

    const user =await User.findOne({ email });

    if (!user) {
        return next(new AppError('User does not exist'), 400);
    }

    const resetToken = await user.generatePasswordToken();

    await user.save();

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject='Reset Password';
    const message = `You can reset password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your pasword</a>\n If the above link does not work for some reason copy paste this link in new tab n${resetPassword}.\nIf you have not requested kindly ignore.`;
    
    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully!`
        });

        console.log(resetPasswordUrl);

    } catch (error) {
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        await user.save();

        return next(new AppError(error.message||`something went wrong`, 500));
    }

}

    //reset password implimentation
const resetPassword = async (req,res,next) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() },
        
    });

    if (!user) {
        return next(new AppError('Token is invalid or expire',400))
    }

    user.password = password;
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message:'password changed successfully',
    })
}

const changePassword = async (req,res,next) => {
    const { oldPassword, newPassword } = req.body;

    const { id } = req.user;

    if (!oldPassword || !newPassword) {
        return next(new AppError('all fields are mandatory ',400))
    }

    const user = await User.findById({ id }).select('+password');

    if (!user) {
        return next(new AppError('User does not exist', 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return next(new AppError('Invalid old password', 400))
    }

    user.password = newPassword
    
    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    });
}

const updateUser = async (req, res, next) => {
    const { fullName } = req.body;
    const { id } = req.user;

    const user = await User.findById({ id });

    if (!user) {
        return next(new AppError('User does not exist', 400));
    }

    if (fullName) {
        user.fullName = fullName;
    }

    if (req.file) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'lms',
            width: 250,
            height: 250,
            gravity: 'faces',
            crop: 'fill',
        });

        if (result) {
            user.avatar.Public_id = result.public_id;
            user.avatar.secure_url = result.secure_url;

               fs.rm(`upload/${req.file.filename}`);

        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        message:'User details updated successfully'
    })
}



export  {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser,
    
}