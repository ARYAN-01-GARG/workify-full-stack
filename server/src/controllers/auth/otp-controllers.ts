import { Request, Response , NextFunction } from 'express';
import { prisma } from "../../config/prisma";
import { APIError } from '../../types/apiError';
import { transporter } from '../../config/emailConfig';
import { Verification_Email_Template } from '../../utilities/emailTemplate';
import logger from '../../middlewares/global-middlewares/logger';


const resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Resending OTP email');
    sendOtpEmail(req, res, next);

    res.status(200).json({
        success: true,
        message: 'OTP has been sent successfully',
    });

}
const sendOtpEmail = async (req : Request, res: Response, next: NextFunction) => {
    logger.info('Sending OTP email');
    logger.info(`Request body: ${JSON.stringify(req.body)}`);
    let { email } = req.body;

    if (!email) {
        logger.error('Email is required to send OTP in sendOtpEmail');
        throw new APIError('Please enter email', 400);
    }

    email = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: { email }
      });
    if (!user) {
        logger.error('User not found');
        throw new APIError('User not found', 404);
    }

    const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    await Promise.allSettled([
        prisma.otp.deleteMany({
            where: { email }
        }),
        prisma.otp.create({
            data: {
                email,
                otp : verificationCode,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            }
        })
    ]);

    const response = await transporter.sendMail({
        from: '"Workify" <aryangarg30840@gmail.com>',
        to: email, // list of receivers
        subject: "Verify your Email", // Subject line
        text: "Verify your Email", // plain text body
        html: Verification_Email_Template.replace(
          "{verificationCode}",
          verificationCode
        ),
      });

    logger.info(`OTP email sent to ${email} OTP : ${verificationCode}`);

    if(response.accepted.length === 0){
        logger.error('Email not sent');
        throw new APIError('Email not sent', 500);
    }
}

const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    let { email, otp } = req.body;

    if (!email || !otp) {
        logger.error('Please enter email and otp');
        throw new APIError('Please enter email and otp', 400);
    }

    email = email.trim().toLowerCase();

    const otpData = await prisma.otp.findFirst({
        where: { email },
      });

    if (!otpData) {
        logger.error('Invalid email, No email on this OTP');
        throw new APIError('Invalid email , No email on this OTP', 404);
    } else if (otpData.expiresAt < new Date()) {
        logger.error('OTP expired');
        throw new APIError('OTP expired', 400);
    }

    if (otpData.otp !== otp) {
        logger.error('Invalid OTP');
        throw new APIError('Invalid OTP', 400);
    }

    await prisma.user.update({
        where: { email },
        data: { isVerified : true },
    });

    await prisma.otp.deleteMany({
        where: { email }
    });
    logger.info(`OTP verified successfully for email: ${email}`);
    res.status(200).json({
        success: true,
        message: "OTP verified successfully",
    });
}

export {
    sendOtpEmail,
    verifyOtp,
    resendOtp
}