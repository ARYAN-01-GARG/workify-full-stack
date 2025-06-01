import { logoutUser } from "@/store/features/userSlice";
import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"

function Logout() {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        dispatch(logoutUser())
    }
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default Logout