import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import NoteWorkflow from "@/components/Notes/NoteWorkflow";

export default function PlaceholderContent() {
  return (
    <Card className="rounded-lg border-none">
      <CardContent className="p-1">
          <NoteWorkflow/>
      </CardContent>
    </Card>
  );
}
