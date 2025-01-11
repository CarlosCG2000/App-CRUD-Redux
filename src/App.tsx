
import './App.css'
import { Copyright } from './components/Copyright'
import { CreateNewUser } from './components/CreateNewUser'
import { ListOfUsers } from './components/ListOfUsers'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
      <Copyright />
    </>
  )
}

export default App
