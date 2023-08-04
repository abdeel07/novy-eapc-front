"use client"
import '../app/globals.css'
import Nav from './components/navbar'
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar from "./components/side-bar"
import { ReactQueryProvider } from './ReactQueryProvider';
export const metadata={
  title: "promtopia",
  description:'discober & share Ai prompts'
}
const RootLayout = ({children}) => {

return (
  <ReactQueryProvider>
    <html lang="en">
        <body>
      
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
        <ProSidebarProvider>
          <SideBar/>  
      
        <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
        <header style={{ width: "100%", margin: 0, padding: 0 }}>
              <Nav />
          </header>
            <main className='app' style={{width:"100%"}}>
        
              {children}
            </main>
          </div>
            </ProSidebarProvider>
          </div>
        </body>
    </html>
  </ReactQueryProvider>
)
}

export default RootLayout