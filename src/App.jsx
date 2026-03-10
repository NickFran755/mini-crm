import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import AddContact from './pages/AddContact'
import ContactDetails from './pages/ContactDetails'
import Activity from './pages/Activity'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts/new" element={<AddContact />} />
          <Route path="contacts/:id" element={<ContactDetails />} />
          <Route path="contacts/:id/edit" element={<AddContact />} />
          <Route path="activity" element={<Activity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
