import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query";
import { createWorkspaces,getWorkspaces,getWorkspaceById } from "../actions";


export function useWorkspaces(){
    return useQuery({
        queryKey:["workspaces"],
        queryFn:async()=>getWorkspaces()
    })
}

export function useCreateWorkspace(){
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:async(name:string)=>createWorkspaces(name),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["workspaces"]})
        }
    })
}

export function useGetWorkspace(id:string | undefined){
    return useQuery({
        queryKey:["workspace",id],
        queryFn:async()=>{
            if (!id) {
                throw new Error("A workspace ID is required.");
            }
            return getWorkspaceById(id);
        },
        enabled:Boolean(id),
    })
}