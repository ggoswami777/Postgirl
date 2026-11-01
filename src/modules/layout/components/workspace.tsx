"use client";

import { Hint } from "@/components/ui/hint";
import { Loader,Plus } from "lucide-react";
import { useEffect,useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkspaces } from "@/modules/workspaces/hooks/workspace";
import { useWorkspaceStore } from "../store";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Workspace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: workspaces, isLoading } = useWorkspaces();
  const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();
  const activeWorkspace =
    workspaces?.find((workspace) => workspace.id === selectedWorkspace?.id) ??
    workspaces?.[0];

  useEffect(() => {
    if (activeWorkspace && selectedWorkspace?.id !== activeWorkspace.id) {
      setSelectedWorkspace(activeWorkspace);
    }
  }, [activeWorkspace, selectedWorkspace?.id, setSelectedWorkspace]);

  if (isLoading) {
    return <Loader className="animate-spin size-4 text-indigo-400" />;
  }

  if (!workspaces || workspaces.length === 0) {
    return <div className="font-semibold text-indigo-400">No Workspace Found</div>
  }

  return (
    <Hint label="Change Workspace">
      <Select
        value={activeWorkspace?.id ?? ""}
        onValueChange={(id: string) => {
          const workspace = workspaces.find((item) => item.id === id);
          if (workspace) {
            setSelectedWorkspace(workspace);
          }
        }}
      >
        <SelectTrigger className="border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1">
          <span className="text-sm text-indigo-400 font-semibold">
            <SelectValue placeholder="Select Workspace" />
          </span>
        </SelectTrigger>
        <SelectContent>
          {workspaces.map((workspace) => (
            <SelectItem
              key={workspace.id}
              value={workspace.id}
              label={workspace.name}
            >
              {workspace.name}
            </SelectItem>
          ))}
          <Separator className="my-1"/>
          <div className="p-2 flex flex-row justify-between items-center">
            <span className="text-sm font-semibold text-zinc-600">
              My Workspaces
              <Button size={"icon"} variant={"outline"}
              onClick={() => {
                setIsModalOpen(true);
              }}>
                <Plus size={16} className="text-indigo-400"/>
              </Button>
            </span>
          </div>
        </SelectContent>
      </Select>
    </Hint>
  );
};

export default Workspace;
