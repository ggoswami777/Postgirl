import { currentUser } from '@/modules/authentication/actions'
import Header  from '@/modules/layout/components/header'
import { initializeWorkspace } from '@/modules/workspaces/actions'
import React from 'react'

const RootLayout = async ({children}:{children:React.ReactNode}) => {
  const workspace=await initializeWorkspace();
  console.log(workspace)
  const user=await currentUser();
  return (
    <>
    {/* header */}
    {/* @ts-ignore  */}
    <Header user={user}/>
    <main className="min-h-0 flex-1 overflow-hidden">
      {children}
    </main>
    </>
  )
}

export default RootLayout