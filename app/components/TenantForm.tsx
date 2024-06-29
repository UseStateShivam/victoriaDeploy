import React, { useState } from 'react'
import InputBox from './inputBox'
import { TenantFormLabels } from '../constants/tenantFormLabels'
import axios from 'axios';

function TenantForm() {
  
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const NameOfOwner =  formData.get(TenantFormLabels[0])
        const NameOfTenant =  formData.get(TenantFormLabels[1])
        const FlatNo =  formData.get(TenantFormLabels[2])
        const ResidingSince =  formData.get(TenantFormLabels[3])
        const AdharNo =  formData.get(TenantFormLabels[4])
        const OwnerContact =  formData.get(TenantFormLabels[5])
        const TenantContact =  formData.get(TenantFormLabels[6])
        const WorkPlace =  formData.get(TenantFormLabels[7])
        const PermanentTenantAddress =  formData.get(TenantFormLabels[8])
        const OwnerAddress =  formData.get(TenantFormLabels[9])
        const FourWheelerNo =  formData.get(TenantFormLabels[10])
        const TwoWheelerNo =  formData.get(TenantFormLabels[11])
        const RestNameAdharContact =  formData.get(TenantFormLabels[12])
        const PoliceVerificationSubmitted =  formData.get(TenantFormLabels[13])
        const RentAgreementSubmitted =  formData.get(TenantFormLabels[14])

        try {
            const res = await axios.post('https://victoriafloors2.onrender.com/api/auth/register', {
                NameOfOwner,
                NameOfTenant,
                FlatNo,
                ResidingSince,
                AdharNo,
                OwnerContact,
                TenantContact,
                WorkPlace,
                PermanentTenantAddress,
                OwnerAddress,
                FourWheelerNo,
                TwoWheelerNo,
                RestNameAdharContact,
                PoliceVerificationSubmitted,
                RentAgreementSubmitted,
            })
            console.log(res.data)
            window.location.reload()
        } catch (error) { 
            console.log(error)
        }
    }
  return (
    <>
      <div>
          <h1 className='text-xl px-2 pb-5'>
              Information seeking to the Police Department for physical verification of each tenant. Kindly fill these details given below.
          </h1>
          <form onSubmit={handleSubmit}>
          {TenantFormLabels.map((item, index) => (
              <>
                  <InputBox name={`${item}`} key={index}/>
              </>
          ))}
          <button type='submit' className='hover:text-red-500 hover:bg-red-100 rounded-full px-3 py-1 text-2xl my-3 bg-red-500 text-white duration-150 ease-linear'>
              Submit
          </button>
          </form>
      </div>
    </>
  )
}

export default TenantForm
