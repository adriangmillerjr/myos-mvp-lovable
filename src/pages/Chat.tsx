import { useParams } from "react-router-dom";

export default function Chat() {
  const { projectId } = useParams();
  
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Chat Interface</h2>
        <p className="text-muted-foreground">
          {projectId ? `Project Chat: ${projectId}` : 'Global Chat'}
        </p>
        <p className="text-sm text-muted-foreground">
          Chat functionality is now handled by the Dashboard component
        </p>
      </div>
    </div>
  );
}