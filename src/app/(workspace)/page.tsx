"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TabbedSidebar from "@/modules/collections/components/sidebar";
import { useWorkspaceStore } from "@/modules/layout/store";
import { useGetWorkspace } from "@/modules/workspaces/hooks/workspace";

export default function WorkspacePage() {
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace,
  );
  const { data: currentWorkspace, isPending, error } = useGetWorkspace(
    selectedWorkspace?.id,
  );

  if (error) {
    return (
      <p role="alert" className="p-4 text-sm text-red-400">
        Failed to load workspace: {error.message}
      </p>
    );
  }

  if (!selectedWorkspace) {
    return <p className="p-4 text-sm text-zinc-400">Select a workspace.</p>;
  }

  if (!isPending && !currentWorkspace) {
    return (
      <p role="alert" className="p-4 text-sm text-red-400">
        The selected workspace could not be found.
      </p>
    );
  }

  const workspace = currentWorkspace ?? selectedWorkspace;

  return (
    <ResizablePanelGroup className="min-h-0">
      <ResizablePanel defaultSize="66%" minSize="35%" maxSize="75%">
        <div className="h-full min-w-0 bg-zinc-900" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize="34%"
        maxSize="65%"
        minSize="25%"
        className="min-w-0"
      >
        <div className="h-full min-h-0">
          <TabbedSidebar currentWorkspace={workspace} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
