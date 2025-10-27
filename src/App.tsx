import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotesWithSidebar from "./components/Pages/Notes/NotesWithSidebar";
import FoldersWithSidebar from "./components/Pages/Folders/FoldersWithSidebar";
import AdminPanelLayout from "./components/admin-panel/admin-panel-layout";
import { ContentLayout } from "./components/admin-panel/content-layout";

// Placeholder pages for other routes
function PlaceholderPage({ title }: { title: string }) {
  return (
    <AdminPanelLayout>
      <ContentLayout title={title}>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      </ContentLayout>
    </AdminPanelLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesWithSidebar />} />
        <Route path="/notes" element={<NotesWithSidebar />} />
        <Route path="/notes/:id" element={<NotesWithSidebar />} />
        <Route path="/folders" element={<FoldersWithSidebar />} />
        <Route path="/folders/:id" element={<FoldersWithSidebar />} />
        <Route path="/todos" element={<PlaceholderPage title="Todos" />} />
        <Route path="/saved" element={<PlaceholderPage title="Saved" />} />
        <Route path="/friends" element={<PlaceholderPage title="Friends" />} />
        <Route path="/help" element={<PlaceholderPage title="Help" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
      </Routes>
    </Router>
  );
}

export default App;
