
import './index.css';
import { Upload, FileText, Target, Percent, CheckCircle, AlertCircle, Sparkles, TrendingUp, Brain, Eye } from 'lucide-react';
import SkillsInput from './SkillsInput';
import HomePage from './HomePage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
       <Route path="/" element={<HomePage/>} />
        <Route path="/skills" element={<SkillsInput />} />
        <Route path="/skills" element={<SkillsInput />} />
    </Routes>
  )
}

export default App
