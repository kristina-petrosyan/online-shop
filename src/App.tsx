import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import RecipeIndex from './pages/recipes/RecipeIndex'
import RecipeShow from './pages/recipes/RecipeShow'
import RecipeCreate from './pages/recipes/RecipeCreate'
import RecipeEdit from './pages/recipes/RecipeEdit'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<RecipeIndex />} />
      <Route path="/recipes/create" element={<RecipeCreate />} />
      <Route path="/recipes/:id" element={<RecipeShow />} />
      <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
