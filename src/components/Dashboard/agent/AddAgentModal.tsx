import { useAddCustomRoleMutation } from '@/redux/service/customRole/customApi';
import React, { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';

// Define TypeScript type for the form data
interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  presentAddress: string;
  permanentAddress: string;
  password: string;
  country: string;
  role: 'USER' | 'AGENT' | 'DEVELOPER' | 'MORTGAGE'; // You can add more roles if needed
}

export default function AddAgentModal({ setShowModal }: { setShowModal: (value: SetStateAction<boolean>) => void }) {
  const [addCustomRole] = useAddCustomRoleMutation();

  // Initialize React Hook Form with FormData types
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Call the mutation with the form data
      const res = await addCustomRole(data).unwrap();
      toast.success(res?.message);

      // Close the modal on successful submission
      setShowModal(false);
    } catch (error) {
      console.error('Error adding custom role:', error);
      toast.error( 'Failed to add agent. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-8">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-semibold mb-8">Add Agent</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Full Name is required' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Company Name</label>
                <input
                  type="text"
                  {...register('company', { required: 'Company Name is required' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="Road Freight"
                />
                {errors.company && <span className="text-red-500 text-xs">{errors.company.message}</span>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="JohnDoe@gmail.com"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone</label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="+1 234 456 7890"
                />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Present Address</label>
                <input
                  type="text"
                  {...register('presentAddress', { required: 'Present Address is required' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="New York"
                />
                {errors.presentAddress && <span className="text-red-500 text-xs">{errors.presentAddress.message}</span>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Permanent Address</label>
                <input
                  type="text"
                  {...register('permanentAddress', { required: 'Permanent Address is required' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="Las Vegas"
                />
                {errors.permanentAddress && <span className="text-red-500 text-xs">{errors.permanentAddress.message}</span>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Password</label>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="Password"
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Country</label>
                <input
                  type="text"
                  {...register('country', { required: 'Country is required' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  placeholder="USA"
                />
                {errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Role</label>
                <select
                  {...register('role', { required: 'Role is required' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                >
                  <option value="USER">USER</option>
                  <option value="AGENT">Agent</option>
                  <option value="DEVELOPER">Developer</option>
                  <option value="MORTGAGE">Mortgage</option>
                </select>
                {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-[#E5C7A0] text-gray-900 px-8 py-2 rounded font-semibold hover:bg-[#d6b98e] transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
