import React, { FormEvent, useState } from 'react'
import InputBox from './inputBox'
import { OwnerFormLabels } from '../constants/ownerFormLabels'
import axios from 'axios'

function OwnerForm() {
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const NameOfOwner = formData.get(OwnerFormLabels[0])
        const FlatNo = formData.get(OwnerFormLabels[1])
        const ResidingSince = formData.get(OwnerFormLabels[2])
        const AdharNo = formData.get(OwnerFormLabels[3])
        const OwnerContact = formData.get(OwnerFormLabels[4])
        const FourWheelerNo = formData.get(OwnerFormLabels[5])
        const TwoWheelerNo = formData.get(OwnerFormLabels[6])
        const RestNameAdharContact = formData.get(OwnerFormLabels[7])

        try{
            const res = await axios.post('https://victoriafloors2.onrender.com/api/auth/register', {
                NameOfOwner, FlatNo, ResidingSince, AdharNo, OwnerContact, FourWheelerNo, TwoWheelerNo, RestNameAdharContact
            })
            console.log(res.data)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <>
        <div>
            <h1 className='text-xl px-2 pb-5'>
                Information seeking to the Police Department for physical verification of each owner. Kindly fill these details given below.
            </h1>
            <form onSubmit={handleSubmit}>
            {OwnerFormLabels.map((item, index) => (
                <>
                    {(<InputBox name={`${item}`} key={index}/>)}
                </>
            ))}
            {(<button type='submit' className='hover:text-red-500 hover:bg-red-100 rounded-full px-3 py-1 text-2xl my-3 bg-red-500 text-white duration-150 ease-linear'>
                Submit
            </button>)}
            </form>
        </div>
    </>
  )
}

export default OwnerForm
