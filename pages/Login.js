import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signInWithPhoneNumber, getAuth, RecaptchaVerifier } from 'firebase/auth';
import { app } from '../app/config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [showSendOtp, setShowSendOtp] = useState(true);
    const router = useRouter();
    const auth = getAuth(app);
    useEffect(() => {
      window.appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {},
        'expired-callback': () => {}
      });
    }, [auth])

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSendOTP = async () => {
        try {
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
            console.log('sending phone number', formattedPhoneNumber);
            
            const response = await axios.post('https://victoriafloors2.onrender.com/api/phoneNumber', { phoneNumber: formattedPhoneNumber });
            
            const { phoneNumberExists } = response.data;
            console.log('phone number exists', phoneNumberExists);
            
            if (phoneNumberExists) {
                if (auth) {
                    const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.appVerifier);
                    console.log('Confirmation result:', confirmation);
                    
                    if (confirmation) {
                        setShowSendOtp(false);
                        setConfirmationResult(confirmation);
                        setOtpSent(true);
                        setPhoneNumber('');
                        alert('OTP has been sent!');
                    } else {
                        console.error('Confirmation result is undefined.');
                    }
                } else {
                    console.error("Auth object or appVerifier is undefined.");
                }
            } else {
                alert('Phone number not found in the database. Please enter a valid number.');
            }
        } catch (error) {
            console.error('Error signing in with phone number:', error);
        }
    };

    const handleOtpSubmit = async () => {
        try {
            if (confirmationResult) {
                await confirmationResult.confirm(otp);
                setOtp('');
                router.push(`/dashboard`);
            } else {
                console.error('Confirmation result is undefined.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    return (
        <div className='w-screen h-screen overflow-hidden bg-black'>
            <Image width={500} height={300} alt='' src="/vid/5.png" className='-z-[10000] object-fill w-[100%] blur-sm'/>
            {!otpSent ? (
                <div id="recaptcha-container" className='z-[1000000] absolute top-10 left-[50vw]'></div> 
            ) : null}
            <div className='w-[45%] h-[60%] bg-white bg-opacity-75 rounded-3xl border-2 border-gray-400 right-[15vw] top-[8vw] absolute px-20 py-12'>
                <div>
                    <p className='font-bold text-5xl mx-[12vw]'>Login</p>
                    {showSendOtp && (
                        <>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                placeholder='Enter phone number with +91 (same as given in physical form)'
                                className='text-xl w-[43vw] mb-3 mt-16 -ml-[4vw] border-2 border-gray-600 py-2 pl-3 rounded-2xl bg-white text-black'
                                />
                            <button onClick={handleSendOTP} className='text-2xl px-5 text-white p-2 rounded-3xl border-2 border-red-900 font-semibold mx-[11vw] mt-2 w-fit bg-gradient-to-r from-orange-500 to-orange-700 '>Send OTP</button>
                        </>
                    )}
                </div>
                <div>
                    {!showSendOtp && (
                        <>
                            <input
                                type="text"
                                value={otp}
                                onChange={handleOtpChange}
                                placeholder='Enter OTP'
                                className='text-xl w-[43vw] my-3 mt-16 -ml-[4vw] border-2 border-gray-600 py-2 pl-3 rounded-2xl bg-white'
                                />
                            <button onClick={handleOtpSubmit} className='text-2xl px-5 text-white p-2 rounded-3xl border-2 border-red-900 font-semibold mx-[11vw] mt-2 w-fit bg-gradient-to-r from-orange-500 to-orange-700 '>Submit OTP</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
