// Define the User type
'use client'
interface User {
    id: string;
    NameOfOwner: string;
    NameOfTenant?: string;
    FlatNo: string;
    ResidingSince: string;
    AdharNo: string;
    OwnerContact: string;
    TenantContact?: string;
    WorkPlace?: string;
    PermanentTenantAddress?: string;
    OwnerAddress?: string;
    FourWheelerNo: string;
    TwoWheelerNo: string;
    RestNameAdharContact?: string;
    PoliceVerificationSubmitted?: string;
    RentAgreementSubmitted?: string;
}

// Dashboard.js
import '../styles/globals.css';
import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '../app/config';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

function Dashboard() {
    const auth = getAuth(app);
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null); // Specify the type for user state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Check if currentUser is not null before accessing its properties
                if (auth.currentUser && auth.currentUser.phoneNumber) {
                    const formattedPhoneNumber = `+${auth.currentUser.phoneNumber.replace(/\D/g, '')}`;
                    const response = await axios.post('https://victoriafloors2.onrender.com/api/phoneNumber', { phoneNumber: formattedPhoneNumber });
                    const { user } = response.data;
                    setUser(user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // User is not authenticated, redirect to login page
                router.push('/viewProfile');
            } else {
                // Fetch user data
                fetchUserData();
            }
        });

        // Clean up function
        return () => unsubscribe();
    }, [auth, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            <div className='w-screen h-screen overflow-hidden relative'>
                <div className='w-full h-full -z-[1000000] bg-black absolute'></div>
                <Image alt='bg' src='/vid/69.png' className='object-cover w-screen h-screen -z-[10] absolute blur-sm' width={500} height={300}/>
                <div className='w-[65%] h-[80%] text-xl bg-white bg-opacity-75 rounded-3xl p-10 mx-auto mt-[4.5vw] overflow-auto'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-bold text-3xl'>Welcome to the Dashboard!</h1>
                        <button onClick={handleLogout} className='bg-red-600 text-white font-semibold px-5 py-3 rounded-full'>Logout</button>
                    </div>
                    {user && (
                        <>
                            {user.id !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>User ID</span>: {user.id}</p>
                            ): null}
                            {user.NameOfOwner !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Name of Owner</span>: {user.NameOfOwner}</p>
                            ): null}
                            {user.NameOfTenant !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Name of Tenant:</span> {user.NameOfTenant}</p>
                            ): null}
                            {user.FlatNo !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Flat Number:</span> {user.FlatNo}</p>
                            ): null}
                            {user.ResidingSince !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Residing Since:</span> {user.ResidingSince}</p>
                            ): null}
                            {user.AdharNo !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Adhar Number:</span> {user.AdharNo}</p>
                            ): null}
                            {user.OwnerContact !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Owner Contact:</span> {user.OwnerContact}</p>
                            ): null}
                            {user.TenantContact !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Tenant Contact:</span> {user.TenantContact}</p>
                            ): null}
                            {user.WorkPlace !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Work Place:</span> {user.WorkPlace}</p>
                            ): null}
                            {user.PermanentTenantAddress !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Permanent Tenant Address:</span> {user.PermanentTenantAddress}</p>
                            ): null}
                            {user.OwnerAddress !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Owner Address:</span> {user.OwnerAddress}</p>
                            ): null}
                            {user.FourWheelerNo !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Four Wheeler Number:</span> {user.FourWheelerNo}</p>
                            ): null}
                            {user.TwoWheelerNo !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Two Wheeler Number:</span> {user.TwoWheelerNo}</p>
                            ): null}
                            {user.RestNameAdharContact !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Name-Adhar-Contact of other members:</span> {user.RestNameAdharContact}</p>
                            ): null}
                            {user.PoliceVerificationSubmitted !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Police-Verification submitted or not:</span> {user.PoliceVerificationSubmitted}</p>
                            ): null}
                            {user.RentAgreementSubmitted !== null ? (
                                <p className='mt-2 ml-5'><span className='font-semibold'>Rent-Agreement submitted or not:</span> {user.RentAgreementSubmitted}</p>
                            ): null}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

// // export default Dashboard;
// import React, { useEffect, useState } from 'react';
// // import { getAuth, signOut } from 'firebase/auth';
// import { app } from '../config';
// import { useRouter } from 'next/router';
// import axios from 'axios';

// function Dashboard() {
//     const auth = getAuth(app);
//     const router = useRouter();
//     const [user, setUser] = useState<User | null>(null); // Specify the type for user state

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 if (auth.currentUser && auth.currentUser.phoneNumber) {
//                     const formattedPhoneNumber = `+${auth.currentUser.phoneNumber.replace(/\D/g, '')}`;
//                     const response = await axios.post('http://localhost:8000/api/phoneNumber', { phoneNumber: formattedPhoneNumber });
//                     const { user } = response.data;
//                     setUser(user);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (!user) {
//                 router.push('/viewProfile');
//             } else {
//                 fetchUserData();
//             }
//         });

//         return () => unsubscribe();
//     }, [auth, router]);

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             router.push('/');
//         } catch (error) {
//             console.error('Error logging out:', error);
//         }
//     };

//     return (
//                 <>
//                     <div className='w-screen h-screen overflow-hidden relative'>
//                         <div className='w-full h-full -z-[1000000] bg-black absolute'></div>
//                         <img src='/vid/69.png' className='object-cover w-screen h-screen -z-[10] absolute blur-sm'/>
//                         <div className='w-[65%] h-[80%] text-xl bg-white bg-opacity-75 rounded-3xl p-10 mx-auto mt-[4.5vw] overflow-auto'>
//                             <div className='flex justify-between items-center'>
//                                 <h1 className='font-bold text-3xl'>Welcome to the Dashboard!</h1>
//                                 <button onClick={handleLogout} className='bg-red-600 text-white font-semibold px-5 py-3 rounded-full'>Logout</button>
//                             </div>
//                             {user && (
//                                 <>
//                                     {user.id !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>User ID</span>: {user.id}</p>
//                                     ): null}
//                                     {user.NameOfOwner !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Name of Owner</span>: {user.NameOfOwner}</p>
//                                     ): null}
//                                     {user.NameOfTenant !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Name of Tenant:</span> {user.NameOfTenant}</p>
//                                     ): null}
//                                     {user.FlatNo !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Flat Number:</span> {user.FlatNo}</p>
//                                     ): null}
//                                     {user.ResidingSince !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Residing Since:</span> {user.ResidingSince}</p>
//                                     ): null}
//                                     {user.AdharNo !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Adhar Number:</span> {user.AdharNo}</p>
//                                     ): null}
//                                     {user.OwnerContact !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Owner Contact:</span> {user.OwnerContact}</p>
//                                     ): null}
//                                     {user.TenantContact !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Tenant Contact:</span> {user.TenantContact}</p>
//                                     ): null}
//                                     {user.WorkPlace !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Work Place:</span> {user.WorkPlace}</p>
//                                     ): null}
//                                     {user.PermanentTenantAddress !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Permanent Tenant Address:</span> {user.PermanentTenantAddress}</p>
//                                     ): null}
//                                     {user.OwnerAddress !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Owner Address:</span> {user.OwnerAddress}</p>
//                                     ): null}
//                                     {user.FourWheelerNo !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Four Wheeler Number:</span> {user.FourWheelerNo}</p>
//                                     ): null}
//                                     {user.TwoWheelerNo !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Two Wheeler Number:</span> {user.TwoWheelerNo}</p>
//                                     ): null}
//                                     {user.RestNameAdharContact !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Name-Adhar-Contact of other members:</span> {user.RestNameAdharContact}</p>
//                                     ): null}
//                                     {user.PoliceVerificationSubmitted !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Police-Verification submitted or not:</span> {user.PoliceVerificationSubmitted}</p>
//                                     ): null}
//                                     {user.RentAgreementSubmitted !== null ? (
//                                         <p className='mt-2 ml-5'><span className='font-semibold'>Rent-Agreement submitted or not:</span> {user.RentAgreementSubmitted}</p>
//                                     ): null}
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </>
//             );
// }

export default Dashboard;
