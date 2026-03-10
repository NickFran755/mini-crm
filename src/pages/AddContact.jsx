import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineOfficeBuilding, HiOutlineCheckCircle } from 'react-icons/hi'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import { STATUSES } from '../utils/constants'
import { createContact, getContactById, updateContact } from '../services/contactService'

const statusOptions = [{ value: '', label: 'Select status...' }, ...STATUSES]

export default function AddContact() {
  const { id } = useParams()
  const isEditing = !!id
  const navigate = useNavigate()

  const existing = isEditing ? getContactById(id) : null

  const [form, setForm] = useState({
    name: existing?.name || '',
    email: existing?.email || '',
    phone: existing?.phone || '',
    company: existing?.company || '',
    status: existing?.status || 'new_lead',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    if (!form.status) errs.status = 'Status is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    if (isEditing) {
      updateContact(id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        status: form.status,
      })
      navigate(`/contacts/${id}`)
    } else {
      const contact = createContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        status: form.status,
      })
      setSuccess(true)
      setTimeout(() => navigate(`/contacts/${contact.id}`), 1200)
    }
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  if (isEditing && !existing) {
    return (
      <div className="text-center py-16">
        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
          <HiOutlineUser className="w-7 h-7 text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-500">Contact not found</p>
        <p className="text-xs text-gray-400 mt-1">This contact may have been deleted</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/contacts')}>
          Back to Contacts
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <button onClick={() => navigate(-1)} className="text-sm text-primary-500 hover:text-primary-600 font-semibold cursor-pointer inline-flex items-center gap-1 mb-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Contact' : 'Add New Contact'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {isEditing ? 'Update the contact information below' : 'Fill in the details to create a new contact'}
        </p>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
          <HiOutlineCheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Contact created successfully! Redirecting...</span>
        </div>
      )}

      <Card className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                placeholder="e.g. Marie Dubois"
                value={form.name}
                onChange={handleChange('name')}
                error={errors.name}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. marie@company.com"
                value={form.email}
                onChange={handleChange('email')}
                error={errors.email}
              />
              <Input
                label="Phone Number"
                placeholder="e.g. +33 6 12 34 56 78"
                value={form.phone}
                onChange={handleChange('phone')}
                error={errors.phone}
              />
              <Input
                label="Company"
                placeholder="Company name (optional)"
                value={form.company}
                onChange={handleChange('company')}
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Pipeline Status</h3>
            <Select
              label="Current Status"
              options={statusOptions}
              value={form.status}
              onChange={handleChange('status')}
              error={errors.status}
            />
          </div>

          <div className="border-t border-gray-100 pt-6 flex items-center gap-3">
            <Button type="submit">{isEditing ? 'Save Changes' : 'Create Contact'}</Button>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
