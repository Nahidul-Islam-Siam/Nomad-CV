/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useAddContactPartnerMutation } from '@/redux/service/contactApi/contactApi'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface AgentData {
  data: any
}

type ContactFormInputs = {
  fullName: string
  email: string
  phone: string
  message: string
  subject: string
}

export default function AgentAbout({ data: profileData }: AgentData) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>()

  const [addContactPartner, { isLoading }] = useAddContactPartnerMutation()

  const onSubmit = async (formData: ContactFormInputs) => {
    const payload = {
      to: profileData?.email,
      name: formData.fullName,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }

    try {
      const res = await addContactPartner(payload).unwrap()
      // console.log(res);
      

      if (res?.success) {
        toast.success(res.message || 'Message sent successfully!')
        reset()
      } else {
        toast.error(res.message || 'Failed to send message. Please try again.')
      }
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-12 w-full">
      {/* About Section */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <p className="text-gray-700 leading-relaxed">
          {profileData?.profile?.about || 'No description provided'}
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
              Full name<span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Enter your name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              {...register('subject')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Enter subject"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              {...register('message', { required: 'Message is required' })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Write your message"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#E2C7A7] text-white font-medium py-2 rounded-md mt-2 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d1b48c]'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send Now'}
          </button>
        </form>
      </div>
    </div>
  )
}
